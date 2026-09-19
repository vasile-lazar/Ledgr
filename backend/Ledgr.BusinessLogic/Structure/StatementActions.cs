using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Ledgr.DataAccess.Context;
using Ledgr.Domain.Entities.Statement;
using Ledgr.Domain.Entities.Transaction;
using Ledgr.Domain.Models.Service;
using Ledgr.Domain.Models.Statement;
using Ledgr.Domain.Models.Transaction;
using Microsoft.AspNetCore.Http;

namespace Ledgr.BusinessLogic.Structure;

public class StatementActions
{
    private readonly LedgrDbContext _context;
    private readonly HttpClient _httpClient;

    protected StatementActions(LedgrDbContext context,  HttpClient httpClient)
    {
        _context = context;
        _httpClient = httpClient;
    }

    protected async Task<ServiceResponse> UploadAction(int userId, string statementText)
    {
        try
        {
            var currentYear = DateTime.UtcNow.Year;

            var response = await _httpClient.PostAsJsonAsync("/parse", new
            {
                statement_text = statementText,
                default_year = currentYear
            });
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadFromJsonAsync<SaveTransactionsDto>(PythonResponseOptions);

            var statement = new StatementEntity
            {
                FilePath = string.Empty, 
                Date = DateOnly.FromDateTime(DateTime.UtcNow),
                Transactions = result?.Transactions.Count ?? 0,
                UserId = userId
            };
            _context.Statements.Add(statement);
            await _context.SaveChangesAsync();

            return new ServiceResponse { IsSuccess = true, Data = result?.Transactions };
        }
        catch (HttpRequestException)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Parsing service unavailable." };
        }
    }
    
    protected async Task<ServiceResponse> UploadStatementAction(int userId, IFormFile file)
    {
        var uploadsDir = Path.Combine("data", "uploads");
        Directory.CreateDirectory(uploadsDir);

        var fileName = $"{Guid.NewGuid()}_{file.FileName}";
        var filePath = Path.Combine(uploadsDir, fileName);

        await using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        try
        {
            await using var fileStream = File.OpenRead(filePath);
            using var content = new MultipartFormDataContent();
            content.Add(new StreamContent(fileStream), "file", file.FileName);
            content.Add(new StringContent(DateTime.UtcNow.Year.ToString()), "default_year");

            var response = await _httpClient.PostAsync("/parse-pdf", content);
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadFromJsonAsync<SaveTransactionsDto>(PythonResponseOptions);

            var statement = new StatementEntity
            {
                FilePath = filePath,
                Date = DateOnly.FromDateTime(DateTime.UtcNow),
                Transactions = result?.Transactions.Count ?? 0,
                UserId = userId
            };
            _context.Statements.Add(statement);
            await _context.SaveChangesAsync();

            return new ServiceResponse { IsSuccess = true, Data = result?.Transactions };
        }
        catch (HttpRequestException)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Parsing service unavailable." };
        }
    }

    protected ServiceResponse AcceptAction(int userId, SaveTransactionsDto dto)
    {
        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

        var entities = dto.Transactions.Select(t => new TransactionEntity
        {
            UserId = userId,
            Date = t.Date,
            Merchant = t.Merchant,
            Amount = t.Amount,
            Category = t.Category,
            CreatedAtTimestamp = timestamp
        }).ToList();

        _context.Transactions.AddRange(entities);
        _context.SaveChanges();
        
        UpdateBudgets(userId, entities);
        
        return new ServiceResponse { IsSuccess = true, Message = "Transactions saved." };
    }
    
    private void UpdateBudgets(int userId, List<TransactionEntity> transactions)
    {
        
        var spendByCategory = transactions
            .Where(t => t.Amount < 0)
            .GroupBy(t => new { t.Category, t.Date.Year, t.Date.Month })
            .Select(g => new { g.Key.Category, g.Key.Year, g.Key.Month, Total = -g.Sum(t => t.Amount) });

        foreach (var group in spendByCategory)
        {
            var budget = _context.Budgets.FirstOrDefault(b =>
                b.UserId == userId &&
                b.Category == group.Category &&
                b.Date.Year == group.Year &&
                b.Date.Month == group.Month);

            if (budget != null)
            {
                budget.Used += group.Total;
            }
        }

        _context.SaveChanges();
    }

    protected ServiceResponse GetStatementsAction(int userId)
    {
        var items = _context.Statements
            .Where(e => e.UserId == userId)
            .Select(e => new StatementDto
            {
                FilePath = e.FilePath,
                Date = e.Date,
                Transactions = e.Transactions
            }).ToList();
        
        return new ServiceResponse { IsSuccess = true, Data = items };
    }
    
    private static readonly JsonSerializerOptions PythonResponseOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        Converters = { new JsonStringEnumConverter() }
    };
}
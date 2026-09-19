using Ledgr.BusinessLogic.Interfaces;
using Ledgr.BusinessLogic.Structure;
using Ledgr.DataAccess.Context;
using Ledgr.Domain.Models.Service;
using Ledgr.Domain.Models.Transaction;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Ledgr.BusinessLogic.Core;

public class StatementLogic : StatementActions, IStatementLogic
{
    public StatementLogic(LedgrDbContext context, HttpClient httpClient) : base(context, httpClient) { }

    public Task<ServiceResponse> Upload(int userId, string statementText)
    {
        return UploadAction(userId, statementText);
    }

    public Task<ServiceResponse> UploadStatement(int userId, IFormFile file)
    {
        return UploadStatementAction(userId, file);
    }

    public ServiceResponse Accept(int userId, SaveTransactionsDto dto)
    {
        return AcceptAction(userId, dto);
    }

    public ServiceResponse GetStatements(int userId)
    {
        return  GetStatementsAction(userId);
    }
}
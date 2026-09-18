using Ledgr.Domain.Models.Service;
using Ledgr.Domain.Models.Transaction;
using Microsoft.AspNetCore.Http;

namespace Ledgr.BusinessLogic.Interfaces;

public interface IStatementLogic
{
    public Task<ServiceResponse> Upload(int userId, string statementText);
    public Task<ServiceResponse> UploadStatement(int userId, IFormFile file);
    public ServiceResponse Accept(int userId, SaveTransactionsDto dto);
    public ServiceResponse GetStatements(int userId);
}
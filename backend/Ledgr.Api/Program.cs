using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Ledgr.BusinessLogic;
using Ledgr.DataAccess.Context;

DotNetEnv.Env.Load("../../.env");

var builder = WebApplication.CreateBuilder(args);

var secret = Environment.GetEnvironmentVariable("JWT_SECRET")
             ?? throw new Exception("JWT_SECRET missing");

var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "Ledgr";
var audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "Ledgr";

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = issuer,
            ValidAudience = audience,

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(secret))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<BusinessLogic>();

builder.Services.AddHttpClient<BusinessLogic>(client =>
{
    var pythonServiceUrl =
        builder.Configuration["PythonServiceUrl"]
        ?? "http://localhost:8000/";

    client.BaseAddress = new Uri(pythonServiceUrl);
});


builder.Services.AddDbContext<LedgrDbContext>(options =>
    options.UseNpgsql(Environment.GetEnvironmentVariable("DEFAULT_CONNECTION")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<LedgrDbContext>();
    // Applies any pending migrations or creates the database if it doesn't exist
    dbContext.Database.Migrate(); 
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("FrontendPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
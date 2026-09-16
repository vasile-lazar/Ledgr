FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY Ledgr.Api/Ledgr.Api.csproj Ledgr.Api/
COPY Ledgr.BusinessLogic/Ledgr.BusinessLogic.csproj Ledgr.BusinessLogic/
COPY Ledgr.DataAccess/Ledgr.DataAccess.csproj Ledgr.DataAccess/
COPY Ledgr.Domain/Ledgr.Domain.csproj Ledgr.Domain/

RUN dotnet restore Ledgr.Api/Ledgr.Api.csproj

COPY Ledgr.Api/ Ledgr.Api/
COPY Ledgr.BusinessLogic/ Ledgr.BusinessLogic/
COPY Ledgr.DataAccess/ Ledgr.DataAccess/
COPY Ledgr.Domain/ Ledgr.Domain/

RUN dotnet publish Ledgr.Api/Ledgr.Api.csproj \
    -c Release \
    -o /app


FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime

WORKDIR /app

COPY --from=build /app .

EXPOSE 5134

ENV ASPNETCORE_URLS=http://+:5134

ENTRYPOINT ["dotnet", "Ledgr.Api.dll"]
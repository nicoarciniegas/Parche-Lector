# Parche Lector Backend

Backend API for Parche Lector application built with Spring Boot 3 and Java 17.

## Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Java Version**: 17
- **Build Tool**: Maven
- **Database**: PostgreSQL
- **Dependencies**: Spring Web, Spring Data JPA, Thymeleaf, Lombok, PostgreSQL Driver

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── parchelector/
│   │   │           ├── ParcheLectorApplication.java
│   │   │           ├── controller/     # RestControllers
│   │   │           ├── service/        # Service interfaces
│   │   │           ├── service/impl/    # ServiceImpl classes
│   │   │           ├── repository/     # Repository interfaces
│   │   │           ├── entity/         # Entity classes
│   │   │           ├── dto/            # Data Transfer Objects
│   │   │           └── exception/      # Exception handlers
│   │   └── resources/
│   │       └── application.yml
│   └── test/
│       └── java/
└── pom.xml
```

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+

### Setup

1. Clone the repository
2. Configure PostgreSQL database:
   - Create database: `parchelector`
   - Update `application.yml` with your database credentials

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## API Documentation

Once the application is running, access:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- API Docs: `http://localhost:8080/api-docs`

## Development Guidelines

Please refer to `.cursorrules` file for detailed development guidelines including:
- SOLID, DRY, KISS, YAGNI principles
- OWASP best practices
- Architecture patterns
- Code style and documentation standards


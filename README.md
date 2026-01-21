# Recipe Management API

A full-stack Recipe Management System built with **Spring Boot 3.1.5** and **Java 17**, featuring RESTful APIs and a responsive frontend interface.

## Features

### Backend (Spring Boot 3.1.5 with Java 17)
- ✅ Full CRUD operations for recipes
- ✅ RESTful API endpoints following best practices
- ✅ JPA/Hibernate for data persistence
- ✅ H2 in-memory database for development
- ✅ Input validation with Bean Validation
- ✅ Global exception handling
- ✅ Search functionality by recipe name
- ✅ Filter by category
- ✅ CORS enabled for frontend integration

### Frontend (HTML/CSS/JavaScript)
- ✅ Responsive design with modern UI
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Search recipes by name
- ✅ Form validation
- ✅ Error handling with user notifications
- ✅ Real-time updates

## Technology Stack

- **Backend**: Spring Boot 3.1.5, Java 17
- **Database**: H2 (in-memory)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Build Tool**: Maven
- **API**: RESTful

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Sangamithra-J01/112822104064-TJSEC.git
cd 112822104064-TJSEC
```

### 2. Build the project
```bash
mvn clean install
```

### 3. Run the application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 4. Access the application
- **Frontend**: Open `http://localhost:8080/index.html` in your browser
- **H2 Console**: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:recipedb`
  - Username: `sa`
  - Password: (leave empty)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/{id}` | Get recipe by ID |
| POST | `/api/recipes` | Create new recipe |
| PUT | `/api/recipes/{id}` | Update recipe |
| DELETE | `/api/recipes/{id}` | Delete recipe |
| GET | `/api/recipes/search?name={name}` | Search recipes by name |
| GET | `/api/recipes/category/{category}` | Get recipes by category |

## Recipe Model

```json
{
  "id": 1,
  "name": "Chocolate Cake",
  "category": "Dessert",
  "servings": 8,
  "prepTime": 30,
  "cookTime": 45,
  "ingredients": "2 cups flour\n1 cup sugar\n3 eggs\n1 cup milk",
  "instructions": "1. Mix dry ingredients\n2. Add wet ingredients\n3. Bake at 350°F"
}
```

## Validation Rules

- **Name**: Required, 2-100 characters
- **Ingredients**: Required, 10-1000 characters
- **Instructions**: Required, 10-2000 characters
- **prepTime, cookTime, servings**: Optional, must be positive numbers

## Project Structure

```
src/
├── main/
│   ├── java/com/recipe/management/
│   │   ├── RecipeManagementApplication.java
│   │   ├── controller/
│   │   │   └── RecipeController.java
│   │   ├── service/
│   │   │   └── RecipeService.java
│   │   ├── repository/
│   │   │   └── RecipeRepository.java
│   │   ├── model/
│   │   │   └── Recipe.java
│   │   └── exception/
│   │       ├── ResourceNotFoundException.java
│   │       └── GlobalExceptionHandler.java
│   └── resources/
│       ├── application.properties
│       └── static/
│           ├── index.html
│           ├── css/styles.css
│           └── js/app.js
└── test/
    └── java/com/recipe/management/
```

## Development Highlights

- **Modern Java Standards**: Uses Java 17 features and best practices
- **Clean Architecture**: Separation of concerns with layered architecture
- **Error Handling**: Comprehensive exception handling with meaningful error messages
- **Validation**: Input validation at both frontend and backend levels
- **Scalability**: Designed for easy extension and maintenance
- **RESTful Design**: Follows REST API conventions

## Testing

Run tests using:
```bash
mvn test
```

## Future Enhancements

- Add user authentication and authorization
- Implement image upload for recipes
- Add recipe ratings and reviews
- Export recipes to PDF
- Share recipes via social media
- Advanced search with multiple filters

## License

This project is part of an assessment and is available for educational purposes.

## Author

Sangamithra J - 112822104064
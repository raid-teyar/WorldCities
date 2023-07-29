# World Cities and Countries Management Web Application

This web application is a personal project designed to manage a database of World Cities and Countries. Authenticated users have the privilege to add and edit cities, while unauthenticated users can browse the database. Here is an overview of its key features and technologies used:

## Features

- **Authentication and Authorization**: Users can log in to access the application's privileged features. JWT (JSON Web Token) authentication is used to secure the API endpoints, and route guards ensure that only authorized users can access certain routes.

- **Database Code-First Data Modeling**: The application adopts the code-first approach for data modeling. This means that the database schema is automatically generated based on the application's entity models.

- **Entity Framework**: The application leverages Entity Framework as an Object-Relational Mapping (ORM) tool to interact with the underlying database.

- **Angular Material UI**: The user interface is built using Angular Material, which provides a set of pre-designed components for a modern and responsive UI.

- **Paging, Sorting, and Filtering**: The application supports paging, sorting, and filtering functionalities to efficiently manage large datasets and enhance user experience. 																													
It also uses debouncing to ensure real time search performance.

- **Angular Reactive Forms**: Reactive Forms are used to create dynamic and data-driven forms, providing enhanced control over form validation and user input handling.

- **Client-Side and Server-Side Validation**: The application implements sync validators for client-side validation and async custom validators for server-side validation to ensure data integrity and security.

- **Reactive Programming with RxJS**: Reactive Extensions for JavaScript (RxJS) is utilized to handle asynchronous operations and manage data streams efficiently.

- **Progressive Web App (PWA)**: The application is designed as a Progressive Web App, enabling users to install and use it on their devices. It includes a service worker to support offline mode, allowing users to access the app even with limited internet connectivity.

- **GraphQL Integration**: Some functionalities are implemented using GraphQL, which provides a flexible and efficient approach for data querying.

## Setting up the Application

Before running the Angular App, make sure to call the endpoints in the SeedController to populate the database with the necessary data.

### Backend (ASP.NET REST Web API)

1. Navigate to the `WorldCities.API` directory.
2. Set up the necessary database connection string in the `appsettings.json` file.
3. Run the migration commands to create the database and seed initial data:
   ```
   dotnet ef database update
   ```
4. Start the ASP.NET Web API by running the following command:
   ```
   dotnet run
   ```

### Frontend (Angular)

1. Navigate to the `WorldCities.UI` directory.
2. Install the required dependencies using npm:
   ```
   npm install
   ```
3. Build and serve the Angular app:
   ```
   ng serve
   ```

The application should now be accessible at `http://localhost:4200/`.

## Unit Tests

Both the ASP.NET backend and the Angular frontend have unit tests to ensure code quality and functionality. To run the tests:

### Backend Tests

1. Navigate to the `WorldCities.Test` directory.
2. Run the following command to execute the tests:
   ```
   dotnet test
   ```

### Frontend Tests

1. Navigate to the `WorldCities.UI` directory.
2. Run the following command to execute the tests:
   ```
   ng test
   ```

## Contributions

Contributions to this project are welcome. If you find any issues or want to enhance the application, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).



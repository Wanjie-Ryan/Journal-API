## Documentation for Backend Server

### Overview

This backend server is built using Node.js and MySQL, utilizing Sequelize for database operations. The server is designed to run locally on your machine, as it has not been hosted on any external platforms.

### Project Structure

- **app.js:** The main entry point of the backend server.
- **models/:** Contains Sequelize models for defining database tables and relationships.
- **routes/:** Contains API route handlers for different endpoints.
- **connection/:** Configuration files, including database configuration.
- **.env:** Environment variables file for storing sensitive information.
- **middleware/:** Contains the JWT Middleware for Authentication.

### Using Sequelize with MySQL

Sequelize is used for ORM (Object-Relational Mapping) to interact with MySQL. When you clone the backend repository and run `npm install`, Sequelize migrations will handle the creation of necessary tables in your MySQL database. This is facilitated by Sequelize's migration and model definition capabilities, ensuring that tables are created based on the models defined in the `models/` folder.

### Setting Up the Backend

#### Step 1: Clone the Project

Clone the backend project from the public GitHub repository. Open your terminal and execute the following command:

```sh
git clone <repository-url>
```

#### Step 2: Navigate to the Project Directory

Change your directory to the project folder:

```sh
cd <project-directory>
```

#### Step 3: Install Dependencies

Install all required dependencies using npm:

```sh
npm install
```

#### Step 4: Configure Environment Variables

Update the `.env` file with your local MySQL database details. Replace the placeholders with your MySQL database credentials:

```dotenv
DB_NAME=journal
DB_USER=
DB_PASS=
DB_HOST=
DB_DIALECT=mysql
```

#### Step 5: Run the Backend Server

Start the backend server by running:

```sh
npm start
```

This command will start the Node.js server locally on your machine.

### Additional Notes

- **Sequelize Migration:** Sequelize migrations allow for automatic creation of database tables based on defined models. This simplifies setup for new users, as tables will be created automatically upon starting the server.
- **Environment Variables:** Ensure that your `.env` file is correctly configured with your local MySQL database details before starting the server.
- **Running the Frontend:** For the frontend to interact with the backend, ensure that the backend server is running and accessible. Update any frontend API calls to use your local IP address and port configured in the backend server.

By following these steps, you should be able to set up and run the backend server locally on your machine. If you encounter any issues or have questions, feel free to reach out for support.

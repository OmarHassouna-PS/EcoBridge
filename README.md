# *EcoBridge*

# Recycling Website - Project README

This repository contains the source code and documentation for the Recycling Website project. The project aims to establish a connection between waste producers and recycling stations, facilitating the sorting and delivery of recyclable materials. The website serves as a platform for waste producers to register their waste and communicate with recycling stations interested in receiving such materials. It also allows recycling stations to search for and request specific types of materials. The project's primary objective is to improve sustainability and reduce waste by creating a streamlined and efficient recycling system.

## Technologies Used

- React.js: A JavaScript library for building user interfaces.
- Node.js: A runtime environment for executing JavaScript code on the server-side.
- Express.js: A fast and minimalist web application framework for Node.js.
- PostgreSQL: A relational database management system for storing and managing data.
- JWT (JSON Web Tokens): A secure method for user authentication and authorization.
- Nodemailer: A module for sending emails from Node.js applications.
- Bootstrap: A CSS framework for creating responsive and visually appealing web interfaces.
- Material UI: A set of React components implementing the Material Design guidelines.

## Key Features

1. User Registration and Authentication: Users can register and authenticate themselves as waste producers or recycling stations.
2. Waste Registration: Waste producers can register their waste materials, providing details such as type, quantity, and location.
3. Material Requests: Recycling stations can search for and request specific types of materials from waste producers.
4. Users' information: Users can modify their information, view their profiles, change their passwords, and request a password reset using e-mail.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/OmarHassouna-PS/EcoBridge`
2. Navigate to the project directory: `cd EcoBridge`
3. Install the dependencies for the front-end and back-end:
   - Front-end: `cd client && npm install`
   - Back-end: `cd server && npm install`
4. Configure the environment variables:
   - Create a `.env` file in the `server` directory.
   - Set the necessary environment variables, such as database connection details and API keys. Refer to the `.env.example` file for the required variables.
5. Start the development server:
   - Front-end: In the `client` directory, run `npm start`.
   - Back-end: In the `server` directory, run `npm start`.
6. Access the application in your browser at `http://localhost:3000`.

## Project Structure

The project follows a client-server architecture:

- The `client` directory contains the front-end code, built with React.js. It handles the user interface and interactions.
- The `server` directory contains the back-end code, implemented with Node.js and Express.js. It handles server-side logic, API endpoints, and database operations. And `models` directory contains the database schema and migration scripts for PostgreSQL.

---

##  [Figma](https://www.figma.com/file/p7mtvfvmEBPY2s6ROiZInf/EcoBridge?type=design&node-id=0-1&mode=design&t=qKSGFys2EFJWghwF-0)

## [Trello](https://trello.com/w/ecobridge2/home)






# User Management Application
This is a simple backend application for managing users, providing CRUD operations (Create, Read, Update, Delete) via RESTful API endpoints. The application is built using TypeScript, Node.js, and Express.js.

## Prerequisites
Before running this project, ensure you have the following installed on your system:
Node.js(mine is v20.11.1)
npm (mine is v10.2.4): Comes with Node.js installation
TypeScript Compiler (mine is v5.7.2)
For testing purposes I used Postman which if you use Linux can be installed:
`snap install postman`

## Installation
1. Clone the repository:
   `git clone https://github.com/harisbikovic/wiline_project.git`
2. avigate to the project directory:
   `cd backend`
3. Install depenedenies:
   `npm install`
4. Compile ts code:
   `tsc `
 
 ## Running the app:
 npm run build
 npm start

## API Endpoints

### GET /users
Fetch all users. Optionally filter by email or phoneNumber.

Example:

using Postman:

"http://localhost:3000/users?email=kip@wiline.com"

### POST /users
Create a new user.

Example:


using Postman:
http://localhost:3000/users

copy-paste the following in the body:

{
  "firstName": "Sirah",
  "lastName": "Civokib",
  "email": "sirah.civokib@example.com",
  "phoneNumber": "387-456-7890"
}

### PUT /users/:id

Update an existing user by their ID.

Example:

using Postamn:

http://localhost:3000/users/1

copy-paste the following in the body:

{
  "firstName": "Kip",
  "lastName": "Kipic",
  "email": "kip@wiline.com",
  "phoneNumber": "222-222-2234"
}

### DELETE /users/:id
Delete a user by their ID.
Example:
using Postman:
http://localhost:3000/users/1

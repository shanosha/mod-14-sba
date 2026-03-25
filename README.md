# Secure Bookmarks API
- Accepts a new user’s credentials and creates a user record in a MongoDB database with a hashed password.
- Accepts a returning user’s credentials, validates them against the stored hash, and issues a JSON Web Token (JWT) upon success.
- Verify's a user's provided JWT token.
- Has full CRUD (Create, Read, Update, Delete) functionality and is protected by authentication middleware, meaning only logged-in users can access the endpoints.
- Allows oAuth login with GitHub.

## Setup
- Clone the repository.
    ```
    git clone https://github.com/shanosha/mod-14-sba.git
    ```
- Navigate to the directory.
    ```
    cd mod-14-sba
    ```
- Install the node packages.
    ```
    npm install
    ```
- Setup your database connection credentials and port in a .env file in the root directory of the project.
    ```
    MONGO_URI = YOUR_DATABASE_CONNECTION_URL_HERE
    PORT = 3000
    JWT_SECRET = anythingyouwant
    GITHUB_CLIENT_ID=
    GITHUB_CLIENT_SECRET=
    GITHUB_CALLBAK_URL=
    ```  
- Run the Express server using nodemon.
    ```
    npm run dev
    ```
- Open the server URL in a browser.

## Testing the Database Connection on the Server
Use a tool like Postman or Thunder Client. Here the three endpoints on this server:
- **Create User:** POST /api/users/register
  - Creates a new user account using the data in req.body.
  - Required properties: username, email, password
- **User Login:** POST /api/users/login
  - Allows existing user to login using the data in req.body.
  - Required properties: email, password
- **Create Bookmark:** POST /
  - Creates a new bookmark using the data in req.body.
  - Required JSON Properties: title, content
  - Requires: JWT token in a Bearer header
- **Read All Bookmarks:** GET /
  - Retrieves all bookmarks from the database.
  - Requires: JWT token in a Bearer header
- **Read One Bookmark:** GET /:id
  - Retrieves a single bookmark by its _id.
  - Requires: JWT token in a Bearer header
- **Update Bookmark:** PUT /:id
  - Updates a bookmark by its _id using the data in req.body.
  - Requires: JWT token in a Bearer header
- **Delete Bookmark:** DELETE /:id
  - Deletes a bookmark by its _id.
  - Requires: JWT token in a Bearer header
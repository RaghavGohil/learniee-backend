# Go to deployed site
https://learniee-chat-app.netlify.app

# Steps to run backend on localhost
- Create a .env with variables:
  - ```JWT_SECRET``` to store a random secret.
  - ```FRONTEND_URL``` to store the frontend's url.
  - ```PORT``` to give a desired port number.
  - ```MONGODB_URI``` to give the uri of database
- Now run ```npm i``` to install the dependencies.
- Run ```npm start``` to start the server. This will use nodemon to hot reload the server whenever you make a change.

The frontend is hosted on Netlify as specified.
The server is hosted on Render.com.

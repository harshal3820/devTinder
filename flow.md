- Create a repository
- Initialize the repository
- node_modules, package.json, package_lock.json
- Install express
- create a server
- Liste to port 7000
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependancies
- What is use of "-g" while npm install
- Difference between caret and tilde (^ vs ~)


- Initialize git
- .gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and route extensions ex. - /hello, / , /hello/2, /xyz
- order of the routes matter a lot
- Install postman app and make a workspace/collection > test API calls
- write logic to handle GET, POST, PATCH, DELETE API calls and test them on postman
- Explore routing and use of ?, +, (), * in the routes
- USe of regex in routes /a/ , /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes


- Handling multiple route handlers - play with code
- next()
- next function and error along with res.send()
- app.use("/user", rH, [rH2, rH3], rH4, rH5)
- What is middleware? why do we need it
- How express js basically handles the requests behind the scenes
- Difference app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all users routes , except /user/login 
- Error handling using app.use("/",(err,req,res,next)={});


- Create a free cluster on MongoDB official website (mongo atlas)
- Install mongoose library  
- Connect your application to the Database "connection-url"/devTinder
- Call the connectDB function and connect to database before starting application on 7000
- create a userSchema and user model
- create POST /signup API to add data to database
- push some documents using API calls from postman
- Error handling using try, catch

- JS object vs JSON
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from the end user
- API- GET user by Email
- API -Feed API - GET/feed - get all users from the database
- API - Get user by ID
- Create a delete user API
- API- update a user
- Explore the mongoose Documentation for model methods
- What are options ina  model.findOneAndUpdate method, explore more about it
- API - Update the user with email Id

- Explore schematypes options from the documentation
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropirate validations on each field in schema
- Add timestamps to the userSchema
- Add API level validations on patch request & signup post API
- DATA SANITIZATION - Add API validation for each field


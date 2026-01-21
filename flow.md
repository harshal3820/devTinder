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
- install validator
- explore validator library functions and use it for email, password, photoUrl
- Never Trust req.body

- Validate data in SignUp API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user as incrupted password
- Create login API
- compare passwords and throw errors if email or password is invalid


- install cookie-parser
- just send a dummy cookie to user
- create GET/profile API and check if you get the cookie back
- install jsonwebtoken
- In login API, after email and password validation, create a JWT token and send it to user in cookie
- read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middleware in profile API and new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- create userSchema methods to getJWT()
- create userSchema methods comparepassword(passwordInputByUser)

- Explore tinder APIs
- Create a list of all API you can think of in Dev tinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- create post /logout API
- create PATCH /profile/edit
- create PATCH  /profilr/edit/password => forgot password API


# Deployment

- Signup on AWS 
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
- Install Node version 16.17.0
- Git clone
- Frontend    
    - npm install  -> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance
- Backend
    - updated DB password
    - allowed ec2 instance public IP on mongodb server
    - npm intsall pm2 -g
    - pm2 start npm --name "devTinder-backend" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"


# Nginx config

    Frontend = http://43.204.96.49/
    Backend = http://43.204.96.49:7777/

    Domain name = devtinder.com => 43.204.96.49

    Frontend = devtinder.com
    Backend = devtinder.com:7777 => devtinder.com/api

    nginx config : 

    server_name 43.204.96.49;

    location /api/ {
        proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }


# Adding a custom Domain name

- purchased domain name from godaddy
- signup on cloudflare & add a new domain name
- change the nameservers on godaddy and point it to cloudflare
- wait for sometime till your nameservers are updated ~15 minutes
- DNS record: A devtinder.in 43.204.96.49
- Enable SSL for website 


# Sending Emails via SES

- Create a IAM user
- Give Access to AmazonSESFullAccess
- Amazon SES: Create an Identity
- Verify your domain name
- Verify an email address identity
- Install AWS SDK - v3 
- Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- Setup SesClient
- Access Credentials should be created in IAm under SecurityCredentials Tab
- Add the credentials to the env file
- Write code for SESClient
- Write code for Sending email address
- Make the email dynamic by passing more params to the run function
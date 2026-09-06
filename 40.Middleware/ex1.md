🧪 Express Middleware Practice — Mini Secret API

Build a small Express server to practice the structure and syntax of Express middleware.

The goal is to use middleware, route-specific middleware, Morgan, query parameters, next(), and a 404 handler without copying a solution.

🎯 Objective

Create an Express server with these routes:

GET  /
GET  /about
GET  /secret
GET  /admin
GET  /users

You will also need middleware for:

Request logging
Adding request time
Password authentication
Admin authentication
Handling unknown routes
1. Set Up Express

Create a basic Express server.

You should:

Import express
Create an Express application
Start the server on port 3000
Print a message when the server starts
2. Add Morgan Logger

Install and use Morgan.

Your server should log every incoming request.

For example:

GET /about 200
GET /secret 200
GET /random 404

Use Morgan's "dev" format.

Goal

Understand how:

app.use(...)

can apply middleware to all incoming requests.

3. Create Your Own Logger Middleware

Create a middleware function called:

logger

It should print:

A request was received!

every time a request arrives.

Requirements

Your middleware must:

Receive req
Receive res
Receive next
Call next()

Think about:

What happens if you forget to call next()?

4. Create a Request-Time Middleware

Create another middleware called:

addTime

This middleware should add the current time to the request object.

For example:

req.requestTime

should contain the current date/time.

Then /about should be able to access that value.

Expected response:

About page

Request received at: <current time>
Goal

Practice adding your own properties to the req object inside middleware and accessing them later.

5. Create a Password Middleware

Create a middleware called:

checkPassword

The /secret route should require a password.

The password will be provided through the query string:

/secret?password=1234

Choose your own password.

Correct Password

Return:

Access granted
Incorrect Password

Return:

Access denied
Important

The password middleware should apply only to /secret.

You should practice the structure:

app.get()
    ↓
middleware
    ↓
route handler

rather than applying the middleware globally.

6. Create an Admin Middleware

Create another middleware called:

isAdmin

The /admin route should check whether the user is an admin.

Use a query parameter like:

/admin?admin=true
If Admin

Return:

Welcome Admin
Otherwise

Return:

You are not an admin

This middleware should apply only to /admin.

7. Create the /users Route

Create:

GET /users

It can simply return:

List of users

This route does not need authentication.

8. Create a 404 Middleware

If someone requests a route that doesn't exist:

/random

your server should return:

404 - Page not found

Create this using middleware.

Important

The 404 middleware should come after all your routes.

Think carefully about why the order matters.

🧩 Required Structure

Your application should roughly follow this flow:

Incoming Request
       ↓
Morgan Middleware
       ↓
Custom Logger Middleware
       ↓
Request-Time Middleware
       ↓
       ├── GET /
       ├── GET /about
       ├── GET /users
       ├── GET /secret
       │       ↓
       │   checkPassword
       │       ↓
       │   Route Handler
       │
       └── GET /admin
               ↓
           isAdmin
               ↓
           Route Handler
       ↓
404 Middleware
🧠 Concepts You Should Practice

Make sure your implementation uses all of these.

Express
express()
app.listen()
app.get()
app.use()
Middleware
req
res
next
Custom middleware functions
Global middleware
Route-specific middleware
Middleware ordering
Request
Query parameters
Adding custom properties to req
Response
Sending responses with res
Morgan
Installing Morgan
Using Morgan as middleware
404 Handling
404 middleware
Placing the 404 middleware after your routes
🧪 Things to Test

Once you've finished, test all of these.

Normal Route
/
Route Using Request Time
/about
Users
/users
Secret — Correct Password
/secret?password=YOUR_PASSWORD
Secret — Incorrect Password
/secret?password=wrong
Admin — Admin
/admin?admin=true
Admin — Not Admin
/admin?admin=false
Non-existent Route
/random
🔥 Challenge Questions

After completing the exercise, answer these without looking at your code:

What is the difference between app.use() and app.get()?
Why does middleware need next()?
What happens if middleware doesn't call next() and doesn't send a response?
Why can we add something like req.requestTime?
How do we access password from:
/secret?password=1234
Why is checkPassword placed between app.get() and the route handler?
Why shouldn't checkPassword be registered globally?
Why must the 404 middleware come after the routes?
If you put the 404 middleware before /about, what would happen when /about is requested?
What is the execution order when requesting:
GET /secret?password=1234

Trace the request from the moment it enters the server until the response is sent.

🎯 Goal

Don't worry about making the project complicated.

The main goal is to become comfortable with this pattern:

Request
   ↓
Middleware
   ↓
Middleware
   ↓
Route-Specific Middleware
   ↓
Route Handler
   ↓
Response
# 🧪 Mongoose User Management API — Coding Exercise

Build a small **User Management API** using:

* Node.js
* Express
* MongoDB
* Mongoose

The goal is to implement and practice the complete Mongoose section, including:

* Connecting to MongoDB
* Schemas and Models
* CRUD operations
* Query operators
* Schema validation
* Custom validation
* Update validation
* Validation errors
* Instance methods
* Static methods
* Virtuals
* Middleware

---

# 1. Setup

Create the following project:

```text
mongoose-practice/
│
├── app.js
├── models/
│   └── User.js
└── package.json
```

Install:

```bash
npm init -y
npm install express mongoose
```

Run MongoDB locally.

Use this database:

```text
mongodb://127.0.0.1:27017/mongoosePractice
```

---

# 2. Create the User Schema

Create a `User` schema containing:

```text
name
email
age
password
role
isActive
createdAt
username
firstName
lastName
```

## `name`

* String
* Required
* Trimmed
* Minimum length: 2
* Maximum length: 30

## `email`

* String
* Required
* Lowercase
* Unique

## `age`

* Number
* Required
* Minimum: 18
* Maximum: 100

## `password`

* String
* Required
* Minimum length: 8

## `role`

Only allow:

```text
"user"
"admin"
```

Default:

```text
"user"
```

## `isActive`

Boolean.

Default:

```text
true
```

## `createdAt`

Date.

Default:

```js
Date.now
```

---

# 3. Create the Model

Create:

```js
const User = mongoose.model("User", userSchema);
```

Understand the relationship:

```text
Schema
   ↓
Model
   ↓
Documents
   ↓
MongoDB
```

---

# 4. Create a User

Create:

```http
POST /users
```

Accept:

```json
{
    "name": "John",
    "email": "JOHN@GMAIL.COM",
    "age": 22,
    "password": "password123"
}
```

Create the user using:

```js
User.create()
```

Return the created user using:

```js
res.json(...)
```

### Verify

Make sure:

* Email becomes lowercase.
* `role` defaults to `"user"`.
* `isActive` defaults to `true`.
* `createdAt` is automatically generated.

---

# 5. Insert Many Users

Create:

```http
POST /users/many
```

Insert at least **5 users** using:

```js
User.insertMany()
```

Use different:

* Names
* Ages
* Roles
* Emails

Example users:

```text
John
Alice
Bob
David
Sarah
```

---

# 6. Find All Users

Create:

```http
GET /users
```

Return all users.

You must use:

```js
User.find()
```

---

# 7. Find One User

Create:

```http
GET /users/email/:email
```

Example:

```http
GET /users/email/john@gmail.com
```

Use:

```js
User.findOne()
```

---

# 8. Find User By ID

Create:

```http
GET /users/:id
```

Use:

```js
User.findById()
```

Then answer:

> What is returned by `findById()`?

Remember:

```text
MongoDB
   ↓
Mongoose
   ↓
Mongoose Document
   ↓
res.json()
   ↓
JSON HTTP response
```

The value returned by `findById()` is not literally a JSON file.

---

# 9. Query Operators

Create:

```http
GET /users/adults
```

Return users whose age is greater than or equal to 18.

Use:

```js
$gte
```

---

Create:

```http
GET /users/young
```

Return users whose age is less than 30.

Use:

```js
$lt
```

---

Create:

```http
GET /users/admins
```

Use:

```js
$in
```

to query users based on their roles.

Also practice:

```text
$gt
$gte
$lt
$lte
$ne
$in
```

---

# 10. Update One User

Create:

```http
PATCH /users/email/:email
```

Update the user's age.

Example:

```http
PATCH /users/email/john@gmail.com
```

Body:

```json
{
    "age": 25
}
```

Use:

```js
User.updateOne()
```

---

# 11. Update Many Users

Create:

```http
PATCH /users/deactivate
```

Deactivate every user whose role is:

```text
"user"
```

Use:

```js
User.updateMany()
```

and:

```js
$set
```

---

# 12. Find By ID And Update

Create:

```http
PATCH /users/:id
```

Use:

```js
User.findByIdAndUpdate()
```

You **must** use:

```js
{
    new: true,
    runValidators: true
}
```

Test it with:

```json
{
    "age": 10
}
```

The request should fail because:

```text
age >= 18
```

---

# 13. Validation Error Handling

Send an intentionally invalid request:

```json
{
    "email": "wrong@gmail.com",
    "age": 10,
    "password": "123"
}
```

Expected validation problems:

```text
name
  → missing

age
  → below minimum

password
  → too short
```

Catch:

```js
if (err.name === "ValidationError") {
    // ...
}
```

Use:

```js
err.errors
```

to extract individual validation errors.

Return something similar to:

```json
{
    "error": "Validation failed",
    "fields": {
        "name": "...",
        "age": "...",
        "password": "..."
    }
}
```

---

# 14. Custom Validation

Add:

```text
username
```

The username may contain **only letters and numbers**.

### Valid

```text
john123
alice99
Bob42
```

### Invalid

```text
john@
alice!
hello world
```

Implement this using:

```js
validate: {
    validator: function(value) {
        // your validation
    },

    message: "..."
}
```

Do not use a package.

---

# 15. Instance Method — `isAdult()`

Create:

```js
userSchema.methods.isAdult = function() {
    // your code
};
```

It should return:

```text
true
```

when:

```text
age >= 18
```

Create:

```http
GET /users/:id/adult
```

Inside the route:

```js
const user = await User.findById(req.params.id);

user.isAdult();
```

Understand:

```text
User
 ↓
Document
 ↓
document.isAdult()
```

NOT:

```js
User.isAdult()
```

---

# 16. Instance Method — `getSummary()`

Create:

```js
userSchema.methods.getSummary = function() {
    // your code
};
```

It should return something like:

```text
"John is a 22 year old user"
```

Create:

```http
GET /users/:id/summary
```

and use the instance method.

---

# 17. Static Method — `findAdmins()`

Create:

```js
userSchema.statics.findAdmins = function() {
    // your code
};
```

It should return all admin users.

Create:

```http
GET /admins
```

and call:

```js
User.findAdmins()
```

Understand the difference:

```text
INSTANCE METHOD

user.isAdult()


STATIC METHOD

User.findAdmins()
```

---

# 18. Virtual — `fullName`

Use:

```text
firstName
lastName
```

Create:

```js
userSchema.virtual("fullName")
```

It should return:

```text
John Doe
```

when:

```js
user.fullName
```

is accessed.

### Important

Check MongoDB directly.

Ask:

> Does `fullName` exist as a stored field?

It should **not**.

A virtual is a calculated property.

---

# 19. Virtual Setter

Make this work:

```js
user.fullName = "John Doe";
```

It should automatically set:

```js
user.firstName = "John";
user.lastName = "Doe";
```

Use:

```js
userSchema.virtual("fullName")
    .get(...)
    .set(...);
```

---

# 20. Save Middleware

Create a `pre("save")` middleware:

```js
userSchema.pre("save", function(next) {

    console.log("About to save user");

    next();

});
```

Create a `post("save")` middleware:

```js
userSchema.post("save", function(doc, next) {

    console.log("User saved:", doc.name);

    next();

});
```

Create a user.

You should see:

```text
About to save user
User saved: John
```

---

# 21. Query Middleware

Create:

```js
userSchema.pre("find", function(next) {

    // your code

    next();

});
```

Make it automatically filter for:

```js
{
    isActive: true
}
```

Therefore:

```js
User.find()
```

should effectively behave like:

```js
User.find({
    isActive: true
})
```

without manually adding the filter every time.

---

# 22. Delete Operations

Create:

```http
DELETE /users/:id
```

Use:

```js
User.findByIdAndDelete()
```

---

Create:

```http
DELETE /users/inactive
```

Delete all inactive users using:

```js
User.deleteMany()
```

---

# 🔥 Final Challenge

Once you've completed everything, **remove your notes** and rebuild the important parts from memory.

Your final API should contain:

```text
POST    /users
POST    /users/many

GET     /users
GET     /users/:id
GET     /users/email/:email
GET     /users/adults
GET     /users/admins

PATCH   /users/email/:email
PATCH   /users/deactivate
PATCH   /users/:id

DELETE  /users/:id
DELETE  /users/inactive

GET     /users/:id/adult
GET     /users/:id/summary
```

---

# ✅ Mongoose Concepts Checklist

## Connection & Structure

* [ ] `mongoose.connect()`
* [ ] Schema
* [ ] Model
* [ ] Document

## Create

* [ ] `new Model()`
* [ ] `.save()`
* [ ] `Model.create()`
* [ ] `Model.insertMany()`

## Read

* [ ] `find()`
* [ ] `findOne()`
* [ ] `findById()`

## Query Operators

* [ ] `$gt`
* [ ] `$gte`
* [ ] `$lt`
* [ ] `$lte`
* [ ] `$ne`
* [ ] `$in`

## Update

* [ ] `updateOne()`
* [ ] `updateMany()`
* [ ] `findOneAndUpdate()`
* [ ] `findByIdAndUpdate()`
* [ ] `$set`
* [ ] `new: true`
* [ ] `runValidators: true`

## Delete

* [ ] `deleteOne()`
* [ ] `deleteMany()`
* [ ] `findByIdAndDelete()`

## Validation

* [ ] `required`
* [ ] `trim`
* [ ] `minlength`
* [ ] `maxlength`
* [ ] `min`
* [ ] `max`
* [ ] `enum`
* [ ] `default`
* [ ] `unique`
* [ ] Custom `validate`
* [ ] `ValidationError`
* [ ] `err.errors`

## Methods

* [ ] Instance methods
* [ ] Static methods

## Virtuals

* [ ] Virtual getter
* [ ] Virtual setter

## Middleware

* [ ] `pre("save")`
* [ ] `post("save")`
* [ ] `pre("find")`

---

# 🎯 Completion Goal

You are **done with this exercise** when you can build the core Mongoose code without looking at your notes and explain:

```text
Schema
   ↓
Model
   ↓
Document
   ↓
MongoDB
```

and:

```text
Instance Method
    ↓
document.method()


Static Method
    ↓
Model.method()


Virtual
    ↓
Calculated property
    ↓
Not stored in MongoDB


Middleware
    ↓
Runs before/after an operation
```

The point is **not** to memorize every Mongoose method. The point is to understand what each layer does and be able to use it when building an Express backend.

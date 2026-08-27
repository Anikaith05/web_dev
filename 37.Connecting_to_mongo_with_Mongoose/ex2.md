# 🧪 Mongoose Practice — Exercise 2: Blog API

You already practiced the **individual Mongoose features** in Exercise 1.

This exercise is about **combining them into a small real-world API**.

The important difference:

> **Ex1:** "Use this Mongoose feature here."
> **Ex2:** "Figure out which Mongoose feature you need."

---

# 1. Setup

Create:

```text
mongoose-blog/
│
├── app.js
├── models/
│   ├── User.js
│   └── Post.js
└── package.json
```

Use:

```text
mongodb://127.0.0.1:27017/mongooseBlog
```

---

# 2. User Schema

Create a `User` schema with:

```text
name
email
username
age
role
isActive
createdAt
```

Requirements:

* `name`: required, trimmed, 2–30 characters
* `email`: required, lowercase, unique
* `username`: required, unique, only letters/numbers
* `age`: 18–100
* `role`: `"user"` or `"admin"`, default `"user"`
* `isActive`: default `true`
* `createdAt`: default `Date.now`

Create the model.

---

# 3. Post Schema

Create a `Post` schema with:

```text
title
content
author
category
tags
likes
isPublished
createdAt
updatedAt
```

Requirements:

* `title`: required, 5–100 characters
* `content`: required, minimum 20 characters
* `category`: `"technology"`, `"programming"`, `"career"`, `"other"`
* `tags`: array of strings
* `likes`: default `0`
* `isPublished`: default `false`
* `createdAt`: automatically generated
* `updatedAt`: automatically updated

### Author

`author` must reference the User:

```js
type: mongoose.Schema.Types.ObjectId,
ref: "User"
```

---

# 4. User API

Implement:

```text
POST /users
GET  /users
GET  /users/:id
```

### POST `/users`

Create a user.

Test your validation with invalid data.

### GET `/users`

Return all users.

### GET `/users/:id`

Return one user.

Handle:

* Invalid ID
* User not found

---

# 5. Post API

Implement:

```text
POST /posts
GET  /posts
GET  /posts/:id
PATCH /posts/:id
DELETE /posts/:id
```

### POST `/posts`

Create a post.

The request should contain the author's User ID.

### GET `/posts`

Return posts with the **author populated**.

You should see something like:

```json
{
  "title": "Learning Mongoose",
  "author": {
    "name": "John",
    "username": "john123"
  }
}
```

### PATCH `/posts/:id`

Allow updating:

```text
title
content
category
tags
```

Do not allow changing:

```text
author
likes
createdAt
```

Make sure validation runs during the update.

### DELETE `/posts/:id`

Delete the post.

---

# 6. Queries

Add:

```text
GET /posts/category/:category
GET /users/:id/posts
GET /posts/search?q=mongo
```

### Category

Return posts belonging to a category.

### User Posts

Return all posts written by a particular user.

### Search

Search `title` and `content`.

The search should be **case-insensitive**.

---

# 7. Like a Post

Add:

```text
PATCH /posts/:id/like
```

Every request should increase:

```text
likes
```

by `1`.

Use the appropriate MongoDB update operator.

---

# 8. Instance Method

Add:

```js
postSchema.methods.publish = function() {
    // ...
};
```

It should publish the post and save it.

Create:

```text
PATCH /posts/:id/publish
```

Use:

```js
post.publish()
```

---

# 9. Static Method

Add:

```js
postSchema.statics.findPublished = function() {
    // ...
};
```

Create:

```text
GET /published-posts
```

Use:

```js
Post.findPublished()
```

---

# 10. Virtual

Create:

```text
summary
```

The virtual should return the first **100 characters** of the post content.

This should work:

```js
post.summary
```

Check MongoDB directly and verify that `summary` is **not stored**.

---

# 11. Middleware

Add:

### Save middleware

When a post is saved:

```text
updatedAt
```

should be updated.

Also print:

```text
Post saved: <title>
```

### Query middleware

Make normal:

```js
Post.find()
```

return only published posts.

Then create:

```text
GET /posts/all
```

which returns both published and unpublished posts.

Figure out how to bypass your middleware for this route.

---

# 12. Validation Errors

Handle Mongoose `ValidationError`.

For example:

```json
{
  "title": "Hi",
  "content": "short"
}
```

should return useful field-level errors instead of the raw Mongoose error.

Expected shape:

```json
{
  "error": "Validation failed",
  "fields": {
    "title": "...",
    "content": "..."
  }
}
```

---

# 🔥 Final Challenge

Without looking at your notes, implement:

```text
GET /posts/:id/details
```

It should return:

```json
{
  "title": "Learning Mongoose",
  "author": {
    "name": "John",
    "username": "john123"
  },
  "likes": 10,
  "summary": "First 100 characters...",
  "isPublished": true
}
```

You must use the appropriate combination of:

```text
References
populate()
Virtuals
Queries
```

---

# ✅ Concepts You Should Be Able To Use

Before finishing, make sure you've used:

```text
[ ] ObjectId references
[ ] populate()
[ ] find()
[ ] findOne()
[ ] findById()
[ ] updateOne() / findByIdAndUpdate()
[ ] delete
[ ] $gte / $lte / $in
[ ] $set
[ ] $inc
[ ] runValidators
[ ] ValidationError
[ ] Instance method
[ ] Static method
[ ] Virtual
[ ] pre("save")
[ ] pre("find")
```

# 🎯 Completion Goal

After Ex2, you should be able to look at a backend requirement and think:

```text
"Which Mongoose feature should I use here?"
```

rather than:

```text
"What syntax did the exercise tell me to use?"
```

That's the main purpose of Exercise 2.

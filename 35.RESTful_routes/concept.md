# 🌐 Defining RESTful Routes with Express — Complete Revision README

> Learn how to build a RESTful CRUD application using **Express**, forms, request bodies, redirects, UUIDs, method override, and REST conventions.

---

# 🗺️ Big Picture

A RESTful app organizes routes around a **resource**.

For this section, the resource is:

```text
comments
```

```text
User action
    ↓
HTTP request
    ↓
Express route
    ↓
Read / create / update / delete data
    ↓
Send response or redirect
```

---

# 🧠 1. GET vs POST Requests

## `GET`

Use `GET` when the client wants to **retrieve/read data**.

```text
GET /comments
```

Meaning:

```text
"Give me all comments"
```

Examples:

```js
app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/comments", (req, res) => {
    res.send("All comments");
});
```

Common uses:

- Visiting a webpage
- Viewing all posts
- Viewing one profile
- Searching for something
- Showing a form

---

## `POST`

Use `POST` when the client wants to **send/create data**.

```text
POST /comments
```

Meaning:

```text
"Create a new comment"
```

Example:

```js
app.post("/comments", (req, res) => {
    res.send("Creating a new comment");
});
```

Common uses:

- Submitting a form
- Creating a comment
- Creating an account
- Logging in
- Uploading data

---

## GET vs POST Summary

| Feature | GET | POST |
|---|---|---|
| Main purpose | Retrieve data | Send/create data |
| Data location | Usually URL query string | Request body |
| Changes server data? | Usually no | Usually yes |
| Example | `GET /comments` | `POST /comments` |
| Used for forms? | Showing forms | Submitting forms |

```text
GET  → "Show me something"
POST → "Create/send something"
```

---

# ⚙️ 2. Defining Express POST Routes

A `POST` route uses:

```js
app.post(path, callback);
```

Example:

```js
app.post("/comments", (req, res) => {
    res.send("POST request received");
});
```

## Important

This route:

```js
app.get("/comments", ...);
```

and this route:

```js
app.post("/comments", ...);
```

can have the **same URL**.

They are different because the HTTP method is different.

```text
GET  /comments → show all comments
POST /comments → create a new comment
```

---

# 📦 3. Parsing the Request Body

When a form sends data using `POST`, the submitted values are placed in:

```js
req.body
```

But Express does not automatically understand that data.

You need middleware.

```js
app.use(express.urlencoded({ extended: true }));
```

For JSON data sent by a frontend or API client:

```js
app.use(express.json());
```

## Typical setup

```js
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```

---

## What each middleware does

```js
app.use(express.urlencoded({ extended: true }));
```

```text
Form data
    ↓
Express parses it
    ↓
Available in req.body
```

```js
app.use(express.json());
```

```text
JSON data
    ↓
Express parses it
    ↓
Available in req.body
```

---

## Example HTML Form

```html
<form action="/comments" method="POST">
    <input type="text" name="username" placeholder="Username">
    <textarea name="comment" placeholder="Comment"></textarea>

    <button>Submit</button>
</form>
```

When submitted:

```text
POST /comments
```

Express receives:

```js
req.body = {
    username: "anikaith",
    comment: "REST is making sense!"
};
```

---

## Example POST Route

```js
app.post("/comments", (req, res) => {
    const { username, comment } = req.body;

    console.log(username);
    console.log(comment);

    res.send("Comment received!");
});
```

---

# 🧭 4. Introduction to REST

REST stands for:

```text
Representational State Transfer
```

REST is a convention for designing routes in a clear and predictable way.

Instead of making random routes like:

```text
/getAllComments
/createComment
/deleteComment
/editComment
```

REST uses:

```text
/comments
/comments/:id
```

and changes the action using the HTTP method.

---

# 🧱 5. RESTful Route Pattern

For a resource named `comments`:

| REST Action | HTTP Method | Route | Purpose |
|---|---|---|---|
| Index | GET | `/comments` | Show all comments |
| New | GET | `/comments/new` | Show form to create a comment |
| Create | POST | `/comments` | Create a new comment |
| Show | GET | `/comments/:id` | Show one comment |
| Edit | GET | `/comments/:id/edit` | Show form to edit a comment |
| Update | PATCH | `/comments/:id` | Update one comment |
| Delete | DELETE | `/comments/:id` | Delete one comment |

---

# 🗺️ RESTful Routes Mind Map

```text
                         💬 COMMENTS RESOURCE
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
         ▼                        ▼                        ▼
      📖 READ                  ➕ CREATE                ✏️ UPDATE
         │                        │                        │
         ├─ GET /comments         ├─ GET /comments/new     ├─ GET /comments/:id/edit
         │  Show all              │  Show form             │  Show edit form
         │                        │                        │
         └─ GET /comments/:id     └─ POST /comments        └─ PATCH /comments/:id
            Show one                 Create comment           Update comment
                                                              
                                  🗑️ DELETE
                                      │
                                      └─ DELETE /comments/:id
                                         Delete one comment
```

---

# 🧾 6. RESTful Comments App Setup

## Install packages

```bash
npm init -y
npm install express ejs uuid method-override
```

## Suggested project structure

```text
project/
│
├── index.js
│
├── views/
│   └── comments/
│       ├── index.ejs
│       ├── new.ejs
│       ├── show.ejs
│       └── edit.ejs
│
└── public/
    └── app.css
```

---

# 🚀 7. Basic Express Setup

## `index.js`

```js
const express = require("express");
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
```

---

# 📚 8. Comments Data

For now, comments are stored in an array.

```js
let comments = [
    {
        id: uuid(),
        username: "anikaith",
        comment: "REST is starting to make sense!"
    },
    {
        id: uuid(),
        username: "colt",
        comment: "Express is powerful."
    },
    {
        id: uuid(),
        username: "sherlock",
        comment: "The game is afoot."
    }
];
```

```text
Later:
comments array → database

For now:
comments array → temporary in-memory data
```

⚠️ Restarting the server resets this array.

---

# 📖 9. INDEX Route — Show All Comments

## Route

```js
app.get("/comments", (req, res) => {
    res.render("comments/index", { comments });
});
```

## Template: `views/comments/index.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Comments</title>
</head>
<body>
    <h1>All Comments</h1>

    <a href="/comments/new">Add New Comment</a>

    <% for (let comment of comments) { %>
        <div>
            <h3><%= comment.username %></h3>
            <p><%= comment.comment %></p>

            <a href="/comments/<%= comment.id %>">
                View Comment
            </a>
        </div>
        <hr>
    <% } %>
</body>
</html>
```

```text
GET /comments
    ↓
Pass comments array to EJS
    ↓
Loop through comments
    ↓
Display every comment
```

---

# ➕ 10. NEW Route — Show the Create Form

## Route

```js
app.get("/comments/new", (req, res) => {
    res.render("comments/new");
});
```

## Template: `views/comments/new.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Comment</title>
</head>
<body>
    <h1>New Comment</h1>

    <form action="/comments" method="POST">
        <label for="username">Username:</label>
        <input
            type="text"
            id="username"
            name="username"
            required
        >

        <br><br>

        <label for="comment">Comment:</label>
        <textarea
            id="comment"
            name="comment"
            required
        ></textarea>

        <br><br>

        <button>Add Comment</button>
    </form>

    <a href="/comments">Back to Comments</a>
</body>
</html>
```

```text
GET /comments/new
    ↓
Show form
    ↓
User fills form
    ↓
Form sends POST /comments
```

---

# 📨 11. CREATE Route — Add a New Comment

## Route

```js
app.post("/comments", (req, res) => {
    const { username, comment } = req.body;

    comments.push({
        id: uuid(),
        username,
        comment
    });

    res.redirect("/comments");
});
```

## Flow

```text
User submits form
    ↓
POST /comments
    ↓
req.body contains username + comment
    ↓
Create object with unique id
    ↓
Push into comments array
    ↓
Redirect to /comments
    ↓
Updated comments list appears
```

---

# 🔁 12. Express Redirects

```js
res.redirect("/comments");
```

This tells the browser:

```text
"Go make a new GET request to /comments"
```

```text
POST /comments
    ↓
Create data
    ↓
res.redirect("/comments")
    ↓
GET /comments
    ↓
Show updated list
```

## Why redirect after POST?

Without redirecting, refreshing the page may submit the same form again.

```text
POST request
    ↓
Refresh browser
    ↓
Browser may repeat POST
    ↓
Duplicate comment can be created
```

This pattern is called:

```text
POST → Redirect → GET
```

---

# 🔍 13. SHOW Route — Show One Comment

## Route

```js
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;

    const comment = comments.find((comment) => comment.id === id);

    res.render("comments/show", { comment });
});
```

## Template: `views/comments/show.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Comment Details</title>
</head>
<body>
    <h1>Comment Details</h1>

    <h2><%= comment.username %></h2>

    <p><%= comment.comment %></p>

    <a href="/comments">Back to all comments</a>
</body>
</html>
```

## Flow

```text
GET /comments/abc123
    ↓
req.params.id = "abc123"
    ↓
find matching comment
    ↓
Render that one comment
```

---

# 🆔 14. UUID Package

A UUID is a unique identifier.

Example:

```text
3a2d8d31-3db9-48c2-a2a5-70fc7b1d0d2f
```

Install it:

```bash
npm install uuid
```

Import it:

```js
const { v4: uuid } = require("uuid");
```

Generate an ID:

```js
const id = uuid();
```

Use it when creating comments:

```js
comments.push({
    id: uuid(),
    username,
    comment
});
```

## Why use UUIDs?

```text
Every comment needs a unique identity.

Unique id helps us:
    ↓
Find one comment
Edit one comment
Delete one comment
Create URLs for one comment
```

---

# ✏️ 15. EDIT Route — Show the Update Form

## Route

```js
app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;

    const comment = comments.find((comment) => comment.id === id);

    res.render("comments/edit", { comment });
});
```

## Template: `views/comments/edit.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Comment</title>
</head>
<body>
    <h1>Edit Comment</h1>

    <form action="/comments/<%= comment.id %>?_method=PATCH" method="POST">
        <textarea name="comment" required><%= comment.comment %></textarea>

        <button>Update Comment</button>
    </form>

    <a href="/comments/<%= comment.id %>">
        Cancel
    </a>
</body>
</html>
```

```text
GET /comments/:id/edit
    ↓
Find comment
    ↓
Render form with current comment text
    ↓
User edits text
    ↓
Submit update request
```

---

# 🔄 16. UPDATE Route — Update One Comment

REST convention uses `PATCH`.

```js
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const { comment: newCommentText } = req.body;

    const foundComment = comments.find((comment) => comment.id === id);

    foundComment.comment = newCommentText;

    res.redirect("/comments");
});
```

## Flow

```text
PATCH /comments/:id
    ↓
Get id from req.params
    ↓
Get updated text from req.body
    ↓
Find matching comment
    ↓
Change its comment property
    ↓
Redirect to index page
```

---

# 🚫 17. Why Method Override Is Needed

HTML forms only support:

```text
GET
POST
```

But REST uses:

```text
PATCH
DELETE
```

So we use the `method-override` package.

Install it:

```bash
npm install method-override
```

Import it:

```js
const methodOverride = require("method-override");
```

Use middleware:

```js
app.use(methodOverride("_method"));
```

Now this form:

```ejs
<form action="/comments/<%= comment.id %>?_method=PATCH" method="POST">
```

will be treated by Express as:

```text
PATCH /comments/:id
```

```text
HTML form sends POST
        ↓
?_method=PATCH is detected
        ↓
method-override changes method
        ↓
Express runs app.patch(...)
```

---

# 🗑️ 18. DELETE Route — Delete One Comment

## Route

```js
app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;

    comments = comments.filter((comment) => comment.id !== id);

    res.redirect("/comments");
});
```

## Delete form

Put this in `show.ejs` or `index.ejs`:

```ejs
<form action="/comments/<%= comment.id %>?_method=DELETE" method="POST">
    <button>Delete Comment</button>
</form>
```

## Flow

```text
POST /comments/:id?_method=DELETE
    ↓
method-override changes POST → DELETE
    ↓
app.delete(...) runs
    ↓
filter removes matching comment
    ↓
Redirect to /comments
```

---

# 🧠 `find()` vs `filter()`

## `find()`

Use `find()` when you need **one matching item**.

```js
const comment = comments.find((comment) => comment.id === id);
```

```text
find()
    ↓
Returns first matching object
```

Example result:

```js
{
    id: "abc123",
    username: "anikaith",
    comment: "Hello"
}
```

---

## `filter()`

Use `filter()` when you need a **new array**.

```js
comments = comments.filter((comment) => comment.id !== id);
```

```text
filter()
    ↓
Keeps every comment except the deleted one
```

---

# 🧩 19. Complete `index.js`

```js
const express = require("express");
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

let comments = [
    {
        id: uuid(),
        username: "anikaith",
        comment: "REST is starting to make sense!"
    },
    {
        id: uuid(),
        username: "colt",
        comment: "Express is powerful."
    },
    {
        id: uuid(),
        username: "sherlock",
        comment: "The game is afoot."
    }
];

// INDEX - Show all comments
app.get("/comments", (req, res) => {
    res.render("comments/index", { comments });
});

// NEW - Show form for a new comment
app.get("/comments/new", (req, res) => {
    res.render("comments/new");
});

// CREATE - Add a new comment
app.post("/comments", (req, res) => {
    const { username, comment } = req.body;

    comments.push({
        id: uuid(),
        username,
        comment
    });

    res.redirect("/comments");
});

// SHOW - Show one comment
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;

    const comment = comments.find((comment) => comment.id === id);

    if (!comment) {
        return res.status(404).send("Comment not found");
    }

    res.render("comments/show", { comment });
});

// EDIT - Show edit form
app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;

    const comment = comments.find((comment) => comment.id === id);

    if (!comment) {
        return res.status(404).send("Comment not found");
    }

    res.render("comments/edit", { comment });
});

// UPDATE - Update one comment
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const { comment: newCommentText } = req.body;

    const foundComment = comments.find((comment) => comment.id === id);

    if (!foundComment) {
        return res.status(404).send("Comment not found");
    }

    foundComment.comment = newCommentText;

    res.redirect(`/comments/${id}`);
});

// DELETE - Delete one comment
app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;

    comments = comments.filter((comment) => comment.id !== id);

    res.redirect("/comments");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
```

---

# 📄 20. Complete EJS Templates

## `views/comments/index.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>All Comments</title>
</head>
<body>
    <h1>All Comments</h1>

    <a href="/comments/new">Add New Comment</a>

    <% for (let comment of comments) { %>
        <section>
            <h3><%= comment.username %></h3>

            <p><%= comment.comment %></p>

            <a href="/comments/<%= comment.id %>">
                View Comment
            </a>

            <a href="/comments/<%= comment.id %>/edit">
                Edit Comment
            </a>

            <form
                action="/comments/<%= comment.id %>?_method=DELETE"
                method="POST"
            >
                <button>Delete Comment</button>
            </form>
        </section>

        <hr>
    <% } %>
</body>
</html>
```

---

## `views/comments/new.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Comment</title>
</head>
<body>
    <h1>Create a New Comment</h1>

    <form action="/comments" method="POST">
        <label for="username">Username:</label>

        <input
            type="text"
            id="username"
            name="username"
            required
        >

        <br><br>

        <label for="comment">Comment:</label>

        <textarea
            id="comment"
            name="comment"
            required
        ></textarea>

        <br><br>

        <button>Add Comment</button>
    </form>

    <a href="/comments">Back to Comments</a>
</body>
</html>
```

---

## `views/comments/show.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Comment Details</title>
</head>
<body>
    <h1>Comment Details</h1>

    <h2><%= comment.username %></h2>

    <p><%= comment.comment %></p>

    <a href="/comments/<%= comment.id %>/edit">
        Edit Comment
    </a>

    <form
        action="/comments/<%= comment.id %>?_method=DELETE"
        method="POST"
    >
        <button>Delete Comment</button>
    </form>

    <br>

    <a href="/comments">Back to all comments</a>
</body>
</html>
```

---

## `views/comments/edit.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Comment</title>
</head>
<body>
    <h1>Edit Comment</h1>

    <h2>Editing comment by <%= comment.username %></h2>

    <form
        action="/comments/<%= comment.id %>?_method=PATCH"
        method="POST"
    >
        <textarea name="comment" required><%= comment.comment %></textarea>

        <br><br>

        <button>Update Comment</button>
    </form>

    <br>

    <a href="/comments/<%= comment.id %>">
        Cancel
    </a>
</body>
</html>
```

---

# 🔄 Full CRUD Flow

```text
1. INDEX
GET /comments
    ↓
Show all comments

2. NEW
GET /comments/new
    ↓
Show create-comment form

3. CREATE
POST /comments
    ↓
Read req.body
    ↓
Add new comment
    ↓
Redirect to /comments

4. SHOW
GET /comments/:id
    ↓
Find one comment
    ↓
Show its details

5. EDIT
GET /comments/:id/edit
    ↓
Show edit form with old data

6. UPDATE
PATCH /comments/:id
    ↓
Read new data from req.body
    ↓
Update matching comment
    ↓
Redirect to comment page

7. DELETE
DELETE /comments/:id
    ↓
Remove matching comment
    ↓
Redirect to /comments
```

---

# ⚡ Quick Revision Cheat Sheet

| Concept | Meaning |
|---|---|
| REST | Convention for organizing routes around resources |
| Resource | Thing your app manages, such as comments |
| `GET` | Retrieve/show data |
| `POST` | Create/send data |
| `PATCH` | Update part of existing data |
| `DELETE` | Delete data |
| `req.params` | Values from route parameters such as `:id` |
| `req.body` | Data sent through forms or JSON |
| `express.urlencoded()` | Parses HTML form data |
| `express.json()` | Parses JSON request data |
| `res.render()` | Render an EJS page |
| `res.redirect()` | Tell browser to make a new request |
| UUID | Unique ID for each resource |
| `find()` | Find one matching object |
| `filter()` | Create a new array with selected items |
| `method-override` | Lets forms simulate PATCH and DELETE |
| `?_method=PATCH` | Converts form POST into PATCH |
| `?_method=DELETE` | Converts form POST into DELETE |

---

# ✅ Final Checklist

- [ ] Explain the difference between `GET` and `POST`
- [ ] Create an Express `POST` route
- [ ] Use `express.urlencoded({ extended: true })`
- [ ] Access submitted form data using `req.body`
- [ ] Explain what REST means
- [ ] Name all seven RESTful routes
- [ ] Build an index route
- [ ] Build a new route and form
- [ ] Build a create route
- [ ] Use `res.redirect()` after a POST request
- [ ] Use UUIDs for unique IDs
- [ ] Build a show route using `:id`
- [ ] Use `find()` to locate one comment
- [ ] Build an edit route
- [ ] Build a patch/update route
- [ ] Explain why HTML forms need method override
- [ ] Build a delete route
- [ ] Use `filter()` to remove a comment
- [ ] Build a complete CRUD comments application
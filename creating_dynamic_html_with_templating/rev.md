# 🌈 Dynamic HTML with EJS + Express — Complete Revision README

> This section is about creating **dynamic HTML pages** using **Express + EJS**.

Instead of sending the same fixed HTML page every time, Express can send HTML that changes based on data.

---

# 🗺️ Big Picture

```text
Browser visits a route
        ↓
Express route handler runs
        ↓
Server gets/prepares data
        ↓
res.render("template", data)
        ↓
EJS combines template + data
        ↓
Final HTML is sent to browser
```

```text
Template + Data = Dynamic HTML
```

---

# 🧠 1. What Is Templating?

A normal HTML file is static.

```html
<h1>Hello World</h1>
```

Every user sees the same output.

With a template engine like EJS, HTML can change depending on server-side data.

```ejs
<h1>Hello <%= username %></h1>
```

If the server sends:

```js
username = "Anikaith";
```

The browser receives:

```html
<h1>Hello Anikaith</h1>
```

## Why do we need templating?

Templating is useful when building pages such as:

- User profiles
- Blog posts
- Product pages
- Reddit-like pages
- Comments pages
- Dashboards
- Search results
- Pages using database data

```text
Static HTML:
Same page for everyone

Dynamic HTML:
Page changes based on data
```

---

# ⚙️ 2. Installing and Configuring EJS

## Install packages

```bash
npm install express ejs
```

## Basic Express + EJS setup

```js
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

## Important line

```js
app.set("view engine", "ejs");
```

This tells Express:

```text
When res.render() is used,
render files using EJS.
```

---

# 📁 3. Project Structure

A common project structure looks like this:

```text
project/
│
├── app.js
│
├── views/
│   ├── home.ejs
│   ├── about.ejs
│   │
│   ├── subreddits/
│   │   └── show.ejs
│   │
│   └── partials/
│       ├── head.ejs
│       ├── navbar.ejs
│       └── footer.ejs
│
└── public/
    ├── stylesheets/
    │   └── app.css
    ├── scripts/
    │   └── app.js
    └── images/
        └── logo.png
```

```text
views/  → EJS templates

public/ → CSS, client-side JS, images, fonts
```

---

# 👀 4. The `views` Directory

By default, Express searches for EJS files inside:

```text
views/
```

Example file:

```text
views/home.ejs
```

Render it using:

```js
res.render("home");
```

For a nested file:

```text
views/subreddits/show.ejs
```

Render it using:

```js
res.render("subreddits/show");
```

## Custom views directory

If Express cannot find your views folder, configure it manually:

```js
const path = require("path");

app.set("views", path.join(__dirname, "views"));
```

```text
__dirname
    ↓
Current project folder

path.join(...)
    ↓
Creates a safe path on Windows, macOS, and Linux
```

---

# 🚀 5. `res.render()`

```js
res.render("home");
```

Means:

```text
Find views/home.ejs
        ↓
Convert EJS into HTML
        ↓
Send final HTML to browser
```

Example:

```js
app.get("/", (req, res) => {
    res.render("home");
});
```

---

# ✨ 6. EJS Syntax

EJS allows JavaScript inside HTML.

## A. Display data: `<%= %>`

```ejs
<h1>Hello <%= username %></h1>
```

```text
<%= value %>
    ↓
Display a value in HTML
```

Example:

```ejs
<p>Your age is <%= age %></p>
```

---

## B. Run JavaScript: `<% %>`

```ejs
<% const name = "Anikaith"; %>

<h1><%= name %></h1>
```

```text
<% code %>
    ↓
Run JavaScript but do not display it
```

Useful for:

- Variables
- `if` statements
- Loops
- Calculations

---

## C. Render raw HTML: `<%- %>`

```ejs
<%- htmlContent %>
```

```text
<%- value %>
    ↓
Render HTML without escaping it
```

Example:

```js
const message = "<strong>Hello</strong>";
```

```ejs
<%- message %>
```

Output:

```html
<strong>Hello</strong>
```

⚠️ Be careful with `<%- %>`.

Never use it directly with untrusted user input because it can create security problems such as XSS.

---

## D. EJS comments: `<%# %>`

```ejs
<%# This is an EJS comment %>
```

This does not appear in the final HTML.

---

# 📦 7. Passing Data to Templates

## Route

```js
app.get("/cats", (req, res) => {
    const cats = ["Blue", "Rocket", "Monty"];

    res.render("cats", { cats });
});
```

## Template: `views/cats.ejs`

```ejs
<h1>My Cats</h1>

<p><%= cats %></p>
```

## Flow

```text
const cats = [...]
        ↓
res.render("cats", { cats })
        ↓
cats.ejs receives `cats`
        ↓
<%= cats %> displays it
```

---

## Passing multiple values

```js
app.get("/", (req, res) => {
    res.render("home", {
        username: "Anikaith",
        age: 20,
        isLoggedIn: true
    });
});
```

Inside `home.ejs`:

```ejs
<h1>Welcome <%= username %></h1>

<p>Age: <%= age %></p>
```

---

# 🧱 8. Passing Objects

## Route

```js
app.get("/profile", (req, res) => {
    const user = {
        username: "anikaith",
        age: 20,
        city: "Chennai"
    };

    res.render("profile", { user });
});
```

## Template

```ejs
<h1><%= user.username %></h1>

<p>Age: <%= user.age %></p>

<p>City: <%= user.city %></p>
```

```text
user.username
user.age
user.city
```

Use dot notation to access object properties.

---

# 🔗 9. Route Parameters + Templates

## Basic route parameter

```js
app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;

    res.send(`Welcome to r/${subreddit}`);
});
```

If the user visits:

```text
/r/cats
```

Then:

```js
req.params.subreddit; // "cats"
```

---

## Dynamic subreddit page

```js
const subreddits = {
    cats: {
        name: "cats",
        subscribers: 500000,
        description: "A place for cat lovers"
    },
    dogs: {
        name: "dogs",
        subscribers: 400000,
        description: "A place for dog lovers"
    }
};

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;

    const data = subreddits[subreddit];

    res.render("subreddits/show", { data });
});
```

## Template: `views/subreddits/show.ejs`

```ejs
<h1>Welcome to r/<%= data.name %></h1>

<p><%= data.subscribers %> subscribers</p>

<p><%= data.description %></p>
```

## Flow

```text
/r/cats
    ↓
req.params.subreddit = "cats"
    ↓
subreddits["cats"]
    ↓
data object found
    ↓
res.render("subreddits/show", { data })
    ↓
EJS displays the subreddit page
```

---

# ❓ 10. Conditionals in EJS

Use conditionals when HTML should change depending on data.

```ejs
<% if (isLoggedIn) { %>
    <h1>Welcome back!</h1>
<% } else { %>
    <h1>Please log in</h1>
<% } %>
```

```text
Condition true?
    ↓
Yes → show first block
No  → show else block
```

---

## Checking whether data exists

```ejs
<% if (data) { %>
    <h1>Welcome to r/<%= data.name %></h1>
<% } else { %>
    <h1>Subreddit not found!</h1>
<% } %>
```

---

## Better approach: handle missing data in the route

```js
app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;

    const data = subreddits[subreddit];

    if (!data) {
        return res.status(404).render("notfound");
    }

    res.render("subreddits/show", { data });
});
```

```text
if (!data)
    ↓
Subreddit does not exist
    ↓
Render a 404 page
```

---

# 🔁 11. Loops in EJS

Use loops to display repeated data.

## Example array

```js
const cats = ["Blue", "Rocket", "Monty"];
```

## Template

```ejs
<ul>
    <% for (let cat of cats) { %>
        <li><%= cat %></li>
    <% } %>
</ul>
```

Output:

```html
<ul>
    <li>Blue</li>
    <li>Rocket</li>
    <li>Monty</li>
</ul>
```

---

## Looping through objects in an array

```js
const posts = [
    {
        title: "Cute cat",
        author: "meowmaster",
        score: 120
    },
    {
        title: "My dog learned fetch",
        author: "doglover",
        score: 85
    }
];
```

```ejs
<% for (let post of posts) { %>
    <article>
        <h2><%= post.title %></h2>
        <p>Posted by <%= post.author %></p>
        <p>Score: <%= post.score %></p>
    </article>
<% } %>
```

```text
posts array
    ↓
Loop runs once for every post
    ↓
Create HTML for each post
```

---

# 🧠 12. Complex Subreddit Demo

A subreddit can contain nested data.

```js
const subreddits = {
    cats: {
        name: "cats",
        subscribers: 500000,
        description: "A place for cat lovers",
        posts: [
            {
                title: "My cat slept for 18 hours",
                author: "catdad",
                score: 100
            },
            {
                title: "Look at these tiny paws",
                author: "purrfect",
                score: 250
            }
        ]
    }
};
```

## Template

```ejs
<h1>r/<%= data.name %></h1>

<p><%= data.description %></p>

<h2>Posts</h2>

<% for (let post of data.posts) { %>
    <article>
        <h3><%= post.title %></h3>
        <p>By <%= post.author %></p>
        <p>Score: <%= post.score %></p>
    </article>
<% } %>
```

```text
Complex dynamic page =
    Object data
    + interpolation
    + conditionals
    + loops
```

---

# 🎨 13. Serving Static Assets

Static assets are files that the browser needs directly.

```text
🎨 CSS files
⚡ Client-side JavaScript
🖼️ Images
🔤 Fonts
```

## Setup

```js
app.use(express.static("public"));
```

This tells Express:

```text
Make files inside public/ accessible to the browser.
```

Example:

```text
public/stylesheets/app.css
```

Browser URL:

```text
/stylesheets/app.css
```

---

## Linking CSS

```ejs
<link rel="stylesheet" href="/stylesheets/app.css">
```

## Linking client-side JavaScript

```ejs
<script src="/scripts/app.js"></script>
```

## Displaying images

```ejs
<img src="/images/logo.png" alt="Logo">
```

## Important rule

❌ Wrong:

```html
<link rel="stylesheet" href="../public/stylesheets/app.css">
```

✅ Correct:

```html
<link rel="stylesheet" href="/stylesheets/app.css">
```

Why?

```text
Express exposes the CONTENTS of public/,
not public/ itself in the URL.
```

---

# 🟣 14. Bootstrap + Express

Bootstrap gives ready-made CSS classes.

## Add Bootstrap CDN

Put this inside `<head>`:

```html
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
>
```

## Use Bootstrap classes

```ejs
<div class="container mt-5">
    <h1 class="text-primary">Dynamic EJS Page</h1>

    <button class="btn btn-success">
        Click Me
    </button>
</div>
```

```text
EJS       → dynamic content
Bootstrap → quick styling
CSS       → custom styling
```

---

# ♻️ 15. EJS Partials

Partials are reusable EJS files.

Use them for common page sections:

```text
<head>
Navbar
Footer
Scripts
Flash messages
```

## Folder structure

```text
views/
│
├── partials/
│   ├── head.ejs
│   ├── navbar.ejs
│   └── footer.ejs
│
└── home.ejs
```

---

## `views/partials/head.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><%= title %></title>

    <link rel="stylesheet" href="/stylesheets/app.css">
</head>
<body>
```

---

## `views/partials/navbar.ejs`

```ejs
<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>
```

---

## `views/partials/footer.ejs`

```ejs
<footer>
    <p>© 2026 My App</p>
</footer>

</body>
</html>
```

---

## Including partials in a page

```ejs
<%- include("partials/head", { title: "Home" }) %>

<%- include("partials/navbar") %>

<h1>Welcome to the Home Page</h1>

<%- include("partials/footer") %>
```

```text
home.ejs
    ↓
Include head
    ↓
Include navbar
    ↓
Add unique page content
    ↓
Include footer
```

## Why use `<%- include(...) %>`?

Partials contain HTML.

```text
<%- %>
    ↓
Allows included HTML to render properly
```

---

# 🧩 16. Full Working Example

## `app.js`

```js
const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const subreddits = {
    cats: {
        name: "cats",
        subscribers: 500000,
        description: "A place for cat lovers",
        posts: [
            {
                title: "My cat slept all day",
                author: "catdad",
                score: 120
            },
            {
                title: "Tiny kitten picture",
                author: "purrfect",
                score: 250
            }
        ]
    },

    dogs: {
        name: "dogs",
        subscribers: 400000,
        description: "A place for dog lovers",
        posts: [
            {
                title: "My dog learned fetch",
                author: "doglover",
                score: 90
            }
        ]
    }
};

app.get("/", (req, res) => {
    res.render("home", {
        title: "Home"
    });
});

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;

    const data = subreddits[subreddit];

    if (!data) {
        return res.status(404).render("notfound", {
            title: "Not Found"
        });
    }

    res.render("subreddits/show", {
        title: `r/${data.name}`,
        data
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
```

---

## `views/home.ejs`

```ejs
<%- include("partials/head", { title }) %>

<%- include("partials/navbar") %>

<main>
    <h1>Welcome to My EJS App</h1>

    <p>This page was rendered using Express and EJS.</p>

    <a href="/r/cats">Visit r/cats</a>
    <a href="/r/dogs">Visit r/dogs</a>
</main>

<%- include("partials/footer") %>
```

---

## `views/subreddits/show.ejs`

```ejs
<%- include("../partials/head", { title }) %>

<%- include("../partials/navbar") %>

<main>
    <h1>Welcome to r/<%= data.name %></h1>

    <p><%= data.subscribers %> subscribers</p>

    <p><%= data.description %></p>

    <h2>Posts</h2>

    <% for (let post of data.posts) { %>
        <article>
            <h3><%= post.title %></h3>

            <p>Posted by <%= post.author %></p>

            <p>Score: <%= post.score %></p>
        </article>
    <% } %>
</main>

<%- include("../partials/footer") %>
```

---

## `views/notfound.ejs`

```ejs
<%- include("partials/head", { title }) %>

<%- include("partials/navbar") %>

<main>
    <h1>404 - Page Not Found</h1>

    <p>The subreddit you requested does not exist.</p>

    <a href="/">Go back home</a>
</main>

<%- include("partials/footer") %>
```

---

## `public/stylesheets/app.css`

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
}

nav {
    padding: 1rem;
    background-color: #222;
}

nav a {
    color: white;
    margin-right: 1rem;
    text-decoration: none;
}

main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
}

article {
    border: 1px solid #ddd;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
}
```

---

# 🧠 Final Mind Map

```text
                    🌈 EJS + EXPRESS
                           │
     ┌─────────────────────┼─────────────────────┐
     │                     │                     │
     ▼                     ▼                     ▼
⚙️ Setup              📁 Files               🚀 Rendering
     │                     │                     │
     ├─ npm i ejs          ├─ views/            ├─ res.render()
     ├─ view engine        ├─ public/           └─ template + data
     └─ Express            └─ partials/
                           │
     ┌─────────────────────┼─────────────────────┐
     │                     │                     │
     ▼                     ▼                     ▼
✨ EJS Syntax          📦 Data               🎨 Styling
     │                     │                     │
     ├─ <%= %>             ├─ objects           ├─ public/
     ├─ <% %>              ├─ arrays            ├─ CSS
     ├─ <%- %>             ├─ route params      └─ Bootstrap
     └─ <%# %>             └─ database later
                           │
     ┌─────────────────────┼─────────────────────┐
     │                     │                     │
     ▼                     ▼                     ▼
❓ Conditions          🔁 Loops              ♻️ Partials
     │                     │                     │
     ├─ if                 ├─ for...of          ├─ head
     ├─ else               └─ repeated HTML     ├─ navbar
     └─ 404 handling                              └─ footer
```

---

# ⚡ Quick Revision Cheat Sheet

| Concept | Meaning |
|---|---|
| EJS | Template engine for dynamic HTML |
| `app.set("view engine", "ejs")` | Configures Express to use EJS |
| `views/` | Folder where `.ejs` files live |
| `res.render("home")` | Renders `views/home.ejs` |
| `res.render("home", { data })` | Sends data to an EJS template |
| `<%= value %>` | Display escaped data |
| `<% code %>` | Run JavaScript without displaying it |
| `<%- value %>` | Render unescaped HTML |
| `<%# comment %>` | EJS comment |
| `if` in EJS | Show HTML conditionally |
| `for...of` in EJS | Render repeated HTML |
| `express.static("public")` | Serve CSS, JS, images, fonts |
| `public/` | Static assets folder |
| Partials | Reusable EJS files |
| `include()` | Insert a partial into another template |
| Bootstrap | Ready-made CSS classes |

---

# ✅ Final Checklist

Before moving on, make sure you can:

- [ ] Install EJS using `npm install ejs`
- [ ] Configure Express with `app.set("view engine", "ejs")`
- [ ] Create and render `.ejs` files
- [ ] Understand the purpose of the `views/` folder
- [ ] Use `res.render()`
- [ ] Pass variables, arrays, and objects into templates
- [ ] Use `<%= %>`, `<% %>`, `<%- %>`, and `<%# %>`
- [ ] Use route parameters with EJS pages
- [ ] Write `if / else` conditions in EJS
- [ ] Loop through arrays using `for...of`
- [ ] Serve CSS, JS, and images using `express.static()`
- [ ] Link static files correctly from EJS
- [ ] Add Bootstrap through a CDN
- [ ] Create and include reusable EJS partials
- [ ] Render a 404 page when data does not exist
```
# RESTful Routes Practice Exercises

These exercises help you practice:

- GET vs POST requests
- `express.urlencoded()`
- Request bodies with `req.body`
- RESTful routing
- EJS forms and templates
- Redirects
- UUIDs
- Updating resources with `PATCH`
- Deleting resources with `DELETE`
- `method-override`

Complete them in this order:

```txt
1. Personal Notes App
2. Book Review Tracker
3. Mini Task Board
```

---

# 1. Easy — Personal Notes App

Build a simple app where users can create, view, edit, and delete notes.

## Resource

Your app manages a `notes` resource.

Each note should look like this:

```js
{
  id: "uuid",
  title: "Learn Express",
  content: "Practice RESTful routes today"
}
```

Use the UUID package to generate a unique `id` for every note.

## Required Routes

| Feature | HTTP Method | Route |
|---|---:|---|
| Show all notes | GET | `/notes` |
| Show new-note form | GET | `/notes/new` |
| Create a note | POST | `/notes` |
| Show one note | GET | `/notes/:id` |
| Show edit-note form | GET | `/notes/:id/edit` |
| Update a note | PATCH | `/notes/:id` |
| Delete a note | DELETE | `/notes/:id` |

## Required Pages

```txt
views/
└── notes/
    ├── index.ejs
    ├── new.ejs
    ├── show.ejs
    └── edit.ejs
```

### `index.ejs`

Display all notes.

For every note, show:

- Note title
- A link to view the full note
- A link to edit the note
- A delete button

If there are no notes, display:

```txt
No notes yet.
```

### `new.ejs`

Create a form that sends a `POST` request to:

```txt
/notes
```

The form should contain:

```txt
Title input
Content textarea
Create Note button
```

### `show.ejs`

Display one specific note.

Show:

```txt
Title
Full content
Edit link
Back to all notes link
```

### `edit.ejs`

Create a form that updates a note.

Since HTML forms only support `GET` and `POST`, use method override:

```html
<form action="/notes/<%= note.id %>?_method=PATCH" method="POST">
```

The form should pre-fill the current note title and content.

## Required Middleware

```js
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
```

## Packages

```bash
npm install express ejs uuid method-override
```

## Extra Challenges

- Add a character count below the content textarea.
- Display the number of notes on the index page.
- Add a confirmation message after creating, updating, or deleting a note.

---

# 2. Medium — Book Review Tracker

Build an app where users can track books and write reviews for them.

## Resource

Your app manages a `books` resource.

Each book should look like this:

```js
{
  id: "uuid",
  title: "Atomic Habits",
  author: "James Clear",
  status: "reading",
  rating: 5,
  review: "Very practical and easy to follow."
}
```

Possible values for `status`:

```txt
want-to-read
reading
completed
```

## Required Routes

| Feature | HTTP Method | Route |
|---|---:|---|
| Show all books | GET | `/books` |
| Show new-book form | GET | `/books/new` |
| Create a book | POST | `/books` |
| Show one book | GET | `/books/:id` |
| Show edit-book form | GET | `/books/:id/edit` |
| Update a book | PATCH | `/books/:id` |
| Delete a book | DELETE | `/books/:id` |

## Required Pages

```txt
views/
└── books/
    ├── index.ejs
    ├── new.ejs
    ├── show.ejs
    └── edit.ejs
```

## Form Fields

Your create and edit forms must include:

```txt
Title input
Author input
Status select dropdown
Rating number input
Review textarea
```

Example status dropdown:

```html
<select name="status">
  <option value="want-to-read">Want to Read</option>
  <option value="reading">Reading</option>
  <option value="completed">Completed</option>
</select>
```

## Validation Requirements

Before creating or updating a book, validate:

```txt
Title cannot be empty
Author cannot be empty
Rating must be between 1 and 5
```

If validation fails:

- Do not create or update the book.
- Render the same form again.
- Display an error message.

Example:

```txt
Title is required.
Rating must be between 1 and 5.
```

## Index Page Requirements

For every book, display:

```txt
Title
Author
Status
Rating
View Details link
Edit link
Delete button
```

## Show Page Requirements

Display the complete book information:

```txt
Title
Author
Status
Rating
Full review
Edit link
Back to all books link
```

## Extra Challenge — Filtering

Support filtering books by status.

Example routes:

```txt
/books?status=completed
/books?status=reading
/books?status=want-to-read
```

Use:

```js
req.query.status
```

Example logic:

```js
const { status } = req.query;

if (status) {
  books = books.filter(book => book.status === status);
}
```

---

# 3. Hard — Mini Task Board

Build a small task-management app similar to a simplified Trello board.

Users can create projects, then create tasks inside each project.

## Resources

Your app manages two resources:

```txt
projects
tasks
```

## Project Object

```js
{
  id: "uuid",
  name: "Backend Revision",
  description: "Practice Express and RESTful routes"
}
```

## Task Object

```js
{
  id: "uuid",
  projectId: "project-uuid",
  title: "Build REST routes",
  priority: "high",
  status: "todo",
  dueDate: "2026-07-15"
}
```

Possible task statuses:

```txt
todo
in-progress
done
```

Possible task priorities:

```txt
low
medium
high
```

## Project Routes

| Feature | HTTP Method | Route |
|---|---:|---|
| Show all projects | GET | `/projects` |
| Show new-project form | GET | `/projects/new` |
| Create project | POST | `/projects` |
| Show one project | GET | `/projects/:id` |
| Show edit-project form | GET | `/projects/:id/edit` |
| Update project | PATCH | `/projects/:id` |
| Delete project | DELETE | `/projects/:id` |

## Task Routes

Tasks should belong to a project.

| Feature | HTTP Method | Route |
|---|---:|---|
| Show new-task form | GET | `/projects/:id/tasks/new` |
| Create task | POST | `/projects/:id/tasks` |
| Show edit-task form | GET | `/projects/:projectId/tasks/:taskId/edit` |
| Update task | PATCH | `/projects/:projectId/tasks/:taskId` |
| Delete task | DELETE | `/projects/:projectId/tasks/:taskId` |

## Required Folder Structure

```txt
task-board/
├── index.js
├── package.json
├── views/
│   ├── projects/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── show.ejs
│   │   └── edit.ejs
│   ├── tasks/
│   │   ├── new.ejs
│   │   └── edit.ejs
│   └── partials/
│       ├── head.ejs
│       └── navbar.ejs
└── public/
    └── app.css
```

## Project Index Page

Display all projects.

For every project, show:

```txt
Project name
Short description
View Project link
Edit link
Delete button
```

Also include:

```txt
Create New Project button
```

## Project Show Page

When a user visits:

```txt
/projects/:id
```

Show:

```txt
Project name
Project description
Add Task button
Edit Project link
Delete Project button
```

Also show all tasks belonging to that project.

Group tasks into three sections:

```txt
To Do
In Progress
Done
```

Example:

```txt
To Do
- Build REST routes
- Create EJS templates

In Progress
- Add validation

Done
- Setup Express server
```

## Task Form Fields

Each task form should contain:

```txt
Task title input
Priority select dropdown
Status select dropdown
Due date input
```

Example:

```html
<select name="priority">
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
```

## Important Requirement

When a project is deleted, all tasks belonging to that project must also be deleted.

Example logic:

```js
projects = projects.filter(project => project.id !== projectId);

tasks = tasks.filter(task => task.projectId !== projectId);
```

## Redirect Rules

After every create, update, or delete action, redirect the user.

Examples:

```js
res.redirect("/projects");
```

```js
res.redirect(`/projects/${projectId}`);
```

Do not render pages directly after a `POST`, `PATCH`, or `DELETE` request.

## Required Middleware

```js
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
```

## Packages

```bash
npm install express ejs uuid method-override
```

---

# Final Checklist

Before considering an exercise complete, make sure you used:

```txt
[ ] GET routes
[ ] POST routes
[ ] PATCH routes
[ ] DELETE routes
[ ] RESTful route naming
[ ] req.params
[ ] req.body
[ ] req.query
[ ] express.urlencoded()
[ ] EJS templates
[ ] HTML forms
[ ] UUIDs
[ ] Redirects
[ ] method-override
[ ] Create, Read, Update, Delete operations
```

# Recommended Order

```txt
Personal Notes App
        ↓
Book Review Tracker
        ↓
Mini Task Board
```

The Notes App teaches the basic RESTful CRUD pattern.

The Book Review Tracker adds richer forms, validation, and query filtering.

The Mini Task Board adds relationships between resources, nested routes, and cascading deletion.
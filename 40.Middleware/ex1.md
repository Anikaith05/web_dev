# Express Middleware Practice Exercise

A single small app that touches every middleware concept from **Section 40**:
intro to middleware, Morgan, custom middleware, chaining middleware, a 404
handler, a fake "auth" middleware, and protecting specific routes.

Build it in one file, `app.js`. Work through the parts in order — each one
builds on the last.

---

## Setup

```bash
mkdir middleware-practice && cd middleware-practice
npm init -y
npm install express morgan
```

Create `app.js`:

```js
const express = require("express");
const morgan = require("morgan");
const app = express();
```

---

## Part 1 — Morgan

Add Morgan so every request gets logged to the console. Use the `"dev"`
format string.

```js
// TODO: app.use(...)
```

Start the server (`app.listen(3000, () => console.log("on 3000"))`) and hit
a couple routes with your browser or curl to confirm you see log lines like:

```
GET / 200 3.212 ms - 12
```

---

## Part 2 — Your first custom middleware

Write a middleware function that logs the request method and path, then
**calls `next()`**. Mount it with `app.use` so it runs for *every* request.

```js
app.use((req, res, next) => {
  // TODO: console.log something useful
  // TODO: don't forget next()
});
```

Then add two simple routes to test it against:

```js
app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/cats", (req, res) => {
  res.send("meow");
});
```

**Checkpoint:** visiting either route should print your custom log line
*and* Morgan's log line, in that order.

---

## Part 3 — A middleware that adds data to `req` 

Write a middleware called `addTimestamp` that attaches the current time
to `req.timestamp`, then a route that uses it.

```js
const addTimestamp = (req, res, next) => {
  // TODO: req.timestamp = ...
  next();
};

app.get("/time", addTimestamp, (req, res) => {
  res.send(`Request received at: ${req.timestamp}`);
});
```

This shows middleware doesn't just log — it can **modify the request
object** for routes further down the chain.

---

## Part 4 — Chaining multiple middleware on one route 

Write two tiny middleware functions, `logA` and `logB`, and attach *both*
to a single route, in order, using the array syntax:

```js
const logA = (req, res, next) => {
  console.log("Middleware A");
  next();
};

const logB = (req, res, next) => {
  console.log("Middleware B");
  next();
};

app.get("/chain", [logA, logB], (req, res) => {
  res.send("you hit the chained route");
});
```

Confirm in your console that A logs before B, before the response is sent.

---

## Part 5 — Fake password middleware 

Write a middleware named `verifyPassword` that checks `req.query.password`.

- If it equals `"chickennuggets"` → call `next()`
- Otherwise → respond with `res.status(401).send("Password required!")`

```js
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  // TODO: check password, either next() or send 401
};
```

Test it with:
- `/secret` (no query) → should be blocked
- `/secret?password=chickennuggets` → should pass

---

## Part 6 — Protecting *specific* routes only 

Add two more routes, `/admin` and `/discount`, and apply `verifyPassword`
**only** to those two — not to `/`, `/cats`, `/time`, or `/chain`.

```js
app.get("/admin", verifyPassword, (req, res) => {
  res.send("welcome to the admin area");
});

app.get("/discount", verifyPassword, (req, res) => {
  res.send("here's your secret discount code: EXPRESS10");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("here is the secret");
});
```

**Checkpoint:** `/` and `/cats` still work with no password. `/admin`,
`/discount`, and `/secret` all require `?password=chickennuggets`.

---

## Part 7 — The 404 catch-all 

Add this as the **very last** `app.use` in the file — order matters, since
Express matches top to bottom:

```js
app.use((req, res) => {
  res.status(404).send("Not Found");
});
```

Test it by visiting a route that doesn't exist, e.g. `/nothing-here`.

---

## Final structure check

Your middleware/route order in `app.js` should look like this top to bottom:

1. `morgan("dev")`
2. custom logger middleware (`app.use`)
3. named routes (`/`, `/cats`, `/time`, `/chain`)
4. protected routes using `verifyPassword` (`/secret`, `/admin`, `/discount`)
5. the 404 catch-all `app.use`, **last**

If the 404 handler isn't last, it'll swallow every route defined after it —
a common bug this exercise is designed to surface.

---

## Stretch goals

- Make `verifyPassword` read the password from a header (`req.headers`)
  instead of the query string.
- Write a middleware that logs how long each request took, using
  `Date.now()` before and after `next()`.
- Combine `verifyPassword` with `addTimestamp` on one route, in either
  order — notice how order changes what each middleware has access to.
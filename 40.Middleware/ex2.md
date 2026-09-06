# Build It Yourself: Express Middleware Mini-Project

No starter code here — just requirements. Build this from scratch in a
fresh Express project, using only what you know about middleware.

**Project idea:** a tiny "Snack Shop" API.

---

## Part 1 — Get logging working

Set up a fresh Express app. Before anything else, wire up a request logger
so every incoming request prints details to your terminal automatically —
method, path, response time, all of it, without you writing that logic
yourself.

---

## Part 2 — Write your own logger too

Now write your own middleware, separate from the one in Part 1, that runs
on *every single request* and prints a short custom message noting which
HTTP method was used and which path was requested. Make sure requests
still complete normally after your middleware runs — nothing should hang.

---

## Part 3 — Attach information to the request

Create a few basic routes: a homepage, a route listing your shop's
snacks, and a route showing today's "deal of the day."

Then write a separate piece of middleware whose only job is to figure out
the current time and attach it to the request somehow, so that any route
placed after it can access that time and include it in its response. Use
it on just one of your routes — the deal-of-the-day route makes sense —
and have that route mention the time in its response.

---

## Part 4 — Run more than one middleware on a single route

Pick one route and give it two separate small middleware functions that
both run before the final response is sent, in a specific order. Each one
should print something different to the terminal, so that when you visit
the route, you can see from your terminal output that both ran, and in
which order. Try swapping their order and observe how the terminal output
changes.

---

## Part 5 — Build a (fake) password check

Write a middleware whose job is to look for a password somewhere in the
incoming request and decide whether to let the request continue or block
it. If the password is missing or wrong, the middleware should stop the
request right there and send back an appropriate "not authorized"
response — it should never let the rest of the route run in that case.
If the password is correct, the request should continue on as normal.

This is a demo only — don't worry about it being secure or realistic.

---

## Part 6 — Lock down only some routes

Add two new routes: one for viewing your "secret menu," and one for
applying a "staff discount." Both of these should require the password
check from Part 5 before they'll respond. Every other route you built
earlier (homepage, snack list, deal of the day) should keep working with
no password needed at all.

Think carefully about how you attach the password-check middleware so
that it only affects these two new routes, and confirm that the other
routes are unaffected.

---

## Part 7 — Handle unknown routes

Finally, add something that catches any request to a path that doesn't
match anything else you've defined, and responds with a clear "not
found" message and an appropriate status code.

Think about *where* in your file this needs to live relative to
everything else you've written, and why. Test your theory by moving it
to a different spot and seeing what breaks.

---

## Self-check before you're done

Go through your app and answer these without looking anything up:

- Which routes require a password, and which don't? Why?
- If you moved your custom logger from Part 2 to the very end of the
  file, what would happen to it, and why?
- What would happen if one of your middleware functions forgot to pass
  control along to the next step? Try it and see.
- Why does the "not found" handler have to go last?

---

## Stretch goals

- Have your password-check middleware accept the password from a
  different part of the request than you originally chose, and reason
  about the trade-offs.
- Add timing information to your custom logger from Part 2, so it
  reports how long each request took to handle.
- Add a third protected route and confirm your existing password
  middleware "just works" on it with minimal changes.
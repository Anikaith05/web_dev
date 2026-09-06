# Take-Home Exercise: Express Middleware

## The Brief

Build a small Express API for a shop of your choosing (books, snacks,
plants — pick whatever). We're not evaluating the business logic; we're
evaluating how you use middleware to structure the app.

## Requirements

Your app should:

- Log every incoming request automatically, with enough detail to debug
  an issue in production (method, path, status, response time).
- Include at least one piece of middleware you wrote yourself that runs
  on every request and adds some value beyond just logging — get
  creative with what it does.
- Have at least one route that depends on data a middleware function
  computed and attached earlier in the request lifecycle.
- Have at least one route where more than one middleware function needs
  to run, in a specific order, before the final response goes out.
- Support some notion of "protected" content — a subset of your routes
  that should only be accessible if the right credential is provided,
  while the rest of the app remains open to anyone.
- Respond sensibly to requests for routes that don't exist.

## What we're looking for

- Correct use of Express's request/response/next pattern.
- Sensible ordering of middleware and routes, and an understanding of
  why that order matters.
- Middleware that's reusable rather than copy-pasted where it's needed
  more than once.
- Clean separation between "runs on everything" middleware and
  "runs on this one route" middleware.

## What we're not looking for

- Real authentication, databases, or security. A fake credential check
  is completely fine — we just want to see you gate a route correctly.
- Polish on the actual product data or response formatting.

Come back and walk us through your design choices when you're done —
especially anything you placed carefully because you knew what would
break if it were out of order.
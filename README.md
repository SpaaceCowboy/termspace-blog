# TermSpace

TermSpace is a monorepo containing the main product site, its editorial site,
and one shared API.

```text
apps/
  web/   Main TermSpace frontend (Next.js, port 3000)
  blog/  Editorial frontend (Next.js, port 3001)
  api/   Shared Express/Prisma API (port 4001)
docs/    Operational documentation
```

## Local development

Install all workspace dependencies from the repository root:

```bash
npm install
```

Copy each app's `.env.example` to `.env` in the same directory. Then start
PostgreSQL and run each application in its own terminal:

```bash
npm run db:up
npm run dev:api
npm run dev:web
npm run dev:blog
```

Run all repository checks from the root with:

```bash
npm run typecheck
npm test
npm run build
```

The API is shared infrastructure, but its route modules remain separated by
domain. Existing article, reader, newsletter, and editorial routes serve the
blog; TermSpace marketplace routes live in their own modules rather than being
coupled to editorial controllers.

## Production subdomain deployment and shared login

The intended production layout is one parent domain with two Next.js surfaces,
for example:

```text
www.example.com   -> apps/web
blog.example.com  -> apps/blog
api.example.com   -> apps/api (or an internal API service behind both proxies)
```

Both frontends call the same `/api/readers/*` endpoints and use the same
`ReaderUser` and `ReaderSession` records. Browser requests go through each
frontend's same-origin `/backend/*` rewrite, so credentials are sent without
exposing the API host to client code. The API must be configured with
`SESSION_COOKIE_DOMAIN=.example.com` in production. This makes the
`term_academy_reader` HttpOnly cookie valid on both `www` and `blog`; do not set
this to `.localhost` during local development. `SameSite=Lax` is intentional:
the two HTTPS subdomains are same-site, while the cookie remains unavailable to
JavaScript.

Set `API_URL` on each server to the internal API address and include the public
frontend origins in `CORS_ORIGINS` when the API is reachable cross-origin (for
example `https://www.example.com,https://blog.example.com`). Keep
`NEXT_PUBLIC_API_URL=/backend` in both frontends so browser calls remain
same-origin and preserve the shared cookie.

## Existing database migration

The monorepo adds the previously missing initial content migration. Before the
first deployment to a database that already contains the blog tables, mark only
that baseline as applied, then deploy the remaining migrations:

```bash
npm exec --workspace @termspace/api prisma migrate resolve --applied 202608230001_initial_content
npm run prisma:deploy
```

Do not run `resolve` on a new database; `prisma migrate deploy` must create the
initial tables there.

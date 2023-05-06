# New Tech Stack

- SvelteKit
- Drizzle ORM
  - Zod integration
- Lucia
  - Drizzle integration
- Superforms
  - Client and server-side validation
  - SvelteKit actions, works without javascript
  - Zod integration
- Zod
- Vercel Postgres (Neon)

## Setup SvelteKit / Vercel

- [Tutorial — SvelteKit and Drizzle-ORM](https://blog.robino.dev/posts/drizzle-svelte)
- `vercel login`
- `vercel link`
- `verecel git connect`

## Run server

- `vercel env pull .env.development.local`
  - Pull any changes added to vercel [environment variables](https://vercel.com/techniq/sveltekit-drizzle/settings/environment-variables)
- `npm run dev:vercel`
  - Use instead of `npm run dev` so environment variables are available

## [Drizzle](https://github.com/drizzle-team/drizzle-orm)

- [Quick start](https://orm.drizzle.team/docs/quick-start)
- [Migrations](https://github.com/drizzle-team/drizzle-kit-mirror)
- [drizzle-zod](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-zod)

### Update model

- Update `schema.ts`
- `npm run migrate`
- Run generated SQL scripts (lists in console, or view `drizzle` directory)

## [Lucia](https://lucia-auth.com/)

- [SvelteKit](https://lucia-auth.com/adapters/drizzle?sveltekit)
- [Database Schema](https://lucia-auth.com/adapters/postgresql#database-schem)
- [OAuth](https://lucia-auth.com/oauth/start-here/getting-started) / [Github](https://lucia-auth.com/oauth/providers/github)

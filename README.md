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
- Postgres (Neon)
- Redis (Upstash)
- Storage (Cloudflare R2)

## Setup SvelteKit / Vercel

- [Tutorial — SvelteKit and Drizzle-ORM](https://blog.robino.dev/posts/drizzle-svelte)
- `vercel login`
- `vercel link`
- `verecel git connect`

## Run server

- `vercel env pull .env.development.local`
  - Pull any changes added to vercel [environment variables](https://vercel.com/techniq/sveltekit-drizzle/settings/environment-variables)
  - Setup `DATABASE_URL` if needed
- `npm run dev`

## [Drizzle](https://github.com/drizzle-team/drizzle-orm)

- [Quick start](https://orm.drizzle.team/docs/quick-start)
- [Migrations](https://github.com/drizzle-team/drizzle-kit-mirror)
- [drizzle-zod](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-zod)

### Update model

- Update `schema.ts`
- `npm run migrate`
- `npm run migrate:apply` or run generated SQL scripts (lists in console, or view `drizzle` directory)

## [Lucia](https://lucia-auth.com/)

- [API](https://lucia-auth.com/custom-adapters/api)
- [SvelteKit](https://lucia-auth.com/adapters/drizzle?sveltekit)
- [Database Schema](https://lucia-auth.com/adapters/postgresql#database-schem)
- [OAuth](https://lucia-auth.com/oauth/start-here/getting-started) / [Github](https://lucia-auth.com/oauth/providers/github)

## [Superforms](https://superforms.vercel.app/)

## Environment Variables

Current variables defined using Vercel dashboard (setting up Vercel Postgres or Vercel Neon integration)

```js
console.log({
	// Vercel
	POSTGRES_URL: env.POSTGRES_URL,
	POSTGRES_HOST: env.POSTGRES_HOST,
	POSTGRES_USER: env.POSTGRES_USER,
	POSTGRES_PASSWORD: env.POSTGRES_PASSWORD,
	POSTGRES_DATABASE: env.POSTGRES_DATABASE,

	// Neon
	DATABASE_URL: env.DATABASE_URL,
	PGHOST: env.PGHOST,
	PGUSER: env.PGUSER,
	PGPASSWORD: env.PGPASSWORD,
	PGDATABASE: env.PGDATABASE
});
```

## Hosting

- [Vercel (web)](https://vercel.com)
- [Neon (Postgres)](https://console.neon.tech)
- [Upstash (Redis)](https://console.upstash.com/)
- [Cloudflare (R2)](https://dash.cloudflare.com/)

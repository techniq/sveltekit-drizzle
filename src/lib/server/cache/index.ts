import { Redis } from '@upstash/redis';
import { env } from '$env/dynamic/private';

export const cache = new Redis({
	url: env.UPSTASH_REDIS_REST_URL,
	token: env.UPSTASH_REDIS_REST_TOKEN
});

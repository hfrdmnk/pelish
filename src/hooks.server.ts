/*
  Creates Supabase server client and utilities
  Guards routes
*/

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { Database } from '$lib/database.types';

const supabaseSetup: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient<Database>(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: (key) => event.cookies.get(key),
				set: (key, value, options) => {
					event.cookies.set(key, value, options);
				},
				remove: (key, options) => {
					event.cookies.delete(key, options);
				}
			}
		}
	);

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	const response = resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});

	return response;
};

const protectRoutes: Handle = async ({ event, resolve }) => {
	const protectedRoutes = ['/admin'];
	const session = await event.locals.getSession();

	if (protectedRoutes.includes(event.url.pathname) && !session) {
		console.log('redirecting to login');
		throw redirect(303, '/admin/login');
	}

	const response = await resolve(event);

	return response;
};

export const handle = sequence(supabaseSetup, protectRoutes);

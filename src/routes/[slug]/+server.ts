/*
  Redirects the user accordingly
*/

import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Shorturl } from '$lib/databaseItem.types';

export const GET: RequestHandler = async (event) => {
	const {
		params: { slug },
		locals: { supabase }
	} = event;

	// fetch all relevant shorturls
	const { data: supabaseData, error: supabaseError } = await supabase
		.from('links')
		.select('*')
		.eq('short_url', slug)
		.single();

	if (supabaseError) {
		throw error(500, "This shorturl doesn't exist, sorry 🥲");
	}

	const shorturl: Shorturl = supabaseData;

	throw redirect(303, shorturl.redirect_url);
};

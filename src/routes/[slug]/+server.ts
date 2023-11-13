/*
  Redirects the user accordingly
*/

import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Shorturl } from '$lib/databaseItem.types';
import { UAParser } from 'ua-parser-js';
import isbot from 'isbot';

export const GET: RequestHandler = async (event) => {
	const {
		params: { slug },
		locals: { supabase }
	} = event;

	const requestData = {
		userAgent: {},
		location: {},
		datetime: new Date()
	};

	const userAgent = event.request.headers.get('user-agent');
	if (userAgent) {
		// check if user is a bot
		if (isbot(userAgent)) {
			throw error(403, 'Bots have to wait outside, sorry 🤖');
		}

		// parse user agent
		const uaData = UAParser(userAgent);
		requestData.userAgent = {
			browser: uaData.browser,
			device: uaData.device,
			os: uaData.os
		};
	}

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

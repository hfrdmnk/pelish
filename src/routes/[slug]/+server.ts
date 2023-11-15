/*
  Redirects the user accordingly
*/

import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Link } from '$lib/databaseItem.types';
import { UAParser } from 'ua-parser-js';
import isbot from 'isbot';

export const GET: RequestHandler = async (event) => {
	const {
		params: { slug },
		locals: { supabase },
		request
	} = event;

	const headers = request.headers;

	const countryHeader = headers.get('x-vercel-ip-country');
	const cityHeader = headers.get('x-vercel-ip-city');

	const country = countryHeader ? decodeURI(countryHeader) : null;
	const city = cityHeader ? decodeURI(cityHeader) : null;

	const requestData = {
		userAgent: {} as { browser: UAParser.IBrowser; device: UAParser.IDevice; os: UAParser.IOS },
		location: {
			country,
			city
		}
	};

	const userAgent = headers.get('user-agent');
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
		.eq('slug', slug)
		.single();

	if (supabaseError) {
		throw error(500, "This shorturl doesn't exist, sorry 🥲");
	}

	const link: Link = supabaseData;

	// add event to database
	await supabase.from('events').insert(
		[
			{
				link_id: link.id,
				ua_browser_name: requestData.userAgent.browser.name,
				ua_browser_version: requestData.userAgent.browser.version,
				ua_device_vendor: requestData.userAgent.device.vendor,
				ua_device_model: requestData.userAgent.device.model,
				ua_device_type: requestData.userAgent.device.type,
				ua_os_name: requestData.userAgent.os.name,
				ua_os_version: requestData.userAgent.os.version,
				location_city: requestData.location.city,
				location_country: requestData.location.country,
				created_at: new Date()
			}
		],
		{ returning: 'minimal' }
	);

	throw redirect(303, link.redirect_url);
};

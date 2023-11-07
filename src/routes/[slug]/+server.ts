import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const {
		params: { slug },
		locals: { supabase }
	} = event;
	return new Response(JSON.stringify({ slug, supabase }));
};

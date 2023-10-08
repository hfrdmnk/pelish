import type { RequestHandler } from './$types';

export const GET: RequestHandler = (request) => {
	return new Response(JSON.stringify(request.params));
};

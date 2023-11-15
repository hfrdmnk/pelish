/*
  Handles data fetching and form actions for the /admin route
*/

import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect, error } from '@sveltejs/kit';
import { deleteLinkSchema, newLinkSchema } from '$lib/formSchemas';
import type { PageServerLoad } from './$types.js';
import type { Link } from '$lib/databaseItem.types.js';

export const actions = {
	logout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			return fail(500, { success: false, message: error.message });
		}

		throw redirect(303, '/admin/login');
	},
	create: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, newLinkSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const { shorturl, redirecturl, title, description } = form.data;

		const response = await supabase.from('links').insert({
			slug: shorturl,
			redirect_url: redirecturl,
			title,
			description
		});

		if (response.error) {
			if (response.error.message?.includes('duplicate key value violates unique constraint')) {
				return setError(form, 'shorturl', 'This short url is already in use');
			}

			return fail(500, { form });
		}

		return { createOpen: false, success: true, action: 'create', form };
	},
	delete: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, deleteLinkSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const { id } = form.data;

		const response = await supabase.from('links').delete().eq('id', id);

		if (response.error) {
			return fail(500, { deleteOpen: true, success: false, action: 'delete', form });
		}

		return { deleteOpen: false, success: true, action: 'delete', form };
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;
	const session = await locals.getSession();

	// fetch all relevant shorturls
	const { data: supabaseData, error: supabaseError } = await supabase
		.from('links')
		.select('*')
		.eq('owner_id', session.user.id)
		.order('created_at', { ascending: false });

	if (supabaseError) {
		throw error(500, 'There was unfortunately an error fetching your shorturls');
	}

	const shorturls: Link[] = supabaseData;

	const createLinkForm = await superValidate(newLinkSchema);
	const deleteLinkForm = await superValidate(deleteLinkSchema);

	return { createLinkForm, deleteLinkForm, shorturls };
};

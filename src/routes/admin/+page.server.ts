import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			return fail(500, { success: false, message: error.message });
		}

		throw redirect(303, '/admin/login');
	}
};

import type { PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { loginFormSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, loginFormSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			if (error.status === 400) {
				return setError(form, 'password', 'Invalid email or password');
			}
			return fail(500, form);
		}

		throw redirect(303, '/admin');
	}
};

export const load: PageServerLoad = async () => {
	const form = await superValidate(loginFormSchema);

	return { form };
};

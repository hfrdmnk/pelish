import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});

export type LoginFormSchema = typeof loginFormSchema;

export const newLinkSchema = z.object({
	shorturl: z
		.string()
		.min(1)
		.regex(
			new RegExp('^[a-z0-9]+(?:-[a-z0-9]+)*$'),
			'Short URL must be a valid slug (e.g. my-short-url'
		),
	redirecturl: z.string().url(),
	title: z.string().min(3),
	description: z.string().min(3).optional()
});

export type NewLinkSchema = typeof newLinkSchema;

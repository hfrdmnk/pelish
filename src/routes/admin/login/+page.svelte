<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { loginFormSchema, type LoginFormSchema } from '$lib/formSchemas';

	export let form: SuperValidated<LoginFormSchema>;
</script>

<main>
	<div class="flex items-center justify-center min-h-screen">
		<div class="container">
			<h1 class="mb-4 text-2xl font-bold">Login</h1>
			<Form.Root method="POST" {form} schema={loginFormSchema} let:config class="max-w-sm">
				<Form.Field {config} name="email">
					<Form.Item>
						<Form.Label>Email</Form.Label>
						<Form.Input type="email" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="password">
					<Form.Item>
						<Form.Label>Password</Form.Label>
						<Form.Input type="password" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Button class="mt-4">Submit</Form.Button>
			</Form.Root>
		</div>
	</div>
</main>

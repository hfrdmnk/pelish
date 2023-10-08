<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { newLinkSchema, type NewLinkSchema } from '$lib/formSchemas';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<NewLinkSchema>;
</script>

<Dialog.Content class="sm:max-w-[425px]">
	<Dialog.Header>
		<Dialog.Title>Create new link</Dialog.Title>
		<Dialog.Description>
			Create a new short link here. Click save when you're done.
		</Dialog.Description>
	</Dialog.Header>
	<Form.Root method="POST" {form} schema={newLinkSchema} action="?/newlink" let:config>
		<Form.Field {config} name="shorturl">
			<Form.Item>
				<Form.Label>Short url*</Form.Label>
				<div class="flex items-center">
					<div class="px-4">/</div>
					<Form.Input placeholder="my-short-url" />
				</div>
				<Form.Description>This is the slug you want to redirect from.</Form.Description>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="redirecturl">
			<Form.Item>
				<Form.Label>Redirect url*</Form.Label>
				<Form.Input placeholder="https://dominikhofer.me" />
				<Form.Description>This is the url you want to redirect to.</Form.Description>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="title">
			<Form.Item>
				<Form.Label>Title*</Form.Label>
				<Form.Input placeholder="My personal website" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="description">
			<Form.Item>
				<Form.Label>Description</Form.Label>
				<Form.Textarea placeholder="This link is very important and should not be deleted" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Dialog.Footer class="mt-8">
			<Form.Button>Save link</Form.Button>
		</Dialog.Footer>
	</Form.Root>
</Dialog.Content>

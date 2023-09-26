<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<form method="POST" use:enhance>
	<input name="email" value={form?.email ?? ''} />
	<input type="password" name="password" />
	<button>Sign in</button>
	{#if form && !form.success}
		<p>There was a login error: {form.message} &ndash; try again.</p>
	{/if}
</form>

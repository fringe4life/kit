<script>
	import Font from '@sveltejs/enhanced-fonts/Font.svelte';
</script>

<Font cssVariable="--font-a" />

<h1 class="a">Route B uses A without preload</h1>

<style>
	.a {
		font-family: var(--font-a);
	}
</style>

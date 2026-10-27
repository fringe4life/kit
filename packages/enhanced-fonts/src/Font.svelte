<script>
	import { get_font } from 'virtual:enhanced-fonts';
	import { filter_preloads } from './preload.js';

	/** @type {{ cssVariable: import('../types/index.js').CssVariable; preload?: boolean }} */
	let { cssVariable, preload = false } = $props();

	const data = $derived(get_font(cssVariable));
	const links = $derived(filter_preloads(data.preloads, preload));
</script>

<svelte:head>
	<svelte:element this={"style"}>{data.css}</svelte:element>
	{#each links as link (link.href)}
		<link rel="preload" as="font" type={link.type} href={link.href} crossorigin="anonymous" />
	{/each}
</svelte:head>

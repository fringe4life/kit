<script>
	import Font from '@sveltejs/enhanced-fonts/Font.svelte';
</script>

<Font cssVariable="--font-inter" />

<article class="prose">
	<p class="meta">Route <code>/about</code> · Inter CSS only · no font preload</p>
	<h1>About the crumb committee</h1>
	<p>
		This page still wears Inter through <code>font-family: var(--font-inter)</code>, but it does not
		emit a preload hint. After a visit to <code>/</code>, the self-hosted files should already sit
		in the HTTP cache.
	</p>
	<p>
		The committee minutes record that jam is a condiment, not a personality, and that marmots may
		vote if they bring their own spoons. There are no advertisements in these minutes, only the
		solemn business of crumbs.
	</p>
</article>

<style>
	.prose {
		font-family: var(--font-inter);
		font-weight: 400;
	}

	h1 {
		font-weight: 600;
		letter-spacing: -0.03em;
	}

	.meta {
		font-size: 0.85rem;
		color: #6a5d4e;
	}

	code {
		font-size: 0.9em;
	}
</style>

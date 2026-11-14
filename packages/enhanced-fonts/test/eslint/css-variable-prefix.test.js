import { rules } from '../../eslint/index.js';
import { svelte, tester } from './_rule-tester.js';

tester.run('css-variable-prefix', rules['css-variable-prefix'], {
	valid: [
		svelte(`<script>
	import Font from '@sveltejs/enhanced-fonts/Font.svelte';
</script>

<Font cssVariable="--font-inter" preload />
`),
		svelte(`<script>
	import Font from '@sveltejs/enhanced-fonts/Font.svelte';
</script>

<Font cssVariable="--font-sans" />
<Font cssVariable="--font-a" />
`),
		svelte(`<script>
	import Font from '@sveltejs/enhanced-fonts/Font.svelte';
	let x = '--font-inter';
</script>

<Font cssVariable={x} />
`)
	],
	invalid: [
		{
			...svelte(`<Font cssVariable="--heading" />`),
			errors: [{ messageId: 'prefix', data: { cssVariable: '--heading' } }]
		},
		{
			...svelte(`<Font cssVariable="--heading-font" />`),
			errors: [{ messageId: 'prefix', data: { cssVariable: '--heading-font' } }]
		},
		{
			...svelte(`<Font cssVariable="font-inter" />`),
			errors: [{ messageId: 'prefix', data: { cssVariable: 'font-inter' } }]
		},
		{
			...svelte(`<Font cssVariable="--font" />`),
			errors: [{ messageId: 'prefix', data: { cssVariable: '--font' } }]
		},
		{
			...svelte(`<Font cssVariable="--font-" />`),
			errors: [{ messageId: 'prefix', data: { cssVariable: '--font-' } }]
		},
		{
			...svelte(`<Font cssVariable="--test" />`),
			errors: [{ messageId: 'prefix', data: { cssVariable: '--test' } }]
		},
		{
			...svelte(`<Font cssVariable="--font:inter" />`),
			errors: [{ messageId: 'prefix', data: { cssVariable: '--font:inter' } }]
		},
		{
			...svelte(`<Font cssVariable="--font inter" />`),
			errors: [{ messageId: 'prefix', data: { cssVariable: '--font inter' } }]
		},
		{
			...svelte(`<Font cssVariable={'--heading'} />`),
			errors: [{ messageId: 'prefix', data: { cssVariable: '--heading' } }]
		}
	]
});

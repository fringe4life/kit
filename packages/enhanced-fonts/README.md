# `@sveltejs/enhanced-fonts`

A Vite plugin that self-hosts fonts from an Astro-style `families` list and a `<Font>` helper.

**WARNING**: This package is experimental. It may introduce breaking changes with every minor version release.

Place the plugin **after** `sveltekit()`:

```js
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedFonts } from '@sveltejs/enhanced-fonts';

export default {
  plugins: [
    sveltekit(),
    enhancedFonts({
      families: [
        {
          name: 'Inter',
          cssVariable: '--font-inter',
          provider: 'google',
          weights: ['400', '600']
        }
      ]
    })
  ]
};
```

Apply the family with `font-family: var(--font-inter)` in CSS. Inject `@font-face` (and optional preload) from a layout or page:

```svelte
<script>
  import Font from '@sveltejs/enhanced-fonts/Font.svelte';
</script>

<Font cssVariable="--font-inter" />
```

Preload is **off** by default. Pass `preload` only on the document that should hint the font. CSS custom properties must use the `--font-*` prefix. Default `font-display` is `swap`.

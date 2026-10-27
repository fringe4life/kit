import { describe, expect, test } from 'vitest';
import { filter_preloads } from '../src/preload.js';

const latin = {
	href: '/_app/immutable/fonts/a-latin.woff2',
	type: 'font/woff2',
	subset: 'latin'
};

const cjk = {
	href: '/_app/immutable/fonts/a-japanese.woff2',
	type: 'font/woff2',
	subset: 'japanese'
};

describe('preload filter', () => {
	test('default preload off returns no links', () => {
		expect(filter_preloads([latin, cjk], false)).toEqual([]);
	});

	test('preload true emits latin faces and skips CJK subsets', () => {
		const links = filter_preloads([latin, cjk], true);
		expect(links).toEqual([latin]);
	});
});

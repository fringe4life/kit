/** Subsets that must be downloaded but never auto-preloaded (Next ignoredSubsets analog). */
const CJK_SUBSETS = new Set([
	'japanese',
	'korean',
	'chinese-simplified',
	'chinese-traditional',
	'chinese-hongkong',
	'chinese-japanese-korean'
]);

/**
 * @param {Array<{ href: string; type: string; subset?: string }>} preloads
 * @param {boolean} preload
 * @returns {Array<{ href: string; type: string; subset?: string }>}
 */
export function filter_preloads(preloads, preload) {
	if (!preload) return [];
	return preloads.filter((entry) => !entry.subset || !CJK_SUBSETS.has(entry.subset));
}

/**
 * @param {string | undefined} subset
 * @returns {boolean}
 */
export function is_cjk_subset(subset) {
	return !!subset && CJK_SUBSETS.has(subset);
}

/** @import { Rule } from 'eslint' */

const GOOGLE_FONT_HOSTS = new Set(['fonts.googleapis.com', 'fonts.gstatic.com']);

/**
 * @param {any} node
 * @returns {string | null}
 */
export function element_name(node) {
	const name = node?.name;
	if (!name) return null;
	if (typeof name === 'string') return name;
	if (typeof name.name === 'string') return name.name;
	return null;
}

/**
 * @param {any} node
 * @param {string} name
 * @returns {any | undefined}
 */
export function get_attribute(node, name) {
	const attributes = node?.startTag?.attributes;
	if (!Array.isArray(attributes)) return;
	return attributes.find(
		(attribute) => attribute?.type === 'SvelteAttribute' && attribute.key?.name === name
	);
}

/**
 * Literal attribute value, or `null` when the value is dynamic (`cssVariable={x}`).
 *
 * @param {any} attribute
 * @returns {string | null}
 */
export function literal_attribute_value(attribute) {
	if (!attribute || attribute.value === true || !Array.isArray(attribute.value)) {
		return null;
	}

	let result = '';
	for (const part of attribute.value) {
		if (part?.type === 'SvelteLiteral' && typeof part.value === 'string') {
			result += part.value;
			continue;
		}

		if (part?.type === 'SvelteMustacheTag') {
			const literal = mustache_string_literal(part.expression);
			if (literal === null) return null;
			result += literal;
			continue;
		}

		return null;
	}

	return result;
}

/**
 * @param {any} expression
 * @returns {string | null}
 */
function mustache_string_literal(expression) {
	if (!expression) return null;
	if (expression.type === 'Literal' && typeof expression.value === 'string') {
		return expression.value;
	}
	if (
		expression.type === 'TemplateLiteral' &&
		expression.expressions.length === 0 &&
		typeof expression.quasis?.[0]?.value?.cooked === 'string'
	) {
		return expression.quasis[0].value.cooked;
	}
	return null;
}

/**
 * @param {string} href
 * @returns {string | null}
 */
export function google_font_host(href) {
	if (typeof href !== 'string' || href.length === 0) return null;
	try {
		const url = new URL(href, 'https://enhanced-fonts.invalid');
		const host = url.hostname.toLowerCase();
		return GOOGLE_FONT_HOSTS.has(host) ? host : null;
	} catch {
		return null;
	}
}

/**
 * @param {string} css
 * @returns {Array<{ host: string, index: number, length: number }>}
 */
export function google_font_imports(css) {
	/** @type {Array<{ host: string, index: number, length: number }>} */
	const matches = [];
	const comments = css_comment_ranges(css);
	const pattern = /@import\s+(?:url\s*\(\s*)?(?:'([^']+)'|"([^"]+)"|([^\s'")]+))\s*\)?/gi;

	let match;
	while ((match = pattern.exec(css)) !== null) {
		if (in_ranges(match.index, comments)) continue;
		const href = match[1] ?? match[2] ?? match[3];
		const host = google_font_host(href);
		if (!host) continue;
		matches.push({ host, index: match.index, length: match[0].length });
	}

	return matches;
}

/**
 * @param {any} node
 * @param {Rule.RuleContext} context
 * @returns {string}
 */
export function style_css_text(node, context) {
	if (node.startTag?.range && node.endTag?.range) {
		return context.sourceCode.text.slice(node.startTag.range[1], node.endTag.range[0]);
	}
	if (!Array.isArray(node.children)) return '';
	return node.children
		.map((/** @type {any} */ child) => (typeof child.value === 'string' ? child.value : ''))
		.join('');
}

/**
 * @param {string} css
 * @returns {Array<[number, number]>}
 */
function css_comment_ranges(css) {
	/** @type {Array<[number, number]>} */
	const ranges = [];
	const pattern = /\/\*[\s\S]*?\*\//g;
	let match;
	while ((match = pattern.exec(css)) !== null) {
		ranges.push([match.index, match.index + match[0].length]);
	}
	return ranges;
}

/**
 * @param {number} index
 * @param {Array<[number, number]>} ranges
 */
function in_ranges(index, ranges) {
	return ranges.some(([start, end]) => index >= start && index < end);
}

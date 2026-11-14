/** @import { Rule } from 'eslint' */
import { element_name, get_attribute, literal_attribute_value } from '../utils.js';

/** @type {Rule.RuleModule} */
export const no_duplicate_font = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow two <Font> tags with the same literal cssVariable in one file',
			url: 'https://github.com/sveltejs/kit/discussions/17569'
		},
		schema: [],
		messages: {
			duplicateFont:
				'Duplicate <Font> for {{cssVariable}} in this file. Keep one tag per family on the owning layout or page.'
		}
	},
	create(context) {
		/** @type {Set<string>} */
		const seen = new Set();

		return {
			/** @param {any} node */
			SvelteElement(node) {
				if (element_name(node) !== 'Font') return;
				const attribute = get_attribute(node, 'cssVariable');
				const css_variable = literal_attribute_value(attribute);
				if (css_variable === null) return;

				if (seen.has(css_variable)) {
					context.report({
						node: attribute ?? node,
						messageId: 'duplicateFont',
						data: { cssVariable: css_variable }
					});
					return;
				}

				seen.add(css_variable);
			}
		};
	}
};

export default no_duplicate_font;

/** @import { Rule } from 'eslint' */
import { is_font_css_variable } from '../../src/schema.js';
import { element_name, get_attribute, literal_attribute_value } from '../utils.js';

/** @type {Rule.RuleModule} */
export const css_variable_prefix = {
	meta: {
		type: 'problem',
		docs: {
			description: 'require <Font cssVariable> to be a --font-* custom property',
			url: 'https://github.com/sveltejs/kit/discussions/17569'
		},
		schema: [],
		messages: {
			prefix: 'cssVariable must be a --font-* custom property (received {{cssVariable}}).'
		}
	},
	create(context) {
		return {
			/** @param {any} node */
			SvelteElement(node) {
				if (element_name(node) !== 'Font') return;
				const attribute = get_attribute(node, 'cssVariable');
				const css_variable = literal_attribute_value(attribute);
				if (css_variable === null) return;
				if (is_font_css_variable(css_variable)) return;

				context.report({
					node: attribute ?? node,
					messageId: 'prefix',
					data: { cssVariable: css_variable }
				});
			}
		};
	}
};

export default css_variable_prefix;

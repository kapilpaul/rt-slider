/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'rtslider/rt-slider', {

	attributes: {
		slides: {
			type: 'array',
			default: [
				{
					navigationTitle: __( 'Slide 1', 'rt-slider' ),
					title: '',
					image: {
						url: {},
						id: 0
					},
					button: {
						title: 'Learn More',
						titleColor: '#555555',
						backgroundColor: '#dddddd',
						url: '',
					}
				}
			]
		},
		currentTab: {
			type: 'string',
			default: 0
		}
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { Button } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

	const { slides, currentTab } = attributes;

	const handleSubmit = () => {

		const sliderSlides = [ ...slides ];

		let currentLength = slides.length + 1;

		sliderSlides.push( {
			title: __( 'Slide ' + currentLength, 'rt-slider' )
		} );

		setAttributes( { slides: sliderSlides } );
	};

	const blockProps = useBlockProps( {
		className: 'slider-container',
	} );

	return (
		<div { ...blockProps }>
			<div className="slides-navigation">
				{
					slides.map( ( item, key ) => {
						return (
							<div className={ currentTab === key ? 'navigation-item active' : 'navigation-item' } 
								onClick={ () => setAttributes( { currentTab: key } ) }
							>
								{item.title }
							</div>
						);
					} )
				}

				<Button isPrimary={ true } text={ '+' } onClick={ () => handleSubmit() }></Button>

			</div>

			<div className="slides-content-container">
				{
					slides.map( ( item, key ) => {
						
						if ( key !== currentTab ) {
							return;
						}

						return (
							<p>There is an autosave of this post that is more recent than the version below. { key }</p>
						);
					} )
				}
			</div>
		</div>
	);
}

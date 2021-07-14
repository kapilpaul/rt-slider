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
import { RichText, useBlockProps, MediaPlaceholder } from '@wordpress/block-editor';
import RtButton from './rtbutton';

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

	const { slides, currentTab, title } = attributes;

	const rtAllowedBlocks = [ 'core/button' ];

	const handleSubmit = () => {

		const sliderSlides = [ ...slides ];

		let currentLength = slides.length + 1;

		sliderSlides.push( {
			navigationTitle: __( 'Slide ' + currentLength, 'rt-slider' ),
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
		} );

		setAttributes( { slides: sliderSlides } );
	};

	const blockProps = useBlockProps( {
		className: 'slider-container',
	} );

	const onChangeTitle = ( key, value ) => {
		const sliderSlides = [ ...slides ];

		sliderSlides[key]['title'] = value; 

		setAttributes( { slides: sliderSlides } );
	};

	const onSelectSlideImage = ( key, image ) => {
		const sliderSlides = [ ...slides ];

		sliderSlides[key]['image'] = {
			url: image.sizes,
			id: image.id
		};

		setAttributes( { slides: sliderSlides } );
	};

	return (
		<div { ...blockProps }>
			<div className="slides-navigation">
				{
					slides.map( ( item, key ) => {
						return (
							<div className={ currentTab === key ? 'navigation-item active' : 'navigation-item' } 
								onClick={ () => setAttributes( { currentTab: key } ) }
							>
								{item.navigationTitle }
							</div>
						);
					} )
				}

				<Button isPrimary={ true } isSmall={ true } text={ '+' } onClick={ () => handleSubmit() }></Button>

			</div>

			<div className="slides-content-container">
				{
					slides.map( ( item, key ) => {
						
						if ( key !== currentTab ) {
							return;
						}

						return (
							<>
								<div className="slides-content-container__slider-item">
									<RichText key="editable" tagName="h2" placeholder={ __( 'Title Here', 'rt-slider' ) } value={ item.title } 
										onChange={ ( value ) => onChangeTitle( key, value ) }
										label={ __( 'Title', 'rt-slider' ) }
									/>

									<div className="slides-content-container__slider-item__image-uploader">
										<MediaPlaceholder
											onSelect={ ( value ) => onSelectSlideImage( key, value ) }
											value={ item.image.id }
											allowedTypes = { [ 'image' ] }
											multiple = { false }
											labels = { { title: 'The Image' } }
										>
											<img src={ item.image?.url?.medium?.url } />
										</MediaPlaceholder>
									</div>

									<RtButton attributes={ attributes } setAttributes={ setAttributes } indexKey={ key } buttonData={ item.button } />

									<hr/>
								</div>
							</>
						);
					} )
				}
			</div>
		</div>
	);
}

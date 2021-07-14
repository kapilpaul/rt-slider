/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { ColorPalette, PanelBody, Button, TextControl } from '@wordpress/components';
import { InspectorControls, BlockControls, AlignmentControl } from '@wordpress/block-editor';

import './editor.scss';

export default function RtButton( { attributes, setAttributes, indexKey, buttonData } ) {

    const { slides } = attributes;
    const { title, titleColor, backgroundColor, url } = buttonData;

    const colors = [
		{ name: 'red', color: '#f00' },
		{ name: 'white', color: '#fff' },
		{ name: 'blue', color: '#00f' },
	];

    const setTitleColor = ( key, value ) => {
        const sliderSlides = [ ...slides ];

		sliderSlides[indexKey]['button'][ key ] = value; 

		setAttributes( { slides: sliderSlides } );
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title={ 'Button Settings' }>
                    <p><strong>Set Title</strong></p>
                    <TextControl value={ title }
                        onChange={ ( value ) => { setTitleColor( 'title', value ) } }
                    />

                    <p><strong>Set URL</strong></p>
                    <TextControl value={ url }
                        onChange={ ( value ) => { setTitleColor( 'url', value ) } }
                    />

                    <p><strong>Select a Title Color</strong></p>
                    <ColorPalette colors={ colors } value={ titleColor } onChange={ ( value ) => { setTitleColor( 'titleColor', value ) } } />

                    <p><strong>Select a Background Color</strong></p>
                    <ColorPalette colors={ colors } value={ backgroundColor } onChange={ ( value ) => { setTitleColor( 'backgroundColor', value ) } } />
                </PanelBody>
            </InspectorControls>

        
            <Button text={ title } isPrimary={ true } href={ url } />
        </>
    );
}
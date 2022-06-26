// @flow strict

import fontStyles from './Fonts.module.css';

export default function getFontStyle(font: string): string {
	switch (font) {
		case 'Domigorgon':
			return fontStyles.fontDomigorgon;

		case 'Five Cents':
			return fontStyles.fontFiveCents;

		case 'Lulus':
			return fontStyles.fontLulus;

		case 'Metafors':
			return fontStyles.fontMetafors;

		case 'Shannnn':
			return fontStyles.fontShannnn;

		default:
			return '';
	}
}

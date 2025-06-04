import '@testing-library/jest-dom';
import {configure as configureTestingLibrary} from '@testing-library/react';

import '../util/shimRequestIdleCallback';

jest.mock('../util/ConsoleNoJest');
jest.mock('../util/transformImageImport');
jest.mock('../levelEditor/level_data.json');

Element.prototype.scrollIntoView = jest.fn();

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
window.matchMedia = (query) => {
	return {
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	};
};

window.IntersectionObserver = class IntersectionObserver {
	root = null;
	rootMargin = '0px 0px 0px 0px';
	thresholds = [0];

	disconnect() {
		return null;
	}

	observe() {
		return null;
	}

	takeRecords() {
		return [];
	}

	unobserve() {
		return null;
	}
};

configureTestingLibrary({reactStrictMode: true});

process.env.VITE_IN_GAME_SCREENSHOT_URL_PREFIX =
	'http://localhost/level_screenshots/';
process.env.VITE_SPRITES_URL_PREFIX = 'http://localhost/sprites_padding/';

import '@testing-library/jest-dom';
import {configure as configureTestingLibrary} from '@testing-library/react';
import ReactModal from 'react-modal';

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
	disconnect() {
		return null;
	}

	observe() {
		return null;
	}

	takeRecords() {
		return null;
	}

	unobserve() {
		return null;
	}
};

// For react-modal
const fakeAppRoot = document.createElement('div');
ReactModal.setAppElement(fakeAppRoot);

configureTestingLibrary({reactStrictMode: true});

process.env.VITE_IN_GAME_SCREENSHOT_URL_PREFIX =
	'http://localhost/level_screenshots/';
process.env.VITE_SPRITES_URL_PREFIX = 'http://localhost/sprites_padding/';

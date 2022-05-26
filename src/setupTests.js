import '@testing-library/jest-dom';
import ReactModal from 'react-modal';

import './util/shimRequestIdleCallback';

jest.mock('./util/ConsoleNoJest');
jest.mock('./levelEditor/level_data.json');

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

// For react-modal
const fakeAppRoot = document.createElement('div');
ReactModal.setAppElement(fakeAppRoot);

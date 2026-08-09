import '@testing-library/jest-dom/vitest';
import {
	// eslint-disable-next-line testing-library/no-manual-cleanup
	cleanup as cleanupTestingLibrary,
	configure as configureTestingLibrary,
} from '@testing-library/react';
import {afterEach, vi} from 'vitest';

import '../util/shimRequestIdleCallback';

vi.mock(import('../CustomMantine'));
vi.mock(import('../util/ConsoleNoJest'));
vi.mock(import('../util/transformImageImport'));
vi.mock(import('../levelEditor/level_data.json'));

Element.prototype.scrollIntoView = vi.fn();

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
window.matchMedia = (query) => {
	return {
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	};
};

window.IntersectionObserver = class IntersectionObserver {
	root = null;
	rootMargin = '0px 0px 0px 0px';
	scrollMargin = '0px 0px 0px 0px';
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

// https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
afterEach(() => {
	cleanupTestingLibrary();
});

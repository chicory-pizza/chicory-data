import '@testing-library/jest-dom/vitest';
import {
	// eslint-disable-next-line testing-library/no-manual-cleanup
	cleanup as cleanupTestingLibrary,
	configure as configureTestingLibrary,
} from '@testing-library/react';
import {afterEach, vi} from 'vitest';

import '../src/util/shimRequestIdleCallback';

vi.mock(import('../src/CustomMantine'));
vi.mock(import('../src/util/ConsoleNoJest'));
vi.mock(import('../src/util/transformImageImport'));
vi.mock(import('../src/levelEditor/util/loadLevelData'));

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

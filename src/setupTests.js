import '@testing-library/jest-dom';
import ReactModal from 'react-modal';

import './util/shimRequestIdleCallback';

jest.mock('./util/ConsoleNoJest');
jest.mock('./levelEditor/level_data.json');

Element.prototype.scrollIntoView = jest.fn();

// For react-modal
const fakeAppRoot = document.createElement('div');
ReactModal.setAppElement(fakeAppRoot);

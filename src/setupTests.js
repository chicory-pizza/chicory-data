import '@testing-library/jest-dom';
import ReactModal from 'react-modal';

import './util/shimRequestIdleCallback';

jest.mock('./util/ConsoleNoJest');
jest.mock('./levelEditor/level_data.json');

// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
window.IS_REACT_ACT_ENVIRONMENT = true;

Element.prototype.scrollIntoView = jest.fn();

// For react-modal
const fakeAppRoot = document.createElement('div');
ReactModal.setAppElement(fakeAppRoot);

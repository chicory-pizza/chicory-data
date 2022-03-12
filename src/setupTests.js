import '@testing-library/jest-dom';

jest.mock('./util/ConsoleNoJest');
jest.mock('./levelEditor/level_data.json');

Element.prototype.scrollIntoView = jest.fn();

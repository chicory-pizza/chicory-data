import '@testing-library/jest-dom';

jest.mock('./ConsoleNoJest');
jest.mock('./level_data.json');

Element.prototype.scrollIntoView = jest.fn();

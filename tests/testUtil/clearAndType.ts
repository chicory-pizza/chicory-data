import userEvent from '@testing-library/user-event';

export default async function clearAndType(element: Element, text: string) {
	await userEvent.clear(element);
	await userEvent.type(element, text);
}

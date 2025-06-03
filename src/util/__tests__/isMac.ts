import isMac from '../isMac';

test('Mac user agent', async () => {
	jest
		.spyOn(navigator, 'userAgent', 'get')
		.mockReturnValue(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
		);

	expect(isMac()).toBe(true);
});

test('Windows user agent', async () => {
	jest
		.spyOn(navigator, 'userAgent', 'get')
		.mockReturnValue(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.036'
		);

	expect(isMac()).toBe(false);
});

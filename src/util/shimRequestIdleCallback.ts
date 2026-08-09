// For Safari

// From https://developers.google.com/web/updates/2015/08/using-requestidlecallback licensed under the Apache 2.0 License
window.requestIdleCallback =
	// eslint-disable-next-line @typescript-eslint/unbound-method
	window.requestIdleCallback ||
	function (callback: IdleRequestCallback) {
		const start = Date.now();

		return setTimeout(() => {
			callback({
				didTimeout: false,
				timeRemaining: () => {
					return Math.max(0, 50 - (Date.now() - start));
				},
			});
		}, 1);
	};

window.cancelIdleCallback =
	// eslint-disable-next-line @typescript-eslint/unbound-method
	window.cancelIdleCallback ||
	function (handle: number) {
		clearTimeout(handle);
	};

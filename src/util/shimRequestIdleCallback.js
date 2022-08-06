// @flow strict

// For Safari

// From https://developers.google.com/web/updates/2015/08/using-requestidlecallback licensed under the Apache 2.0 License
window.requestIdleCallback =
	window.requestIdleCallback ||
	function (
		cb: (deadline: {
			didTimeout: boolean,
			timeRemaining: () => number,
		}) => void
	) {
		const start = Date.now();

		return setTimeout(() => {
			cb({
				didTimeout: false,
				timeRemaining: () => {
					return Math.max(0, 50 - (Date.now() - start));
				},
			});
		}, 1);
	};

window.cancelIdleCallback =
	window.cancelIdleCallback ||
	function (id: ?TimeoutID) {
		clearTimeout(id);
	};

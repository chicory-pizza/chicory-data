// Hack to set custom headers for dev server
// https://github.com/facebook/create-react-app/issues/10210#issuecomment-873286336

module.exports = (app) => {
	app.use((req, res, next) => {
		// https://github.com/w3c/webappsec-csp/issues/7
		const host = req.hostname + ':' + req.socket.localPort;
		const userAgent = req.get('User-Agent');
		const isSafari =
			userAgent.includes('Safari/') && !userAgent.includes('Chrome/');

		// Keep this in sync with /public/_headers
		const headers = [
			['X-Powered-By', 'Picnic'],
			['X-Content-Type-Options', 'nosniff'],
			['X-XSS-Protection', '0'],
			['X-Frame-Options', 'DENY'],
			// ['Strict-Transport-Security', 'max-age=31536000'], // irrelevant during dev
			['Cross-Origin-Opener-Policy', 'same-origin'],
			['Cross-Origin-Resource-Policy', 'same-site'],
			['Permissions-Policy', 'interest-cohort=()'],
			[
				'Content-Security-Policy',
				[
					"default-src 'self'",
					"script-src 'self'",
					[
						'connect-src',
						"'self'",
						// For webpack dev server
						isSafari ? (req.secure ? 'wss' : 'ws') + '://' + host : '',
					].join(' '),

					// unsafe-inline: For react-select (https://github.com/JedWatson/react-select/issues/2030)
					"style-src 'self' 'unsafe-inline'",

					// data: Inline images
					// blob: Read images to canvas for terrain editor
					"img-src 'self' data: blob:",
					"frame-ancestors 'none'",
					"base-uri 'none'",
					"object-src 'none'",
				].join(';'),
			],
			[
				'Feature-Policy',
				"accelerometer 'none';ambient-light-sensor 'none';battery 'none';camera 'none';display-capture 'none';geolocation 'none';gyroscope 'none';magnetometer 'none';microphone 'none';midi 'none';payment 'none';usb 'none';xr-spatial-tracking 'none';",
			],
		];

		headers.forEach((header) => {
			res.setHeader(header[0], header[1]);
		});

		next();
	});
};

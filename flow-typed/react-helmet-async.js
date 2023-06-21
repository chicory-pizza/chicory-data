declare module 'react-helmet-async' {
	declare class HelmetProvider
		extends
			React$Component<{
				context?: {},
				children: React$Node,
			}> {}

	declare class Helmet
		extends
			React$Component<{
				children: React$Element<'meta'> | Array<React$Element<'meta'> | null>,
			}> {}
}

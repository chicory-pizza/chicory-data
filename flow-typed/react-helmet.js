// @flow strict

declare module '@dr.pogodin/react-helmet' {
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

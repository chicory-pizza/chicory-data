import {Helmet} from '@dr.pogodin/react-helmet';

import useDocumentTitle from '../util/useDocumentTitle';

type Props = Readonly<{
	description: string;
	title: string;
	url: string | null;
}>;

export default function OpenGraph(props: Props) {
	useDocumentTitle(props.title);

	const canonicalUrl =
		props.url != null ? 'https://data.chicory.pizza/' + props.url : null;

	return (
		<Helmet>
			{canonicalUrl != null ? (
				<meta content={canonicalUrl} name="canonical" />
			) : null}
			{canonicalUrl != null ? (
				<meta content={canonicalUrl} property="og:url" />
			) : null}

			<meta
				content={
					props.title +
					(props.title !== '' ? ' - ' : '') +
					'Chicory: A Colorful Modding'
				}
				property="og:title"
			/>

			<meta content={props.description} property="og:description" />
			<meta content={props.description} name="description" />
		</Helmet>
	);
}

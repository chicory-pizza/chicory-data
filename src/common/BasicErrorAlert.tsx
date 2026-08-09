import MessageBox from './MessageBox';

type Props = Readonly<{
	title?: React.ReactNode;
	error?: string | Error | null;
}>;

export default function BasicErrorAlert({
	title = 'Oops, something went wrong.',
	error,
}: Props) {
	return (
		<MessageBox
			type="ERROR"
			title={title}
			style={{alignSelf: 'start', whiteSpace: 'pre-wrap'}}
			message={typeof error === 'string' ? error : error?.message}
		/>
	);
}

import ReactModal from 'react-modal';

import CloseButton from './CloseButton';
import styles from './CustomModal.module.css';
import ErrorBoundary from './ErrorBoundary';

type Props = Readonly<{
	children: React.ReactNode;
	isOpen: boolean;
	onAfterOpen?: () => void;
	onRequestClose: () => void;
	titleText: string;
}>;

export default function CustomModal(props: Props) {
	return (
		<ReactModal
			contentLabel={props.titleText}
			isOpen={props.isOpen}
			onAfterOpen={props.onAfterOpen}
			onRequestClose={props.onRequestClose}
			style={{
				overlay: {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				},
				content: {
					position: 'static',
					inset: '',
					borderColor: '#999',
					borderRadius: '',
					maxHeight: '90%',
				},
			}}
		>
			<div className={styles.titleBar}>
				<h2 className={styles.titleText}>{props.titleText}</h2>

				<CloseButton
					label="Close dialog"
					onClick={props.onRequestClose}
					size=".8em"
				/>
			</div>

			<ErrorBoundary>{props.children}</ErrorBoundary>
		</ReactModal>
	);
}

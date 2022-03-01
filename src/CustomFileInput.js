// @flow strict

import {forwardRef} from 'react';

import styles from './CustomFileInput.module.css';

type Props = $ReadOnly<{
	children: React$Node,
	onChange: (ev: SyntheticEvent<HTMLInputElement>) => mixed,
}>;

function CustomFileInput(props: Props, ref): React$Node {
	return (
		<div className={styles.root}>
			<input
				className={styles.fileInput}
				onChange={props.onChange}
				ref={ref}
				type="file"
			/>

			{props.children}
		</div>
	);
}

export default (forwardRef(CustomFileInput): React$AbstractComponent<
	Props,
	HTMLInputElement
>);

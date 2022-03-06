// @flow strict

import {useState} from 'react';

import styles from './Collapsible.module.css';

type Props = $ReadOnly<{
	children: React$Node,
	buttonText: string,
}>;

export default function Collapsible(props: Props): React$Node {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<div>
			<button
				className={styles.button}
				onClick={() => setIsOpen(!isOpen)}
				type="button"
			>
				{(isOpen ? 'Hide ' : 'Show ') + props.buttonText}
			</button>
			<div className={isOpen ? styles.open : styles.closed}>
				{props.children}
			</div>
		</div>
	);
}

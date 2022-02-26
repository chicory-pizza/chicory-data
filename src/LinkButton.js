// @flow strict

import React from 'react';

import styles from './LinkButton.module.css';

type Props = $ReadOnly<{
	children: ?React$Node,
	...
}>;

// A button that looks like a link
export default function SidebarObjectText({
	children,
	...otherProps
}: Props): React$Node {
	return (
		<button {...otherProps} type="button" className={styles.button}>
			{children}
		</button>
	);
}

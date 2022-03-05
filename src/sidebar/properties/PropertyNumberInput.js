// @flow strict

import {useState} from 'react';

import styles from './PropertyNumberInput.module.css';

type Props = $ReadOnly<{
	onCommitValue: (newValue: number | string) => mixed,
	initialValue: number | string, // it could a number, string of number, or empty string
}>;

export default function PropertyNumberInput({
	onCommitValue,
	initialValue,
}: Props): React$Node {
	const [inputValue, setInputValue] = useState(initialValue);
	const [prevValue, setPrevValue] = useState(null);

	if (initialValue !== prevValue) {
		setInputValue(initialValue);
		setPrevValue(initialValue);
	}

	return (
		<input
			className={styles.input}
			onBlur={() => {
				onCommitValue(inputValue);
			}}
			onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
				const value = ev.currentTarget.value;

				if (value === '') {
					setInputValue('');
				} else {
					setInputValue(parseFloat(ev.currentTarget.value));
				}
			}}
			type="number"
			value={inputValue}
		/>
	);
}

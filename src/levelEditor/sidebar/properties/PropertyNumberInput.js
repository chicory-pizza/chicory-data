// @flow strict

import {useState} from 'react';

import styles from './PropertyNumberInput.module.css';

type Props = $ReadOnly<{
	onCommitValue: (newValue: number | string | null) => mixed,
	initialValue: number | string, // it could a number, string of number, or empty string,
	step?: number,
}>;

export default function PropertyNumberInput({
	onCommitValue,
	initialValue,
	step = 1,
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
					setInputValue(null);
				} else {
					setInputValue(parseFloat(ev.currentTarget.value));
				}
			}}
			onKeyPress={(ev: SyntheticKeyboardEvent<HTMLInputElement>) => {
				if (ev.key === 'Enter') {
					onCommitValue(inputValue);
				}
			}}
			onWheel={(ev: SyntheticWheelEvent<HTMLInputElement>) => {
				ev.currentTarget.blur();
			}}
			type="number"
			step={step ?? 1}
			value={inputValue}
		/>
	);
}

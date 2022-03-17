// @flow strict

import {useState} from 'react';

import styles from './PropertyTextInput.module.css';

type Props = $ReadOnly<{
	onCommitValue: (newValue: string) => mixed,
	initialValue: string,
}>;

export default function PropertyTextInput({
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
				setInputValue(ev.currentTarget.value);
			}}
			onKeyPress={(ev: SyntheticKeyboardEvent<HTMLInputElement>) => {
				if (ev.key === 'Enter') {
					onCommitValue(inputValue);
				}
			}}
			spellCheck={false}
			type="text"
			value={inputValue}
		/>
	);
}

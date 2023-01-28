// @flow strict

import {useState} from 'react';

import styles from './PropertyTextInput.module.css';

type Props = $ReadOnly<{
	initialValue: string,
	onCommitValue: (newValue: string) => mixed,
	testId?: ?string,
}>;

export default function PropertyTextInput({
	initialValue,
	onCommitValue,
	testId,
}: Props): React$Node {
	const [inputValue, setInputValue] = useState(initialValue);
	const [prevValue, setPrevValue] = useState<?string>(null);

	if (initialValue !== prevValue) {
		setInputValue(initialValue);
		setPrevValue(initialValue);
	}

	return (
		<input
			className={styles.input}
			data-testid={testId}
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

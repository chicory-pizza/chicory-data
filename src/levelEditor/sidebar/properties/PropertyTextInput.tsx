import {useState} from 'react';

import styles from './PropertyTextInput.module.css';

type Props = Readonly<{
	initialValue: string;
	onCommitValue: (newValue: string) => void;
	testId?: string | null;
}>;

export default function PropertyTextInput({
	initialValue,
	onCommitValue,
	testId,
}: Props) {
	const [inputValue, setInputValue] = useState(initialValue);
	const [prevValue, setPrevValue] = useState<string | null>(null);

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
			onChange={(ev) => {
				setInputValue(ev.currentTarget.value);
			}}
			onKeyDown={(ev) => {
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

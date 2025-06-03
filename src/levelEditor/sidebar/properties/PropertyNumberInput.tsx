import {useState} from 'react';

import styles from './PropertyNumberInput.module.css';

type Props = Readonly<{
	onCommitValue: (newValue: number | string | null) => void;
	initialValue: number | string | null; // it could a number, string of number, empty string, or property doesn't exist
	step?: number;
}>;

export default function PropertyNumberInput({
	onCommitValue,
	initialValue,
	step = 1,
}: Props) {
	const [inputValue, setInputValue] = useState<number | string | null>(
		initialValue
	);
	const [prevValue, setPrevValue] = useState<number | string | null>(null);

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
			onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
				const value = ev.currentTarget.value;

				if (value === '') {
					setInputValue(null);
				} else {
					setInputValue(parseFloat(ev.currentTarget.value));
				}
			}}
			onKeyPress={(ev: React.KeyboardEvent<HTMLInputElement>) => {
				if (ev.key === 'Enter') {
					onCommitValue(inputValue);
				}
			}}
			onWheel={(ev: React.WheelEvent<HTMLInputElement>) => {
				ev.currentTarget.blur();
			}}
			step={step ?? 1}
			type="number"
			value={inputValue ?? ''}
		/>
	);
}

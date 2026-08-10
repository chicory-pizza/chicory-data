import {TextInput, Tooltip} from '@mantine/core';
import {useState} from 'react';
import tinycolor from 'tinycolor2';

const HEX_CODE_REGEX = /^#?([0-9a-fA-F]{3}){1,2}$/;

type Props = Readonly<{
	initialHexColor: string;
	onCommitValue: (newHex: string) => void;
	onPreviewInput: (newHex: string) => void;
}>;

export default function ColorHexTextInput({
	initialHexColor: initialValue,
	onCommitValue,
	onPreviewInput: onDraftInput,
}: Props) {
	const [inputValue, setInputValue] = useState<string>(initialValue);

	const [prevInitialValue, setPrevInitialValue] = useState(initialValue);
	if (initialValue !== prevInitialValue) {
		setInputValue(initialValue);
		setPrevInitialValue(initialValue);
	}

	return (
		<Tooltip label="Hex code (e.g. #00f3dd)" position="right">
			<TextInput
				aria-label="Hex code (e.g. #00f3dd)"
				// data-testid="colorcalculator-hex"
				error={!HEX_CODE_REGEX.test(inputValue)}
				maxLength={7}
				onBlur={(ev) => {
					const newValue = ev.currentTarget.value;
					if (HEX_CODE_REGEX.test(newValue)) {
						if (newValue.length === 7) {
							onCommitValue(newValue);
						} else {
							// Normalize to hex code with 6 characters
							onCommitValue(tinycolor(newValue).toHexString());
						}
					}
				}}
				onChange={(ev) => {
					const newValue = ev.currentTarget.value;
					setInputValue(newValue);

					if (HEX_CODE_REGEX.test(newValue)) {
						onDraftInput((!newValue.startsWith('#') ? '#' : '') + newValue);
					}
				}}
				spellCheck={false}
				type="text"
				value={inputValue}
			/>
		</Tooltip>
	);
}

import {NumberInput} from '@mantine/core';
import {useState} from 'react';

import convertBgrIntegerToRgb from '../../util/convertBgrIntegerToRgb';
import convertHexToBgrInteger from '../../util/convertHexToBgrInteger';
import convertRgbArrayToString from '../../util/convertRgbArrayToString';

type Props = Readonly<{
	classNames?: React.ComponentProps<typeof NumberInput>['classNames'];
	initialHexColor: string;
	onCommitValue: (newHex: string) => void;
	onPreviewInput: (newHex: string) => void;
	testId?: string;
}>;

export default function ColorGmlTextInput({
	classNames,
	initialHexColor,
	onCommitValue,
	onPreviewInput: onDraftInput,
	testId,
}: Props) {
	const initialValue = convertHexToBgrInteger(initialHexColor);

	const [inputValue, setInputValue] = useState<number | null>(initialValue);

	const [prevInitialValue, setPrevInitialValue] = useState(initialValue);
	if (initialValue !== prevInitialValue) {
		setInputValue(initialValue);
		setPrevInitialValue(initialValue);
	}

	return (
		<NumberInput
			allowDecimal={false}
			allowNegative={false}
			aria-label="GML number"
			clampBehavior="strict"
			classNames={classNames}
			data-testid={testId}
			error={typeof inputValue !== 'number'}
			hideControls
			maxLength={8}
			max={0xffffff}
			min={0}
			onBlur={
				(/*ev*/) => {
					if (typeof inputValue === 'number') {
						onCommitValue(
							convertRgbArrayToString(convertBgrIntegerToRgb(inputValue)),
						);
					}
				}
			}
			onChange={(newValue) => {
				if (typeof newValue === 'number') {
					onDraftInput(
						convertRgbArrayToString(convertBgrIntegerToRgb(newValue)),
					);
				} else {
					setInputValue(null);
				}
			}}
			step={0}
			value={inputValue ?? ''}
			withKeyboardEvents={false}
		/>
	);
}

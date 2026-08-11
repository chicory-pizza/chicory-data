import {NumberInput, Tooltip} from '@mantine/core';
import {useState} from 'react';
import tinycolor, {type ColorFormats} from 'tinycolor2';

type RgbNullable = {
	r: number | null;
	g: number | null;
	b: number | null;
};

function getInitialValues(color: string): ColorFormats.RGB {
	const rgb = tinycolor(color).toRgb();

	return {
		r: rgb.r,
		g: rgb.g,
		b: rgb.b,
	};
}

type Props = Readonly<{
	classNames?: React.ComponentProps<typeof NumberInput>['classNames'];
	initialHexColor: string;
	onCommitValue: (newHex: string) => void;
	onPreviewInput: (newHex: string) => void;
	testIdPrefix?: string;
}>;

export default function ColorRgbTextInputs({
	classNames,
	initialHexColor: initialValue,
	onCommitValue,
	onPreviewInput,
	testIdPrefix,
}: Props) {
	const [inputValue, setInputValue] = useState<RgbNullable>(() =>
		getInitialValues(initialValue),
	);

	const [prevInitialValue, setPrevInitialValue] = useState(initialValue);
	if (initialValue !== prevInitialValue) {
		setInputValue(getInitialValues(initialValue));
		setPrevInitialValue(initialValue);
	}

	function commitRgb() {
		// Only submit the new color if all 3 number inputs are valid
		if (
			typeof inputValue.r === 'number' &&
			typeof inputValue.g === 'number' &&
			typeof inputValue.b === 'number'
		) {
			onCommitValue(
				tinycolor({
					r: inputValue.r,
					g: inputValue.g,
					b: inputValue.b,
				}).toHexString(),
			);
		}
	}

	function setRgbDraft(colorChange: Partial<RgbNullable>) {
		const newColor: Partial<RgbNullable> = {
			r: typeof colorChange.r !== 'undefined' ? colorChange.r : inputValue.r,
			g: typeof colorChange.g !== 'undefined' ? colorChange.g : inputValue.g,
			b: typeof colorChange.b !== 'undefined' ? colorChange.b : inputValue.b,
		};

		// Only show the new color if all 3 number inputs are valid
		if (
			typeof newColor.r === 'number' &&
			typeof newColor.g === 'number' &&
			typeof newColor.b === 'number'
		) {
			onPreviewInput(
				tinycolor({
					r: newColor.r,
					g: newColor.g,
					b: newColor.b,
				}).toHexString(),
			);
		} else {
			setInputValue({
				...inputValue,
				...newColor,
			});
		}
	}

	return (
		<>
			<Tooltip label="Red (0 to 255)">
				<NumberInput
					allowDecimal={false}
					allowNegative={false}
					aria-label="Red (0 to 255)"
					clampBehavior="strict"
					classNames={classNames}
					data-testid={testIdPrefix != null ? testIdPrefix + 'r' : null}
					error={typeof inputValue.r !== 'number'}
					maxLength={3}
					max={255}
					min={0}
					onBlur={commitRgb}
					onChange={(newValue) => {
						if (typeof newValue === 'number') {
							setRgbDraft({r: newValue});
						} else {
							setRgbDraft({r: null});
						}
					}}
					stepHoldDelay={400}
					stepHoldInterval={100}
					value={inputValue.r ?? ''}
				/>
			</Tooltip>

			<Tooltip label="Green (0 to 255)">
				<NumberInput
					allowDecimal={false}
					allowNegative={false}
					aria-label="Green (0 to 255)"
					clampBehavior="strict"
					classNames={classNames}
					data-testid={testIdPrefix != null ? testIdPrefix + 'g' : null}
					error={typeof inputValue.g !== 'number'}
					maxLength={3}
					max={255}
					min={0}
					onBlur={commitRgb}
					onChange={(newValue) => {
						if (typeof newValue === 'number') {
							setRgbDraft({g: newValue});
						} else {
							setRgbDraft({g: null});
						}
					}}
					stepHoldDelay={400}
					stepHoldInterval={100}
					value={inputValue.g ?? ''}
				/>
			</Tooltip>

			<Tooltip label="Blue (0 to 255)">
				<NumberInput
					allowDecimal={false}
					allowNegative={false}
					aria-label="Blue (0 to 255)"
					clampBehavior="strict"
					classNames={classNames}
					data-testid={testIdPrefix != null ? testIdPrefix + 'b' : null}
					error={typeof inputValue.b !== 'number'}
					maxLength={3}
					max={255}
					min={0}
					onBlur={commitRgb}
					onChange={(newValue) => {
						if (typeof newValue === 'number') {
							setRgbDraft({b: newValue});
						} else {
							setRgbDraft({b: null});
						}
					}}
					stepHoldDelay={400}
					stepHoldInterval={100}
					value={inputValue.b ?? ''}
				/>
			</Tooltip>
		</>
	);
}

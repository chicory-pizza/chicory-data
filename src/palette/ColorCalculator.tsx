import {Group} from '@mantine/core';

import ColorGmlTextInput from '../common/color/ColorGmlTextInput';
import ColorHexTextInput from '../common/color/ColorHexTextInput';
import ColorRgbTextInputs from '../common/color/ColorRgbTextInputs';

import styles from './ColorCalculator.module.css';

type Props = Readonly<{
	currentColor: string; // e.g. #00f3dd
	setCurrentColor: (newColor: string) => void;
}>;

export default function ColorCalculator({
	currentColor: value,
	setCurrentColor: onChange,
}: Props) {
	return (
		<Group gap="xs">
			<input
				onChange={(ev) => {
					onChange(ev.currentTarget.value);
				}}
				type="color"
				value={value}
			/>

			<Group gap="xs">
				Hex:
				<ColorHexTextInput
					classNames={{input: styles.textInput}}
					initialHexColor={value}
					onPreviewInput={onChange}
					onCommitValue={onChange}
					// testId="colorcalculator-hex"
				/>
			</Group>

			<Group gap="xs">
				RGB:
				<Group gap="xs" wrap="nowrap">
					<ColorRgbTextInputs
						classNames={{input: styles.rgbInput}}
						initialHexColor={value}
						onPreviewInput={onChange}
						onCommitValue={onChange}
						// testIdPrefix="colorcalculator-"
					/>
				</Group>
			</Group>

			<Group gap="xs">
				GML:
				<ColorGmlTextInput
					classNames={{input: styles.textInput}}
					initialHexColor={value}
					onPreviewInput={onChange}
					onCommitValue={onChange}
					// testId="colorcalculator-gml"
				/>
			</Group>
		</Group>
	);
}

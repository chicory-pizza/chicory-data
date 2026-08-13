import {
	Button,
	ColorPicker,
	ColorSwatch,
	Group,
	Popover,
	Stack,
	Tooltip,
} from '@mantine/core';
import {CaretDownIcon} from '@phosphor-icons/react/dist/csr/CaretDown';
import tinycolor from 'tinycolor2';

import ColorGmlTextInput from './ColorGmlTextInput';
import ColorHexTextInput from './ColorHexTextInput';
import ColorRgbTextInputs from './ColorRgbTextInputs';
import styles from './CustomColorPicker.module.css';

type Props = Readonly<{
	value: string; // e.g. #00f3dd
	onChange: (newColor: string) => void;
	onPreviewChange: (newColor: string) => void;
}>;

export default function CustomColorPicker({
	value,
	onChange,
	onPreviewChange,
}: Props) {
	return (
		<Popover
			onClose={() => {
				// If there is invalid color, force clear the preview value
				onChange(tinycolor(value).toHexString());
			}}
			position="bottom-start"
			transitionProps={{transition: 'pop-top-left'}}
			trapFocus
			width={320}
		>
			<Popover.Target>
				<Tooltip label="Select color">
					<Button
						className={styles.button}
						variant="default"
						size="sm"
						rightSection={<CaretDownIcon size={14} />}
					>
						<ColorSwatch color={value} size={24} />
					</Button>
				</Tooltip>
			</Popover.Target>

			<Popover.Dropdown>
				<Stack gap="md">
					<ColorPicker
						format="hex"
						fullWidth
						value={value}
						onChange={onPreviewChange}
						onChangeEnd={onChange}
					/>

					<div className={styles.textInputsGrid}>
						<div>RGB:</div>
						<Group gap="xs" wrap="nowrap">
							<ColorRgbTextInputs
								initialHexColor={value}
								onPreviewInput={onPreviewChange}
								onCommitValue={onChange}
							/>
						</Group>

						<div>Hex:</div>
						<ColorHexTextInput
							initialHexColor={value}
							onPreviewInput={onPreviewChange}
							onCommitValue={onChange}
							tooltipPosition="right"
						/>

						<div>GML:</div>
						<ColorGmlTextInput
							initialHexColor={value}
							onPreviewInput={onPreviewChange}
							onCommitValue={onChange}
						/>
					</div>
				</Stack>
			</Popover.Dropdown>
		</Popover>
	);
}

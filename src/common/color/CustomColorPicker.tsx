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

import CustomColorGmlTextInput from './ColorGmlTextInput';
import CustomColorHexTextInput from './ColorHexTextInput';
import ColorRgbTextInputs from './ColorRgbTextInputs';
import styles from './CustomColorPicker.module.css';

type Props = Readonly<{
	value: string;
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
			shadow="md"
			transitionProps={{transition: 'fade-down'}}
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
						<CustomColorHexTextInput
							initialHexColor={value}
							onPreviewInput={onPreviewChange}
							onCommitValue={onChange}
						/>

						<div>GML:</div>
						<CustomColorGmlTextInput
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

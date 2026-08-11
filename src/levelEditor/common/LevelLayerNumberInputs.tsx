import {Group, NumberInput} from '@mantine/core';

import styles from './LevelLayerNumberInputs.module.css';

type Props = Readonly<{
	coordinates: [number | null, number | null, number | null];
	onNewCoordinatesSet: (
		newCoordinates: [number | null, number | null, number | null],
	) => void;
	testIdPrefix?: string;
}>;

export default function LevelLayerNumberInputs({
	coordinates,
	onNewCoordinatesSet,
	testIdPrefix,
}: Props) {
	return (
		<Group gap="xs">
			<Group gap="xs">
				Layer:
				<NumberInput
					allowDecimal={false}
					aria-label="Layer in the world map"
					classNames={{input: styles.numberInput}}
					data-testid={testIdPrefix != null ? testIdPrefix + 'layer' : ''}
					error={typeof coordinates[0] !== 'number'}
					onChange={(value) => {
						onNewCoordinatesSet([
							typeof value === 'number' ? value : null,
							coordinates[1],
							coordinates[2],
						]);
					}}
					required
					stepHoldDelay={400}
					stepHoldInterval={100}
					value={coordinates[0] ?? ''}
				/>
			</Group>

			<Group gap="xs">
				X:
				<NumberInput
					allowDecimal={false}
					aria-label="X coordinates in the world map"
					classNames={{input: styles.numberInput}}
					data-testid={testIdPrefix != null ? testIdPrefix + 'x' : ''}
					error={typeof coordinates[1] !== 'number'}
					onChange={(value) => {
						onNewCoordinatesSet([
							coordinates[0],
							typeof value === 'number' ? value : null,
							coordinates[2],
						]);
					}}
					required
					stepHoldDelay={400}
					stepHoldInterval={100}
					value={coordinates[1] ?? ''}
				/>
			</Group>

			<Group gap="xs">
				Y:
				<NumberInput
					allowDecimal={false}
					aria-label="Y coordinates in the world map"
					classNames={{input: styles.numberInput}}
					data-testid={testIdPrefix != null ? testIdPrefix + 'y' : ''}
					error={typeof coordinates[2] !== 'number'}
					onChange={(value) => {
						onNewCoordinatesSet([
							coordinates[0],
							coordinates[1],
							typeof value === 'number' ? value : null,
						]);
					}}
					required
					stepHoldDelay={400}
					stepHoldInterval={100}
					value={coordinates[2] ?? ''}
				/>
			</Group>
		</Group>
	);
}

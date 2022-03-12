// @flow strict

import styles from './LevelLayerNumberInputs.module.css';

type Props = $ReadOnly<{
	coordinates: [?number, ?number, ?number],
	onNewCoordinatesSet: (newCoordinates: [?number, ?number, ?number]) => mixed,
	testIdPrefix?: string,
}>;

export default function LevelLayerNumberInputs({
	coordinates,
	onNewCoordinatesSet,
	testIdPrefix,
}: Props): React$Node {
	return (
		<>
			<span className={styles.label}>Layer:</span>
			<input
				className={styles.numberInput}
				data-testid={testIdPrefix != null ? testIdPrefix + '-layer' : ''}
				onChange={(ev: SyntheticEvent<HTMLInputElement>) => {
					onNewCoordinatesSet([
						ev.currentTarget.value !== ''
							? parseInt(ev.currentTarget.value, 10)
							: null,
						coordinates[1],
						coordinates[2],
					]);
				}}
				required
				type="number"
				value={coordinates[0] ?? ''}
			/>

			<span className={styles.label}>X:</span>
			<input
				className={styles.numberInput}
				data-testid={testIdPrefix != null ? testIdPrefix + '-x' : ''}
				onChange={(ev: SyntheticEvent<HTMLInputElement>) => {
					onNewCoordinatesSet([
						coordinates[0],
						ev.currentTarget.value !== ''
							? parseInt(ev.currentTarget.value, 10)
							: null,
						coordinates[2],
					]);
				}}
				required
				type="number"
				value={coordinates[1] ?? ''}
			/>

			<span className={styles.label}>Y:</span>
			<input
				className={styles.numberInput}
				data-testid={testIdPrefix != null ? testIdPrefix + '-y' : ''}
				onChange={(ev: SyntheticEvent<HTMLInputElement>) => {
					onNewCoordinatesSet([
						coordinates[0],
						coordinates[1],
						ev.currentTarget.value !== ''
							? parseInt(ev.currentTarget.value, 10)
							: null,
					]);
				}}
				required
				type="number"
				value={coordinates[2] ?? ''}
			/>
		</>
	);
}

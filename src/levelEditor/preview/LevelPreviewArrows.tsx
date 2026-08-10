import {Button, Tooltip} from '@mantine/core';
import {ArrowDownIcon} from '@phosphor-icons/react/dist/csr/ArrowDown';
import {ArrowLeftIcon} from '@phosphor-icons/react/dist/csr/ArrowLeft';
import {ArrowRightIcon} from '@phosphor-icons/react/dist/csr/ArrowRight';
import {ArrowUpIcon} from '@phosphor-icons/react/dist/csr/ArrowUp';

import {useCurrentCoordinatesNonNullable} from '../CurrentCoordinatesContext';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import getLevelLabel from '../util/getLevelLabel';
import {useWorldDataNonNullable} from '../WorldDataContext';

import styles from './LevelPreviewArrows.module.css';

export default function LevelPreviewArrows() {
	const {worldData} = useWorldDataNonNullable();
	const [currentCoordinates, setNewCoordinates] =
		useCurrentCoordinatesNonNullable();

	const goUp: [number, number, number] = [
		currentCoordinates[0],
		currentCoordinates[1],
		currentCoordinates[2] - 1,
	];
	const goLeft: [number, number, number] = [
		currentCoordinates[0],
		currentCoordinates[1] - 1,
		currentCoordinates[2],
	];
	const goRight: [number, number, number] = [
		currentCoordinates[0],
		currentCoordinates[1] + 1,
		currentCoordinates[2],
	];
	const goDown: [number, number, number] = [
		currentCoordinates[0],
		currentCoordinates[1],
		currentCoordinates[2] + 1,
	];

	return (
		<>
			<Tooltip
				label={
					'Go up to level ' +
					getLevelLabel(goUp, worldData[convertCoordinatesToLevelId(goUp)])
				}
			>
				<Button
					className={styles.arrowBox + ' ' + styles.top}
					onClick={() => {
						setNewCoordinates(goUp);
					}}
					variant="default"
				>
					<ArrowUpIcon size="1em" />
				</Button>
			</Tooltip>

			<Tooltip
				label={
					'Go left to level ' +
					getLevelLabel(goLeft, worldData[convertCoordinatesToLevelId(goLeft)])
				}
				position="right"
			>
				<Button
					className={styles.arrowBox + ' ' + styles.left}
					onClick={() => {
						setNewCoordinates(goLeft);
					}}
					variant="default"
				>
					<ArrowLeftIcon size="1em" />
				</Button>
			</Tooltip>

			<Tooltip
				label={
					'Go right to level ' +
					getLevelLabel(
						goRight,
						worldData[convertCoordinatesToLevelId(goRight)],
					)
				}
				position="left"
			>
				<Button
					className={styles.arrowBox + ' ' + styles.right}
					onClick={() => {
						setNewCoordinates(goRight);
					}}
					variant="default"
				>
					<ArrowRightIcon size="1em" />
				</Button>
			</Tooltip>

			<Tooltip
				label={
					'Go down to level ' +
					getLevelLabel(goDown, worldData[convertCoordinatesToLevelId(goDown)])
				}
			>
				<Button
					className={styles.arrowBox + ' ' + styles.bottom}
					onClick={() => {
						setNewCoordinates(goDown);
					}}
					variant="default"
				>
					<ArrowDownIcon size="1em" />
				</Button>
			</Tooltip>
		</>
	);
}

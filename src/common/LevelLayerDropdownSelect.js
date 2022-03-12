// @flow strict

import {useCallback, useMemo} from 'react';

import type {LevelType} from '../types/LevelType';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import convertLevelIdToCoordinates from '../util/convertLevelIdToCoordinates';
import getLevelLabel from '../util/getLevelLabel';
import sortCompareCoordinates from '../util/sortCompareCoordinates';

import CustomSelect from './CustomSelect';

type Props = $ReadOnly<{
	levels: {+[levelId: string]: ?LevelType},
	onNewCoordinatesSet: (newCoordinates: [number, number, number]) => mixed,
	selectedCoordinates: [number, number, number],
}>;

export default function LevelLayerDropdownSelect(props: Props): React$Node {
	const {onNewCoordinatesSet} = props;

	const levelIds = useMemo(() => {
		return Object.keys(props.levels).sort((a, b) => {
			return sortCompareCoordinates(
				convertLevelIdToCoordinates(a),
				convertLevelIdToCoordinates(b)
			);
		});
	}, [props.levels]);

	const options = useMemo(() => {
		return levelIds.map((id) => {
			return {
				value: id,
				label: getLevelLabel(convertLevelIdToCoordinates(id), props.levels[id]),
			};
		});
	}, [levelIds, props.levels]);

	const layersGrouped = useMemo(() => {
		const map = new Map();

		options.forEach((option) => {
			const layer = convertLevelIdToCoordinates(option.value)[0];

			if (!map.has(layer)) {
				map.set(layer, {
					label: 'Layer ' + layer,
					options: [],
				});
			}

			map.get(layer)?.options.push(option);
		});

		return Array.from(map.values());
	}, [options]);

	const currentLevelId = convertCoordinatesToLevelId(props.selectedCoordinates);
	const currentSelectOption = options.find((option) => {
		return option.value === currentLevelId;
	});

	const onOptionChange = useCallback(
		(newOption) => {
			onNewCoordinatesSet(convertLevelIdToCoordinates(newOption.value));
		},
		[onNewCoordinatesSet]
	);

	return (
		<CustomSelect
			value={currentSelectOption}
			maxMenuHeight={1000}
			onChange={onOptionChange}
			options={layersGrouped}
		/>
	);
}

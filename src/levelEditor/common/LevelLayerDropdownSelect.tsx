import {useCallback, useMemo, useRef} from 'react';

import CustomSelect from '../../common/CustomSelect';
import type {OptionType} from '../../common/CustomSelect';
import type {WorldType} from '../types/WorldType';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import convertLevelIdToCoordinates from '../util/convertLevelIdToCoordinates';
import getLevelLabel from '../util/getLevelLabel';
import sortCompareCoordinates from '../util/sortCompareCoordinates';

type Props = Readonly<{
	levels: WorldType;
	onNewCoordinatesSet: (newCoordinates: [number, number, number]) => void;
	selectedCoordinates: [number, number, number] | null;
}>;

export default function LevelLayerDropdownSelect(props: Props) {
	const {onNewCoordinatesSet} = props;

	const currentLevelId = props.selectedCoordinates
		? convertCoordinatesToLevelId(props.selectedCoordinates)
		: null;
	const currentSelectOption = useRef<OptionType<string>>(null);

	const levelIds = useMemo(() => {
		return Object.keys(props.levels).sort((a, b) => {
			return sortCompareCoordinates(
				convertLevelIdToCoordinates(a),
				convertLevelIdToCoordinates(b)
			);
		});
	}, [props.levels]);

	const layersGrouped = useMemo(() => {
		const map = new Map<
			number,
			{
				label: string;
				options: Array<OptionType<string>>;
			}
		>();

		levelIds.forEach((id) => {
			const coordinates = convertLevelIdToCoordinates(id);
			const layer = coordinates[0];

			if (!map.has(layer)) {
				map.set(layer, {
					label: 'Layer ' + layer.toString(),
					options: [],
				});
			}

			const option = {
				value: id,
				label: getLevelLabel(coordinates, props.levels[id]),
			};

			map.get(layer)?.options.push(option);

			if (option.value === currentLevelId) {
				currentSelectOption.current = option;
			}
		});

		return Array.from(map.values());
	}, [currentLevelId, levelIds, props.levels]);

	const onOptionChange = useCallback(
		(newOption: OptionType<string> | null) => {
			if (newOption != null) {
				onNewCoordinatesSet(convertLevelIdToCoordinates(newOption.value));
			}
		},
		[onNewCoordinatesSet]
	);

	return (
		<CustomSelect
			maxMenuHeight={1000}
			onChange={onOptionChange}
			options={layersGrouped}
			value={currentSelectOption.current}
		/>
	);
}

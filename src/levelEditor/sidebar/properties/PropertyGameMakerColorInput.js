// @flow strict

import {useCallback} from 'react';

import convertBgrIntegerToRgb from '../../util/convertBgrIntegerToRgb';
import convertHexToBgrInteger from '../../util/convertHexToBgrInteger';

type Props = $ReadOnly<{
	defaultValue: number,
	onEditProperty: (key: string, value: number) => mixed,
	propertyKey: string,
	value: number,
}>;

export default function PropertyGameMakerColorInput({
	defaultValue,
	onEditProperty,
	propertyKey,
	value,
}: Props): React$Node {
	const onChange = useCallback(
		(ev: SyntheticInputEvent<HTMLInputElement>) => {
			onEditProperty(
				propertyKey,
				convertHexToBgrInteger(ev.currentTarget.value)
			);
		},
		[onEditProperty, propertyKey]
	);

	const converted = convertBgrIntegerToRgb(value ?? defaultValue);

	return (
		<input
			onChange={onChange}
			type="color"
			value={
				'#' +
				converted[0].toString(16).padStart(2, '0') +
				converted[1].toString(16).padStart(2, '0') +
				converted[2].toString(16).padStart(2, '0')
			}
		/>
	);
}

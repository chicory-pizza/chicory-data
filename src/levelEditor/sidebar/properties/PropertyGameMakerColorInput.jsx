// @flow strict

import {useCallback} from 'react';

import convertBgrIntegerToRgb from '../../../util/convertBgrIntegerToRgb';
import convertHexToBgrInteger from '../../../util/convertHexToBgrInteger';
import convertRgbArrayToString from '../../util/convertRgbArrayToString';

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

	return (
		<input
			onChange={onChange}
			type="color"
			value={convertRgbArrayToString(
				convertBgrIntegerToRgb(value ?? defaultValue)
			)}
		/>
	);
}

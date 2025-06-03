import {useCallback} from 'react';

import convertBgrIntegerToRgb from '../../../util/convertBgrIntegerToRgb';
import convertHexToBgrInteger from '../../../util/convertHexToBgrInteger';
import convertRgbArrayToString from '../../../util/convertRgbArrayToString';

type Props = Readonly<{
	defaultValue: number;
	onEditProperty: (key: string, value: number) => void;
	propertyKey: string;
	value: number | undefined;
}>;

export default function PropertyGameMakerColorInput({
	defaultValue,
	onEditProperty,
	propertyKey,
	value,
}: Props) {
	const onChange = useCallback(
		(ev: React.ChangeEvent<HTMLInputElement>) => {
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

import {useMemo} from 'react';

import getChicorobotCode from './getChicorobotCode';
import type {ChicorobotDog} from './getChicorobotCode';

export default function DogChicorobotCode(props: ChicorobotDog) {
	const code = useMemo(() => {
		return getChicorobotCode({
			clothes: props.clothes,
			clothesColor: props.clothesColor,
			expression: props.expression,
			hat: props.hat,
			hatColor: props.hatColor,
			hair: props.hair,
			skinColor: props.skinColor,
		});
	}, [
		props.clothes,
		props.clothesColor,
		props.expression,
		props.hair,
		props.hat,
		props.hatColor,
		props.skinColor,
	]);

	return <code>{code}</code>;
}

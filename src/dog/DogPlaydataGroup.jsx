// @flow strict

import {
	MAX_CUSTOM_BRUSH_COLORS,
	PlaydataGenerator,
} from '../playdata/util/PlaydataGenerator';

import styles from './DogPlaydataGroup.module.css';
import type {ChosenHat} from './drawDogToCanvas';

type Props = $ReadOnly<{
	clothes: string,
	clothesColor: string,
	earColor: ?string,
	hair: string,
	hats: $ReadOnlyArray<ChosenHat>,
	skinColor: string,
	skinOutlineColor: string,
}>;

export default function DogPlaydataGroup(props: Props): React$MixedElement {
	const generator = PlaydataGenerator.loadFromDogPreset({
		clothes: props.clothes,
		clothesColor: props.clothesColor,
		hair: props.hair,
		hats: props.hats,
		name: '',
		skinColor: props.skinColor,
	});

	generator.setDogName(null);
	generator.setCustomBrushColors(
		Array.from(
			new Set(
				[
					props.skinColor !== '#ffffff' ? props.skinColor : '',
					props.skinOutlineColor !== '#000000' ? props.skinOutlineColor : '',
					props.clothesColor !== '#ffffff' ? props.clothesColor : '',
					props.earColor !== '#ffffff' ? props.earColor : '',
				].concat(
					props.hats.map((hat) => {
						return hat.color !== '#ffffff' ? hat.color : '';
					})
				)
			)
		)
			.filter(Boolean)
			.slice(0, MAX_CUSTOM_BRUSH_COLORS)
	);

	return (
		<details>
			<summary>Playdata JSON</summary>

			<div>
				<code className={styles.code}>
					{JSON.stringify(generator.exportToGameSave())}
				</code>
			</div>
		</details>
	);
}

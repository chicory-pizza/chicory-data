// @flow strict

import {useState} from 'react';

import CustomModal from '../../common/CustomModal';
import randomItem from '../../util/randomItem';
import DogPreview from '../DogPreview';
import {DOG_EXPRESSION_LIST} from '../types/DogExpressionList';

import styles from './DrawdogGalleryModal.module.css';
import type {DrawdogPreset} from './DrawdogPresets';
import {DRAWDOG_PRESETS} from './DrawdogPresets';

type Props = $ReadOnly<{
	isOpen: boolean,
	onModalRequestClose: () => void,
	onPresetSelect: (preset: DrawdogPreset) => mixed,
}>;

export default function DrawdogGalleryModal(props: Props): React$Node {
	const [dogMouseOver, setDogMouseOver] =
		useState<?{name: string, expression: string}>(null);

	function onSelect(preset) {
		props.onPresetSelect(preset);
		props.onModalRequestClose();
	}

	function onMouseEnter(preset) {
		let randomExpression = randomItem(DOG_EXPRESSION_LIST).value;
		if (randomExpression === 'normal') {
			randomExpression = 'small';
		}

		setDogMouseOver({
			name: preset.name,
			expression: randomExpression,
		});
	}

	function onMouseLeave(preset) {
		if (preset.name === dogMouseOver?.name) {
			setDogMouseOver(null);
		}
	}

	return (
		<CustomModal
			isOpen={props.isOpen}
			onRequestClose={props.onModalRequestClose}
			titleText="Drawdog gallery"
		>
			{props.isOpen ? (
				<div className={styles.grid}>
					{DRAWDOG_PRESETS.map((preset) => {
						return (
							// eslint-disable-next-line jsx-a11y/anchor-is-valid
							<a
								href="#"
								onClick={() => onSelect(preset)}
								onMouseEnter={() => onMouseEnter(preset)}
								onMouseLeave={() => onMouseLeave(preset)}
								className={styles.preset}
								key={preset.name}
							>
								<div className={styles.dogPreview}>
									<DogPreview
										animation="idle"
										clothes={preset.clothes}
										clothesColor={preset.clothesColor}
										customClothesImage={preset.customClothesImage ?? null}
										expression={
											dogMouseOver != null && dogMouseOver.name === preset.name
												? dogMouseOver.expression
												: preset.expression ?? 'normal'
										}
										hats={preset.hats}
										hair={preset.hair}
										height={250}
										skinColor={preset.skinColor}
										skinOutlineColor={preset.skinOutlineColor}
										width={250}
									/>
								</div>

								<div className={styles.name}>{preset.name}</div>
							</a>
						);
					})}
				</div>
			) : null}
		</CustomModal>
	);
}

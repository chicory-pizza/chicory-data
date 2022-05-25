// @flow strict

import {useCallback, useState} from 'react';

import CustomModal from '../../common/CustomModal';
import randomItem from '../../util/randomItem';
import {DOG_EXPRESSION_LIST} from '../types/DogExpressionList';

import DrawdogGalleryDog from './DrawdogGalleryDog';
import styles from './DrawdogGalleryModal.module.css';
import type {DrawdogPreset} from './DrawdogPresets';
import {DRAWDOG_PRESETS} from './DrawdogPresets';

type Props = $ReadOnly<{
	isOpen: boolean,
	onModalRequestClose: () => void,
	onPresetSelect: (preset: DrawdogPreset) => mixed,
}>;

export default function DrawdogGalleryModal({
	isOpen,
	onModalRequestClose,
	onPresetSelect,
}: Props): React$Node {
	const [dogMouseOver, setDogMouseOver] =
		useState<?{name: string, expression: string}>(null);

	const onSelect = useCallback(
		(preset) => {
			setDogMouseOver(null);
			onPresetSelect(preset);
			onModalRequestClose();
		},
		[onModalRequestClose, onPresetSelect]
	);

	const onHoverEnter = useCallback((preset) => {
		let randomExpression = randomItem(DOG_EXPRESSION_LIST).value;
		if (randomExpression === 'normal') {
			randomExpression = 'small';
		}

		setDogMouseOver({
			name: preset.name,
			expression: randomExpression,
		});
	}, []);

	const onHoverLeave = useCallback(
		(preset) => {
			if (preset.name === dogMouseOver?.name) {
				setDogMouseOver(null);
			}
		},
		[dogMouseOver?.name]
	);

	return (
		<CustomModal
			isOpen={isOpen}
			onRequestClose={onModalRequestClose}
			titleText="Drawdog gallery"
		>
			{isOpen ? (
				<div className={styles.grid}>
					{DRAWDOG_PRESETS.map((preset) => {
						return (
							<DrawdogGalleryDog
								forceExpression={
									dogMouseOver != null && dogMouseOver.name === preset.name
										? dogMouseOver.expression
										: null
								}
								key={preset.name}
								onHoverEnter={onHoverEnter}
								onHoverLeave={onHoverLeave}
								onSelect={onSelect}
								preset={preset}
							/>
						);
					})}
				</div>
			) : null}
		</CustomModal>
	);
}

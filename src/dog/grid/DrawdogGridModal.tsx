import {Checkbox, Group, Modal, Stack} from '@mantine/core';
import {useState} from 'react';

import ErrorBoundary from '../../common/ErrorBoundary';
import SearchInput from '../../common/SearchInput';
import isReducedMotion from '../../util/isReducedMotion';
import randomItem from '../../util/randomItem';
import type {DrawdogPresetWithName} from '../presets/DrawdogPresets';
import {DOG_EXPRESSION_LIST} from '../types/DogExpressionList';

import DrawdogGalleryDog from './DrawdogGalleryDog';
import noResultsImage from './drawdoggridmodal-noresults.png';
import styles from './DrawdogGridModal.module.css';

export type Props = Readonly<{
	canChangeExpressionOnMouseOver: boolean;
	canPlayAnimations: boolean;
	isOpen: boolean;
	onModalRequestClose: () => void;
	onPresetSelect: (preset: DrawdogPresetWithName) => void;
	presets: ReadonlyArray<DrawdogPresetWithName>;
	showBody: boolean;
	title: string;
}>;

export default function DrawdogGridModal({
	canChangeExpressionOnMouseOver,
	canPlayAnimations,
	isOpen,
	onModalRequestClose,
	onPresetSelect,
	presets,
	showBody,
	title,
}: Props) {
	const [filter, setFilter] = useState('');
	const [playAnimations, setPlayAnimations] = useState(() => {
		return canPlayAnimations && !isReducedMotion();
	});

	const [dogMouseOver, setDogMouseOver] = useState<{
		name: string;
		expression: string;
	} | null>(null);

	function onSelect(preset: DrawdogPresetWithName) {
		setDogMouseOver(null);
		onPresetSelect(preset);
		onModalRequestClose();
	}

	function onHoverEnter(preset: DrawdogPresetWithName) {
		if (preset.name === dogMouseOver?.name) {
			// Already set
			return;
		}

		let randomExpression;
		do {
			randomExpression = randomItem(DOG_EXPRESSION_LIST).value;
		} while (
			randomExpression === 'normal' ||
			randomExpression === preset.expression
		);

		setDogMouseOver({
			name: preset.name,
			expression: randomExpression,
		});
	}

	function onHoverLeave(preset: DrawdogPresetWithName) {
		if (preset.name === dogMouseOver?.name) {
			setDogMouseOver(null);
		}
	}

	const filterLowercase = filter.toLowerCase().trim();
	const hasAnyVisibleDogs =
		filterLowercase === '' ||
		presets.some((preset) =>
			preset.name.toLowerCase().includes(filterLowercase),
		);

	return (
		<Modal
			onClose={onModalRequestClose}
			opened={isOpen}
			size="auto"
			title={title}
		>
			<ErrorBoundary>
				<Stack>
					<Group>
						<SearchInput setValue={setFilter} value={filter} />

						{canPlayAnimations ? (
							<Checkbox
								checked={playAnimations}
								label="Play animations"
								onChange={(ev) => {
									setPlayAnimations(ev.currentTarget.checked);
								}}
							/>
						) : null}
					</Group>

					<div hidden={!hasAnyVisibleDogs} className={styles.grid}>
						{presets.map((preset) => {
							const hidden = !preset.name
								.toLowerCase()
								.includes(filterLowercase);

							return (
								<div hidden={hidden} key={preset.name}>
									<DrawdogGalleryDog
										forceExpression={
											dogMouseOver != null && dogMouseOver.name === preset.name
												? dogMouseOver.expression
												: undefined
										}
										onHoverEnter={
											canChangeExpressionOnMouseOver ? onHoverEnter : undefined
										}
										onHoverLeave={onHoverLeave}
										onSelect={onSelect}
										playAnimations={!hidden && playAnimations}
										preset={preset}
										showBody={showBody}
									/>
								</div>
							);
						})}
					</div>

					{!hasAnyVisibleDogs ? (
						<div className={styles.noResults}>
							No dogs
							<img
								alt=":chicory_is_straight:"
								className={styles.noResultsImage}
								height={78 / 2}
								src={noResultsImage}
								title=":chicory_is_straight:"
								width={128 / 2}
							/>
						</div>
					) : null}
				</Stack>
			</ErrorBoundary>
		</Modal>
	);
}

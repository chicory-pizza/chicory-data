import {useCallback, useRef, useState} from 'react';

import CustomModal from '../../common/CustomModal';
import ErrorBoundary from '../../common/ErrorBoundary';
import isReducedMotion from '../../util/isReducedMotion';
import randomItem from '../../util/randomItem';
import type {DrawdogPreset} from '../presets/DrawdogPresets';
import {DOG_EXPRESSION_LIST} from '../types/DogExpressionList';

import DrawdogGalleryDog from './DrawdogGalleryDog';
import noResultsImage from './drawdoggridmodal-noresults.png';
import styles from './DrawdogGridModal.module.css';

export type Props = Readonly<{
	canChangeExpressionOnMouseOver: boolean;
	canPlayAnimations: boolean;
	isOpen: boolean;
	onModalRequestClose: () => void;
	onPresetSelect: (preset: DrawdogPreset) => void;
	presets: ReadonlyArray<DrawdogPreset>;
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
	const searchInputRef = useRef<HTMLInputElement>(null);

	const [filter, setFilter] = useState('');
	const [playAnimations, setPlayAnimations] = useState(
		canPlayAnimations && !isReducedMotion()
	);

	const [dogMouseOver, setDogMouseOver] = useState<{
		name: string;
		expression: string;
	} | null>(null);

	const onModalAfterOpen = useCallback(() => {
		const input = searchInputRef.current;
		if (input) {
			input?.focus();
			input?.select();
		}
	}, []);

	const onSelect = useCallback(
		(preset: DrawdogPreset) => {
			setDogMouseOver(null);
			onPresetSelect(preset);
			onModalRequestClose();
		},
		[onModalRequestClose, onPresetSelect]
	);

	const onHoverEnter = useCallback(
		(preset: DrawdogPreset) => {
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
		},
		[dogMouseOver?.name]
	);

	const onHoverLeave = useCallback(
		(preset: DrawdogPreset) => {
			if (preset.name === dogMouseOver?.name) {
				setDogMouseOver(null);
			}
		},
		[dogMouseOver?.name]
	);

	const filterLowercase = filter.toLowerCase().trim();
	const hasAnyVisibleDogs =
		filterLowercase === '' ||
		presets.some((preset) =>
			preset.name.toLowerCase().includes(filterLowercase)
		);

	return (
		<CustomModal
			isOpen={isOpen}
			onAfterOpen={onModalAfterOpen}
			onRequestClose={onModalRequestClose}
			titleText={title}
		>
			{isOpen ? (
				<ErrorBoundary>
					<div className={styles.actions}>
						<label>
							Search:
							<input
								className={styles.searchInput}
								onChange={(newFilter) => {
									setFilter(newFilter.currentTarget.value);
								}}
								ref={searchInputRef}
								spellCheck={false}
								type="search"
								value={filter}
							/>
						</label>

						{canPlayAnimations ? (
							<label>
								<input
									checked={playAnimations}
									onChange={(ev) => {
										setPlayAnimations(ev.currentTarget.checked);
									}}
									type="checkbox"
								/>
								Play animations
							</label>
						) : null}
					</div>

					<div className={styles.grid}>
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
				</ErrorBoundary>
			) : null}
		</CustomModal>
	);
}

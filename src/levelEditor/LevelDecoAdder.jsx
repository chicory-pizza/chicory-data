// @flow strict

import {memo, useState} from 'react';

import styles from './LevelDecoAdder.module.css';
import {SPRITES} from './types/SpriteEntities';
import type {SpriteType} from './types/SpriteType';

type Props = $ReadOnly<{
	onAddingEntityLabel: (entity: {type: 'DECO', data: SpriteType}) => mixed,
}>;

function LevelDecoAdder(props: Props): React$Node {
	const [filter, setFilter] = useState<string>('');

	const urlPrefix = import.meta.env.VITE_SPRITES_URL_PREFIX;

	const filterLowercase = filter.toLowerCase().trim().replace(/ /g, '_');
	const filteredSprites = SPRITES.filter((sprite) => {
		if (filter === '') {
			return true;
		}

		return sprite.toLowerCase().includes(filterLowercase);
	});

	return (
		<div className={styles.root}>
			<div className={styles.search}>
				Search decos:
				<input
					className={styles.searchInput}
					onChange={(newFilter) => {
						setFilter(newFilter.currentTarget.value);
					}}
					spellCheck={false}
					type="search"
					value={filter}
				/>
			</div>

			<div className={styles.sprites}>
				{filteredSprites.length === 0 ? (
					<div className={styles.noResults}>No results</div>
				) : null}

				{filteredSprites.map((sprite) => {
					return (
						// eslint-disable-next-line jsx-a11y/anchor-is-valid
						<a
							className={styles.deco}
							href="#"
							key={sprite}
							onClick={(ev: SyntheticMouseEvent<HTMLAnchorElement>) => {
								ev.preventDefault();

								props.onAddingEntityLabel({
									type: 'DECO',
									data: sprite,
								});
							}}
							title={sprite}
						>
							{urlPrefix != null ? (
								<img
									alt={sprite}
									className={styles.image}
									loading="lazy"
									src={urlPrefix + sprite + '.png'}
								/>
							) : null}

							<span className={styles.text}>{sprite}</span>
						</a>
					);
				})}
			</div>
		</div>
	);
}

export default (memo<Props>(LevelDecoAdder): React$AbstractComponent<
	Props,
	mixed,
>);

import {Box, Stack} from '@mantine/core';
import {memo, useState} from 'react';

import SearchInput from '../common/SearchInput';

import styles from './LevelDecoAdder.module.css';
import {SPRITES} from './types/SpriteEntities';
import type {SpriteType} from './types/SpriteType';

type Props = Readonly<{
	onAddingEntityLabel: (entity: {type: 'DECO'; data: SpriteType}) => void;
}>;

function LevelDecoAdder(props: Props) {
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
		<Stack align="center" gap="xs" p="xs">
			<SearchInput
				className={styles.searchInput}
				label="Search decos"
				setValue={setFilter}
				value={filter}
			/>

			<div className={styles.sprites}>
				{filteredSprites.length === 0 ? <Box my="xs">No results.</Box> : null}

				{filteredSprites.map((sprite) => {
					return (
						// eslint-disable-next-line jsx-a11y-x/anchor-is-valid
						<a
							className={styles.deco}
							href="#"
							key={sprite}
							onClick={(ev) => {
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
		</Stack>
	);
}

export default memo(LevelDecoAdder);

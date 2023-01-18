// @flow strict

import {Fragment} from 'react';
// $FlowFixMe[untyped-import]
import tinycolor from 'tinycolor2';

import styles from './ColorGrid.module.css';

export type Palette = {
	colors: $ReadOnlyArray<[number, number, number]>,
	description: string,
};

type Props = $ReadOnly<{
	palettes: $ReadOnlyArray<Palette>,
}>;

export default function ColorGrid(props: Props): React$Node {
	return (
		<div className={styles.grid}>
			{props.palettes.map((palette) => {
				return (
					<Fragment key={palette.description}>
						<div className={styles.colorItem}>{palette.description}</div>

						{palette.colors.map((color, index) => {
							const [r, g, b] = color;
							const colorObj = tinycolor({r, g, b});

							return (
								<Fragment key={r + '_' + g + '_' + b}>
									{index !== 0 ? <div /> : null}

									<div className={styles.colorItem + ' ' + styles.colorBoxWrap}>
										<div
											className={styles.colorBox}
											style={{background: `rgb(${r}, ${g}, ${b})`}}
										/>
									</div>

									<div className={styles.colorItem}>
										{colorObj.toHexString()}
									</div>

									<div className={styles.colorItem}>R: {r}</div>

									<div className={styles.colorItem}>G: {g}</div>

									<div className={styles.colorItem}>B: {b}</div>
								</Fragment>
							);
						})}
					</Fragment>
				);
			})}
		</div>
	);
}

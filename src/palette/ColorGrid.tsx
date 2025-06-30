import {Fragment} from 'react';
import tinycolor from 'tinycolor2';

import styles from './ColorGrid.module.css';

export type Palette = {
	colors: ReadonlyArray<[number, number, number]>;
	description: string;
};

type Props = Readonly<{
	palettes: ReadonlyArray<Palette>;
}>;

export default function ColorGrid(props: Props) {
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
								<Fragment
									key={r.toString() + '_' + g.toString() + '_' + b.toString()}
								>
									{index !== 0 ? <div /> : null}

									<div className={styles.colorItem + ' ' + styles.colorBoxWrap}>
										<div
											className={styles.colorBox}
											style={{
												background: `rgb(${r.toString()}, ${g.toString()}, ${b.toString()})`,
											}}
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

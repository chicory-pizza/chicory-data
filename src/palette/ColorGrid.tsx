import {Tooltip} from '@mantine/core';
import {Fragment} from 'react';
import tinycolor from 'tinycolor2';

import styles from './ColorGrid.module.css';
import type {PaletteType} from './types/PaletteType';

type Props = Readonly<{
	palettes: ReadonlyArray<PaletteType>;
	setColor?: (newColor: string) => void;
}>;

export default function ColorGrid({palettes, setColor}: Props) {
	return (
		<div className={styles.grid}>
			{palettes.map((palette) => {
				return (
					<Fragment key={palette.description}>
						<div className={styles.colorItem}>{palette.description}</div>

						{palette.colors.map((color, index) => {
							const [r, g, b] = color;
							const colorObj = tinycolor({r, g, b});
							const backgroundStyle = `rgb(${r.toString()}, ${g.toString()}, ${b.toString()})`;

							return (
								<Fragment
									key={r.toString() + '_' + g.toString() + '_' + b.toString()}
								>
									{index !== 0 ? <div /> : null}

									<div className={styles.colorItem + ' ' + styles.colorBoxWrap}>
										{setColor != null ? (
											<Tooltip
												label="Set to this color"
												transitionProps={{transition: 'fade-up'}}
											>
												<button
													className={styles.colorBox}
													onClick={() => {
														setColor(colorObj.toHexString());
													}}
													type="button"
													style={{
														background: backgroundStyle,
													}}
												/>
											</Tooltip>
										) : (
											<div
												className={styles.colorBox}
												style={{
													background: backgroundStyle,
												}}
											/>
										)}
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

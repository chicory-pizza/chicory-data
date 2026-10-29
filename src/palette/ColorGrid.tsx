import {Tooltip} from '@mantine/core';
import {Fragment, memo} from 'react';
import tinycolor from 'tinycolor2';

import styles from './ColorGrid.module.css';
import type {PaletteType} from './types/PaletteType';

type Props = Readonly<{
	palettes: ReadonlyArray<PaletteType>;
	setColor?: (newColor: string) => void;
}>;

function ColorGrid({palettes, setColor}: Props) {
	return (
		<div className={styles.grid}>
			{palettes.map((palette, paletteIndex) => {
				const colorItemClass =
					styles.colorItem +
					' ' +
					(paletteIndex === 0 ? styles.colorItemFirst : '');

				return (
					<Fragment key={palette.description}>
						<div className={colorItemClass}>{palette.description}</div>

						{palette.colors.map((color, index) => {
							const [r, g, b] = color;
							const colorObj = tinycolor({r, g, b});
							const backgroundStyle = `rgb(${r.toString()}, ${g.toString()}, ${b.toString()})`;

							return (
								<Fragment
									key={r.toString() + '_' + g.toString() + '_' + b.toString()}
								>
									{index !== 0 ? <div /> : null}

									<div className={colorItemClass + ' ' + styles.colorBoxWrap}>
										{setColor != null ? (
											<Tooltip label="Set to this color">
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

									<div className={colorItemClass}>{colorObj.toHexString()}</div>

									<div className={colorItemClass}>R: {r}</div>

									<div className={colorItemClass}>G: {g}</div>

									<div className={colorItemClass}>B: {b}</div>
								</Fragment>
							);
						})}
					</Fragment>
				);
			})}
		</div>
	);
}

export default memo(ColorGrid);

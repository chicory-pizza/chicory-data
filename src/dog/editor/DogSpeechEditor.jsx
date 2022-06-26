// @flow strict

import {useMemo} from 'react';

import getFontStyle from '../../fonts/getFontStyle';
import {FONT_LIST} from '../types/FontList';

import CustomMenuWithMouseHoverOptions from './CustomMenuWithMouseHoverOptions.jsx';
import styles from './DogSpeechEditor.module.css';

type Props = $ReadOnly<{
	font: string,
	onFontChange: (value: string) => mixed,
	onPreviewFontChange: (value: ?string) => mixed,
	onShowBubbleChange: (value: boolean) => mixed,
	onTextChange: (value: string) => mixed,
	previewFont: ?string,
	showBubble: boolean,
	text: string,
}>;

export default function DogSpeechEditor(props: Props): React$Node {
	const fontStyle = getFontStyle(props.previewFont ?? props.font);

	const options = useMemo(() => {
		return FONT_LIST.map((option) => {
			return {
				label: option,
				value: option,
			};
		});
	}, []);

	return (
		<div className={styles.root}>
			<div className={styles.fullWidthControl}>
				<label>
					<input
						type="checkbox"
						checked={props.showBubble}
						onChange={(ev) => {
							props.onShowBubbleChange(ev.currentTarget.checked);
						}}
					/>
					Show speech bubble
				</label>
			</div>

			{props.showBubble ? (
				<div className={styles.grid}>
					<div className={styles.label}>Font:</div>
					<div className={styles.selectControl}>
						<CustomMenuWithMouseHoverOptions
							onChange={props.onFontChange}
							onPreviewChange={props.onPreviewFontChange}
							options={options}
							value={props.font}
						/>
					</div>

					<div className={styles.label}>Text:</div>
					<div className={styles.textControl}>
						<textarea
							className={styles.textInput + ' ' + fontStyle}
							onChange={(ev) => {
								props.onTextChange(ev.currentTarget.value);
							}}
							value={props.text}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
}

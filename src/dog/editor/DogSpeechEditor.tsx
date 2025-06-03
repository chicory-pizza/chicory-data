import {useMemo} from 'react';

import type {OptionType} from '../../common/CustomSelect';
import getFontStyle from '../../fonts/getFontStyle';
import {FONT_LIST} from '../types/FontList';

import CustomMenuWithMouseHoverOptions from './CustomMenuWithMouseHoverOptions';
import styles from './DogSpeechEditor.module.css';

function formatOptionLabel(option: OptionType<string>) {
	const fontStyle = getFontStyle(option.value);

	return <span className={fontStyle}>{option.label}</span>;
}

type Props = Readonly<{
	font: string;
	onFontChange: (value: string) => void;
	onPreviewFontChange: (value: string | null) => void;
	onShowBubbleChange: (value: boolean) => void;
	onTextChange: (value: string) => void;
	previewFont: string | null;
	showBubble: boolean;
	text: string;
}>;

export default function DogSpeechEditor(props: Props) {
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
						checked={props.showBubble}
						onChange={(ev) => {
							props.onShowBubbleChange(ev.currentTarget.checked);
						}}
						type="checkbox"
					/>
					Show speech bubble
				</label>
			</div>

			{props.showBubble ? (
				<div className={styles.grid}>
					<div className={styles.label}>Font:</div>
					<div className={styles.selectControl}>
						<CustomMenuWithMouseHoverOptions
							formatOptionLabel={formatOptionLabel}
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

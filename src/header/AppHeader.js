// @flow strict

import icon144 from '../icon144.png';

import styles from './AppHeader.module.css';

type Props = $ReadOnly<{
	dataSelector: React$Node,
	levelSelector: React$Node,
	levelSelectorSide: React$Node,
}>;

export default function AppHeader(props: Props): React$Node {
	return (
		<header className={styles.root}>
			<img
				src={icon144}
				alt="Chicory: A Colorful Tale game logo"
				width={72}
				height={72}
			/>

			<div className={styles.content}>
				<div className={styles.leftRight}>
					<div className={styles.leftSide}>
						<h1 className={styles.title}>Chicory: A Colorful Data</h1>
					</div>

					{props.dataSelector}
				</div>

				<div className={styles.leftRight}>
					<div className={styles.leftSide}>{props.levelSelector}</div>

					{props.levelSelectorSide}
				</div>
			</div>
		</header>
	);
}

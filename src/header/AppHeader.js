// @flow strict

/* eslint-disable react/jsx-no-target-blank */

import icon144 from '../icon144.png';

import styles from './AppHeader.module.css';
import DiscordIcon from './DiscordIcon';
import GitHubIcon from './GitHubIcon';

type Props = $ReadOnly<{
	controls?: React$Node,
	title: string,
	titleSideStuff?: React$Node,
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
					<h1 className={styles.title}>{props.title}</h1>

					<div className={styles.dataSelector}>{props.titleSideStuff}</div>

					<a
						className={styles.websiteLink}
						href="/discord"
						rel="noopener"
						target="_blank"
						title="Join the Chicory fan Discord"
					>
						<DiscordIcon className={styles.discordIcon} />
					</a>

					<a
						className={styles.websiteLink}
						href="https://github.com/chicory-pizza/chicory-data"
						rel="noopener"
						target="_blank"
						title="View this project on GitHub"
					>
						<GitHubIcon className={styles.githubIcon} />
					</a>
				</div>

				{props.controls}
			</div>
		</header>
	);
}

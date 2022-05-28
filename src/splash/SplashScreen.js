// @flow strict

/* eslint-disable react/jsx-no-target-blank */

import {Link} from 'react-router-dom';

import DiscordIcon from '../header/DiscordIcon';
import GitHubIcon from '../header/GitHubIcon';

import SplashChicoryLogo from './SplashChicoryLogo';
import styles from './SplashScreen.module.css';

export default function SplashScreen(): React$Node {
	return (
		<div className={styles.root}>
			<SplashChicoryLogo />

			<h1 className={styles.heading}>Chicory: A Colorful Modding</h1>

			<Link to="/level/0_0_0" className={styles.link}>
				⛰ Level editor
			</Link>

			<Link to="/dog" className={styles.link}>
				🐶 Drawdog maker
			</Link>

			<a
				className={styles.link}
				href="https://map.chicory.pizza"
				target="_blank"
			>
				🗺 Map viewer
			</a>

			<Link to="/palette" className={styles.link}>
				🎨 Color palettes
			</Link>

			<a
				className={styles.link}
				href="https://docs.google.com/spreadsheets/d/1RCRK68APK2YovAyr5QhjddNkknHaAGoHCcA0do3UYfs/edit"
				target="_blank"
			>
				📝 Text viewer
			</a>

			<div className={styles.icons}>
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
		</div>
	);
}

// @flow strict

/* eslint-disable react/jsx-no-target-blank */

import {Link} from 'react-router-dom';

import DiscordIcon from '../header/DiscordIcon';
import GitHubIcon from '../header/GitHubIcon';

import logoImg from './logo.gif';
import styles from './SplashScreen.module.css';

export default function SplashScreen(): React$Node {
	return (
		<div className={styles.root}>
			<img src={logoImg} width={350} height={197} alt="Chicory logo" />

			<h1 className={styles.heading}>Chicory: A Colorful Modding</h1>

			<Link to="/level/0_0_0" className={styles.link}>
				⛰ Level editor
			</Link>

			<Link to="/dog" className={styles.link}>
				🐶 Drawdog maker
			</Link>

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
/* eslint-disable @eslint-react/dom-no-unsafe-target-blank */

import {Tooltip} from '@mantine/core';
import {Link} from '@tanstack/react-router';

import OpenGraph from '../common/OpenGraph';
import DiscordIcon from '../header/DiscordIcon';
import GitHubIcon from '../header/GitHubIcon';
import useMobileViewport from '../util/useMobileViewport';

import SplashChicoryLogo from './SplashChicoryLogo';
import styles from './SplashScreen.module.css';

export default function SplashScreen() {
	useMobileViewport();

	return (
		<div className={styles.root}>
			<OpenGraph
				description="Modding tools for Chicory: A Colorful Tale, such as level viewer and editor"
				title=""
				url=""
			/>

			<SplashChicoryLogo />

			<h1 className={styles.heading}>Chicory: A Colorful Modding</h1>

			<Link
				className={styles.link}
				to="/level/$levelId"
				params={{levelId: '0_0_0'}}
				preload="intent"
			>
				⛰ Level editor
			</Link>

			<Link className={styles.link} to="/dog" preload="intent">
				🐶 Drawdog maker
			</Link>

			<div className={styles.infoGroupSeparator} />

			<a
				className={styles.link}
				href="https://map.chicory.pizza"
				target="_blank"
				rel="noopener"
			>
				🗺 Map viewer
			</a>

			<Link className={styles.link} to="/palette" preload="intent">
				🎨 Color palettes
			</Link>

			<a
				className={styles.link}
				href="https://docs.google.com/spreadsheets/d/1RCRK68APK2YovAyr5QhjddNkknHaAGoHCcA0do3UYfs/edit"
				target="_blank"
				rel="noopener"
			>
				📝 Text viewer
			</a>

			<a
				className={styles.link}
				href="https://wiki.chicory.pizza"
				target="_blank"
				rel="noopener"
			>
				📘 Wiki
			</a>

			<div className={styles.icons}>
				<Tooltip label="Join the Chicory fan Discord">
					<a
						className={styles.websiteLink}
						href="https://discord.chicory.pizza"
						target="_blank"
						rel="noopener"
					>
						<DiscordIcon className={styles.discordIcon} />
					</a>
				</Tooltip>

				<Tooltip label="View this project on GitHub">
					<a
						className={styles.websiteLink}
						href="https://github.com/chicory-pizza/chicory-data"
						target="_blank"
						rel="noopener"
					>
						<GitHubIcon className={styles.githubIcon} />
					</a>
				</Tooltip>
			</div>
		</div>
	);
}

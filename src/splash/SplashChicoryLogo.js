// @flow strict

import {useEffect, useState} from 'react';

import useInterval from '../util/useInterval';
import useVisibilityChange from '../util/useVisibilityChange';

import logoImg from './logo_sprite.png';
import styles from './SplashChicoryLogo.module.css';

const FRAME_HEIGHT = 394 / 2;

export default function SplashChicoryLogo(): React$Node {
	const [loaded, setLoaded] = useState(false);
	const [animationIndex, setAnimationIndex] = useState(0);
	const [fallback, setFallback] = useState(false);

	useEffect(() => {
		const img = new Image();

		img.onload = () => {
			setLoaded(true);
		};

		img.onerror = () => {
			setFallback(true);
		};

		img.src = logoImg;
	}, []);

	const isPageVisible = useVisibilityChange();
	useInterval(
		() => {
			setAnimationIndex(animationIndex < 17 ? animationIndex + 1 : 15);
		},
		loaded && !fallback && isPageVisible
			? animationIndex < 15
				? 1000 / (60 / 5)
				: 1000 / (60 / 14)
			: null
	);

	return (
		<div
			aria-label="Chicory logo"
			className={styles.logo + ' ' + (fallback ? styles.logoFallback : '')}
			style={{
				backgroundPosition: loaded
					? '0 ' + -FRAME_HEIGHT * animationIndex + 'px'
					: '',
			}}
		/>
	);
}

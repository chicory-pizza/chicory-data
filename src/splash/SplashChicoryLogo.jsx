// @flow strict

import {useEffect, useState} from 'react';
import {useInterval} from 'react-use';

import useReducedMotion from '../util/useReducedMotion';
import useVisibilityChange from '../util/useVisibilityChange';

import logoImg from './logo_sprite.png';
import styles from './SplashChicoryLogo.module.css';

const FRAME_HEIGHT = 394 / 2;

export default function SplashChicoryLogo(): React$Node {
	const [loaded, setLoaded] = useState(false);
	const [animationIndex, setAnimationIndex] = useState(0);
	const [fallback, setFallback] = useState(false);
	const isReducedMotion = useReducedMotion();

	const postAnimate = !fallback && !(animationIndex < 15);

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
			setAnimationIndex(animationIndex + 1);
		},
		loaded && !fallback && !postAnimate && !isReducedMotion && isPageVisible
			? 1000 / (60 / 5)
			: null
	);

	return (
		<div
			aria-label="Chicory logo"
			className={
				styles.logo +
				' ' +
				(fallback ? styles.logoFallback : '') +
				' ' +
				(postAnimate ? styles.postAnimate : '')
			}
			style={{
				backgroundPosition:
					loaded && !postAnimate && !isReducedMotion
						? '0 ' + -FRAME_HEIGHT * animationIndex + 'px'
						: '',
			}}
		/>
	);
}

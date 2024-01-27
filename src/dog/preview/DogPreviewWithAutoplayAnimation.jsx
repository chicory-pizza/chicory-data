// @flow strict

import {useState} from 'react';
// $FlowFixMe[untyped-import]
import {useInView} from 'react-intersection-observer';
import {useInterval} from 'react-use';

import useVisibilityChange from '../../util/useVisibilityChange';
import DOG_ANIMATIONS from '../types/DogAnimations';

import DogPreview from './DogPreview';
import type {Props as DogPreviewProps} from './DogPreview';

type Props = $ReadOnly<{
	...$Diff<
		DogPreviewProps,
		{
			animationIndex: number,
		},
	>,
	playAnimations: boolean,
}>;

export default function DogPreviewWithAutoplayAnimation(
	props: Props
): React$MixedElement {
	const animationInfo = DOG_ANIMATIONS.get(props.animation);
	if (animationInfo == null) {
		throw new Error('Invalid animation ' + props.animation);
	}

	const [animationIndex, setAnimationIndex] = useState(0);
	const playAnimations = props.playAnimations ?? true;
	const isPageVisible = useVisibilityChange();
	const {ref: intersectionObserverRef, inView} = useInView();
	useInterval(
		() => {
			setAnimationIndex(
				animationIndex < animationInfo.headAnim.length - 1
					? animationIndex + 1
					: 0
			);
		},
		playAnimations &&
			isPageVisible &&
			inView &&
			animationInfo.headAnim.length > 0
			? 200
			: null
	);

	const {playAnimations: _, ...propsForDogPreview} = props;

	return (
		<div ref={intersectionObserverRef}>
			<DogPreview animationIndex={animationIndex} {...propsForDogPreview} />
		</div>
	);
}

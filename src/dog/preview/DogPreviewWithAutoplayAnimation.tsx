import {useDocumentVisibility, useIntersection} from '@mantine/hooks';
import {useState} from 'react';
import {useInterval} from 'react-use';

import DOG_ANIMATIONS from '../types/DogAnimations';

import DogPreview from './DogPreview';

type Props = Readonly<
	Omit<React.ComponentProps<typeof DogPreview>, 'animationIndex'> & {
		playAnimations: boolean;
	}
>;

export default function DogPreviewWithAutoplayAnimation(props: Props) {
	const animationInfo = DOG_ANIMATIONS.get(props.animation);
	if (animationInfo == null) {
		throw new Error('Invalid animation ' + props.animation);
	}

	const [animationIndex, setAnimationIndex] = useState(0);
	const playAnimations = props.playAnimations;
	const pageVisibility = useDocumentVisibility();
	const {ref: intersectionObserverRef, entry} = useIntersection();

	useInterval(
		() => {
			setAnimationIndex(
				animationIndex < animationInfo.headAnim.length - 1
					? animationIndex + 1
					: 0
			);
		},
		playAnimations &&
			pageVisibility === 'visible' &&
			entry?.isIntersecting &&
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

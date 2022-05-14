// @flow strict

import type {ChosenHat} from './drawDogToCanvas';

export type ChosenHatWithPreview = $ReadOnly<{
	...ChosenHat,
	previewName: ?string,
}>;

type HatState = $ReadOnly<{
	hats: $ReadOnlyArray<ChosenHatWithPreview>,
}>;

export type HatReducerAction =
	| {type: 'addNewLayer'}
	| {type: 'setLayerProperties', layer: number, hat: ChosenHatWithPreview}
	| {type: 'moveLayerUp', layer: number}
	| {type: 'moveLayerDown', layer: number}
	| {type: 'deleteLayer', layer: number};

export function reducer(state: HatState, action: HatReducerAction): HatState {
	switch (action.type) {
		case 'addNewLayer':
			return {
				...state,
				hats: [
					...state.hats,
					{
						name: 'None',
						color: '#FFFFFF',
						customImage: null,
						previewName: null,
					},
				],
			};

		case 'setLayerProperties':
			return {
				...state,
				hats: state.hats
					.slice(0, action.layer)
					.concat(action.hat)
					.concat(state.hats.slice(action.layer + 1)),
			};

		case 'moveLayerUp':
			if (action.layer === 0) {
				// Already at the top
				return state;
			}

			return {
				...state,
				hats: state.hats
					.slice(0, action.layer - 1)
					.concat(state.hats[action.layer])
					.concat(state.hats[action.layer - 1])
					.concat(state.hats.slice(action.layer + 1)),
			};

		case 'moveLayerDown':
			if (action.layer === state.hats.length - 1) {
				// Already at the bottom
				return state;
			}

			return {
				...state,
				hats: state.hats
					.slice(0, action.layer)
					.concat(state.hats[action.layer + 1])
					.concat(state.hats[action.layer])
					.concat(state.hats.slice(action.layer + 2)),
			};

		case 'deleteLayer':
			return {
				...state,
				hats: state.hats
					.slice(0, action.layer)
					.concat(state.hats.slice(action.layer + 1)),
			};

		default:
			throw new Error('Unknown hat reducer action ' + action.type);
	}
}

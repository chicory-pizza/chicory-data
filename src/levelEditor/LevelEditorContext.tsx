import {createContext, use, useMemo, useReducer} from 'react';

import type {LevelInspectorUiView} from './types/LevelInspectorUiView';

type LevelEditorState = Readonly<{
	uiViews: Set<LevelInspectorUiView>;
}>;

type ReducerAction = {
	type: 'setActiveUiViews';
	uiViews: Set<LevelInspectorUiView>;
};

function reducer(
	state: LevelEditorState,
	action: ReducerAction
): LevelEditorState {
	switch (action.type) {
		case 'setActiveUiViews':
			return {
				...state,
				uiViews: action.uiViews,
			};

		default:
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			throw new Error('Unknown level editor reducer action ' + action.type);
	}
}

type ContextValue = Readonly<{
	dispatch: (action: ReducerAction) => void;
	uiViews: Set<LevelInspectorUiView>;
}>;

const LevelEditorContext = createContext<ContextValue | null>(null);

type Props = Readonly<{
	children: React.ReactNode;
}>;

export function LevelEditorProvider({children}: Props) {
	const [state, dispatch] = useReducer(reducer, {
		uiViews: new Set<LevelInspectorUiView>([
			'WORLD_MAP',
			'PREVIEW',
			'SIDEBAR',
			'GEO',
			'OBJECT',
		]),
	});

	const contextValue = useMemo(() => {
		return {
			dispatch,
			uiViews: state.uiViews,
		};
	}, [dispatch, state]);

	return (
		<LevelEditorContext value={contextValue}>{children}</LevelEditorContext>
	);
}

export function useLevelEditorContext(): ContextValue {
	const context = use(LevelEditorContext);

	if (!context) {
		throw new Error(
			'useLevelEditorContext must be used within a LevelEditorProvider'
		);
	}

	return context;
}

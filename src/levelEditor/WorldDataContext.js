// @flow strict

import {createContext, useContext, useState} from 'react';

import type {LevelType} from './types/LevelType';

const WorldDataContext = createContext();

type WorldType = {[levelId: string]: LevelType};

type Props = $ReadOnly<{
	children: React$Node,
}>;

export function WorldDataProvider({children}: Props): React$Node {
	const [worldData, setWorldData] = useState<?WorldType>(null);

	return (
		<WorldDataContext.Provider value={{worldData, setWorldData}}>
			{children}
		</WorldDataContext.Provider>
	);
}

export function useWorldData(): [
	?WorldType,
	(newWorldData: ?WorldType) => mixed
] {
	const context = useContext(WorldDataContext);

	if (!context) {
		throw new Error('useWorldData must be used within a WorldDataProvider');
	}

	return [context.worldData, context.setWorldData];
}

export function useWorldDataNonNullable(): [
	WorldType,
	(newWorldData: ?WorldType) => mixed
] {
	const hook = useWorldData();

	if (hook[0] == null) {
		throw new Error('worldData is null');
	}

	return [hook[0], hook[1]];
}

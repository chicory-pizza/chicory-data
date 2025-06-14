import {createContext, useContext, useMemo} from 'react';

import type {UndoReducerAction} from '../util/useUndoRedoReducer';
import useUndoRedoReducer from '../util/useUndoRedoReducer';

import {
	isValidDecorationTypeKey,
	type DecorationType,
} from './types/DecorationType';
import type {GameEntityType} from './types/GameEntityType';
import {type LevelType} from './types/LevelType';
import type {PlaceableType} from './types/PlaceableType';
import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';

export type WorldType = {
	[levelId: string]: LevelType;
};

function assertNonNullableWorldData(
	worldData: WorldType | null
): asserts worldData is WorldType {
	if (worldData == null) {
		throw new Error('No world data');
	}
}

function getNonNullableLevel(
	worldData: WorldType | null,
	coordinates: [number, number, number]
): [LevelType, string] {
	assertNonNullableWorldData(worldData);

	const levelId = convertCoordinatesToLevelId(coordinates);
	const level: LevelType | undefined = worldData[levelId];
	if (level == null) {
		throw new Error(
			`Can't set property for level ${levelId} because the level doesn't exist`
		);
	}

	return [level, levelId];
}

type ReducerAction =
	| UndoReducerAction
	| {
			type: 'setWorldData';
			worldData: WorldType;
	  }
	| {
			type: 'newBlankLevel';
			coordinates: [number, number, number];
	  }
	| {
			type: 'setLevelProperty';
			coordinates: [number, number, number];
			key: keyof LevelType;
			value: string | number | null;
	  }
	| {
			type: 'addEntityToLevel';
			coordinates: [number, number, number];
			entity: PlaceableType;
			x: number;
			y: number;
	  }
	| {
			type: 'editEntityPropertiesOnLevel';
			coordinates: [number, number, number];
			index: number;
			properties: {
				[key: string]: string | number | null;
			};
			entityType: GameEntityType;
	  }
	| {
			type: 'deleteEntityOnLevel';
			coordinates: [number, number, number];
			index: number;
			entityType: GameEntityType;
	  }
	| {
			type: 'duplicateLevel';
			from: [number, number, number];
			to: [number, number, number];
	  }
	| {
			type: 'setRawLevel';
			coordinates: [number, number, number];
			level: LevelType;
	  }
	| {
			type: 'deleteLevel';
			coordinates: [number, number, number];
	  };

function reducer(state: WorldType | null, action: ReducerAction): WorldType {
	switch (action.type) {
		case 'setWorldData':
			return action.worldData;

		case 'newBlankLevel':
			return {
				...state,
				[convertCoordinatesToLevelId(action.coordinates)]: {
					ambiance: '-1',
					objects: [],
					geo: 'eJztwTEBAAAAwqD1T20LL6AAAADgbQ6OAAE=',
					foley: '0 ',
					palette: '',
					area: '',
					transition: '0',
					music: '-1',
					decos: [],
					object_id: '',
					name: '',
				},
			};

		case 'setLevelProperty': {
			assertNonNullableWorldData(state);

			const [level, levelId] = getNonNullableLevel(state, action.coordinates);
			if (
				level[action.key] === action.value ||
				(action.value === '' && level[action.key] == null)
			) {
				// If old and new values are the same, do nothing
				return state;
			}

			const newProperties = {...level};
			if (action.value !== null) {
				// @ts-expect-error setting with dynamic key
				newProperties[action.key] = action.value;
			} else {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete newProperties[action.key];
			}

			return {
				...state,
				[levelId]: newProperties,
			};
		}

		case 'addEntityToLevel': {
			assertNonNullableWorldData(state);

			const [level, levelId] = getNonNullableLevel(state, action.coordinates);

			if (action.entity.type === 'OBJECT') {
				return {
					...state,
					[levelId]: {
						...level,
						// @ts-expect-error fix the GameObjectType union type
						objects: (level.objects ?? []).concat({
							obj: action.entity.data,
							x: action.x,
							y: action.y,
						}),
					},
				};
			} else {
				return {
					...state,
					[levelId]: {
						...level,
						decos: (level.decos ?? []).concat({
							spr: action.entity.data,
							x: action.x,
							y: action.y,
							xs: 1.0,
							ys: 1.0,
							ang: 0.0,
						}),
					},
				};
			}
		}

		case 'editEntityPropertiesOnLevel': {
			assertNonNullableWorldData(state);

			const [level, levelId] = getNonNullableLevel(state, action.coordinates);

			let hasChanged = false;
			if (action.entityType === 'OBJECT') {
				const levelObjects = level.objects;
				if (levelObjects == null || levelObjects.length === 0) {
					return state;
				}

				const newProperties = {
					...levelObjects[action.index],
				};
				Object.keys(action.properties).forEach((key) => {
					const newValue = action.properties[key];

					// If old and new values are the same, do nothing
					// @ts-expect-error setting with dynamic key
					if (levelObjects[action.index][key] === newValue) {
						return;
					}

					if (
						(newValue === '' || newValue == null) &&
						// @ts-expect-error setting with dynamic key
						levelObjects[action.index][key] == null
					) {
						return;
					}

					hasChanged = true;

					if (newValue !== null) {
						// @ts-expect-error setting with dynamic key
						newProperties[key] = newValue;
					} else {
						// @ts-expect-error setting with dynamic key
						// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
						delete newProperties[key];
					}
				});

				if (!hasChanged) {
					return state;
				}

				return {
					...state,
					[levelId]: {
						...level,
						objects: levelObjects
							.slice(0, action.index)
							.concat(newProperties)
							.concat(levelObjects.slice(action.index + 1)),
					},
				};
			}

			const levelDecos = level.decos;
			if (levelDecos == null || levelDecos.length === 0) {
				return state;
			}

			const newProperties: DecorationType = {
				...levelDecos[action.index],
			};
			Object.keys(action.properties).forEach((key) => {
				const value = action.properties[key];

				if (!isValidDecorationTypeKey(key)) {
					return;
				}

				if (
					levelDecos[action.index][key] === value ||
					(value === '' && levelDecos[action.index][key] == null)
				) {
					// If old and new values are the same, do nothing
					return;
				}

				hasChanged = true;

				if (value !== null) {
					// @ts-expect-error setting with dynamic key
					newProperties[key] = value;
				} else {
					// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
					delete newProperties[key];
				}
			});

			if (!hasChanged) {
				return state;
			}

			return {
				...state,
				[levelId]: {
					...level,
					decos: levelDecos
						.slice(0, action.index)
						.concat(newProperties)
						.concat(levelDecos.slice(action.index + 1)),
				},
			};
		}

		case 'deleteEntityOnLevel': {
			assertNonNullableWorldData(state);

			const [level, levelId] = getNonNullableLevel(state, action.coordinates);

			if (action.entityType === 'OBJECT') {
				const levelObjects = level.objects;
				if (levelObjects == null || levelObjects.length === 0) {
					return state;
				}
				return {
					...state,
					[levelId]: {
						...level,
						objects: levelObjects
							.slice(0, action.index)
							.concat(levelObjects.slice(action.index + 1)),
					},
				};
			} else {
				const levelDecos = level.decos;
				if (levelDecos == null || levelDecos.length === 0) {
					return state;
				}
				return {
					...state,
					[levelId]: {
						...level,
						decos: levelDecos
							.slice(0, action.index)
							.concat(levelDecos.slice(action.index + 1)),
					},
				};
			}
		}

		case 'duplicateLevel':
			assertNonNullableWorldData(state);

			return {
				...state,
				[convertCoordinatesToLevelId(action.to)]:
					state[convertCoordinatesToLevelId(action.from)],
			};

		case 'setRawLevel':
			assertNonNullableWorldData(state);

			return {
				...state,
				[convertCoordinatesToLevelId(action.coordinates)]: action.level,
			};

		case 'deleteLevel': {
			const newLevels = Object.assign({}, state);
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete newLevels[convertCoordinatesToLevelId(action.coordinates)];
			return newLevels;
		}

		default:
			throw new Error('Unknown WorldData reducer action ' + action.type);
	}
}

type ContextValue = Readonly<{
	worldData: WorldType | null;
	dispatch: (action: ReducerAction) => void;
	canUndo: boolean;
	canRedo: boolean;
}>;

const WorldDataContext = createContext<ContextValue | null>(null);

type Props = Readonly<{
	children: React.ReactNode;
}>;

export function WorldDataProvider({children}: Props) {
	const {
		currentState: worldData,
		dispatch,
		canUndo,
		canRedo,
	} = useUndoRedoReducer(reducer, null);

	const contextValue = useMemo(() => {
		return {worldData, dispatch, canUndo, canRedo};
	}, [worldData, dispatch, canUndo, canRedo]);

	return <WorldDataContext value={contextValue}>{children}</WorldDataContext>;
}

export function useWorldDataNullable(): ContextValue {
	const context = useContext(WorldDataContext);

	if (!context) {
		throw new Error('useWorldData must be used within a WorldDataProvider');
	}

	return context;
}

export function useWorldDataNonNullable(): Readonly<
	Omit<ContextValue, 'worldData'> & {
		worldData: WorldType;
	}
> {
	const hook = useWorldDataNullable();

	if (hook.worldData == null) {
		throw new Error('worldData is null');
	}

	// @ts-expect-error worldData is not null
	return hook;
}

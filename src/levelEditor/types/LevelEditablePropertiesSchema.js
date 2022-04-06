// @flow strict

import type {EditablePropertiesType} from './EditablePropertiesSchemaType';
import {LEVEL_AMBIANCE_LIST} from './LevelAmbianceList';
import {LEVEL_AREA_LIST} from './LevelAreaList';
import {LEVEL_MUSIC_LIST} from './LevelMusicList';

export const LEVEL_EDITABLE_PROPERTIES_SCHEMA: Array<EditablePropertiesType> = [
	{key: 'ambiance', type: 'ENUM', options: LEVEL_AMBIANCE_LIST},
	{key: 'area', type: 'ENUM', options: LEVEL_AREA_LIST},
	// decos
	{key: 'exits', type: 'STRING'},
	{key: 'foley', type: 'STRING'},
	// geo
	{key: 'music', type: 'ENUM', options: LEVEL_MUSIC_LIST},
	{key: 'name', type: 'STRING'}, // enum
	{key: 'object_id', type: 'NUMBER'},
	// objects
	{key: 'palette', type: 'PALETTE'},
	{key: 'title', type: 'STRING'}, // enum
	{key: 'transition', type: 'NUMBER'},
];

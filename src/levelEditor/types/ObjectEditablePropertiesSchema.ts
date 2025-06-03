import {DOG_ANIMATION_LIST} from '../../dog/types/DogAnimationList';
import {DOG_CLOTHES_LIST} from '../../dog/types/DogClothesList';
import {DOG_HAIR_LIST} from '../../dog/types/DogHairList';
import {DOG_HAT_LIST} from '../../dog/types/DogHatList';

import type {EditablePropertiesType} from './EditablePropertiesSchemaType';

// Massive thanks to https://github.com/JdavisBro for finding these object properties!!

const OBJECT_EDITABLE_PROPERTIES_SCHEMA: Map<
	string,
	ReadonlyArray<EditablePropertiesType>
> = new Map();

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objAudioparamsetter', [
	{key: 'param', type: 'STRING', default: 'spookiness', help: 'param?'},
	{key: 'val', type: 'NUMBER', default: 0, help: 'param?'},
	{key: 'time', type: 'NUMBER', default: 0, help: 'param?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBard', [
	{key: 'recording', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBeachline', [
	{key: 'dir', type: 'NUMBER', default: 0, help: 'direction?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBellLine', [
	{key: 'x2', type: 'NUMBER', default: 300, help: 'x2'},
	{key: 'y2', type: 'NUMBER', default: 0, help: 'y2'},
	{key: 'dip', type: 'NUMBER', default: 0.25, help: 'as % of length'},
	{key: 'height', type: 'NUMBER', default: 4, help: 'my z'},
	{key: 'num', type: 'NUMBER', default: 3, help: 'how many bells'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBench_travel', [
	{key: 'anim', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBlackberry', [
	{key: 'towerscene', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBlackooze', [
	{key: 'width', type: 'NUMBER', default: 10, help: 'width times 24'},
	{key: 'height', type: 'NUMBER', default: 10, help: 'height times 24'},
	{key: 'corner', type: 'NUMBER', default: 3, help: 'corner size for rounding'},
	{key: 'erase', type: 'NUMBER', default: 0, help: 'am i an anti-ooze shape'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBlacksolid', [
	{key: 'ydist', type: 'NUMBER', default: -48, help: 'dist for fade'},
	{key: 'qual', type: 'NUMBER', default: 0, help: 'qual'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBoss3encounter', [
	{key: 'shrink', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBoss3', [
	{key: 'intro_trans', type: 'NUMBER', default: 0, help: 'HIDDEN'},
	{key: 'alpha1', type: 'NUMBER', default: -1, help: 'HIDDEN'},
	{key: 'alpha2', type: 'NUMBER', default: -1, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBoss4', [
	{key: 'ending_timing', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBoss5', [
	{key: 'pool', type: 'NUMBER', default: 0, help: 'HIDDEN'},
	{key: 'attk_start', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBossSteal', [
	{key: 'bite', type: 'NUMBER', default: 0, help: 'HIDDEN'},
	{key: 'fade', type: 'NUMBER', default: 0, help: 'HIDDEN'},
	{key: 'music', type: 'NUMBER', default: -1, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBosstree', [
	{
		key: 'progress',
		type: 'NUMBER',
		default: 0,
		help: 'data to exceed in order to appear',
	},
	{
		key: 'xs',
		type: 'NUMBER',
		default: 1,
		help: 'data to exceed in order to appear',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBossZone', [
	{key: 'exitblock', type: 'NUMBER', default: 1, help: 'blocks exit'},
	{key: 'progress', type: 'NUMBER', default: -1, help: 'progress to spawn'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBounceshroom', [
	{
		key: 'walk_on',
		type: 'NUMBER',
		default: -1,
		help: 'dir this always bounces on walk-on..',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objBuglamp', [
	{key: 'xs', type: 'NUMBER', default: 1, help: 'dir'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objCamerazone', [
	{key: 'width', type: 'NUMBER', default: 600, help: 'width'},
	{key: 'height', type: 'NUMBER', default: 600, help: 'height'},
	{key: 'xx', type: 'NUMBER', default: 0, help: 'xx'},
	{key: 'yy', type: 'NUMBER', default: 0, help: 'yy'},
	{key: 'zoom', type: 'NUMBER', default: 0.8, help: 'zoom'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objCaramel', [
	{key: 'breathe', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objChicory', [
	{key: 'darkfade', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objChicory_partner', [
	{key: 'active', type: 'NUMBER', default: 0, help: 'HIDDEN'},
	{key: 'assist', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objClearTimelapseshroom', [
	{key: 'timelapse_clearing', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objCloud', [
	{key: 'x2', type: 'NUMBER', default: 0, help: 'x goto'},
	{key: 'y2', type: 'NUMBER', default: 0, help: 'y goto'},
	{key: 'z2', type: 'NUMBER', default: 0, help: 'z goto'},
	{key: 'time', type: 'NUMBER', default: 6, help: 'time'},
	{key: 'time_start', type: 'NUMBER', default: 0, help: 'time'},
	{key: 'height', type: 'NUMBER', default: 2, help: 'start height'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objCollider', [
	{key: 'width', type: 'NUMBER', default: 144, help: 'width'},
	{key: 'height', type: 'NUMBER', default: 96, help: 'height'},
	{
		key: 'datalock',
		type: 'STRING',
		default: 'none',
		help: 'given data needs to be set to 1 for me to work',
	},
	{
		key: 'dataamt',
		type: 'NUMBER',
		default: 1,
		help: 'data must be >= this number to unlock',
	},
	{
		key: 'datacomp',
		type: 'NUMBER',
		default: 0,
		help: '0 - data>=amt. 1 - data<=amt',
	},
	{key: 'tag', type: 'NUMBER', default: 5, help: 'collider tag'},
	{
		key: 'swim_only',
		type: 'NUMBER',
		default: -1,
		help: '1 = turns on when not swimming',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objDarkness', [
	{key: 'lighter', type: 'NUMBER', default: 0, help: 'lighter?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objDotlockdata', [
	{
		key: 'key',
		type: 'STRING',
		default: 'OOXOO.OOXOO.XXXXX.OOXOO.OOXOO',
		help: 'X=filled O=empty - everything else unused',
	},
	{
		key: 'data',
		type: 'STRING',
		default: 'none',
		help: 'data to set on key unlocked',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objDotlockline', [
	{key: 'attached_object', type: 'NUMBER', default: -1, help: 'lockblock'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objDotlock', [
	{key: 'num', type: 'NUMBER', default: 5, help: 'grid num'},
	{key: 'radius', type: 'NUMBER', default: 24, help: 'dot radius'},
	{key: 'wall', type: 'NUMBER', default: 1, help: 'onwall'},
	{key: 'templefinal', type: 'NUMBER', default: 0, help: 'last one in temple?'},
	{
		key: 'locks',
		type: 'STRING',
		default: '-',
		help: 'locked nodes? marked as XXX.OOO',
	},
	{
		key: 'rows',
		type: 'NUMBER',
		default: 0,
		help: 'number of rows if diff from num',
	},
	{
		key: 'save',
		type: 'NUMBER',
		default: 0,
		help: 'is my data needed elsewhere?',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objElevationfloodfill', [
	{
		key: 'my_z',
		type: 'NUMBER',
		default: 1,
		help: 'z height to set contiguous area to',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objEventlocation', [
	{
		key: 'extra',
		type: 'NUMBER',
		default: 0,
		help: 'set to 1 if only used for certain events',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objExitstopper', [
	{key: 'block_up', type: 'NUMBER', default: 0, help: 'block up?'},
	{key: 'block_down', type: 'NUMBER', default: 0, help: 'block up?'},
	{key: 'block_left', type: 'NUMBER', default: 0, help: 'block up?'},
	{key: 'block_right', type: 'NUMBER', default: 0, help: 'block up?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFeastbugs_gen', [
	{key: 'fly_num', type: 'NUMBER', default: 10, help: 'fly num'},
	{key: 'ground_num', type: 'NUMBER', default: 15, help: 'ground num'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFinalboss', [
	{key: 'anim', type: 'NUMBER', default: 0, help: 'HIDDEN'},
	{key: 'timer', type: 'NUMBER', default: 0, help: 'HIDDEN'},
	{key: 'mode_to', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFinalboss_death', [
	{key: 'anim', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFinaltree_arm', [
	{key: 'spr', type: 'NUMBER', default: 0, help: 'spr'},
	{key: 'depth', type: 'NUMBER', default: -300, help: 'depthadjust'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFlammable', [
	{key: 'spr', type: 'NUMBER', default: 0, help: 'which spr am i? 0 for rand'},
	{key: 'xs', type: 'NUMBER', default: 0, help: 'flipped? 0 for rand'},
	{
		key: 'solid',
		type: 'NUMBER',
		default: -1,
		help: 'am i solid? -1 for depends',
	},
	{
		key: 'save',
		type: 'NUMBER',
		default: 0,
		help: 'save or load that i burned?',
	},
	{key: 'depth', type: 'NUMBER', default: 0, help: 'added depth?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFlinger', [
	{key: 'direction', type: 'NUMBER', default: 0, help: 'yeah'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFloat', [
	{key: 'facing', type: 'NUMBER', default: 0, help: 'force facing'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFog', [
	{key: 'mode', type: 'NUMBER', default: 0, help: '0=fog, 1=steam'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFoleyzone', [
	{key: 'width', type: 'NUMBER', default: 128, help: 'width'},
	{key: 'height', type: 'NUMBER', default: 128, help: 'height'},
	{key: 'foley', type: 'NUMBER', default: 2, help: 'foley'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFootsteps', [
	{
		key: 'local',
		type: 'NUMBER',
		default: 0,
		help: 'are footsteps only on my contiguous area?',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objForestedge1', [
	{key: 'grabmaster', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFound_animal', [
	{key: 'up', type: 'NUMBER', default: 0, help: 'layering to stand on stuff'},
	{key: 'all', type: 'NUMBER', default: 0, help: 'only after all found'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objFurniturepile', [
	{
		key: 'prop_id',
		type: 'NUMBER',
		default: 0,
		help: 'which furniture am i in the list',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objGallerypainting', [
	{key: 'num', type: 'NUMBER', default: 1, help: 'which painting is this?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objGentalker', [
	{
		key: 'say',
		type: 'STRING',
		default: 'text',
		help: 'thing to say, seperate messages with #',
	},
	{key: 'range', type: 'NUMBER', default: 0, help: 'range adjust'},
	{key: 'player_move', type: 'NUMBER', default: 0, help: 'player goes?'},
	{key: 'x_go', type: 'NUMBER', default: 0, help: 'x for player'},
	{key: 'y_go', type: 'NUMBER', default: 150, help: 'y for player'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objGeyser', [
	{key: 'dir', type: 'NUMBER', default: 0, help: '0,1,-1'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objGift', [
	{
		key: 'GiftID',
		type: 'STRING',
		default: 'None',
		help: 'ID of gift register (leave blank or None to use level name)',
	},
	{key: 'hidden', type: 'NUMBER', default: 0, help: 'makes the gift invisible'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objGinger', [
	{
		key: 'house_roof',
		type: 'STRING',
		default: '0',
		help: 'point for house roof',
	},
	{key: 'body', type: 'STRING', default: '0', help: 'point for house body'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objGrowflower', [
	{
		key: 'grows',
		type: 'STRING',
		default: '10101',
		help: 'right, up, left, down, elevate',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objGrubdeepmusic', [
	{key: 'intensity', type: 'NUMBER', default: 0, help: 'intensity 0-100'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objHiddentext', [
	{key: 'text', type: 'STRING', default: 'hello', help: 'message?'},
	{key: 'angle', type: 'NUMBER', default: 0, help: 'angle'},
	{key: 'visible', type: 'NUMBER', default: 0, help: 'visible?'},
	{key: 'font', type: 'NUMBER', default: 3, help: 'angle'},
	{key: 'scale', type: 'NUMBER', default: 1, help: 'angle'},
	{key: 'jp_x', type: 'NUMBER', default: 0, help: 'jp_x'},
	{key: 'jp_y', type: 'NUMBER', default: 0, help: 'jp_y'},
	{key: 'ch_y', type: 'NUMBER', default: 0, help: 'ch_y'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objIntrodog', [
	{key: 'anim', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objIntrotelescopecam', [
	{
		key: 'dest',
		type: 'STRING',
		default: 'none',
		help: 'next room in sequence (zxy COMMA-SEPERATED)',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objIntro', [
	{key: 'black', type: 'NUMBER', default: 0, help: 'HIDDEN'},
	{key: 'intro', type: 'NUMBER', default: 0, help: 'HIDDEN'},
	{key: 'stingerdelay', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objLandingZone', [
	{key: 'width', type: 'NUMBER', default: 600, help: 'width'},
	{key: 'height', type: 'NUMBER', default: 400, help: 'height'},
	{key: 'xx', type: 'NUMBER', default: 0, help: 'xoffset'},
	{key: 'yy', type: 'NUMBER', default: 0, help: 'yoffset'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objLemon', [
	{
		key: 'house_roof',
		type: 'STRING',
		default: '0',
		help: 'point for house roof',
	},
	{key: 'body', type: 'STRING', default: '0', help: 'point for house body'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objLightbox', [
	{key: 'width', type: 'NUMBER', default: 192, help: 'width'},
	{key: 'height', type: 'NUMBER', default: 96, help: 'height'},
	{key: 'color', type: 'STRING', default: '255,255,255', help: 'R,G,B'},
	{key: 'box', type: 'NUMBER', default: 0, help: 'box or ellipse?'},
	{key: 'ring', type: 'NUMBER', default: 0, help: 'how much extra fade?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objLitter', [
	{key: 'type', type: 'NUMBER', default: 0, help: '0visible1attached'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objLockblock', [
	{
		key: 'key',
		type: 'STRING',
		default: 'OOXOO.OOXOO.XXXXX.OOXOO.OOXOO',
		help: 'X=filled O=empty - everything else unused',
	},
	{
		key: 'dots_on_door',
		type: 'NUMBER',
		default: 0,
		help: 'if 1, turns off dotlock on solve',
	},
	{key: 'filled', type: 'NUMBER', default: 0, help: 'filled?'},
	{
		key: 'data',
		type: 'STRING',
		default: 'none',
		help: 'data that unlocks me instead?',
	},
	{key: 'templefinal', type: 'NUMBER', default: 0, help: 'temple finale?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objLostmouse', [
	{key: 'walking', type: 'NUMBER', default: 0, help: 'HIDDEN'},
	{key: 'hop', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objLost_animal', [
	{key: 'attached_object', type: 'NUMBER', default: -1, help: 'ATTACH'},
	{key: 'jumper', type: 'NUMBER', default: 0, help: 'jump'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objMacaroon', [
	{
		key: 'house_roof',
		type: 'STRING',
		default: '0',
		help: 'point for house roof',
	},
	{key: 'body', type: 'STRING', default: '0', help: 'point for house body'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objMapreplay', [
	{key: 'done', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objMusic_temp_transition', [
	{key: 'param', type: 'NUMBER', default: 100, help: 'set param to...'},
	{key: 'time', type: 'NUMBER', default: 3, help: 'set param to...'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objNewgame', [
	{key: 'black', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objNode', [
	{key: 'name', type: 'STRING', default: 'none', help: 'sometimes used?'},
	{key: 'attached_object', type: 'NUMBER', default: -1, help: 'POINT_TO'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objPainttube', [
	{key: 'spr', type: 'NUMBER', default: 0, help: 'which spr'},
	{key: 'col', type: 'STRING', default: 'fff', help: 'color in fake hex'},
	{key: 'xs', type: 'NUMBER', default: 1, help: 'xs'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objPhonebooth', [
	{key: 'ringing', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objPhoto_capture', [
	{
		key: 'data',
		type: 'STRING',
		default: 'evidence1',
		help: 'data entry to store photo id in',
	},
	{key: 'width', type: 'NUMBER', default: 125, help: 'width of evidence'},
	{key: 'height', type: 'NUMBER', default: 125, help: 'height of evidence'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objPickle', [
	{
		key: 'house_roof',
		type: 'STRING',
		default: '0',
		help: 'point for house roof',
	},
	{key: 'body', type: 'STRING', default: '0', help: 'point for house body'},
	{key: 'drawing', type: 'STRING', default: '0', help: 'hidden'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objPlantbuy', [
	{key: 'type', type: 'NUMBER', default: 0, help: 'which plant list am i?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objPlum', [
	{key: 'photo', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objPortal', [
	{
		key: 'dest',
		type: 'STRING',
		default: 'none',
		help: 'where to? (z,x,y COMMA-SEPERATED)',
	},
	{
		key: 'trans',
		type: 'NUMBER',
		default: -1,
		help: 'trans dir: -1 = no trans, 0 to 3 = directional, ',
	},
	{key: 'oneway', type: 'NUMBER', default: 0, help: 'am i just for arriving?'},
	{key: 'width', type: 'NUMBER', default: 128, help: 'width'},
	{key: 'height', type: 'NUMBER', default: 64, help: 'height'},
	{key: 'sound', type: 'STRING', default: 'none', help: 'play sound?'},
	{
		key: 'datalock',
		type: 'STRING',
		default: 'none',
		help: 'given data needs to be set to 1 for me to work',
	},
	{
		key: 'dataamt',
		type: 'NUMBER',
		default: 1,
		help: 'data must be >= this number to unlock',
	},
	{
		key: 'datacomp',
		type: 'NUMBER',
		default: 0,
		help: '0 - data>=amt. 1 - data<=amt',
	},
	{key: 'name', type: 'STRING', default: 'none', help: 'what am i called'},
	{
		key: 'ID',
		type: 'NUMBER',
		default: 0,
		help: 'for multiple portals in 1 room',
	},
	{key: 'swimming', type: 'NUMBER', default: 0, help: 'am i on water'},
	{key: 'time_length', type: 'NUMBER', default: 0, help: 'custom wait time'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objPumpernickel', [
	{
		key: 'house_roof',
		type: 'STRING',
		default: '0',
		help: 'point for house roof',
	},
	{key: 'body', type: 'STRING', default: '0', help: 'point for house body'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objQueen', [
	{key: 'music_time', type: 'NUMBER', default: -1, help: 'hidden'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objRain', [
	{key: 'fadein', type: 'NUMBER', default: 0, help: 'fades in here'},
	{key: 'intensity', type: 'NUMBER', default: 1, help: 'fades in here'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objRiserpath', [
	{key: 'bend', type: 'NUMBER', default: 0, help: 'bend?'},
	{key: 'ang', type: 'NUMBER', default: 0, help: 'ang'},
	{key: 'wall', type: 'NUMBER', default: 0, help: 'wall?'},
	{key: 'height', type: 'NUMBER', default: 0, help: 'desired wall?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objRiser', [
	{
		key: 'dot_x',
		type: 'NUMBER',
		default: 0,
		help: 'which column of dot do i check?',
	},
	{
		key: 'dot_y',
		type: 'NUMBER',
		default: 0,
		help: 'which row of dot do i check?',
	},
	{key: 'height', type: 'NUMBER', default: 1, help: 'how tall i go'},
	{key: 'swim', type: 'STRING', default: '000', help: 'swim?'},
	{
		key: 'data',
		type: 'STRING',
		default: 'none',
		help: 'read from another room?',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objRockbug_attractor', [
	{key: 'dist', type: 'NUMBER', default: 150, help: 'range 4 bugz'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objRockbug', [
	{
		key: 'paint_search',
		type: 'NUMBER',
		default: 192,
		help: 'distance to seek paint',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objShallowwater', [
	{key: 'width', type: 'NUMBER', default: 128, help: 'width'},
	{key: 'height', type: 'NUMBER', default: 64, help: 'height'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objSign', [
	{key: 'text', type: 'STRING', default: 'none', help: 'TEXT?'},
	{key: 'xscale', type: 'NUMBER', default: 1, help: 'scale'},
	{key: 'point_y', type: 'NUMBER', default: 0, help: '-1 up or +1 down?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objSit', [
	{key: 'facing', type: 'NUMBER', default: 0, help: 'force facing'},
	{key: 'name', type: 'STRING', default: 'Sit', help: 'display name'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objSky', [
	{
		key: 'storm_layers',
		type: 'NUMBER',
		default: 2,
		help: 'how many cloud layers',
	},
	{
		key: 'storm_alpha',
		type: 'NUMBER',
		default: 0.5,
		help: 'whats the alpha for each layer',
	},
	{
		key: 'storm_maxscale',
		type: 'NUMBER',
		default: 1.8,
		help: 'whats the alpha for each layer',
	},
	{
		key: 'storm_minscale',
		type: 'NUMBER',
		default: 0.6,
		help: 'whats the alpha for each layer',
	},
	{
		key: 'storm_spd',
		type: 'NUMBER',
		default: 1,
		help: 'whats the alpha for each layer',
	},
	{
		key: 'storm_height',
		type: 'NUMBER',
		default: 0.5,
		help: 'whats the alpha for each layer',
	},
	{
		key: 'storm_miny',
		type: 'NUMBER',
		default: 0.1,
		help: 'whats the alpha for each layer',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objSmalltreedeleter', [
	{key: 'width', type: 'NUMBER', default: 800, help: 'width'},
	{key: 'height', type: 'NUMBER', default: 800, help: 'height'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objSonggame', [
	{key: 'done', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objSpookytree', [
	{
		key: 'progress',
		type: 'NUMBER',
		default: 0,
		help: 'data to meet or exceed in order to appear',
	},
	{
		key: 'progress_exact',
		type: 'NUMBER',
		default: 0,
		help: 'if set to 1, appears only when progress = above number',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objSpotsound', [
	{
		key: 'sound',
		type: 'STRING',
		default: 'spot_amb_river',
		help: 'container name',
	},
	{key: 'datacheck', type: 'STRING', default: 'none', help: 'data to check?'},
	{
		key: 'dataval',
		type: 'NUMBER',
		default: 1,
		help: 'play only if datacheck equals this?',
	},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objStampgift', [
	{key: 'stamp_x', type: 'NUMBER', default: 0, help: 'ID of stamp'},
	{key: 'stamp_y', type: 'NUMBER', default: 0, help: 'ID of stamp'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objSwimzone', [
	{key: 'width', type: 'NUMBER', default: 128, help: 'width'},
	{key: 'height', type: 'NUMBER', default: 64, help: 'height'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objTemple_music', [
	{key: 'level', type: 'NUMBER', default: 1, help: '1, 2 or 3'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objTitle', [
	{key: 'black', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objTreegrow', [
	{key: 'growing', type: 'NUMBER', default: 0, help: 'HIDDEN'},
	{key: 'brush', type: 'NUMBER', default: 0, help: 'HIDDEN'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objVine_ride', [
	{key: 'attached_object', type: 'NUMBER', default: -1, help: 'POINT_TO'},
	{key: 'id', type: 'NUMBER'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objWallcrack', [
	{key: 'visible', type: 'NUMBER', default: 1, help: 'visible?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objWaterfall', [
	{key: 'width', type: 'NUMBER', default: 32, help: 'width units'},
	{key: 'height', type: 'NUMBER', default: 16, help: 'height units'},
	{key: 'topshow', type: 'NUMBER', default: 1, help: 'do we show the top'},
	{key: 'silent', type: 'NUMBER', default: 0, help: 'silent?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objWavemaker', [
	{key: 'block_up', type: 'NUMBER', default: 0, help: 'block up?'},
	{key: 'block_down', type: 'NUMBER', default: 0, help: 'block up?'},
	{key: 'block_left', type: 'NUMBER', default: 0, help: 'block up?'},
	{key: 'block_right', type: 'NUMBER', default: 0, help: 'block up?'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objWeepingwillow', [
	{key: 'xscale', type: 'NUMBER', default: 1, help: 'xscale'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objWhitearrow', [
	{key: 'angle', type: 'NUMBER', default: 0, help: 'angle'},
	{key: 'scale', type: 'NUMBER', default: 0.75, help: 'angle'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objWind', [
	{
		key: 'wind_pattern',
		type: 'STRING',
		default: '0',
		help: '0=none 1=right 2=left write patterns like 0102',
	},
	{
		key: 'pattern_time',
		type: 'NUMBER',
		default: 5,
		help: 'length of each pattern step in seconds',
	},
	{
		key: 'bombhold',
		type: 'NUMBER',
		default: 0,
		help: 'control when bombs resapwn',
	},
	{key: 'snowiness', type: 'NUMBER', default: 1, help: 'how snowy izit'},
]);

OBJECT_EDITABLE_PROPERTIES_SCHEMA.set('objCustomDog', [
	{
		key: 'angle',
		type: 'NUMBER',
		default: 0,
		help: '0 for default',
	},
	{
		key: 'animation',
		type: 'ENUM',
		options: [''].concat(DOG_ANIMATION_LIST),
	},
	{
		key: 'brush',
		type: 'NUMBER',
		default: 0,
		help: 'Set to 1 to show a brush',
	},
	{
		key: 'clothes',
		type: 'ENUM',
		options: [''].concat(DOG_CLOTHES_LIST.map((hair) => hair.internalName)),
	},
	{
		key: 'color_body',
		type: 'GM_COLOR',
		default: 16777215,
		help: 'Clothes color',
	},
	{
		key: 'color_head',
		type: 'GM_COLOR',
		default: 16777215,
		help: 'Hat color',
	},
	{
		key: 'color_skin',
		type: 'GM_COLOR',
		default: 16777215,
		help: 'Dog body color',
	},
	{
		key: 'comment',
		type: 'STRING',
		default: '',
		help: 'For your own reference, does not affect anything else',
	},
	{
		key: 'custom_clothes',
		type: 'IMAGE_BUFFER',
		help: 'Used to show custom clothes',
	},
	{
		key: 'custom_hat',
		type: 'IMAGE_BUFFER',
		help: 'Used to show custom hat',
	},
	{
		key: 'dialogue',
		type: 'STRING',
		default: '',
		help: 'Dialogue text when you speak to this character, only available if interactable. Use ~ to split to a new dialogue box.',
	},
	{
		key: 'expression',
		type: 'DOG_EXPRESSION',
	},
	{
		key: 'hair',
		type: 'ENUM',
		options: [''].concat(DOG_HAIR_LIST.map((hair) => hair.internalName)),
	},
	{
		key: 'hat',
		type: 'ENUM',
		options: [''].concat(DOG_HAT_LIST.map((hair) => hair.internalName)),
	},
	{
		key: 'interactable',
		type: 'NUMBER',
		default: 0,
		help: 'Set to 1 to enable talking',
	},
	{
		key: 'npc_name',
		type: 'STRING',
		default: '',
		help: "This character's name that appears when you walk up to them, only seen if interactable",
	},
	{
		key: 'xscale',
		type: 'NUMBER',
		default: 1,
		help: 'Horizontal scale, set to negative (such as -1) to flip horizontally (face to the left)',
	},
	{
		key: 'yscale',
		type: 'NUMBER',
		default: 1,
		help: 'Vertical scale, set to negative (such as -1) to flip vertically',
	},
]);

export {OBJECT_EDITABLE_PROPERTIES_SCHEMA};

/*
var out = '';
Object.keys(x).forEach((key) => {
	const props = x[key];

	out +=
		'OBJECT_EDITABLE_PROPERTIES_SCHEMA.set(' +
		JSON.stringify(key) +
		', [' +
		props.map((prop) => {
			return (
				'{key: ' +
				JSON.stringify(prop.attribute) +
				', type: "' +
				(typeof prop.default === 'string' ? 'STRING' : 'NUMBER') +
				'", default: ' +
				JSON.stringify(prop.default) +
				', help: ' +
				JSON.stringify(prop.description) +
				'}'
			);
		}) +
		']);\n\n';
});
copy(out);
*/

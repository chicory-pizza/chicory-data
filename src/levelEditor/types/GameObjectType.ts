import type {GameObjectEntityType} from './GameObjectEntityType';

// There are various properties that use string type even though it is just a number -__-
type StringThatShouldBeNumber = string;

type CustomGameObjectNames = ObjCustomDogName;
type CustomGameObjectTypes = ObjCustomDogType;

type ObjCustomDogName = 'objCustomDog';
type ObjCustomDogType = {
	obj: ObjCustomDogName;
	x: number;
	y: number;

	angle: number;
	animation: string;
	brush: number;
	clothes: string;
	color_body: number;
	color_head: number;
	color_skin: number;
	comment: string;
	custom_clothes?: string;
	custom_hat?: string;
	dialogue?: string;
	expression: string;
	hair: string;
	hat: string;
	interactable?: number;
	npc_name?: string;
	xscale: number;
	yscale: number;
};

// Generated using `util/extract_object_types_from_level_data.ts`, please edit that
// template generator instead
export type GameObjectType =
	| {
			obj: Exclude<
				GameObjectEntityType,
				| 'objAudioparamsetter'
				| 'objBeachline'
				| 'objBellLine'
				| 'objBlackooze'
				| 'objBossZone'
				| 'objBosstree'
				| 'objBounceshroom'
				| 'objBuglamp'
				| 'objCloud'
				| 'objCollider'
				| 'objDarkness'
				| 'objDotlock'
				| 'objDotlockdata'
				| 'objDotlockline'
				| 'objElevationfloodfill'
				| 'objEventlocation'
				| 'objExitstopper'
				| 'objFeastbugs_gen'
				| 'objFinaltree_arm'
				| 'objFlammable'
				| 'objFlinger'
				| 'objFloat'
				| 'objFog'
				| 'objFoleyzone'
				| 'objFootsteps'
				| 'objFound_animal'
				| 'objFurniturepile'
				| 'objGallerypainting'
				| 'objGentalker'
				| 'objGeyser'
				| 'objGift'
				| 'objGrowflower'
				| 'objGrubdeepmusic'
				| 'objHiddentext'
				| 'objLandingZone'
				| 'objLightbox'
				| 'objLitter'
				| 'objLockblock'
				| 'objLost_animal'
				| 'objMacaroon'
				| 'objMusic_temp_transition'
				| 'objNode'
				| 'objPainttube'
				| 'objPhoto_capture'
				| 'objPlantbuy'
				| 'objPortal'
				| 'objRain'
				| 'objRiser'
				| 'objRiserpath'
				| 'objRockbug'
				| 'objRockbug_attractor'
				| 'objShallowwater'
				| 'objSign'
				| 'objSit'
				| 'objSky'
				| 'objSpookytree'
				| 'objSpotsound'
				| 'objStampgift'
				| 'objSwimzone'
				| 'objTemple_music'
				| 'objVine_ride'
				| 'objWallcrack'
				| 'objWaterfall'
				| 'objWavemaker'
				| 'objWeepingwillow'
				| 'objWhitearrow'
				| 'objWind'
				| CustomGameObjectNames
			>;
			x: number;
			y: number;
			id?: number;

			// [key: string]: string | number | undefined;
	  }
	| {
			obj: 'objAudioparamsetter';
			x: number;
			y: number;
			id?: number;

			param?: string | 'height' | 'room_anxiety' | 'springs_music_distance';
			time?: StringThatShouldBeNumber | '3' | '4';
			val?: StringThatShouldBeNumber | '25' | '33' | '35' | '75' | '100';
	  }
	| {
			obj: 'objBeachline';
			x: number;
			y: number;
			id?: number;

			dir?: StringThatShouldBeNumber | '2' | '3' | '90';
	  }
	| {
			obj: 'objBellLine';
			x: number;
			y: number;
			id?: number;

			dip?: '.2';
			height?: '10';
			num?: StringThatShouldBeNumber | '4' | '5' | '8';
			x2:
				| StringThatShouldBeNumber
				| '-550'
				| '400'
				| '500'
				| '600'
				| '700'
				| '1000';
			y2?: StringThatShouldBeNumber | '-100' | '-50' | '-40' | '50' | '150';
	  }
	| {
			obj: 'objBlackooze';
			x: number;
			y: number;
			id?: number;

			corner?: StringThatShouldBeNumber | '0' | '2' | '3' | '4' | '5' | '6';
			erase?: '1';
			height?:
				| StringThatShouldBeNumber
				| '4'
				| '8'
				| '12'
				| '15'
				| '16'
				| '18'
				| '20'
				| '30'
				| '40';
			width?:
				| StringThatShouldBeNumber
				| '5'
				| '8'
				| '12'
				| '15'
				| '16'
				| '20'
				| '25'
				| '36'
				| '50'
				| '70';
	  }
	| {
			obj: 'objBossZone';
			x: number;
			y: number;
			id?: number;

			exitblock?: '0';
	  }
	| {
			obj: 'objBosstree';
			x: number;
			y: number;
			id?: number;

			progress: StringThatShouldBeNumber | '6' | '12' | '15' | '20' | '30';
			xs?: StringThatShouldBeNumber | '-1' | '1';
	  }
	| {
			obj: 'objBounceshroom';
			x: number;
			y: number;
			id?: number;

			walk_on?: StringThatShouldBeNumber | '0' | '1' | '2' | '3';
	  }
	| {
			obj: 'objBuglamp';
			x: number;
			y: number;
			id?: number;

			xs?: '-1';
	  }
	| {
			obj: 'objCloud';
			x: number;
			y: number;
			id?: number;

			height?: StringThatShouldBeNumber | '0' | '1' | '2' | '3' | '4' | '6';
			time?: StringThatShouldBeNumber | '1' | '3' | '4' | '5' | '6' | '7.5';
			time_start?:
				| StringThatShouldBeNumber
				| '0'
				| '.17'
				| '.45'
				| '.5'
				| '.8'
				| '.94'
				| '.97'
				| '1.5';
			x2?:
				| StringThatShouldBeNumber
				| '-384'
				| '-336'
				| '-292'
				| '-288'
				| '0'
				| '350';
			y2?: StringThatShouldBeNumber | '-360' | '-336' | '-72' | '0' | '336';
			z2?: StringThatShouldBeNumber | '0' | '1' | '2' | '3' | '4';
	  }
	| {
			obj: 'objCollider';
			x: number;
			y: number;
			id?: number;

			dataamt?: StringThatShouldBeNumber | '0' | '12' | '34';
			datacomp?: '1';
			datalock?: string | 'progress' | 'treearm_gone0' | 'treearm_gone2';
			height?:
				| StringThatShouldBeNumber
				| '12'
				| '24'
				| '48'
				| '60'
				| '72'
				| '96'
				| '108'
				| '120'
				| '144'
				| '150'
				| '160'
				| '168'
				| '192'
				| '200'
				| '216'
				| '240'
				| '248'
				| '288'
				| '300'
				| '350'
				| '400'
				| '500'
				| '600'
				| '700'
				| '800'
				| '1000';
			swim_only?: '1';
			tag?: '8';
			width?:
				| string
				| "188'"
				| '24'
				| '48'
				| '60'
				| '64'
				| '72'
				| '84'
				| '96'
				| '120'
				| '140'
				| '156'
				| '180'
				| '192'
				| '196'
				| '200'
				| '212'
				| '220'
				| '240'
				| '264'
				| '288'
				| '300'
				| '320'
				| '350'
				| '360'
				| '400'
				| '450'
				| '500'
				| '588'
				| '600'
				| '640'
				| '700'
				| '800'
				| '900'
				| '1000'
				| '1800';
	  }
	| {
			obj: 'objDarkness';
			x: number;
			y: number;
			id?: number;

			lighter?: StringThatShouldBeNumber | '0' | '1';
	  }
	| {
			obj: 'objDotlock';
			x: number;
			y: number;
			id?: number;

			locks?: string | '0020' | '-' | 'OOO.O2O';
			num?: StringThatShouldBeNumber | '2' | '3' | '4' | '6';
			radius?: StringThatShouldBeNumber | '20' | '24' | '30' | '36';
			rows?: StringThatShouldBeNumber | '0' | '1' | '2' | '4';
			save?: '1';
			templefinal?: StringThatShouldBeNumber | '1' | '2';
			wall?: StringThatShouldBeNumber | '0' | '1';
	  }
	| {
			obj: 'objDotlockdata';
			x: number;
			y: number;
			id?: number;

			data:
				| string
				| 'temple_leftdoor'
				| 'temple_lowerdoor'
				| 'temple_rightdoor';
			key:
				| string
				| 'OOOOO.OOOOO.XXXXX.OXXXO.OOXOO'
				| 'OXXX.OOOX.OOOX.OXXX'
				| 'XXXO.XOOO.XOOO.XXXO';
	  }
	| {
			obj: 'objDotlockline';
			x: number;
			y: number;
			id?: number;

			attached_object?: number | 51 | 52 | 110 | 112;
	  }
	| {
			obj: 'objElevationfloodfill';
			x: number;
			y: number;
			id?: number;

			my_z?: StringThatShouldBeNumber | '2' | '3' | '8';
	  }
	| {
			obj: 'objEventlocation';
			x: number;
			y: number;
			id?: number;

			extra?: '1';
	  }
	| {
			obj: 'objExitstopper';
			x: number;
			y: number;
			id?: number;

			block_down?: '1';
			block_left?: '1';
			block_right?: '1';
			block_up?: '1';
	  }
	| {
			obj: 'objFeastbugs_gen';
			x: number;
			y: number;
			id?: number;

			fly_num?:
				| StringThatShouldBeNumber
				| '0'
				| '2'
				| '3'
				| '5'
				| '8'
				| '10'
				| '15';
			ground_num?:
				| StringThatShouldBeNumber
				| '0'
				| '1'
				| '2'
				| '4'
				| '5'
				| '8'
				| '10'
				| '15';
	  }
	| {
			obj: 'objFinaltree_arm';
			x: number;
			y: number;
			id?: number;

			depth: StringThatShouldBeNumber | '-400' | '-250' | '-200';
			spr?: StringThatShouldBeNumber | '1' | '2';
	  }
	| {
			obj: 'objFlammable';
			x: number;
			y: number;
			id?: number;

			depth?: StringThatShouldBeNumber | '-288' | '-96';
			save?: StringThatShouldBeNumber | '1' | '2';
			solid?: StringThatShouldBeNumber | '0' | '1';
			spr?: StringThatShouldBeNumber | '1' | '10' | '13';
			xs?: StringThatShouldBeNumber | '-1' | '0' | '1';
	  }
	| {
			obj: 'objFlinger';
			x: number;
			y: number;
			id?: number;

			direction?:
				| StringThatShouldBeNumber
				| '0'
				| '45'
				| '90'
				| '135'
				| '180'
				| '225'
				| '270'
				| '315';
	  }
	| {
			obj: 'objFloat';
			x: number;
			y: number;
			id?: number;

			facing?: '0';
	  }
	| {
			obj: 'objFog';
			x: number;
			y: number;
			id?: number;

			mode?: '1';
	  }
	| {
			obj: 'objFoleyzone';
			x: number;
			y: number;
			id?: number;

			foley?:
				| StringThatShouldBeNumber
				| '0'
				| '1'
				| '2'
				| '3'
				| '4'
				| '6'
				| '8';
			height?:
				| StringThatShouldBeNumber
				| '96'
				| '200'
				| '250'
				| '256'
				| '300'
				| '360'
				| '380'
				| '386'
				| '400'
				| '432'
				| '480'
				| '500'
				| '600'
				| '800'
				| '900'
				| '960'
				| '1000'
				| '1080'
				| '1200'
				| '2000';
			width?:
				| StringThatShouldBeNumber
				| '96'
				| '240'
				| '250'
				| '256'
				| '280'
				| '300'
				| '350'
				| '380'
				| '386'
				| '400'
				| '432'
				| '480'
				| '500'
				| '520'
				| '560'
				| '576'
				| '600'
				| '624'
				| '640'
				| '672'
				| '700'
				| '800'
				| '832'
				| '880'
				| '960'
				| '1000'
				| '1200'
				| '1600'
				| '1800'
				| '1900'
				| '1920'
				| '2000';
	  }
	| {
			obj: 'objFootsteps';
			x: number;
			y: number;
			id?: number;

			local?: '1';
	  }
	| {
			obj: 'objFound_animal';
			x: number;
			y: number;
			id?: number;

			all?: '1';
			up?: StringThatShouldBeNumber | '-36' | '0' | '1' | '16' | '30' | '80';
	  }
	| {
			obj: 'objFurniturepile';
			x: number;
			y: number;
			id?: number;

			prop_id?: StringThatShouldBeNumber | '1' | '2';
	  }
	| {
			obj: 'objGallerypainting';
			x: number;
			y: number;
			id?: number;

			num:
				| StringThatShouldBeNumber
				| '1'
				| '2'
				| '3'
				| '4'
				| '5'
				| '6'
				| '7'
				| '8'
				| '9'
				| '10'
				| '11'
				| '12'
				| '13'
				| '14'
				| '15'
				| '16'
				| '17'
				| '18'
				| '19'
				| '20'
				| '21'
				| '99';
	  }
	| {
			obj: 'objGentalker';
			x: number;
			y: number;
			id?: number;

			say: StringThatShouldBeNumber | '13142' | '13150' | '13171';
	  }
	| {
			obj: 'objGeyser';
			x: number;
			y: number;
			id?: number;

			dir?: StringThatShouldBeNumber | '-1' | '1';
	  }
	| {
			obj: 'objGift';
			x: number;
			y: number;
			id?: number;

			GiftID?: string | 'deepcorner2' | 'lemon2' | 'woods_path_hidden';
			StampID?: '4';
			hidden?: StringThatShouldBeNumber | '0' | '1' | '2';
			item?:
				| string
				| 'Beanie'
				| 'Bow'
				| 'Flower Dress'
				| 'Hoodie'
				| 'Pocket Jacket'
				| 'Starry Tee'
				| 'Stripey Tee'
				| 'Sunny Tee';
	  }
	| {
			obj: 'objGrowflower';
			x: number;
			y: number;
			id?: number;

			grows:
				| StringThatShouldBeNumber
				| '00001'
				| '00010'
				| '00011'
				| '00100'
				| '00101'
				| '00110'
				| '00111'
				| '10000'
				| '10010'
				| '10100'
				| '10110'
				| '10111'
				| '11010'
				| '11100';
	  }
	| {
			obj: 'objGrubdeepmusic';
			x: number;
			y: number;
			id?: number;

			intensity?: '100';
	  }
	| {
			obj: 'objHiddentext';
			x: number;
			y: number;
			id?: number;

			angle?:
				| StringThatShouldBeNumber
				| '-90'
				| '-11'
				| '-10'
				| '-9'
				| '-8'
				| '-2'
				| '4'
				| '6'
				| '10'
				| '90'
				| '180';
			ch_y?: '15';
			font?: StringThatShouldBeNumber | '0' | '1';
			jp_x?:
				| StringThatShouldBeNumber
				| '-160'
				| '-135'
				| '-110'
				| '-70'
				| '-15'
				| '-10'
				| '5'
				| '15';
			jp_y?:
				| StringThatShouldBeNumber
				| '-110'
				| '-60'
				| '-30'
				| '-15'
				| '-10'
				| '0'
				| '5'
				| '10'
				| '15'
				| '20'
				| '30'
				| '35'
				| '45';
			scale?: StringThatShouldBeNumber | '0' | '.5' | '.75' | '1.5';
			text:
				| string
				| '13118'
				| '13119'
				| '13120'
				| '13120x'
				| '13121'
				| '13122'
				| '13123'
				| '13124'
				| '13125'
				| '13126'
				| '13127'
				| '13128'
				| '13129'
				| '13130'
				| '13131'
				| '13135'
				| '13136'
				| '13137'
				| '13143'
				| '13144'
				| '13145'
				| '13146'
				| '13147'
				| '13148'
				| '13152'
				| '13153'
				| '13154'
				| '13157'
				| '13158'
				| '13159'
				| '13163'
				| '13167'
				| '13168'
				| '13169'
				| '13170'
				| '13172'
				| '13173'
				| '13177'
				| '13178'
				| '13179'
				| '13180'
				| '13181'
				| '13182'
				| '13183'
				| '13184'
				| '13185'
				| '13186';
			visible?: StringThatShouldBeNumber | '0' | '1';
	  }
	| {
			obj: 'objLandingZone';
			x: number;
			y: number;
			id?: number;

			height?:
				| StringThatShouldBeNumber
				| '300'
				| '500'
				| '600'
				| '700'
				| '800'
				| '1000'
				| '2000';
			width?: StringThatShouldBeNumber | '1000' | '1200' | '1600' | '2500';
	  }
	| {
			obj: 'objLightbox';
			x: number;
			y: number;
			id?: number;

			box?: '0';
			color?:
				| string
				| '128,128,128'
				| '192,192,192'
				| '192,192,192,'
				| '32,32,32'
				| '64,64,64';
			height?:
				| StringThatShouldBeNumber
				| '0'
				| '48'
				| '64'
				| '72'
				| '96'
				| '120'
				| '128'
				| '150'
				| '168'
				| '192'
				| '200'
				| '250'
				| '300'
				| '450';
			ring:
				| StringThatShouldBeNumber
				| '96'
				| '100'
				| '150'
				| '200'
				| '300'
				| '400'
				| '550'
				| '600'
				| '700'
				| '800'
				| '1050'
				| '1200';
			width?:
				| StringThatShouldBeNumber
				| '64'
				| '96'
				| '100'
				| '128'
				| '150'
				| '192'
				| '200'
				| '240'
				| '250'
				| '256'
				| '300'
				| '388'
				| '400'
				| '450'
				| '600'
				| '900'
				| '1000';
	  }
	| {
			obj: 'objLitter';
			x: number;
			y: number;
			id?: number;

			type?: '0';
	  }
	| {
			obj: 'objLockblock';
			x: number;
			y: number;
			id?: number;

			data?:
				| string
				| 'temple_leftdoor'
				| 'temple_lowerdoor'
				| 'temple_rightdoor';
			dots_on_door?: StringThatShouldBeNumber | '0' | '1';
			filled?: '1';
			key?:
				| string
				| 'OOX.XOO.XOX'
				| 'OOXOO.OOXXO.OOXXX.OOXXO.OOXOO'
				| 'OOXOO.OXXOO.XXXOO.OXXOO.OOXOO'
				| 'OOXOO.OXXXO.XXXXX.OOOOO.OOOOO'
				| 'OXOXOX.XXXXXX.OXOOXO.OOXXOO.OXOOXO.OOXXOO'
				| 'OXX.XOO.OXX.XOX.OXO.XOX.OXX.OXO'
				| 'OXXX.OOOX.OOOX.OXXX'
				| 'OXXXO.XOOOX.XOXOX.XOXOX.OXXXO'
				| 'XOOX.OXOX.OXOO.OOXO'
				| 'XXX.OXO.OOX'
				| 'XXXO.XOOO.XOOO.XXXO'
				| 'XXXXX,XOXOX.OXOXO.OOOOO.XOXOX'
				| 'XXXXX.XXXXX.OXOXO.OOXOO.OXXXO';
			templefinal?: StringThatShouldBeNumber | '1' | '2';
	  }
	| {
			obj: 'objLost_animal';
			x: number;
			y: number;
			id?: number;

			attached_object?:
				| number
				| -1
				| 0
				| 1
				| 2
				| 3
				| 5
				| 6
				| 9
				| 10
				| 12
				| 13
				| 14
				| 15
				| 18
				| 19
				| 20
				| 23
				| 25
				| 37
				| 44
				| 55
				| 57
				| 64
				| 65
				| 82
				| 103
				| 244;
			jumper?: '1';
	  }
	| {
			obj: 'objMacaroon';
			x: number;
			y: number;
			id?: number;

			house_roof: '-48,-300';
	  }
	| {
			obj: 'objMusic_temp_transition';
			x: number;
			y: number;
			id?: number;

			param?: StringThatShouldBeNumber | '0' | '75' | '85' | '90' | '100';
			time?: '10';
	  }
	| {
			obj: 'objNode';
			x: number;
			y: number;
			id?: number;

			attached_object?:
				| number
				| 3
				| 4
				| 6
				| 7
				| 8
				| 9
				| 10
				| 11
				| 12
				| 13
				| 14
				| 17
				| 18
				| 19;
			name?:
				| string
				| '1'
				| '2'
				| 'art'
				| 'bb_credits'
				| 'chicory'
				| 'chicory5'
				| 'chicory_credits'
				| 'chicory_stand'
				| 'chicoryend'
				| 'chicorysit'
				| 'clementine'
				| 'credits_chicory'
				| 'credits_pizza'
				| 'dog'
				| 'dog5'
				| 'dogend'
				| 'gallery'
				| 'inter1'
				| 'inter2'
				| 'inter_owner'
				| 'inter_pizza'
				| 'inter_quince'
				| 'pepper_move'
				| 'postgame'
				| 'raddish'
				| 'raisin'
				| 'spook';
	  }
	| {
			obj: 'objPainttube';
			x: number;
			y: number;
			id?: number;

			col: string | '00f' | '0f0' | 'f00';
			spr?: '1';
			xs?: '-1';
	  }
	| {
			obj: 'objPhoto_capture';
			x: number;
			y: number;
			id?: number;

			data?: string | 'evidence2' | 'evidence3' | 'evidence4';
			height: StringThatShouldBeNumber | '60' | '80' | '110';
			width: StringThatShouldBeNumber | '75' | '80' | '85' | '100';
	  }
	| {
			obj: 'objPlantbuy';
			x: number;
			y: number;
			id?: number;

			type:
				| StringThatShouldBeNumber
				| '0'
				| '1'
				| '2'
				| '3'
				| '4'
				| '5'
				| '6'
				| '7'
				| '8';
	  }
	| {
			obj: 'objPortal';
			x: number;
			y: number;
			id?: number;

			ID?: StringThatShouldBeNumber | '0' | '1' | '2' | '3' | '4' | '5' | '6'; // why greg
			dataamt?: StringThatShouldBeNumber | '0' | '1' | '2' | '7' | '30';
			datacomp?: StringThatShouldBeNumber | '0' | '1';
			datalock?: string | 'data' | 'progress' | 'sis1';
			dest:
				| string
				| '0,-1,-2'
				| '0,-1,0'
				| '0,-1,1'
				| '0,-1,7'
				| '0,-2,-1'
				| '0,-2,-2'
				| '0,-2,0'
				| '0,-2,2'
				| '0,-2,6'
				| '0,-2,7'
				| '0,-3,4'
				| '0,-4,-2'
				| '0,-4,-3'
				| '0,-4,-4'
				| '0,-4,-5'
				| '0,-4,-6'
				| '0,-4,1'
				| '0,-4,2'
				| '0,-4,3'
				| '0,-5,-22'
				| '0,-5,-23'
				| '0,-5,-6'
				| '0,-5,-7'
				| '0,-5,3'
				| '0,-6,-1'
				| '0,-6,-6'
				| '0,-6,-7'
				| '0,-6,0'
				| '0,-6,3'
				| '0,-6,4'
				| '0,0,-1'
				| '0,0,-2'
				| '0,0,-3'
				| '0,0,-5'
				| '0,0,-6'
				| '0,0,0'
				| '0,0,2'
				| '0,0,3'
				| '0,1,-2'
				| '0,1,-4'
				| '0,1,-5'
				| '0,1,-6'
				| '0,1,-7'
				| '0,1,0'
				| '0,1,3'
				| '0,1,7'
				| '0,2,4'
				| '0,3,-1'
				| '0,3,-6'
				| '0,4,-2'
				| '0,4,-3'
				| '0,4,-4'
				| '0,4,-5'
				| '0,4,-9'
				| '0,4,1'
				| '0,4,6'
				| '0,4,7'
				| '0,5,-1'
				| '0,5,-3'
				| '0,5,-5'
				| '0,5,2'
				| '0,5,6'
				| '0,6,-3'
				| '0,6,7'
				| '1,-1,-1'
				| '1,-1,0'
				| '1,-1,7'
				| '1,-2,-1'
				| '1,-2,-2'
				| '1,-2,2'
				| '1,-2,6'
				| '1,-2,7'
				| '1,-3,-4'
				| '1,-4,-3'
				| '1,-4,-4'
				| '1,-4,-5'
				| '1,-4,-6'
				| '1,-4,0'
				| '1,-4,2'
				| '1,-4,3'
				| '1,-5,-1'
				| '1,-5,-2'
				| '1,-5,-22'
				| '1,-5,-3'
				| '1,-5,-6'
				| '1,-5,-8'
				| '1,-5,0'
				| '1,-5,3'
				| '1,-5,4'
				| '1,-6,-1'
				| '1,-6,-3'
				| '1,-6,-7'
				| '1,-6,-8'
				| '1,-6,3'
				| '1,-6,4'
				| '1,-6,5'
				| '1,-7,-2'
				| '1,-7,-3'
				| '1,0,-2'
				| '1,0,-3'
				| '1,0,-4'
				| '1,0,-5'
				| '1,0,-6'
				| '1,0,0'
				| '1,0,1'
				| '1,0,2'
				| '1,0,3'
				| '1,1,-1'
				| '1,1,-2'
				| '1,1,-4'
				| '1,1,-5'
				| '1,1,6'
				| '1,1,7'
				| '1,2,-3'
				| '1,2,2'
				| '1,2,3'
				| '1,3,-1'
				| '1,3,-11'
				| '1,3,-6'
				| '1,3,-7'
				| '1,4,-2'
				| '1,4,-3'
				| '1,4,-4'
				| '1,4,-6'
				| '1,4,-7'
				| '1,4,2'
				| '1,4,5'
				| '1,4,7'
				| '1,5,-1'
				| '1,5,-2'
				| '1,5,-3'
				| '1,5,-5'
				| '1,5,2'
				| '1,5,6'
				| '1,6,-3'
				| '1,6,-5'
				| '1,7,6'
				| '1,8,7'
				| '2,-1,-2'
				| '2,-1,-3'
				| '2,-1,-4'
				| '2,-2,-2'
				| '2,-2,-6'
				| '2,-2,5'
				| '2,-3,-4'
				| '2,-3,-6'
				| '2,-4,-2'
				| '2,-4,0'
				| '2,-5,0'
				| '2,-6,-3'
				| '2,-7,-2'
				| '2,0,-4'
				| '2,0,2'
				| '2,1,2'
				| '2,1,3'
				| '2,1,4'
				| '2,1,5'
				| '2,1,6'
				| '2,5,-2'
				| '2,6,-5'
				| '2,7,-2'
				| '2,9,-2'
				| '2,9,0';
			height?:
				| StringThatShouldBeNumber
				| '32'
				| '64'
				| '72'
				| '96'
				| '100'
				| '128'
				| '150'
				| '192'
				| '256'
				| '360'
				| '408';
			interactable?: '1'; // only on [1, -1, -1]
			name?:
				| string
				| 'Cave'
				| "Chicory's Room"
				| "Chicory's Tower"
				| 'Elevenses Master Gallery'
				| 'Exit'
				| 'none'
				| 'Studio'
				| 'The Joe Shop';
			oneway?: StringThatShouldBeNumber | '0' | '1';
			sound?:
				| string
				| 'door_double'
				| 'door_elevator'
				| 'door_gen'
				| 'door_shop'
				| 'door_tent'
				| 'door_wood_heavy'
				| 'none'
				| 'pizza_stairs'
				| 'waterfall_shortcut';
			swimming?: StringThatShouldBeNumber | '-1' | '1';
			trans?: StringThatShouldBeNumber | '-2' | '0' | '1' | '2' | '3'; // undefined on 1_-1_-1
			width?:
				| StringThatShouldBeNumber
				| '48'
				| '64'
				| '96'
				| '120'
				| '128'
				| '144'
				| '150'
				| '160'
				| '188'
				| '192'
				| '196'
				| '200'
				| '208'
				| '256'
				| '280'
				| '300'
				| '384'
				| '400'
				| '480'
				| '500'
				| '720'
				| '724'
				| '800';
	  }
	| {
			obj: 'objRain';
			x: number;
			y: number;
			id?: number;

			fadein?: '1';
			intensity?: StringThatShouldBeNumber | '.05' | '.1' | '.5' | '.7' | '.8';
	  }
	| {
			obj: 'objRiser';
			x: number;
			y: number;
			id?: number;

			data?: string | 'island_dup2' | 'island_dup3' | 'island_dup4';
			dot_x?: StringThatShouldBeNumber | '0' | '1' | '2' | '3' | '4';
			dot_y?: StringThatShouldBeNumber | '0' | '1' | '2';
			height?: StringThatShouldBeNumber | '1' | '2' | '3';
			swim?: StringThatShouldBeNumber | '000' | '010' | '110' | '111';
	  }
	| {
			obj: 'objRiserpath';
			x: number;
			y: number;
			id?: number;

			ang?:
				| string
				| number
				| '0'
				| '1'
				| '2'
				| '3'
				| 6.009
				| 6.0724
				| '10'
				| 13.2763
				| 19.3589
				| '60'
				| '70'
				| 74.7448
				| 79.1435
				| '80'
				| 83.6598
				| 86.0995
				| 86.4236
				| 86.6822
				| 89.4437
				| 90
				| '90'
				| 91.005
				| 93.7213
				| 94.0856
				| 101.9441
				| '110'
				| 112.1094
				| 151.8583
				| 171.573
				| 176.6335
				| 177.9904
				| '180'
				| 192.3194
				| 197.6125
				| 262.6139
				| 262.725
				| 262.9716
				| 264.0256
				| 266.9872
				| 268.3153
				| 269.427
				| '270'
				| 270
				| 271.1934
				| 271.8475
				| 294.9047
				| 347.6919;
			bend?: StringThatShouldBeNumber | '0' | '1';
			height?: StringThatShouldBeNumber | '1' | '3';
			wall?: StringThatShouldBeNumber | '0' | '1';
	  }
	| {
			obj: 'objRockbug';
			x: number;
			y: number;
			id?: number;

			paint_search?: '256';
	  }
	| {
			obj: 'objRockbug_attractor';
			x: number;
			y: number;
			id?: number;

			dist?: StringThatShouldBeNumber | '120' | '150' | '250';
	  }
	| {
			obj: 'objShallowwater';
			x: number;
			y: number;
			id?: number;

			height:
				| StringThatShouldBeNumber
				| '200'
				| '300'
				| '320'
				| '350'
				| '400'
				| '500'
				| '540'
				| '550'
				| '600'
				| '650'
				| '800'
				| '1000'
				| '1080'
				| '1200'
				| '1500'
				| '2500'
				| '3000';
			width:
				| StringThatShouldBeNumber
				| '300'
				| '400'
				| '500'
				| '800'
				| '900'
				| '1000'
				| '1050'
				| '1200'
				| '1300'
				| '1500'
				| '1600';
	  }
	| {
			obj: 'objSign';
			x: number;
			y: number;
			id?: number;

			point_y?: StringThatShouldBeNumber | '-1' | '1';
			text:
				| StringThatShouldBeNumber
				| '13116'
				| '13117'
				| '13132'
				| '13133'
				| '13134'
				| '13138'
				| '13139'
				| '13140'
				| '13141'
				| '13149'
				| '13151'
				| '13155'
				| '13156'
				| '13160'
				| '13161'
				| '13162'
				| '13164'
				| '13165'
				| '13166'
				| '13174'
				| '13175'
				| '13176'
				| '13187'
				| '13188';
			xscale?: '-1';
	  }
	| {
			obj: 'objSit';
			x: number;
			y: number;
			id?: number;

			facing?: StringThatShouldBeNumber | '-1' | '1';
	  }
	| {
			obj: 'objSky';
			x: number;
			y: number;
			id?: number;

			dark_ala?: '1';
			dark_alb?: '1';
			dark_cola?: '1';
			dark_colb?: '1';
			storm_alpha?: StringThatShouldBeNumber | '.66' | '.7';
			storm_height?: StringThatShouldBeNumber | '.3' | '.35' | '.48' | '1.1';
			storm_layers?: '3';
			storm_maxscale?: StringThatShouldBeNumber | '1.8' | '2.4';
			storm_minscale?: StringThatShouldBeNumber | '.2' | '.6';
			storm_miny?: StringThatShouldBeNumber | '-.1' | '-.05' | '.3';
	  }
	| {
			obj: 'objSpookytree';
			x: number;
			y: number;
			id?: number;

			progress?:
				| StringThatShouldBeNumber
				| '-10'
				| '0'
				| '5'
				| '12'
				| '17'
				| '20'
				| '28'
				| '33';
			progress_exact?: '1';
	  }
	| {
			obj: 'objSpotsound';
			x: number;
			y: number;
			id?: number;

			datacheck?: 'mountain_music_unlock';
			dataval?: '1';
			sound?:
				| string
				| 'amb_ocean_beach'
				| 'amb_ocean_calm'
				| 'amb_rainforest_rain_lake'
				| 'music_mountain_prologue'
				| 'spot_amb_hotsprings'
				| 'spot_amb_river_cave'
				| 'spot_amb_teatime_meadows_fog';
	  }
	| {
			obj: 'objStampgift';
			x: number;
			y: number;
			id?: number;

			StampID?:
				| StringThatShouldBeNumber
				| '4'
				| '5'
				| '7'
				| '8'
				| '12'
				| '15'
				| '16'
				| '17'
				| '18'
				| '19'
				| '21';
			stamp_x?: StringThatShouldBeNumber | '1' | '2' | '3' | '4';
			stamp_y?: StringThatShouldBeNumber | '1' | '2' | '3' | '4';
	  }
	| {
			obj: 'objSwimzone';
			x: number;
			y: number;
			id?: number;

			height?:
				| StringThatShouldBeNumber
				| '96'
				| '128'
				| '192'
				| '240'
				| '245'
				| '256'
				| '300'
				| '400'
				| '500'
				| '548'
				| '640'
				| '800'
				| '960'
				| '1000'
				| '1080'
				| '2000';
			width?:
				| StringThatShouldBeNumber
				| '64'
				| '80'
				| '144'
				| '200'
				| '240'
				| '244'
				| '256'
				| '300'
				| '320'
				| '400'
				| '500'
				| '524'
				| '600'
				| '640'
				| '1200'
				| '1800'
				| '1920'
				| '2000';
	  }
	| {
			obj: 'objTemple_music';
			x: number;
			y: number;
			id?: number;

			level?: StringThatShouldBeNumber | '2' | '3';
	  }
	| {
			obj: 'objVine_ride';
			x: number;
			y: number;
			id?: number;

			attached_object?:
				| number
				| 0
				| 1
				| 2
				| 3
				| 4
				| 5
				| 6
				| 7
				| 8
				| 9
				| 10
				| 11
				| 12
				| 13
				| 14
				| 15
				| 16
				| 17
				| 18
				| 19
				| 20
				| 21
				| 22
				| 23
				| 24
				| 25
				| 26
				| 27
				| 28
				| 29
				| 30
				| 31
				| 32
				| 33
				| 34
				| 35
				| 36
				| 37
				| 38
				| 39
				| 40
				| 41
				| 42
				| 43
				| 44
				| 45
				| 46
				| 47
				| 48
				| 49
				| 50
				| 51
				| 52
				| 53
				| 54
				| 55
				| 56
				| 57
				| 58
				| 59
				| 60
				| 61
				| 62
				| 63
				| 64
				| 65
				| 66
				| 67
				| 68
				| 69
				| 70
				| 71
				| 72
				| 73
				| 74
				| 75
				| 76
				| 77
				| 78
				| 79
				| 80
				| 81
				| 82
				| 83
				| 84
				| 85
				| 86
				| 87
				| 88
				| 89
				| 90
				| 91
				| 92
				| 93
				| 94
				| 95
				| 96
				| 97
				| 98
				| 99
				| 100
				| 101
				| 102
				| 103
				| 104
				| 105
				| 106
				| 107
				| 108
				| 109
				| 110
				| 111
				| 112
				| 113
				| 114
				| 115
				| 116
				| 117
				| 118
				| 119
				| 120
				| 121
				| 122
				| 123
				| 124
				| 125
				| 126
				| 127
				| 128
				| 129
				| 130
				| 131
				| 132
				| 133
				| 134
				| 135
				| 136
				| 137
				| 138
				| 139
				| 140
				| 141
				| 142
				| 143
				| 144
				| 145
				| 146
				| 147
				| 148
				| 149
				| 150
				| 151
				| 152
				| 153
				| 154
				| 155
				| 156
				| 157
				| 158
				| 159
				| 160
				| 161
				| 162
				| 163
				| 164
				| 165
				| 166
				| 167
				| 168
				| 169
				| 170
				| 171
				| 172
				| 173
				| 174
				| 175
				| 176
				| 177
				| 178
				| 179
				| 180
				| 181
				| 182
				| 183
				| 184
				| 185
				| 186
				| 187
				| 188
				| 189
				| 190
				| 191
				| 192
				| 193
				| 194
				| 195
				| 196
				| 197
				| 198
				| 199
				| 200
				| 201
				| 202
				| 203
				| 204
				| 205
				| 206
				| 207
				| 208
				| 209
				| 210
				| 211
				| 212
				| 213
				| 214
				| 215
				| 216
				| 217
				| 218
				| 219
				| 220
				| 221
				| 222
				| 223
				| 224
				| 225
				| 226
				| 227
				| 228
				| 229
				| 230
				| 231
				| 242
				| 243
				| 244
				| 245
				| 246
				| 247
				| 248
				| 249
				| 250
				| 251;
	  }
	| {
			obj: 'objWallcrack';
			x: number;
			y: number;
			id?: number;

			visible?: '0';
	  }
	| {
			obj: 'objWaterfall';
			x: number;
			y: number;
			id?: number;

			height?:
				| StringThatShouldBeNumber
				| '10'
				| '13'
				| '14'
				| '16'
				| '17'
				| '24'
				| '26'
				| '32'
				| '36'
				| '40'
				| '48'
				| '54'
				| '56'
				| '64'
				| '144';
			silent?: '1';
			topshow?: '0';
			width?:
				| StringThatShouldBeNumber
				| '10'
				| '12'
				| '14'
				| '15'
				| '16'
				| '24'
				| '26'
				| '27'
				| '33'
				| '34'
				| '35'
				| '38'
				| '52'
				| '54';
	  }
	| {
			obj: 'objWavemaker';
			x: number;
			y: number;
			id?: number;

			block_down?: StringThatShouldBeNumber | '0' | '1';
			block_left?: StringThatShouldBeNumber | '0' | '1';
			block_right?: StringThatShouldBeNumber | '0' | '1';
			block_up?: StringThatShouldBeNumber | '0' | '1';
	  }
	| {
			obj: 'objWeepingwillow';
			x: number;
			y: number;
			id?: number;

			xscale?: '-1';
	  }
	| {
			obj: 'objWhitearrow';
			x: number;
			y: number;
			id?: number;

			angle?: StringThatShouldBeNumber | '90' | '180' | '270';
			scale?: '1.8';
	  }
	| {
			obj: 'objWind';
			x: number;
			y: number;
			id?: number;

			bombhold?: '1';
			pattern_time?:
				| StringThatShouldBeNumber
				| '.3334'
				| '1'
				| '1.25'
				| '2.5'
				| '3';
			snowiness?: StringThatShouldBeNumber | '.2' | '.6' | '.66';
			wind_pattern?:
				| StringThatShouldBeNumber
				| '01'
				| '1'
				| '2'
				| '02'
				| '12'
				| '010020'
				| '110220'
				| '200000000000';
	  }
	| CustomGameObjectTypes;

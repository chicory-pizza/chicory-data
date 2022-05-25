// @flow strict

const PALETTE_COLORS: Map<string, Array<[number, number, number]>> = new Map();

PALETTE_COLORS.set('boss1', [[143, 243, 0]]);

PALETTE_COLORS.set('boss2', [[0, 172, 200]]);

PALETTE_COLORS.set('brekkie', [
	[255, 197, 10],
	[171, 253, 185],
	[255, 127, 49],
	[70, 176, 169],
]);

PALETTE_COLORS.set('brunch', [
	[72, 94, 108],
	[116, 142, 141],
	[186, 199, 157],
	[195, 139, 67],
]);

PALETTE_COLORS.set('cave', [
	[255, 0, 150],
	[92, 0, 255],
	[0, 255, 224],
	[255, 178, 0],
]);

PALETTE_COLORS.set('dinners', [
	[187, 235, 220],
	[119, 198, 195],
	[243, 138, 138],
	[255, 242, 201],
]);

PALETTE_COLORS.set('elevenses', [
	[242, 196, 90],
	[94, 140, 106],
	[191, 179, 90],
	[187, 63, 59],
]);

PALETTE_COLORS.set('feast', [
	[255, 35, 102],
	[255, 154, 46],
	[177, 243, 61],
	[255, 111, 250],
]);

PALETTE_COLORS.set('foothills', [
	[255, 181, 70],
	[88, 165, 178],
	[235, 125, 65],
	[112, 115, 47],
]);

PALETTE_COLORS.set('forest', [
	[255, 94, 40],
	[255, 150, 0],
	[255, 195, 27],
	[181, 104, 116],
]);

PALETTE_COLORS.set('gray', [[123, 123, 123]]);

PALETTE_COLORS.set('grub1', [
	[67, 203, 252],
	[120, 247, 216],
	[209, 252, 141],
	[240, 160, 255],
]);

PALETTE_COLORS.set('grub2', [
	[180, 50, 255],
	[254, 73, 167],
	[107, 88, 251],
	[52, 186, 254],
]);

PALETTE_COLORS.set('island', [
	[174, 255, 68],
	[255, 198, 44],
	[15, 197, 161],
	[161, 120, 255],
]);

PALETTE_COLORS.set('meadows', [
	[186, 236, 52],
	[245, 233, 60],
	[42, 228, 160],
	[255, 144, 87],
]);

PALETTE_COLORS.set('mtn', [
	[235, 136, 79],
	[158, 94, 64],
	[87, 188, 192],
	[211, 216, 85],
]);

PALETTE_COLORS.set('newgame', [
	[17, 190, 152],
	[84, 55, 85],
	[1, 37, 69],
]);

PALETTE_COLORS.set('nibble', [
	[164, 255, 84],
	[219, 93, 255],
	[45, 253, 202],
	[136, 127, 255],
]);

PALETTE_COLORS.set('ocean', [
	[34, 180, 255],
	[16, 134, 235],
	[60, 235, 208],
	[73, 106, 251],
]);

PALETTE_COLORS.set('peak', [
	[223, 222, 245],
	[177, 226, 229],
	[211, 238, 234],
	[180, 195, 232],
]);

PALETTE_COLORS.set('potluck', [
	[252, 118, 125],
	[215, 244, 148],
	[255, 220, 128],
	[255, 255, 174],
]);

PALETTE_COLORS.set('rainforest', [
	[128, 232, 182],
	[161, 255, 249],
	[189, 124, 248],
	[114, 136, 246],
]);

PALETTE_COLORS.set('river', [
	[174, 233, 233],
	[208, 235, 170],
	[156, 215, 194],
	[175, 170, 188],
]);

PALETTE_COLORS.set('ruins', [
	[223, 197, 145],
	[179, 129, 132],
	[219, 167, 148],
	[115, 98, 110],
]);

PALETTE_COLORS.set('ruins_dark', [
	[207, 207, 182],
	[185, 150, 194],
	[207, 150, 155],
	[203, 85, 135],
]);

PALETTE_COLORS.set('spooky', [
	[146, 224, 0],
	[255, 35, 0],
	[26, 201, 17],
	[110, 0, 67],
]);

PALETTE_COLORS.set('springs', [
	[139, 190, 243],
	[253, 212, 34],
	[250, 97, 100],
	[140, 68, 164],
]);

PALETTE_COLORS.set('swamp', [
	[207, 240, 158],
	[15, 150, 158],
	[64, 223, 170],
	[247, 123, 166],
]);

PALETTE_COLORS.set('town', [
	[0, 243, 221],
	[216, 255, 85],
	[255, 166, 148],
	[182, 154, 255],
]);

PALETTE_COLORS.set('town_postgame', [
	[4, 255, 196],
	[185, 255, 96],
	[254, 158, 142],
	[118, 144, 255],
]);

PALETTE_COLORS.set('town_spooky', [
	[19, 194, 227],
	[203, 224, 128],
	[244, 130, 186],
	[183, 117, 255],
]);

PALETTE_COLORS.set('town_spooky2', [
	[0, 119, 181],
	[143, 149, 95],
	[174, 48, 145],
	[126, 37, 190],
]);

export {PALETTE_COLORS};

export const LEVEL_PALETTE_LIST: $ReadOnlyArray<string> = [
	'',
	...PALETTE_COLORS.keys(),
];

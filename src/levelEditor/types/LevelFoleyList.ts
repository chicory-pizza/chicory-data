/*
foley values from built-in levels, sigh...

[
	"",
	"0 ",
	"0",
	"1 ",
	"2 ",
	"3 ",
	"4 ",
	"6 ",
	"7 ",
	"8 ",
	"9 ",
	0,
]
*/

const LEVEL_FOLEY_LIST = new Map<number, string>();
LEVEL_FOLEY_LIST.set(1, 'wood');
LEVEL_FOLEY_LIST.set(2, 'concrete');
LEVEL_FOLEY_LIST.set(3, 'dirt');
LEVEL_FOLEY_LIST.set(4, 'cave');
LEVEL_FOLEY_LIST.set(5, 'plant');
LEVEL_FOLEY_LIST.set(6, 'sand');
LEVEL_FOLEY_LIST.set(7, 'snow');
LEVEL_FOLEY_LIST.set(8, 'carpet');
LEVEL_FOLEY_LIST.set(9, 'metal');
// default: grass

// https://www.reddit.com/r/gamemaker/comments/rq43ja/is_there_a_reason_color_functions_are_in_bgr/

export default function convertBgrIntegerToRgb(
	bgr: number
): [number, number, number] {
	return [(bgr >> 0) & 0xff, (bgr >> 8) & 0xff, (bgr >> 16) & 0xff];
}

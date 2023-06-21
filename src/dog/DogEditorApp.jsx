// @flow strict

import OpenGraph from '../common/OpenGraph';
import useMobileViewport from '../util/useMobileViewport';

import {DogEditorProvider} from './DogEditorContext';
import DogEditorUI from './DogEditorUI';

export default function DogEditorApp(): React$MixedElement {
	useMobileViewport();

	return (
		<>
			<OpenGraph
				description="Make your drawdog from Chicory: A Colorful Tale, with your colors and clothing!"
				title="Drawdog maker"
				url="dog"
			/>

			<DogEditorProvider>
				<DogEditorUI />
			</DogEditorProvider>
		</>
	);
}

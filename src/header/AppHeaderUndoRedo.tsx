import {Button, Tooltip} from '@mantine/core';
import {IconArrowBackUp, IconArrowForwardUp} from '@tabler/icons-react';
import {memo} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';

import getCtrlKeyboardModifier from '../util/getCtrlKeyboardModifier';
import isMac from '../util/isMac';
import type {UndoReducerAction} from '../util/useUndoRedoReducer';

type Props = Readonly<{
	canRedo: boolean;
	canUndo: boolean;
	dispatch: (action: UndoReducerAction) => void;
}>;

function AppHeaderUndoRedo(props: Props) {
	useHotkeys(getCtrlKeyboardModifier() + '+z', undo, {
		enabled: props.canUndo,
		preventDefault: true,
	});

	useHotkeys(
		`${getCtrlKeyboardModifier()}+y, ${getCtrlKeyboardModifier()}+shift+z`,
		redo,
		{
			enabled: props.canRedo,
			preventDefault: true,
		}
	);

	function undo() {
		props.dispatch({type: 'undo'});
	}

	function redo() {
		props.dispatch({type: 'redo'});
	}

	return (
		<Button.Group ms="xs">
			<Tooltip label={isMac() ? 'Command-Z' : 'Ctrl-Z'}>
				<Button
					disabled={!props.canUndo}
					leftSection={<IconArrowBackUp size={14} />}
					onClick={undo}
					variant="default"
				>
					Undo
				</Button>
			</Tooltip>

			<Tooltip label={isMac() ? 'Command-Shift-Z' : 'Ctrl-Shift-Z or Ctrl-Y'}>
				<Button
					disabled={!props.canRedo}
					leftSection={<IconArrowForwardUp size={14} />}
					onClick={redo}
					variant="default"
				>
					Redo
				</Button>
			</Tooltip>
		</Button.Group>
	);
}

export default memo(AppHeaderUndoRedo);

import AlertContextModal from './AlertContextModal';

const modals = {
	alert: AlertContextModal,
};

declare module '@mantine/modals' {
	export interface MantineModalsOverride {
		modals: typeof modals;
	}
}

export default modals;

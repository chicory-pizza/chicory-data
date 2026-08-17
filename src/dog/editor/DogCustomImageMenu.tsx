import {Button, Menu, Modal, Tooltip} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {CaretDownIcon} from '@phosphor-icons/react/dist/csr/CaretDown';
import {ImageSquareIcon} from '@phosphor-icons/react/dist/csr/ImageSquare';

import ErrorBoundary from '../../common/ErrorBoundary';

import styles from './DogCustomImageMenu.module.css';

type Props = Readonly<{
	buttonTooltip: string;
	downloadFileName: string;
	downloadModalTitle: string;
	imageUrl: string;
	onSelectNew: () => void;
	onRemove: () => void;
}>;

export default function DogCustomImageMenu({
	buttonTooltip,
	downloadFileName,
	downloadModalTitle,
	imageUrl,
	onSelectNew,
	onRemove,
}: Props) {
	const [
		downloadModalOpen,
		{open: openDownloadModal, close: closeDownloadModal},
	] = useDisclosure(false);

	return (
		<>
			<Menu>
				<Menu.Target>
					<Tooltip label={buttonTooltip}>
						<Button
							variant="default"
							rightSection={<CaretDownIcon size={14} />}
						>
							<ImageSquareIcon size={18} />
						</Button>
					</Tooltip>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Item onClick={onSelectNew}>Select new image</Menu.Item>

					<Menu.Item onClick={openDownloadModal}>Download</Menu.Item>

					<Menu.Item onClick={onRemove}>Remove</Menu.Item>
				</Menu.Dropdown>
			</Menu>

			<Modal
				onClose={closeDownloadModal}
				opened={downloadModalOpen}
				size="auto"
				title={downloadModalTitle}
			>
				<ErrorBoundary>
					<Button
						component="a"
						href={imageUrl}
						download={downloadFileName}
						variant="default"
						mb="md"
					>
						Download
					</Button>

					<img
						alt={downloadModalTitle}
						className={styles.image}
						src={imageUrl}
					/>
				</ErrorBoundary>
			</Modal>
		</>
	);
}

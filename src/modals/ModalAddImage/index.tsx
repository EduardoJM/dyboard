import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import Button from '../../components/Form/Button';

import Modal from '../../components/Modal';

import { useTools } from '../../contexts/tools';
import { useTheme } from '../../contexts/theme';

import { Container, ImageDropzone, ImageContent, ButtonArea } from './styles';

interface ModalAddImageProps {
    opened: boolean;
    modalId: string;
    handleClose: (id: string) => void;
}

const ModalAddImage: React.FC<ModalAddImageProps> = ({
    opened,
    modalId,
    handleClose
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState('');
    const { t } = useTranslation('modals');
    const tools = useTools();
    const theme = useTheme();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length <= 0) {
            return;
        }
        const image = acceptedFiles[0];
        if (!image) {
            return;
        }
        setSelectedFile(image);
        const fileUrl = URL.createObjectURL(image);
        setSelectedFileUrl(fileUrl);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    function handleAddClick() {
        if (!selectedFile) {
            handleClose(modalId);
            return;
        }
        const reader = new FileReader();
        reader.onabort = () => console.log('abort');
        reader.onerror = () => console.log('error');
        reader.onload = () => {
            const imageContent = reader.result as string;
            const item = {
                id: Date.now(),
                type: 'image',
                width: 300,
                height: 300,
                left: 0,
                top: 0,
                imageContent
            };
            setSelectedFile(null);
            setSelectedFileUrl('');
            tools.setCatchClick(item);
            handleClose(modalId);
        };
        reader.readAsDataURL(selectedFile);
    }

    return (
        <Modal
            visible={opened}
            title={t('image.add.title')}
            closeModalRequest={() => handleClose(modalId)}
        >
            <Container>
                <ImageDropzone theme={theme} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {selectedFileUrl
                        ? <ImageContent src={selectedFileUrl} />
                        : (
                            <p className="drop-zone-content">
                                <FiUpload size={64} />
                                {t('image.add.dropZone')}
                            </p>
                        )
                    }
                </ImageDropzone>

                <ButtonArea>
                    <Button onClick={handleAddClick}>{t('image.add.button')}</Button>
                </ButtonArea>
            </Container>
        </Modal>
    );
};

export default ModalAddImage;

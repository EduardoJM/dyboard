import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiClipboard } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { clipboard } from 'electron';

import { Store } from '../../../redux/reducers/types';
import actions, { ModalsIds } from '../../../redux/actions';

import Button from '../../../components/Form/Button';

import Modal from '../../../components/Modal';

import { useTheme } from '../../../contexts/theme';

import { Container, ImageDropzone, ImageContent, ButtonArea } from './styles';

interface ModalAddImageProps {
    modalId: ModalsIds;
}

const ModalAddImage: React.FC<ModalAddImageProps> = ({ modalId }) => {
    const opened = useSelector((store: Store) => store.modals[modalId]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState('');
    const [pastedDataUrl, setPastedDataUrl] = useState('');
    const { t } = useTranslation('modals');
    const theme = useTheme();
    const dispatch = useDispatch();

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
        setPastedDataUrl('');
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    function handleClose() {
        dispatch(actions.modals.changeModalState(modalId, false));
    }

    function handleAddClick() {
        if (!selectedFile) {
            if (pastedDataUrl !== '') {
                dispatch(actions.tools.setElementToAdd({
                    type: 'image',
                    id: Date.now().toString(10),
                    width: 300,
                    height: 300,
                    left: 0,
                    top: 0,
                    data: {
                        imageContent: pastedDataUrl
                    }
                }));
                setSelectedFile(null);
                setSelectedFileUrl('');
                setPastedDataUrl('');
            }
            handleClose();
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const imageContent = reader.result as string;
            setSelectedFile(null);
            setSelectedFileUrl('');
            dispatch(actions.tools.setElementToAdd({
                type: 'image',
                id: Date.now().toString(10),
                width: 300,
                height: 300,
                left: 0,
                top: 0,
                data: { imageContent }
            }));
            handleClose();
        };
        reader.readAsDataURL(selectedFile);
    }

    function handlePasteImage() {
        const img = clipboard.readImage('clipboard');
        if (img.isEmpty()) {
            return;
        }
        setPastedDataUrl(img.toDataURL());
    }

    return (
        <Modal
            visible={opened}
            title={t('image.add.title')}
            closeModalRequest={handleClose}
        >
            <Container>
                <div className="fit-right">
                    <span onClick={handlePasteImage}>
                        <FiClipboard size={16} />
                    </span>
                </div>
                <ImageDropzone theme={theme} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {(selectedFileUrl || pastedDataUrl)
                        ? <ImageContent src={selectedFileUrl || pastedDataUrl} />
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

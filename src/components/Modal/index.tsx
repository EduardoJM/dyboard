import React, { useState, useEffect, MouseEvent } from 'react';
import { useTransition } from 'react-spring';
import { MdClose } from 'react-icons/md';

import { useTheme } from '../../contexts/theme';

import {
    Container,
    Overlay,
    Dialog,
    Header,
    HeaderButton,
    Content
} from './styles';

export interface ModalProps {
    visible: boolean;
    title: string;
    closeModalRequest?: () => void;
}

const Modal: React.FC<ModalProps> = ({
    children,
    visible,
    title,
    closeModalRequest
}) => {
    const [modalState, setModalState] = useState(false);
    const transitions = useTransition(modalState, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });
    const dialogTransitions = useTransition(modalState, null, {
        from: { opacity: 0, transform: 'translate(-50%, -50%) translateY(-40px)' },
        enter: { opacity: 1, transform: 'translate(-50%, -50%) translateY(0px)' },
        leave: { opacity: 0, transform: 'translate(-50%, -50%) translateY(-40px)' }
    });
    const theme = useTheme();

    useEffect(() => {
        setModalState(visible);
    }, [visible]);

    function handleOverlayClick(e: MouseEvent) {
        if (!closeModalRequest) {
            return;
        }
        const element = e.target as HTMLElement;
        if (element.classList.contains('close-modal')) {
            closeModalRequest();
        }
    }

    function handleCloseButtonClick() {
        if (closeModalRequest) {
            closeModalRequest();
        }
    }

    return (
        <>
            <Container>
                {transitions.map(
                    ({ item, key, props: style }) => item && (
                        <Overlay
                            className="close-modal"
                            key={key}
                            style={style}
                            onClick={handleOverlayClick} />
                    )
                )}
                {dialogTransitions.map(
                    ({ item: dlg, key: key2, props: dlgStyle }) => dlg && (
                        <Dialog key={key2} style={dlgStyle} theme={theme}>
                            <Header>
                                <span className="title">{ title }</span>
                                <HeaderButton theme={theme} onClick={handleCloseButtonClick}>
                                    <MdClose size={24} />
                                </HeaderButton>
                            </Header>
                            <Content>
                                { children }
                            </Content>
                        </Dialog>
                    )
                )}
            </Container>
        </>
    );
};

export default Modal;

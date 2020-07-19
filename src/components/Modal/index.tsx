import React, { useState, useEffect, MouseEvent } from 'react';
import { useTransition } from 'react-spring';
import { MdClose } from 'react-icons/md';

import {
    Container,
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
        from: { opacity: 0, transform: 'translateY(-40px)' },
        enter: { opacity: 1, transform: 'translateY(0px)' },
        leave: { opacity: 0, transform: 'translateY(-40px)' }
    });

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
            {transitions.map(
                ({ item, key, props: style }) => item && (
                    <Container
                        className="close-modal"
                        key={key}
                        style={style}
                        onClick={handleOverlayClick}
                    >
                        <Dialog>
                            <Header>
                                <span className="title">{ title }</span>
                                <HeaderButton onClick={handleCloseButtonClick}>
                                    <MdClose size={24} />
                                </HeaderButton>
                            </Header>
                            <Content>
                                { children }
                            </Content>
                        </Dialog>
                    </Container>
                )
            )}
        </>
    );
};

export default Modal;

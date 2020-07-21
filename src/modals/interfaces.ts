
export default interface ModalProps {
    opened: boolean;
    modalId: string;
    handleClose: (id: string) => void;
}

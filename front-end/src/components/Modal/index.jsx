import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ProductDetailsCard } from '../Cards/ProductDetailsCard';
import { ModalOverlay, ModalContent, CloseButton } from './styles';

export const ProductPreviewModal = ({ product, onClose }) => {
    if (!product) return null;

    return createPortal(
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>X</CloseButton>
                <ProductDetailsCard product={product} isPreview={true} />
            </ModalContent>
        </ModalOverlay>,
        document.body
    );
};

ProductPreviewModal.propTypes = {
    product: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};
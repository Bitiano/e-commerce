import PropTypes from 'prop-types';
import { Button } from './styles';

export const GenericButton = ({ children, onClick }) => {

    const handleClick = () => {
        onClick();
    };

    return (
        <Button onClick={handleClick}> {children} </Button>
    );
};

GenericButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};
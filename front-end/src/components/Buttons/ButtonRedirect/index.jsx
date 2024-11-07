import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button } from './styles';

export const RedirectButton = ({ to, children, icon }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <Button onClick={handleClick}>
            {icon}
            {children}
        </Button>
    );
};

RedirectButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    icon: PropTypes.node,
};
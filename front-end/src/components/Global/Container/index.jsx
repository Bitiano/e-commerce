import { StyledContainer } from './styles';
import PropTypes from 'prop-types';

export const Container = ({ children }) => <StyledContainer>{children}</StyledContainer>;

Container.propTypes = {
    children: PropTypes.node.isRequired,
};
import PropTypes from 'prop-types';
import { Input } from './styles';

export const SearchInput = ({ value, onChange, onSubmit }) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit();
        }
    };

    return (
        <Input
            type="text"
            placeholder="Pesquisar..."
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
        />
    );
};

SearchInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

import { cpf } from 'cpf-cnpj-validator';

export const cpfValidator = (value) => {
    return cpf.isValid(value);
};
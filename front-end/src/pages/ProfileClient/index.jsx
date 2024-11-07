import { Link } from 'react-router-dom';

export const ProfileClient = () => {
    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "2rem auto",
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "var(--background-color)",
                color: "var(--text-color-dark)",
                textAlign: "center",
            }}
        >
            <h1
                style={{
                    color: "var(--primary-color)",
                    fontSize: "2rem",
                    marginBottom: "1rem",
                }}
            >
                Perfil
            </h1>
            <Link
                to="/profile/orders-list"
                style={{
                    display: "inline-block",
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--text-color-light)",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                    margin: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "5px",
                    transition: "background-color 0.3s",
                    cursor: "pointer",
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--primary-color)"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "var(--secondary-color)"}
            >
                Meus pedidos
            </Link>
            <Link
                to="/profile/edit"
                style={{
                    display: "inline-block",
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--text-color-light)",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                    margin: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "5px",
                    transition: "background-color 0.3s",
                    cursor: "pointer",
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--primary-color)"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "var(--secondary-color)"}
            >
                Editar perfil
            </Link>
            <Link
                to="/profile/address-list"
                style={{
                    display: "inline-block",
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--text-color-light)",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                    margin: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "5px",
                    transition: "background-color 0.3s",
                    cursor: "pointer",
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--primary-color)"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "var(--secondary-color)"}
            >
                Endereços
            </Link>
        </div>
    );
};

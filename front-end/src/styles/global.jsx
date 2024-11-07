import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --primary-color: #1E3A8A;
        --secondary-color: #60A5FA;
        --accent-color: #F59E0B;
        --background-color: #F3F4F6;
        --text-color-dark: #374151;
        --text-color-light: #F9FAFB;
        --error-color: #EF4444;
        --success-color: #10B981;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Roboto', sans-serif;
        background-color: var(--background-color);
        min-height: 100vh;
    }
`;
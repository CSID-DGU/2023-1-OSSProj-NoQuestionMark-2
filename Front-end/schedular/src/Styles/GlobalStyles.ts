import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html{
        margin : 0;
        padding : 0;
        font-size: 1vw;
    }
    a{
        text-decoration: none;
    }
    ul{
        list-style: none;
    }
`;

export default GlobalStyle;
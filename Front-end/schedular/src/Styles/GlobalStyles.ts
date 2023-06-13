import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html,body{
        margin : 0;
        padding : 0;
        font-size: 1vw;
        height: 100%;
    }
    a{
        text-decoration: none;
    }
    ul{
        list-style: none;
    }
`;

export default GlobalStyle;
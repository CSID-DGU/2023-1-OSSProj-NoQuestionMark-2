import styled from "styled-components";

const FooterWapper = styled.div`
    flex-shrink: 0;
    background: orange;
    height: 7rem;
    margin-top: 2.1rem; 
`;

const Footer = () => {
    return (
        <FooterWapper><p>footer</p></FooterWapper>
    );
}

export default Footer;
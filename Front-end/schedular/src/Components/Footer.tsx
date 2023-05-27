import styled from "styled-components";

const FooterWapper = styled.div`
    position: relative;
    transform: translatY(-100%);
    background: orange;
`;

const Footer = () => {
    return (
        <FooterWapper>Footer</FooterWapper>
    );
}

export default Footer;
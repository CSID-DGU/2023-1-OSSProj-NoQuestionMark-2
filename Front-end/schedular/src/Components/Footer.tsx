import styled from "styled-components";

const FooterWapper = styled.div`
    width: 100%;
    position: absolute;
    background: orange;
    height: 7rem;
`;

const Footer = () => {
    return (
        <FooterWapper><p>footer</p></FooterWapper>
    );
}

export default Footer;
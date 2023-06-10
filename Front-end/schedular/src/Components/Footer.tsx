import styled from 'styled-components';
import footerLogo from '../Assets/Images/footerLogo.png'

const FooterWapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    background: orange;
    height: 7rem;
    margin-top: 2.1rem; 
    background: #a69d8f;
`;
const RightWrapper = styled.div`
    padding : 1rem 0;
`;
const LeftWarpper = styled.div`
    width : 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: right;
    padding : 1rem 0;
`;
const DonggukInformation = styled.div`
    margin-right: 2rem;
`;
const FooterLogo = styled.img`
    margin-top: 1rem;
    width: 80%;
`;
const Information = styled.p`
    margin: 0;
    vertical-align: middle;
`;
const Seoul = styled(Information)``;
const GyeongJu = styled(Information)``;
const CopyRight = styled(Information)``;

const Footer = () => {
    return (
        <FooterWapper>
            <RightWrapper>
                <FooterLogo src={footerLogo}  alt='footerLogo'/>
            </RightWrapper>
            <LeftWarpper>
                <DonggukInformation>
                    <Seoul>서울캠퍼스 : (04620) 서울특별시 중구 필동로 1길 30. Tel. 02-2260-3114</Seoul>
                    <GyeongJu>경주캠퍼스 : (38066) 경상북도 경주시 동대로123 동국대학교 경주캠퍼스. Tel.  054-770-2114</GyeongJu>
                    <CopyRight>copyright&copy; dongguk university opensource project 2team</CopyRight>
                </DonggukInformation>
            </LeftWarpper>
        </FooterWapper>
    );
}

export default Footer;
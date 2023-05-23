import styled from 'styled-components';


const Detail = styled.div`
  position: absolute;
  float: right;
  width: 70%;
  min-width: 300px;
  height: 600px;
  margin: 100px 0 0 400px;
  background-color: #fff;
`;
const DetailWapper = styled.div`
  text-align: left;
  height: 90%;
  margin: 0 30px;
  background-color: #fff;
`;
const TitleWapper = styled.div`
  height: 40px;
  background-color: #e6e6e6;
  border: 1px solid #cdcdcd;
`;
const Title = styled.div`
  padding: 10px;
  padding-left: 20px;
  font-size: 15px;
  color: #333;
  font-weight: bold;
`;
const ContentWapper = styled.div`
  display: flex;
`;
const ContentTitleWapper = styled.div`
  height: 498px;
  width: 100px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  text-shadow: 1px 1px 1px #506890;
  color: #fff;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const ContentTitle = styled.div`
  padding: 10px;
  font-size: 14px;
  border-top: 1px solid #6880a6;
`;
const Content = styled.div`
  height: 498px;
  width: 100%;
  text-align: left;
  font-size: 15px;
  color: #000;
  background-color: #f6f6f6;
  border: 1px solid #cdcdcd;
`;
const ContentType = styled.div`
  padding: 11px;
  font-size: 12px;
  border-top: 1px solid #cdcdcd;
`;
const ContentDate = styled.div`
  padding: 11px;
  font-size: 12px;
  border-top: 1px solid #cdcdcd;
`;
const ContentDetail = styled.div`
  padding: 11px;
  font-size: 12px;
  height: 400px;
  border-top: 1px solid #cdcdcd;
`;
const ButtonWapper = styled.div`
  float: right;
  margin: 15px 30px;
`;
const SubjectButton = styled.button`
  margin: 0 10px;
  font-size: 13px;
  width: 75px;
  color: #67686c;
  background-color: #ebebeb;
  border: 1px solid #9fa4b1;
  border-radius: 5px;
`;

const EclassDetailStudent = () => {
  //내용 가져오기


  return (
    <Detail>
      <DetailWapper>
        <TitleWapper>
          <Title>제목</Title>
        </TitleWapper>
        <ContentWapper>
          <ContentTitleWapper>
            <ContentTitle>일정종류</ContentTitle>
            <ContentTitle>제출기한</ContentTitle>
            <ContentTitle>상세내용</ContentTitle>
          </ContentTitleWapper>
          <Content>
            <ContentType>일정종류</ContentType>
            <ContentDate>제출기한</ContentDate>
            <ContentDetail>상세내용</ContentDetail>
          </Content>
        </ContentWapper>
      </DetailWapper>
      <ButtonWapper>
        <SubjectButton type='button'>제출하기</SubjectButton>
      </ButtonWapper>
    </Detail>
  )
}

export default EclassDetailStudent
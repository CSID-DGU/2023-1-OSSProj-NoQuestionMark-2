import {useState} from 'react';
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
const EditingTitle = styled.input`
  position: absolute;
  top: 5px;
  margin-left: 10px;
  width: 400px;
  padding: 6px 10px;
  font-size: 15px;
  border: none;
  background-color: #e6e6e6;
`;
const EditingType = styled.select`
  position: absolute;
  top: 41px;
  width: 1030px;
  padding: 12.5px 13px;
  font-size: 12px;
  border: 1px solid #cdcdcd;
  background-color: #f6f6f6;
`;
const EditingStartDate = styled.input`
  position: absolute;
  top: 82px;
  width: 400px;
  padding: 11px 13px;
  font-size: 12px;
  border: none;
  background-color: #f6f6f6;
`;
const EditingEndDate = styled.input`
  position: absolute;
  top: 82px;
  right: 32px;
  width: 400px;
  padding: 11px 13px;
  font-size: 12px;
  border: none;
  background-color: #f6f6f6;
`;
const StyledP = styled.p`
  position: absolute;
  top: 75px;
  left: 630px;
  font-size: 15px;
  font-weight: bold;
`;
const EditingDetail = styled.textarea`
  position: absolute;
  top: 121px;
  width: 1002.5px;
  padding: 9px 13px;
  font-size: 12px;
  height: 400px;
  border: 1px solid #cdcdcd;
  background-color: #f6f6f6;
`;
const ButtonWapper = styled.div`
  float: right;
  margin: 15px 30px;
`;
const EditButton = styled.button`
  margin: 0 10px;
  font-size: 13px;
  width: 75px;
  color: #67686c;
  background-color: #ebebeb;
  border: 1px solid #9fa4b1;
  border-radius: 5px;
`;
const CancleButton = styled.button`
  margin: 0 10px;
  font-size: 13px;
  width: 75px;
  color: #67686c;
  background-color: #ebebeb;
  border: 1px solid #9fa4b1;
  border-radius: 5px;
`;

const EclassDetail = () => {
  const [isEditing, setIsEditing] = useState(false);

  //내용 가져오기


  return (
    <Detail>
      {isEditing ? (<>
      <DetailWapper>
        <TitleWapper>
          <EditingTitle id='title' type='text' placeholder='제목을 입력해주세요.'/>
        </TitleWapper>
        <ContentWapper>
          <ContentTitleWapper>
            <ContentTitle>일정종류</ContentTitle>
            <ContentTitle>제출기한</ContentTitle>
            <ContentTitle>상세내용</ContentTitle>
          </ContentTitleWapper>
          <Content>
            <EditingType id='subjectType'>
              <option value='과제'>과제</option>
              <option value='시험'>시험</option>
              <option value='발표'>발표</option>
            </EditingType>
            <EditingStartDate id='startDate' type='datetime-local'/>
            <StyledP>~</StyledP>
            <EditingEndDate id='endDate' type='datetime-local'/>
            <EditingDetail id='contents' placeholder='상세내용을 입력해주세요.'/>
          </Content>
        </ContentWapper>
      </DetailWapper>
      <ButtonWapper>
        <EditButton type='button' onClick={()=>{setIsEditing(false)}}>취소하기</EditButton>
        <CancleButton type='submit'>수정완료</CancleButton>
      </ButtonWapper></>) : (<>
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
        <EditButton type='button' onClick={()=>{setIsEditing(true)}}>수정하기</EditButton>
        <CancleButton type='button'>삭제하기</CancleButton>
      </ButtonWapper></>)}
      
    </Detail>
  )
}

export default EclassDetail
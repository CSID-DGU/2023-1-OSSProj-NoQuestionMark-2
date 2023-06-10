import EclassMenu from './../Components/EclassMenu';
import EclassClassName from 'Components/EclassClassName';
import EclassDetail from 'Components/EclassDetail';
import EclassDetailStudent from 'Components/EclassDetailStudent';
import { useRecoilValue} from 'recoil';
import { userInfoState } from 'recoil/Atom'



const isStudent = (userType:string|null):boolean => {
  if(userType === "STUDENT") {
    return true
  } return false;
}

// memo정민: 이클래스 공식 과목 일정 상세보기 페이지
const EclassSubjectDetail = () =>{

  // memo정민: 현재 사용자의 userType을 가져옴
  const userType = useRecoilValue(userInfoState).userType;
  // memo정민: 사용자의 userType
  const STUDENT = isStudent(userType);

    return (
        <>
            <EclassMenu />
            <EclassClassName/>
            { STUDENT ? <EclassDetailStudent /> : <EclassDetail/>}
        </>
    )

}

export default EclassSubjectDetail;
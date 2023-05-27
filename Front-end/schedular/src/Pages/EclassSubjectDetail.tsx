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

const EclassSubjectDetail = () =>{

  const userType = useRecoilValue(userInfoState).userType;
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
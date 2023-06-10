import {Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Calendar from './Pages/Calendar';
import NotFound from './Pages/NotFound';
import { MemberRoute, NonMemberRoute } from 'Components/RestrictionRoute';
import EclassSubject from 'Pages/EclassSubject';
import EclassSubjectDetail from 'Pages/EclassSubjectDetail';
import EclassSubjectAdd from 'Pages/EclassSubjectAdd';

const AppRouter = () =>{
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/signup" element={<NonMemberRoute><SignUp /></NonMemberRoute>}/>
                <Route path="/calendar" element={<MemberRoute><Calendar /></MemberRoute>}/>
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/eclass/:id" element={<EclassSubject />} />
                <Route path="/eclass/detail/:id" element={<EclassSubjectDetail />} />
                <Route path="/eclass/add" element={<EclassSubjectAdd />} />
            </Routes>
        </>
    )
}

export default AppRouter;
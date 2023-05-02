import {Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Calendar from './Pages/Calendar';
import NotFound from './Pages/NotFound';
import { MemberRoute, NonMemberRoute } from 'Components/RestrictionRoute';

const AppRouter = () =>{
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/signup" element={<SignUp />} />
                {/* <Route path="/signup" element={<NonMemberRoute><SignUp /></NonMemberRoute>}/> */}
                <Route path="/calendar" element={<Calendar />}/>
                {/* <Route path="/calendar" element={<MemberRoute><Calendar /></MemberRoute>}/> */}
                <Route path="/notfound" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default AppRouter;
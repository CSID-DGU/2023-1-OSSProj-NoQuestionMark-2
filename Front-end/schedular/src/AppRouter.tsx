import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import DemoApp from './Pages/FullCalendar';

const AppRouter = () =>{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/signup" element={<SignUp />}/>
                    <Route path="/calendar" element={<DemoApp />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;
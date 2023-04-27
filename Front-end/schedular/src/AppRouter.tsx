import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';

const AppRouter = () =>{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/signup" element={<SignUp />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;
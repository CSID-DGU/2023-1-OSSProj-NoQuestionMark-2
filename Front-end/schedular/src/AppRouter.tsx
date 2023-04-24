import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home';

const AppRouter = () =>{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;
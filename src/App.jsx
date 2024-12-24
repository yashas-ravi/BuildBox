import { LandingPage } from './Landingpage';
import { Error } from './Errorpage/error'
import { EditorWindow } from './Editorpage/editor';
import { Dashboard } from './DashBoard/dashboard';
import { Signin } from './Auth/signin';
import { Signup } from './Auth/signup';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const App = () => {
    const user = localStorage.getItem("token");
    return(
        <BrowserRouter>
            <Routes>
                    <Route exact path='/' element={<LandingPage/>}></Route>
                    <Route index element={<LandingPage/>}></Route>
                    { user && <Route path='/dashboard' exact element={<Dashboard/>}></Route>}
                    <Route path='/dashboard' exact element={<Navigate replace to = "/signin"/>}></Route>
                    <Route path='/signup' exact element={<Signup/>}></Route>
                    <Route path='/signin' exact element={<Signin/>}></Route>
                    { user && <Route exact path='/editor/:pageId' element={<EditorWindow/>}></Route>}
                    <Route path='*' element={<Error/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
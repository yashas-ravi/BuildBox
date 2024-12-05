import { LandingPage } from './Landingpage';
import { Error } from './Errorpage/error'
import { EditorWindow } from './Editorpage/editor';
import { Dashboard } from './DashBoard/dashboard';
import { Signin } from './Auth/signin';
import { Signup } from './Auth/signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                    <Route exact path='/' element={<LandingPage/>}></Route>
                    <Route index element={<LandingPage/>}></Route>
                    <Route path='/dashboard' element={<Dashboard/>}></Route>
                    <Route path='/signup' element={<Signup/>}></Route>
                    <Route path='/signin' element={<Signin/>}></Route>
                    <Route exact path='/editor/:pageId' element={<EditorWindow/>}></Route>
                    <Route path='*' element={<Error/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
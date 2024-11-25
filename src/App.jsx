import {LandingPage} from './Landingpage';
import {Error} from './Errorpage/error'
import {EditorWindow} from './Editorpage/editor';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}></Route>
                <Route index element={<LandingPage/>}></Route>
                <Route path='/editor' element={<EditorWindow/>}></Route>
                <Route path='*' element={<Error/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
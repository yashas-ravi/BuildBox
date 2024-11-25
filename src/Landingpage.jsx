import {Home} from './Homepage/home';
import {About} from './Aboutpage/about';
import {Contact} from './Contactpage/contact';

export const LandingPage = () => {
    return(
        <div>
            <Home/>
            <About/>
            <Contact/>
        </div>
    );
}
import React from 'react';
import './ErrorPage.scss';
import { NavLink} from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='autoError'>
            <div className='container'>
                <div>
                    <h2>404</h2>
                    <h3>UH OH! You're lost</h3>
                    <p>The page you are looking for might have been removed <br />
                        had its name changed or temporarily unavailable
                    </p>
                    <NavLink to="/">
                        <button>GO TO HOMEPAGE</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
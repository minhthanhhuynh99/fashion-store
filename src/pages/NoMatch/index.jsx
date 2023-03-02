import React from 'react'
import { Link } from 'react-router-dom'
import Button  from '../../components/common/Button'
import './index.scss'
function NoMatch(props) {
  return (
    <>
        <div className='nomatch'>
            <h1>404 Error Page </h1>
            <p className="zoom-area"><b>Sorry</b> URL not fault please go back </p>
            <section className="error-container">
            <span className="four"><span className="screen-reader-text">4</span></span>
            <span className="zero"><span className="screen-reader-text">0</span></span>
            <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
                <Link to={'/'}> 
                    <Button 
                        nameBtn={"Back to Home"} 
                    />
                </Link>
            </div>
        </div>
    </>
  )
}

export default NoMatch

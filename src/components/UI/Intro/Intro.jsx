import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './Intro.scss';
import introVideo from "../../../assets/video/intro.mp4";

const Intro = () => {
    const [isMuted, setIsMuted] = useState(true)
    return (
        <div className='intro__container'>
            <ReactPlayer
                playing={true}
                width='100%'
                height='100%'
                volume={1}
                muted={isMuted}
                url={introVideo}
                className='video__intro'
                loop={true}
            />
            <div className='info__intro'>
                <h1 className='heading__intro'>Fashion Shop</h1>
                <p className='overview__intro'>Fasshion and so much more (Thời trang và hơn thế nữa)</p>
                <p className='overview__intro'>Be good, Be bad, Be yourself (Dù tốt dù xấu, hãy là chính bạn)</p>
                <p className='overview__intro'>A sense of style (Ý thức về phong cách)</p>
            </div>
            {
                isMuted ? ( 
                    <i className="ri-volume-mute-line btn__Volume" onClick={() => setIsMuted(prev => !prev)}></i>
                    ) : ( 
                    <i className="ri-volume-up-line  btn__Volume" onClick={() => setIsMuted(prev => !prev)}></i>
                )
            }

            
        </div>
    );
};

export default Intro;
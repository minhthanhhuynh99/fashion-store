import React from 'react'
import Content from '../../layout/Content'
import Footer from '../../layout/Footer'
import Header from '../../layout/Header'
import Advertisement from '../../components/UI/Advertisement/Advertisement';


function Home(props) {
  return (
    <>
        <div className=''>
            <Header/>
            <Content/>
            <Footer/>
            <Advertisement/>
        </div>
    </>
  )
}


export default Home

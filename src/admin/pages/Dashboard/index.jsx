import React from 'react'
import Chart from '../../components/Chart'
import Widget from '../../components/Widget'
import './index.scss'

function Dashboard(props) {
  return (
    <>
    <main>
      <div className='main__content'>
        <div className='widget__list'>
            <Widget/>
        </div>
        <div className='Chart'>
        <div className="charts__left">
            <Chart />
          </div>
          <div className="charts__right">
            <Chart />
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
export default Dashboard

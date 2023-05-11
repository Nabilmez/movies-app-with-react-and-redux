// import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import Tranding from './traning/Tranding'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import './Home.scss'
const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Tranding />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home
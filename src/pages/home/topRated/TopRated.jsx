/* eslint-disable react/no-unescaped-entities */
// import React from 'react'
import { useState } from "react"
import ContentWrapper from "../../../components/contantWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import Carousel from "../../../components/carousel/Carousel"
import useFetch from "../../../hooks/useFatch"
const Tranding = () => {
    const [endPoint,setEndPoint] = useState("movie");
    const {data , loading} = useFetch(`/${endPoint}/top_rated`)
    const onTabChange = (tab)=>{
        setEndPoint(tab ==="Movies" ? "movie":"tv")
    }
  return (
    <div className="crouselSection">
        <ContentWrapper>
            <span className="crouselTitle">
                Top Rated
            </span>
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  )
}

export default Tranding
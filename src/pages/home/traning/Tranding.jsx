// import React from 'react'
import { useState } from "react"
import ContentWrapper from "../../../components/contantWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import Carousel from "../../../components/carousel/Carousel"
import useFetch from "../../../hooks/useFatch"
const Tranding = () => {
    const [endPoint,setEndPoint] = useState("day");
    const {data , loading} = useFetch(`/trending/all/${endPoint}`)
    const onTabChange = (tab)=>{
        setEndPoint(tab ==="Day" ? "day":"week")
    }
  return (
    <div className="crouselSection">
        <ContentWrapper>
            <span className="crouselTitle">
                Tranding
            </span>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Tranding
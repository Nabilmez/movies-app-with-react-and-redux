/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
// import MovieCard from "../../components/movieCard/MovieCard";
// import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
import './SearchResult.scss'
import ContentWrapper from '../../components/contantWrapper/ContentWrapper'
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";
const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();
    const fetchInitialValue = ()=>{
      setLoading(true);
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res)=>{
        console.log(res)
        setData(res)
        setPageNum(prev=> prev +1)
        setLoading(false)
      })
    }
    const fetchNextData= ()=>{
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res)=>{
        if(data?.results){
          setData({
            ...data, results: [...data?.results, ...res.results]
          });
        }else{
          setData(res);
        }
        setPageNum(prev=> prev +1)
        
      })
    }
    useEffect(()=>{
      setPageNum(1)
      fetchInitialValue()
    },[query])
  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} /> }
      {!loading && (
        <ContentWrapper>
          {data?.results.length >0 ? (
            <>
            <div className="pageTitle">
              {`Search ${data?.total_results > 1 ?"results" :"result"} of '${query}':`}
            </div>
            <InfiniteScroll
            className="content"
            dataLength={data?.results?.length || []}
            next={fetchNextData}
            hasMore={pageNum <= data?.total_pages}
            loader={Spinner}
            >
              {data.results.map((item,index)=>{
                if(item.media_type === "person")return;
                return(
                  <MovieCard key={index} data={item} fromSearch={true} />
                  )
              })}
            </InfiniteScroll>
            </>
          ):(
            <div className="resultNotFound">
              Sorry, results not found
            </div>
          )}
        </ContentWrapper>
      )} 
    </div>
  )
}

export default SearchResult
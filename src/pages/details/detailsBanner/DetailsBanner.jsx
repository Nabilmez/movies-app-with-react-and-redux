/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailsBanner.scss";

import ContentWrapper from '../../../components/contantWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFatch';
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import ImgLoad from "../../../components/LazyLoadImage/ImgLoad";
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import {PlayIcon} from './PlayIcon'

const DetailsBanner = ({ videos , crew}) => {
    const [show , setShow] = useState(false);
    const [videoId , setVideoId] = useState(null)
    const { mediaType , id} = useParams();
    const {data , loading} =useFetch(`/${mediaType}/${id}`)
    const { url } = useSelector((state)=> state.home)
    const genresId =data?.genres?.map((g)=> g.id)
    const director = crew?.filter((f)=> f.job === "Director");
    const writer = crew?.filter((f)=> f.job === "Writer" || f.job === 'Screenplay' || f.job === 'Story');
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                {!!data && (
                    <React.Fragment>
                        <div className="backdrop-img">
                        <ImgLoad src={url.backdrop + data.backdrop_path} />
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data.poster_path ?
                                (
                                    <ImgLoad src={url.backdrop + data.poster_path} className="posterImg" />
                                ):(
                                    <ImgLoad src={PosterFallback} className="posterImg" />
                                )
                            }
                            </div>
                            <div className="right">
                                <div className="title">
                                    {`${data.name || data.title }(${dayjs(data.release_date).format("YYYY")})`}
                                </div>
                                <div className="subtitle">
                                    {data.tagline}
                                </div>
                                <Genres data={genresId} />
                                <div className="row">
                                    <CircleRating rating={data?.vote_average?.toFixed(1)}/>
                                    <div 
                                    className="playbtn"
                                    onClick={()=>{
                                        setShow(true)
                                        setVideoId(videos.key)
                                    }}
                                    >
                                        <PlayIcon />
                                        <span className="text">
                                            Watch Trailer
                                        </span>
                                    </div>
                                </div>
                                <div className="overview">
                                    <div className="heading">Overview:</div>
                                    <div className="description">{data.overview}</div>
                                </div>
                                <div className="info">
                                    {data.status &&
                                    <div className="infoItem">
                                        <span className="text bold">
                                            status:{" "}
                                        </span>
                                        <span className="text">{data.status}</span>
                                    </div>
                                    }
                                    {data.release_date &&
                                    <div className="infoItem">
                                        <span className="text bold">
                                            Release date:{" "}
                                        </span>
                                        <span className="text">{dayjs(data.release_date).format("MMM D, YYYY")}</span>
                                    </div>
                                    }
                                    {data.runtime &&
                                    <div className="infoItem">
                                        <span className="text bold">
                                            Runtime:{" "}
                                        </span>
                                        <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                    </div>
                                    }
                                </div>
                                {director?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Director:{" "}
                                        </span>
                                        <span className="text">
                                            {director.map((d,i)=>(
                                                <span key={i}>
                                                    {d.name}
                                                    {director.length -1 !== i && ', '}
                                                    </span>
                                            ))}
                                        </span>
                                    </div>
                                )}
                                {writer?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Writer:{" "}
                                        </span>
                                        <span className="text">
                                            {writer.map((w,i)=>(
                                                <span key={i}>
                                                    {w.name}
                                                    {writer.length -1 !== i && ', '}
                                                    </span>
                                            ))}
                                        </span>
                                    </div>
                                )}
                                {data?.created_by?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Creator:{" "}
                                        </span>
                                        <span className="text">
                                            {data?.created_by.map((w,i)=>(
                                                <span key={i}>
                                                    {w.name}
                                                    {data?.created_by?.length -1 !== i && ', '}
                                                    </span>
                                            ))}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <VideoPopup
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoId}
                        />
                    </ContentWrapper>
                    </React.Fragment>
                )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
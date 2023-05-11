/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from "react";

import './VideoSection.scss';

import ContentWrapper from "../../../components/contantWrapper/ContentWrapper";
import {PlayIcon} from '../detailsBanner/PlayIcon'
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import ImgLoad from "../../../components/LazyLoadImage/ImgLoad";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map((video)=>(
                            <div
                            key={video.id}
                            onClick={()=>{
                                setVideoId(video.key)
                                setShow(true)
                            }}
                            className="videoItem">
                                <div className="videoThumbnail">
                                    <ImgLoad src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">
                                    {video.name}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};
export default VideosSection;
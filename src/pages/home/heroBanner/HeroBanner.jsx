import {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFatch';
import ImgLoad from '../../../components/LazyLoadImage/ImgLoad';
import ContentWrapper from '../../../components/contantWrapper/ContentWrapper';
import './HeroBanner.scss';
const HeroBanner = () => {
  const [backGround , setBackGround] = useState("");
  const [query , setQuery] = useState("");
  const {data ,loading} = useFetch("/movie/upcoming")
  const { url } = useSelector((state)=> state.home);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const bg =url.backdrop + data?.results?.[Math.floor(Math.random() *20)]?.backdrop_path;
    setBackGround(bg);
    
    
  },[data]);

  const handleSearchQuery=(event)=>{
    if(event.key == 'Enter' && query.length > 0){
      navigate(`/search/${query}`) 
    }

  }
  return (
    <div className="heroBanner">
      <div className="backrop-img">
        <ImgLoad src={backGround} />
      </div>
      <div className="opacity-layer"></div>
      <div className="contentWrapper">
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover.
            Explore now.
          </span>
          <div className="searchInput">
            <input
            type="text"
            placeholder="Search for a movie or tv show...."
            onChange={(e)=>  setQuery(e.target.value)}
            onKeyUp={handleSearchQuery}
            />
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
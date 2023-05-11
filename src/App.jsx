/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect  } from 'react'
import {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom'
import { fetchDataFromApi } from './utils/api'
import { useSelector , useDispatch } from 'react-redux';
import { getApiConfiguration , getGenres } from './store/HomeSlice';
import {Header ,Footer ,Home ,PageNotFound ,SearchResult,Details,Explore} from './index';
import './App.css'

const App = ()=> {
  const { url } = useSelector(state=>state.home)
  const disPatch = useDispatch();
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[])
  const fetchApiConfig = ()=>{
    fetchDataFromApi('/configuration')
    .then((res)=>{
      const url ={
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        profile:res.images.secure_base_url + "original",
      }
      disPatch(getApiConfiguration(url))
    })
  }
  const genresCall = async ()=>{
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};
    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    })
    const data = await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=> allGenres[item.id] = item)
    })
    disPatch(getGenres(allGenres))
  }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/:mediaType/:id' element={<Details />}/>
        <Route path='/search/:query' element={<SearchResult />}/>
        <Route path='/explore/:mediaType' element={<Explore />}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

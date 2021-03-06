import React,{useEffect,useState} from 'react'
import axios from 'axios'
import requests from './request'
import instance from './axios'
import './Banner.css'

function Banner() {
    const[movie,setMovie]=useState([])
    const[overview,setOverview]=useState([]);
   function truncate(string,n){
            return (string.length>n)?string.substring(0,n)+"......":string
      }
     
     /*var text=movie.overview
     console.log(typeof(text))
     var array=text.split("");
     console.log(array)
      var myarray=[];
      var loopbraker;
     /* function framelooper(){
          if(array.length>0){
              myarray=myarray.push(array.shift())
              setOverview(myarray);
          }
          else{
              clearTimeout(loopbraker)
          }
loopbraker=setTimeout(framelooper,1);
      }

    framelooper()*/
    
       useEffect(()=>{
        async function fetchmovie(){
            const data= await axios.get(`${instance}${requests.fetchNetflixOriginals}`)
            setInterval(function(){
                setMovie(data.data.results[Math.floor(Math.random()*data.data.results.length-1)])
            },4000)
           
          }
        fetchmovie()
      
    },[])
    return (
        <header className='banner'
        style={{backgroundImage:`url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundSize:"cover",
        backgroundPosition:"center center"}}>
            <div className="banner_content">
            <h1 className='banner_title' >{movie?.title || movie?.name || movie?.original_name }</h1>
            <div className="banner_buttons">
                <button className="banner_button">Play</button>
                <button className="banner_button">My list</button>
            </div>
            <h1 className="banner_description">
                {
           truncate(`${movie?.overview}`,150)
                }
                </h1>
            </div>
            <div className="banner--fadebottom"></div>
            
</header>
    )
}

export default Banner

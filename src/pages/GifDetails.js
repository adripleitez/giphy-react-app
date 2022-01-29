import React, { useEffect, useState  } from "react";
import { APIKEY, APIURL } from "../utils/api";
import '../styles/index.css'
import Gif from "../components/Gif";
import {useIsMounted} from "../utils/hooks";
import { Link } from 'react-router-dom';

const path = window.location.href;
var gifId = path.split('/');

const GifDetails = () => {
    const [result, setResults] = useState({});
    const isMounted = useIsMounted();
    const [loading, isLoading] = useState(true);

    useEffect(() => {
      async function getData () {  
        let response = await fetch(`${APIURL}/gifs/${gifId[4]}?api_key=${APIKEY}`)
            response = await response.json()
            if(isMounted){
              console.log(isMounted);
              setResults(response.data);
              console.log(response.data);
              isLoading(false);
            }
      }
      
      getData();
    }, []);

    const getGif = () => {
      return (
        <div className="flex w-full flex-col mb-8 px-8">
        <h2  className='font-mono text-white text-2xl sm:text-5xl text-center my-10 tracking-wider'>{result.title}</h2>
        <div className="max-w-screen-lg self-center gap-6 rounded flex w-full flex-col sm:flex-row justify-center">
          <div className="h-full">
            <Gif
              id ={result.id} 
              key = {result.id}
              title = {result.title}
              url = {result.images.fixed_height.url} 
              />
            </div>
            <div className='text-center p-6 bg-purple-500/[.8] rounded w-full sm:w-1/2'>
              <h3 className='font-mono text-white text-m sm:text-l text-center tracking-wider break-words'><strong>Name: </strong><br></br>{result.user.display_name}</h3>
              <p className='font-mono text-white text-m sm:text-l my-8 tracking-wider break-words'><strong>Description: </strong><br></br>{result.user.description}</p>
            </div>
        </div>
        <Link to={`/`} className='w-full flex justify-center'>
          <p className='font-mono text-white text- tracking-wider mt-5 underline text-slate-400'>Return to Home</p>
          </Link>
        </div>
      );
    };

    return (
        <>
        <div className="result">
        {
          (loading) ? (
            <div className="loading">
              <div className="loader">
              </div>
            </div>
          ) : (
              <div>
              {getGif()}
              </div>
          )
        }
        </div>
        </>
    );
}

export default GifDetails;

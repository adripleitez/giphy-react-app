import React, { useEffect, useState } from "react";
import { GiphyFetch } from '@giphy/js-fetch-api'
import { APIKEY } from "../utils/api";
import "../styles/index.css";
import Gif from "./Gif";
import Pagination from "./Pagination";

const gf = new GiphyFetch(APIKEY);

const Home = () =>{
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gifsPerPage] = useState(12);

  // Fetching array of gifs
  useEffect(() => {
    const gifs = async () => {
      try {
        const res = await gf.trending({limit: 80});
        setResults(res.data);
      } catch (error) {
        console.error(`trending`, error);
      }
    }

    gifs();
  }, []);

  // Get current gifs (12 items)
  const indexOfLastPost = currentPage * gifsPerPage;
  const indexOfFirstPost = indexOfLastPost - gifsPerPage;
  const currentGifs = results.slice(indexOfFirstPost, indexOfLastPost);

  const getGifs = () => {
    return currentGifs.map(g => {
      return (
        <Gif
          id ={g.id} 
          key = {g.id}
          url = {g.images.fixed_height.url} 
          title = {g.title} 
          />
      );
    });
  };

  // Set pagination
  const paginate = page => setCurrentPage(page);

  // On search event
  const handleSubmit = async () => {
    try {
      if(search){
        const res = await gf.search(search.toLocaleLowerCase(), { sort: 'relevant', limit: 80 });
        setResults(res.data);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error(`Searching`, error);
    }
  };

  return (
    <>
      <div className='flex px-6 sm:px-8 flex-col justify-center w-full'>
      <div  className='max-w-screen-lg self-center'>
      <div className='flex flex-row w-full'>
      <input
        type="text"
        placeholder="Search a gif here..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='bg-neutral-700 appearance-none border-2 border-neutral-700 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:border-purple-500'
      />
      <button onClick={handleSubmit} type="submit" className='shadow ml-2 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
        Search
      </button>
      </div>

      <div className='grid mt-4 justify-self-center gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-3 lg:gap-4 lg:col-start-2 lg:row-end-6 lg:row-span-3 lg:mb-0'>{getGifs()}</div>
      </div>
      <Pagination
        gifsPerPage = {gifsPerPage}
        totalGifs = {results.length}
        paginate = {paginate}
        currentPage = {currentPage}
      />
      </div>
    </>
  );
}

export default Home;

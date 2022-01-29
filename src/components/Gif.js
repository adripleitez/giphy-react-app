import React from 'react'
import { Link } from 'react-router-dom';

function Gif ({id, url, title}) {
  return (
    <Link to={`/gif/${id}`} className='w-full'>
    <div key={id}>
        <img loading='lazy' src={url} alt={title} className='w-full h-80 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-60' />
    </div>
    </Link>
  )
}

export default Gif;
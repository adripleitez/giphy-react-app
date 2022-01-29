import React from 'react';

const Pagination = ({ gifsPerPage, totalGifs, paginate, currentPage }) => {
  const totalPageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGifs / gifsPerPage); i++) {
    totalPageNumbers.push(i);
  }

  return (
    <div>
      <ul className='pagination flex flex-row justify-center mt-5 mb-5 w-full gap-x-4 gap-y-4'>
        {totalPageNumbers.map(number => {
          let setClasses = "text-white px-4 py-3 ";
          if (number === currentPage) {
            setClasses += "bg-purple-500 rounded";
          }

          return (
            <li key={number} className={setClasses}>
              <a onClick={() => paginate(number)} href="!#">
              {number} 
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
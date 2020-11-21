import React,{useState, useEffect} from 'react';

interface PaginationProps  {
    total: number,
    perpage: number, // 현재 페이지
    paginate : number,
}

const Pagination = (props: PaginationProps) => {
    const { total, perpage } = props;
    const pageNumbers= [];

    for ( let i =1; i< Math.ceil(total/perpage);i++) {
        pageNumbers.push(i);
    }
 
    return(

         <ul className="__pagination">
             {pageNumbers.map(number => (
                 <li key={number} className='__page-items'>
                     <a href="!#" className='__page-link'>
                         {number}
                     </a>
                 </li>

             ))}
         </ul>
    );
} 


export default Pagination;
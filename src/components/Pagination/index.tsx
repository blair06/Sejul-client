import React,{useState, useEffect} from 'react';

interface PaginationProps  {
    total: number,
    perpage: number, 
    page: number, //현재 페이지
    onChange: Function,
}

const Pagination = (props: PaginationProps) => {
    const { total, perpage , page , onChange} = props;
    const [pageNumbers,setpageNumber]= useState([]);

    useEffect(()=> {
        
    }, []);

    for ( let i =1; i<= Math.ceil(total/perpage);i++) {

    }
 
    return(

         <ul className="__pagination">
             {pageNumbers.map(number => (
                 <li key={number} className='__page-items'>
                     <a href="!#" className='__page-link'>
                         `${number}`
                     </a>
                 </li>

             ))}
         </ul>
    );
} 


export default Pagination;
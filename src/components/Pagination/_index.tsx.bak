import React,{useState, useEffect} from 'react';

interface PaginationProps  {
    total: number,
    perpage: number, 

}

const Pagination = (props: PaginationProps) => {
    const { total, perpage } = props;
    const pageNumbers= [];
    const [currentPage,setCurrentPage] = useState(1);

    

    for ( let i =1; i<=Math.ceil(total/perpage); i++) {
        pageNumbers.push(i);
    }

    const totalNumOfPages = pageNumbers.length;

    useEffect(()=> {
        console.log("Cureent Page:")
        console.log(currentPage);
    }, [currentPage]);


    return(

         <ul className="__pagination">
             <button className="page-link" aria-label="Previous"
         onClick={() =>{ 
          if (currentPage > 1){
         
          setCurrentPage(currentPage-1);
          }
          }
        } 
      />
       <span className="sr-only">Previous</span>
             {pageNumbers.map(number => (
                 <li key={number} className='__page-items '>
                     <a className='__page-link' >
                         {number}
                     </a>
                 </li>

             ))}
             <li className="page-item" style={{marginRight:'auto'}}>
          <button className="page-link"  value="Next" 
                onClick={() =>{ 
                  

                    setCurrentPage(currentPage+1);
                  
                  }
                } 
          />

            <span className="sr-only">Next</span>
          
     </li>
         </ul>
    );
} 


export default Pagination;
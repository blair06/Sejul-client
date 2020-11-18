import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { isConstructorDeclaration } from 'typescript';
import * as API from '../../api'
import './scss/SearchView_2.scss'
import { SearchHeader } from './comfonents'


const SearchView_2 = () => {
    const [items,setItems] = useState<any[]>([]);
    const fn = async () => {
        const response = await API.Summary.fetchAll('api/summary'); //글검색
        setItems(response);
    }


    useEffect(()=> {
        fn();
    }, []);


    return (
        <>
        <div className="__container__">
        <SearchHeader onClick={() => console.log('clicked')}/>
            <div className = "search-container">
                <div className = "search-card-wrap">
            {
                items.map((item,idx)=> {
                    return(
                        <div className = "search-card">
                             <div className = "user-information-wrap">
                                <div className = "user-img"> <img src="./img/user"/></div>
                                <p className = "user-name">{item.user} </p>
                            </div>       
                               
                            <div key={idx}>
                                <p className="news-title">{item.article.title}</p>
                                <p className="news-time">{item.createdAt}</p>
                            </div>
                            <div className="search-Hashtag">

                            </div> 
                        </div>
                    
                    )
                   
                }) 
                
            }
            </div>
            </div>
            </div>
        </>
    );
}
//onclick={()=>{history.push{`${item.search}`}}} 이전 검색키워드 표시
export default SearchView_2

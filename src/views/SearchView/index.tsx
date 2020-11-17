import React,{ useEffect, useState, Component } from 'react'
import { useParams } from 'react-router';
import { isConstructorDeclaration } from 'typescript';
import * as API from '../../api'
import { CustomButton } from '../../components'
import './scss/SearchView.scss'
import { SearchHeader } from './comfonents'
import { Nav_2 } from '../../components'



const SearchView = () => {
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
        <div className = "__container__" >
        <SearchHeader onClick={() => console.log('clicked')}/> 
    <div className = "search-container">
        <div className = "search-card-wrap">
           
            {
                items.map((item,idx)=> {
                    return(
                        <div className = "search-card">
                        <div key={idx}>
                            <p className="news-title">{item.article.title}</p>
                            <p className="news-content">{item.content}</p>
                            <p className="news-time">{item.createdAt}</p>

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
export default SearchView

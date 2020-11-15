import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { isConstructorDeclaration } from 'typescript';
import * as API from '../../api'
import { CustomButton } from '../../components'
import './scss/SearchView.scss'

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
        <div className="__container__">
            <div className = "search-bar">
                <input 
                    type="input" 
                    placeholder="검색어를 입력 하세요." 
                    className="search-bar-input"/>
                    <button className="search-button-img-wrap" ><img className="search-button-img" /></button>
            </div>  
            <div className = "wrap-search-button-bar">
                <button type="button" className = "search-but-news"  onClick={() => console.log('clicked')}>기사검색</button>
                <button type="button" className = "search-but-post"  onClick={() => console.log('clicked')}>글검색</button>
            </div>
            <div className = "search-container">
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
        </>  
    );
}
//onclick={()=>{history.push{`${item.search}`}}} 이전 검색키워드 표시
export default SearchView

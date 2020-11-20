import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { isConstructorDeclaration } from 'typescript';
import { Card} from '../../components';
import * as API from '../../api'
import './scss/index.scss'
import {Pagination} from '../../components'

interface inputProps{
    content: string;
}

const SearchView_2 = (props:inputProps) => {

    const [items,setItems] = useState<any[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

    const fn = async () => {
        const response = await API.Summary.fetchAll('api/summary'); //글검색
        setItems(response);
    }


    useEffect(()=> {
        fn();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
    
    
    return (
        <>
        <div className = "search-bar-wrap">
            <div className="search-bar">
                <input
                    type="input"
                    placeholder="검색어를 입력 하세요."
                    className="search-bar-input"
                />
                <button className="search-button-img-wrap" ><img className="button-img" src="https://mblogthumb-phinf.pstatic.net/MjAxOTEyMTJfMjYw/MDAxNTc2MTQwMDE0MjIy.F1V39cfeZPhX87yFFlqkZQqfGmycVOxXbO3vg0dFrvEg.12ulcNAMUNyNzlE7rz5Hk2NVlJfkakVTOspDnzyRkUMg.PNG.vet6390/%EA%B8%B8%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%9E%85%EC%96%91.PNG?type=w800" /></button>
                </div>
            </div>
            <div className = "search-container">
    
            <div className = "search-card-wrap">
            
            {
                items.map((item,idx)=> {
                    return(
                        
                        <div className = "search-card">
                           <Card className="__summary-search-card">  
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
                            </Card>
                        </div>
                        
                    
                    )
                   
                }) 
                
            }
            </div>
            
            <Pagination 
            perpage = {postsPerPage}
            total = {postsPerPage}
            paginate = {postsPerPage}
            />
            </div>
        </>
    );
}
//onclick={()=>{history.push{`${item.search}`}}} 이전 검색키워드 표시
export default SearchView_2

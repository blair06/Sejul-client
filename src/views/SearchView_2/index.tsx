import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { isConstructorDeclaration } from 'typescript';
import * as API from '../../api'
import './scss/SearchView_2.scss'
import { useHistory } from 'react-router'

const SearchView_2 = () => {
    const [items,setItems] = useState<any[]>([]);
    const [users,setUsers] = useState<any[]>([]);
    const fn = async () => {
        const response = await API.Summary.fetchAll('api/summary'); //글검색
        setItems(response);
    }
    const user = async() => {
        const response = await API.Auth.signin();
        setUsers(response);
    }
    // 이중 map 사용법 물어보기
    const usermap = users.map((item,idx)=>{
        return(
            <div key={idx}>
                <p className="user-name">{item.username}</p>
            </div>
        )
    })

    useEffect(()=> {
        fn();
        user();
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
                <button type="button" className = "search-but-post"  onClick={() => {history.push("/SearchView_2")}}> 글검색</button> 
            </div>
            <div className = "search-container">
            {
                items.map((item,idx)=> {
                    return(
                        <div className = "search-card">
                            <div className = "user-information-wrap">
                                <div className = "user-img"> <img src="./img/user"/></div>
                                <div className = "user-name"> {usermap} </div>
                            </div>       
                               
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
export default SearchView_2

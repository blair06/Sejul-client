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
            <div className = "search-bar">
                <input 
                    type="input" 
                    placeholder="검색어를 입력 하세요." 
                    className="search-bar-input"> </input>
                    <img className="search-img" src='../../public/logo192.png'></img>
            </div>  
            <div className = "wrap-search-button-bar">
                <CustomButton className = "search-but-news" text="기사검색" onClick={() => console.log('clicked')}/>
                <CustomButton className = "search-but-post" text="글검색" onClick={() => console.log('clicked')}/>
            </div>
            <div className = "search-container">
                
            {
                items.map((item,idx)=> {
                    return(
                        <p key={idx}>
                            {item.article.title}
                            {item.content}
                            {item.createdAt}
                        </p>
                    )
                })
            }
                
            </div>
        </>  
    );
}

export default SearchView

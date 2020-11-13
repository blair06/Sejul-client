import React,{ useEffect, useState } from 'react'
import * as API from '../../api'

const SearchView = () => {
    const [ items, setItems] = useState<any[]>([]);
    const fn = async () => {
        const response = await API.Summary.fetchAll();
        setItems(response);
    }
    useEffect(()=> {
        fn();
    }, []);

    return (
        <>
            <div className = "search_container">
                <input 
                    type="search" 
                    placeholder="검색어를 입력 하세요." 
                    className="search_bar"> </input>
                    <img src='../../public/logo192.png'></img>
            </div>
            <div className = "search-content">
                
                {
                    items.map((item,idx) => {
                        return (
                            <p
                            key ={idx}
                            title = {item.search}>
                            </p>
                        )
                    })
                }
                
            </div>
        </>  
    )
}

export default SearchView

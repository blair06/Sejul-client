import React, { useEffect, useState, Component } from 'react'
import * as API from '../../api'
import './scss/SearchView.scss'

const SearchView = () => {
    const [items, setItems] = useState<any[]>([]);
    const fn = async () => {
        const response = await API.Summary.fetchAll('api/summary'); //글검색
        setItems(response);
    }
    useEffect(() => {
        fn();
    }, []);

    return (
        <>
 
            {/* <SearchHeader onClick={() => console.log('clicked')} /> */}
            <div className="search-bar-wrap">
            <div className="search-bar">
                <input
                    type="input"
                    placeholder="검색어를 입력 하세요."
                    className="search-bar-input" />
                <button className="search-button-img-wrap" ><img className="button-img" src="https://mblogthumb-phinf.pstatic.net/MjAxOTEyMTJfMjYw/MDAxNTc2MTQwMDE0MjIy.F1V39cfeZPhX87yFFlqkZQqfGmycVOxXbO3vg0dFrvEg.12ulcNAMUNyNzlE7rz5Hk2NVlJfkakVTOspDnzyRkUMg.PNG.vet6390/%EA%B8%B8%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%9E%85%EC%96%91.PNG?type=w800" /></button>
            </div>
            </div>
            <div className="search-container">
                <div className="search-card-wrap">

                    {
                        items.map((item, idx) => {
                            return (
                                <div className="search-card">
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

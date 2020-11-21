import React, { useEffect, useState, Component } from 'react'
import * as API from '../../api'
import './scss/SearchView.scss'
import {Card} from '../../components'
import {StopWatch} from '../../components'
const SearchView = () => {
    const [items, setItems] = useState<any[]>([]);
    const [text,setText] = useState("");
    const fn = async () => {
        const response = await API.Summary.fetchAll('api/summary'); //글검색
        setItems(response);
    }
    useEffect(() => {
        fn();
    }, []);

    const handleChange = (event: any) => {
        console.log(event.target.value);
    };

    const findSearch = async() => {
        setText("");

        fetch(
            `http://localhost:3000/search/topic/keyword=${text}=&resultType=json`
        )
    }

    return (
        <>
 
            {/* <SearchHeader onClick={() => console.log('clicked')} /> */}
            <div className="search-bar-wrap">
            <div className="search-bar">
                <input
                    type="input"
                    placeholder="검색어를 입력 하세요."
                    className="search-bar-input"
                    onChange = {handleChange}
                     />
                <button className="search-button-img-wrap" ><img className="button-img" src="https://mblogthumb-phinf.pstatic.net/MjAxOTEyMTJfMjYw/MDAxNTc2MTQwMDE0MjIy.F1V39cfeZPhX87yFFlqkZQqfGmycVOxXbO3vg0dFrvEg.12ulcNAMUNyNzlE7rz5Hk2NVlJfkakVTOspDnzyRkUMg.PNG.vet6390/%EA%B8%B8%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%9E%85%EC%96%91.PNG?type=w800" onClick={findSearch} /></button>
            </div>
            </div>
            <div className="search-container">
                <div className="search-card-wrap">

                    {
                        items.map((item, idx) => {
                            return (
                                <div className="search-card">
                                    <Card>
                                    <div key={idx}>
                                        <p className="news-title">{item.article.title}</p>
                                        <p className="news-content">{item.content}</p>
                                        <p className="news-time">{item.createdAt}</p>

                                    </div>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
                <StopWatch/>            
            </div>


        </>
    );
}

//onclick={()=>{history.push{`${item.search}`}}} 이전 검색키워드 표시
export default SearchView

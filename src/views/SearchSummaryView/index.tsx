import React, { useEffect, useState } from 'react'
import { ISummary, IHashtag } from '../../api/interfaces';
import { Card} from '../../components';
import * as API from '../../api'
import './scss/SearchSummaryView.scss'
import moment from 'moment'
import { setTextRange } from 'typescript';
import { useParams } from 'react-router';

    interface UserSearchProps{
        isSearched: boolean,
        onSearch : Function,
    }


const SearchView_2 = (props:UserSearchProps) => {

    const [items,setItems] = useState<ISummary[]>([]);
    const [keyword,setKeyword] = useState("");
    const [hashTags, setHashTags] = useState<IHashtag[]>([]);

    const fn = async () => {
        const response = await API.Search.fetchSummaries(keyword);
        setItems(response);
    };
    const searchpost = async() => {
        const response = await API.Search.fetchSummaries('');
        setItems(response);
    }
    const getHashTags = async () => {
        try {
            const result = await API.Analytics.fetchHottestHashtag();
            setHashTags(result);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if(keyword===''){
            searchpost();
        } else { 
            fn();
        }
        getHashTags();
        
    }, [keyword]);


    const Search = {
        search: () => {
            if(keyword===""){
                alert("검색어를 입력해주세요");
                return;
            } 
            else fn();
        }
    }

 
    return (
        <>
        <div className = "search-bar-wrap">
            <div className="search-bar">
                <input
                    type="input"
                    placeholder="검색어를 입력 하세요."
                    className="search-bar-input"
                    value = {keyword}
                    onChange = {(e)=>setKeyword(e.target.value)}
                />
                <button onClick={Search.search} className="search-button-img-wrap" >
                    <img className="button-img" src="data:image/png;base64,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" /></button>
                </div>
            </div>
            <div className = "search-container">
    
            <div className = "search-card-wrap">
            
            {
                items.map((item,idx)=> {
                    return(
                        
                        <div className = "search-card">
                           <Card>  
                           <div className = "user-information-wrap">
                                <div className = "user-img-wrap"> <img className="use-img" src="https://www.travie.com/news/photo/201807/20428_715_5954.jpg"/></div>
                                <p className = "user-name">{item.user} </p>
                            </div>       
                               
                            <div key={idx}>
                                <p className="news-title">{item.article.title}</p>
                                
                            </div>
                            <div className="search-Hashtag">
                                <div className = "serch-Hashtag-text-wrap">
                            {hashTags.map((hashtag) => (
									<p className="main-slider-hashtags-text">#{hashtag.text}</p>
								))}
                                </div>

                            </div> 
                            <div className="new-time-wrap">
                            <p className = "new-write-time">{item.timestamp}소요</p>
                            <p className="news-create-time">{moment(item.createdAt).fromNow()}</p>
                            </div>
                            </Card> 
                        </div>
                        
                    
                    )
                   
                }) 
            }


            </div>
        </div>
            <div className="main-footer">Sejul</div>
            
        </>
    );
    }

//onclick={()=>{history.push{`${item.search}`}}} 이전 검색키워드 표시
export default SearchView_2

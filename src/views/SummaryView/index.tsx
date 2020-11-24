import React, { useState, useEffect } from 'react';
import { useLocationSearch } from '../../lib/hooks';
import { useHistory, useLocation } from 'react-router-dom';
import { CustomButton } from '../../components';
import SummaryContent from './components/SummaryContent';
import ArticleCard from './components/ArticleCard';
import TimerCard from './components/TimerCard';
import HashtagCard from './components/HashtagCard';



import * as API from '../../api';

import './scss/summary.scss';

const SummaryView = () => {
    const history = useHistory();
    // 브라우저 주소 정보 가져오기 
    const location = useLocation();
    // 주서 정보에서 쿼리스트링 뽑아내기
    const searches = useLocationSearch(location.search);

    // 요약 내용
    const [content, setContent] = useState("");
    // 기사 제목
    const [articleTitle, setArticleTitle] = useState("");
    // 기사 링크
    const [articleLink, setArticleLink] = useState("");
    // 해시태그
    const [hashtags, setHashtags] = useState([] as string[]);
    // 타임스탬프
    const [timestamp, setTimestamp] = useState("?");

    // 페이지 로드시 기사 링크와 타이틀이 있다면 자동으로 세팅
    useEffect(() => {
        searches.forEach(search => {
            if (search.key === "link") {
                setArticleLink(search.value);
            }
            else if (search.key === "title") {
                setArticleTitle(search.value);
            }
        });
    }, []);

    const fn = {
        validate: () => {
            // 제목 500자 
            // 링크 1000자 
            // 내용 3000자
            if (articleTitle === "") {
                alert("기사 제목을 입력해주세요");
                return false;
            }
            else if (articleLink === "") {
                alert("링크를 입력해주세요");
                return false;
            }
            else if (content === "") {
                alert("내용을 입력해주세요");
                return false;
            }
            else if (timestamp === "") {
                alert("타이머 기록을 선택해주세요");
                return false;
            }
            else {
                return true;
            }
        },
        submit: async () => {
            try {
                const result = await API.Summary.create({
                    articleTitle: articleTitle,
                    articleLink: articleLink,
                    articleOriginalLink: articleLink,
                    content: content,
                    timestamp: timestamp,
                    hashtags: hashtags.join(",")
                });
                alert("저장되었습니다");

                history.push(`/summary/${result.summary._id}`);
            }
            catch (e) {
                alert("저장 중 오류가 발생했습니다");
                console.log(e.message);
            }
        }
    }

    return (
        <div className="__summary-view-container">
            <div className="__summary-view-wrapper">
                {/* 요약 내용 작성 */}
                <SummaryContent content={content} onChange={(content) => { setContent(content) }} />
                <div className="__summary-components-container">
                    <div className="__summary-components-wrapper">
                        {/* 기사 정보 카드  */}
                        <ArticleCard title={articleTitle} setTitle={setArticleTitle} link={articleLink} setLink={setArticleLink} />
                        {/* 타이머 카드 */}
                        <TimerCard timestamp={timestamp} setTimestamp={setTimestamp} />
                        {/* 해시태그 카드 */}
                        <HashtagCard hashtags={hashtags} setHashtags={setHashtags} />
                        {/* 저장 버튼 */}
                        <CustomButton className="__article-submit-btn" text="저장" onClick={fn.submit} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryView;


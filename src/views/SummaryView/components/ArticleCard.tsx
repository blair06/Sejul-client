import React, { useEffect, useState } from 'react';
import { Card } from '../../../components';
import SummaryCardTitle from './SummaryCardTitle';
import '../scss/ArticleCard.scss';
interface IArticleCardProps {
    title: string;
    setTitle: (title: string) => void;
    link: string;
    setLink: (link: string) => void;
}

/**
 * @description 기사 정보 관련 컴포넌트 
 */
const ArticleCard = (props: IArticleCardProps) => {
    // 제목 
    const { title, setTitle, link, setLink } = props;
    // 현재 링크가 올바른 형태인지 체크
    const [isValidURL, setIsValidURL] = useState(false);
    // 주소 체크용 regex
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    // 링크가 변경되면 url 유효성 체크 
    useEffect(() => {
        setIsValidURL(urlRegex.test(link));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);

    return (
        <Card className="__article-info-card">
            <div className="__article-info-card-wrapper">
                <div className="__article-title-container">
                    <SummaryCardTitle text="기사 제목" />
                    <textarea className="article-input" value={title} placeholder="기사 제목을 입력하세요"
                        onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                </div>
                <div className="__article-link-container">
                    <SummaryCardTitle text="기사 링크" />
                    {
                        !isValidURL ?
                            <p className="__article-link-warnning-desc">올바른 URL 형태가 아닙니다</p> : <></>
                    }
                    <textarea className="article-link-input" value={link} placeholder="기사 링크를 넣어주세요"
                        onChange={(e) => setLink(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </Card>
    )
}

export default ArticleCard

import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import * as API from '../../api';
import { ISummary, IUser, IHashtag } from '../../api/interfaces';
import { Card, CircularImage } from '../../components';

import moment from 'moment';
import './scss/index.scss';

interface ISummaryDetailViewParams {
    summaryId: string | undefined;
}

const SummaryDetailView = () => {
    const history = useHistory();
    const matches = useRouteMatch();
    const [detail, setDetail] = useState<ISummary | undefined>(undefined);

    const fn = {
        fetch: async (summaryId: string | undefined) => {
            if (summaryId === undefined) {
                // 404 
                alert("글 정보가 올바르지 않습니다");
                history.push("/");
            }
            else {
                try {
                    const result = await API.Summary.fetch(summaryId);
                    setDetail(result);
                }
                catch (e) {

                    if (e.response !== undefined && e.response.status === 404) {
                        // 글이 없음 
                        alert('존재하지 않는 글입니다');
                        history.push("/");
                    }
                    else {
                        // 서버 에러
                        alert('일시적인 오류가 발생했습니다\n잠시 후 다시 시도해주세요');
                        history.push("/");
                    }
                }
            }
        },
        moveToUser: (username: string | undefined) => {
            if (username !== undefined) {
                history.push(
                    `/user/${username}`
                );
            }
        },
    }

    useEffect(() => {
        const params = matches.params as ISummaryDetailViewParams;
        fn.fetch(params.summaryId);
    }, []);

    return (
        <div className="__summary-detail-view-container">
            <div className="__summary-detail-view-wrapper">
                <Card className="__summary-detail-info-card">
                    <div className="__summary-detail-info-wrapper">
                        <div className="__summary-detail-article-info">
                            <p>기사 제목</p>
                            <h1>{detail?.article.title}
                                <a target="__blank" className="__summary-article-link" href={`${detail?.article.originalLink}`}>링크</a>
                            </h1>
                        </div>
                        <div className="__summary-details-container">
                            {
                                detail !== undefined ?
                                    <div className="__summary-author-info" onClick={() => fn.moveToUser(detail?.user.username)}>
                                        <CircularImage url={detail.user.profile} alt={`${detail?.user.username}의 프로필 이미지`} />
                                        <p>{detail.user.username}</p>
                                    </div> : <></>
                            }
                            <div className="__summary-created-at-info">
                                <p>작성일 : {moment(detail?.createdAt).fromNow()}</p>
                            </div>
                            <div className="__summary-likes-info">
                                <p>조회 수 : {detail?.views.length}</p>
                            </div>

                            <div className="__summary-timestamp-info">
                                <p>요약 소요 시간 : {detail?.timestamp}</p>

                            </div>
                            <div className="__summary-hashtags-info">
                                {
                                    detail?.hashtags.map((hashtag, idx) => {
                                        return <Link className="_summary-hashtag" key={idx} to={`/search/hashtag?keyword=${hashtag.text}`}>
                                            #{hashtag.text}
                                        </Link>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="__summary-content-card">
                    <div className="__summary-content-wrapper">
                        <span className="__summary-content">
                            {detail?.content}
                        </span>
                    </div>
                </Card>
            </div>
        </div >
    )
}

export default SummaryDetailView;

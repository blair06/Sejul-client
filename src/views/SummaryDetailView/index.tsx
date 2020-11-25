import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import * as API from '../../api';
import { ISummary, IUser, IHashtag } from '../../api/interfaces';
import { Card, CircularImage, CustomButton } from '../../components';

import moment from 'moment';
import './scss/index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { getUserInfoThunk } from '../../modules/Auth';
import { fetch } from '../../api/summary.api';


enum LIKE_STATE {
    LIKE,
    NOT_LIKE
}

interface ISummaryDetailViewParams {
    summaryId: string | undefined;
}

const SummaryDetailView = () => {
    const history = useHistory();
    const matches = useRouteMatch();
    const [detail, setDetail] = useState<ISummary | undefined>(undefined);
    const [likeState, setLikeState] = useState(LIKE_STATE.NOT_LIKE);

    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

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
                    fn.computeLike();
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
        computeLike: () => {
            const params = matches.params as ISummaryDetailViewParams;
            console.log(user.data, params.summaryId);
            if (user !== undefined && user !== null && user.data !== undefined && user.data !== null) {
                if (user.data.likes !== undefined && user.data.likes !== null) {
                    const found = user.data.likes.find(like => {
                        return like.toString() === params.summaryId
                    });

                    if (found) {
                        setLikeState(LIKE_STATE.LIKE);
                        console.log("FOUND");
                    }
                    else {
                        setLikeState(LIKE_STATE.NOT_LIKE);
                        console.log("NOTFOUND");
                    }


                }
            }
        },
        like: async () => {
            const params = matches.params as ISummaryDetailViewParams;
            if (params.summaryId !== undefined) {
                await API.User.likeSummary(params.summaryId);
                await fn.fetch(params.summaryId);
                dispatch(getUserInfoThunk());
            }
        },
        unlike: async () => {
            const params = matches.params as ISummaryDetailViewParams;
            if (params.summaryId !== undefined) {
                await API.User.unlikeSummary(params.summaryId);
                await fn.fetch(params.summaryId);
                dispatch(getUserInfoThunk());
            }
        }
    }

    useEffect(() => {
        const params = matches.params as ISummaryDetailViewParams;
        fn.fetch(params.summaryId);
    }, []);

    useEffect(() => {
        fn.computeLike();
    }, [user, detail])

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
                            {
                                likeState === LIKE_STATE.LIKE ?
                                    <CustomButton className="__summary-like-btn unlike" text="좋아요 취소" onClick={fn.unlike} /> :
                                    <CustomButton className="__summary-like-btn like" text="좋아요" onClick={fn.like} />
                            }
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

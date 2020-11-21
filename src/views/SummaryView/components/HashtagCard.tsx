import React, { useEffect, useState } from 'react';
import { Validator } from '../../../lib';
import { Card } from '../../../components';
import SummaryCardTitle from './SummaryCardTitle';
import '../scss/HashtagCard.scss';

import { IoMdClose } from 'react-icons/io';

interface IHashtagListItemProps {
    // 해시태그 텍스트
    text: string;
    // 해시태그 삭제 시 함수 
    onRemove: (text: string) => void;
}

/**
 *  @description 해시태그 아이템
 */
const HashtagListItem = (props: IHashtagListItemProps) => {
    const { text, onRemove } = props;
    return <div className="__hashtag-item-container">
        <p className="__hashtag-item-text">#{text}</p>
        <button className="__hashtag-item-remove" type="button" onClick={() => onRemove(text)}>
            <IoMdClose />
        </button>
    </div>;
}

interface IHashtagCardProps {
    hashtags: string[];
    setHashtags: (hashtags: string[]) => void;
}

/**
 * @description 해시태그 관리 부분
 */
const HashtagCard = (props: IHashtagCardProps) => {
    // 해시태그 들 
    const { hashtags, setHashtags } = props;
    // 사용자 입력
    const [userInput, setUserInput] = useState("");

    const fn = {
        // 해시태그가 올바른지 판단
        validate: (text: string) => {
            // 공백을 포함하는 경우 
            const hasWhiteSpace = Validator.hasWhiteSpace(text);
            // 줄바꿈을 포함하는 경우
            const hasNewLine = Validator.hasNewLine(text);
            // 특수문자를 포함하는 경우
            const hasSpecial = Validator.hasSpecial(text);
            // 숫자를 포함하는 경우
            const hasNumber = Validator.hasNum(text);
            return !hasWhiteSpace && !hasNewLine && !hasSpecial && !hasNumber;
        },
        // 삽입 
        insert: () => {
            // 유효성 검사
            if (fn.validate(userInput)) {
                // 이미 등록된 경우 제외
                if (hashtags.indexOf(userInput) >= 0) {
                    alert("이미 등록되었습니다");
                }
                else {
                    // 공백이 아닐때에만 추가
                    if (userInput !== "") {
                        setHashtags([...hashtags, userInput]);
                    }
                }
            }
            else {
                alert("해시태그는 영문 혹은 한글만 입력할 수 있습니다.\n공백이 있는지 확인해주세요");
            }
        },
        // 제거
        remove: (text: string) => {
            const idx = hashtags.indexOf(text);
            const copied = [...hashtags];
            copied.splice(idx, 1);
            setHashtags([...copied]);
        },
    }

    // hashtags가 변경되면 자동으로 비움
    useEffect(() => {
        setUserInput("");
    }, [hashtags])

    return (
        <Card className="__article-hashtags-card">
            <div className="__article-hashtags-wrapper">
                <SummaryCardTitle text="해시태그" />
                <div className="__article-hashtags-items-container">
                    <input
                        type="text"
                        value={userInput}
                        // 엔터 키를 눌렀을 때, 삽입
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                fn.insert();
                                return;
                            }
                        }}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="__article-hashtag-input"
                        placeholder="해시태그 입력" />
                    {
                        hashtags.map((hashtag, idx) => (
                            <HashtagListItem key={idx} text={hashtag} onRemove={(text) => fn.remove(text)} />
                        ))
                    }
                </div>
            </div>
        </Card>
    )
};

export default HashtagCard

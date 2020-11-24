import React, { useEffect, useState } from 'react';
import { IHashtag } from '../../api/interfaces/IHashtag';
import './HashTag.scss';
import RoundedCard from '../RoundedCard';
interface HashTagProps {
    hashTags: IHashtag[];
    className?: string;
	onClick?: Function;
}

const HashTag = (props:HashTagProps) => {
    const {hashTags, className, onClick} = props;
	return (
			<div className={`hashtagcard ${className || ''}`}>
				{hashTags.length > 0 ? (
					hashTags.map((hashTag:IHashtag, index:number) => (
						<RoundedCard key={index} className="tag" cancelable={false}>
							#{hashTag.text}
						</RoundedCard>
					))
				) : (
					<div className="main-hashtag-placeholder">더 많은 해시태그를 작성해보세요!</div>
				)}
			</div>
	);
};

export default HashTag;

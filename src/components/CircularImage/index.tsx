import React from 'react'
import { GoPerson } from 'react-icons/go';

import './CircularImage.scss';

interface ICircularImageProps {
    url?: string,
    className?: string,
    alt?: string,
}

const CircularImagePlaceholder = () => {
    return (<div className="__circular-placeholder-container">
        <GoPerson />
    </div>);
}

const CircularImage = (props: ICircularImageProps) => {
    const { url, className, alt = '원형 이미지' } = props;
    return (
        <div className={`__circular-image-container ${className || ''}`}>
            {
                url === undefined || url === null ?
                    <CircularImagePlaceholder /> :
                    <img className='__circular-image' src={url} alt={alt} />
            }
        </div>
    )
}

export default CircularImage;

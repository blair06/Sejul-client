import React, { ReactNode } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Logo, Card, CircularImage } from '../../components';
import './scss/MainCommon.scss';
import { IUser } from '../../api/interfaces';
interface UserSliderProps {
	children?: ReactNode;
	className?: string;
	onClick?: Function;
	data: IUser[];
}
const UserSlider = (props: UserSliderProps) => {
	const { data, className, onClick } = props;
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			slidesToSlide: 1, // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
		},
	};

	return (
		<>
			<Carousel
				additionalTransfrom={0}
				arrows
				autoPlaySpeed={3000}
				centerMode={false}
				className="user-slider"
				containerClass="container-with-dots"
				dotListClass=""
				draggable
				focusOnSelect={false}
				infinite
				itemClass="user-slider-item"
				keyBoardControl
				minimumTouchDrag={80}
				renderButtonGroupOutside={false}
				renderDotsOutside={false}
				responsive={{
					desktop: {
						breakpoint: {
							max: 3000,
							min: 1024,
						},
						items: 6,
						partialVisibilityGutter: 40,
					},
					mobile: {
						breakpoint: {
							max: 464,
							min: 0,
						},
						items: 1,
						partialVisibilityGutter: 30,
					},
					tablet: {
						breakpoint: {
							max: 1024,
							min: 464,
						},
						items: 2,
						partialVisibilityGutter: 30,
					},
				}}
				showDots={true}
				sliderClass="main-slider-track"
				slidesToSlide={1}
				swipeable
			>
				{data.length > 0 ? (
					data.map((item: IUser) => (
						<Card>
							<div className="user-slider-profile">
								<CircularImage url={item.profile} />
							</div>
							<p className="user-slider-name">{item.username}</p>
							<div className="user-slider-small">
								<p className="user-slider-follow">팔로우 {item.following.length}</p>
								<p className="user-slider-post">작성글 {item.articles.length}</p>
							</div>
						</Card>
					))
				) : (
					<p className="main-slider-placeholder">등록된 질문이 없습니다</p>
				)}
			</Carousel>
		</>
	);
};

export default UserSlider;

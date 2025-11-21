import { useEffect, useState } from 'react';
import type { Review } from '../../../types';
import { SlideReview } from './SlideReview';

interface SliderProps {
  reviews: Review[];
}

export const Slider = ({ reviews }: SliderProps) => {
  const [sliders, setSliders] = useState<Element[]>([]);
  let value: number;

  useEffect(() => {
    const allSliders = Array.from(document.querySelectorAll('.slider__body'));
    setSliders(allSliders);
  }, []);

  const onClickLeft = () => {
    changeSlidePosition(-1);
  };

  const onClickRight = () => {
    changeSlidePosition(1);
  };

  const changeSlidePosition = (change: number) => {
    const currentSlide = Number(
      document.querySelector('.slider__body--show')?.getAttribute('data-id')
    );
    value = currentSlide;
    value += change;
    if (value === 0 || value === sliders.length + 1) {
      value = value === 0 ? sliders.length : 1;
    }
    sliders[currentSlide - 1].classList.toggle('slider__body--show');
    sliders[value - 1].classList.toggle('slider__body--show');
  };

  return (
    <>
      <img
        onClick={onClickLeft}
        src="/assets/img/recursos/arrow-left.svg"
        alt="left-arrow"
        className="slider__arrow"
        id="before"
      />
      {reviews.map((review, index) => (
        <SlideReview
          key={review.id}
          index={index}
          title={review.title}
          review={review.review}
          icon={review.user?.profileUrl || '/assets/img/icon.png'}
          user={review.user?.fullName || 'Usuario'}
        />
      ))}
      <img
        onClick={onClickRight}
        src="/assets/img/recursos/arrow-right.svg"
        alt="right-arrow"
        className="slider__arrow"
        id="after"
      />
    </>
  );
};

interface SlideReviewProps {
  index: number;
  icon: string;
  title: string;
  review: string;
  user: string;
}

export const SlideReview = ({ index, icon, title, review, user }: SlideReviewProps) => {
  return (
    <section
      className={`slider__body slider__body${index === 0 ? '--show' : ''}`}
      data-id={index + 1}
    >
      <div className="slider__texts">
        <h3 className="subtitle">{title}... </h3>
        <p className="slider__review"> "{review}"</p>
      </div>
      <figure className="slider__picture">
        <img src={icon} className="slider__img" alt={icon} />
        <figcaption>
          <h4 className="profile__name"> {user} </h4>
        </figcaption>
      </figure>
    </section>
  );
};

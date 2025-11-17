interface CardDescriptionProps {
  icon: string;
  title: string;
  description: string;
}

export const CardDescription = ({ icon, title, description }: CardDescriptionProps) => {
  return (
    <div className="card-us">
      <img src={`/assets/img/recursos/${icon}.png`} alt={title} />
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
};

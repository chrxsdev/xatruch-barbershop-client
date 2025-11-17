interface MessageProps {
  message: string;
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

export const Message = ({ message, type }: MessageProps) => {
  return (
    <div className={`card animate__animated animate__fadeIn bg-${type}`}>
      <div className="card-body text-center text-white">{message}</div>
    </div>
  );
};

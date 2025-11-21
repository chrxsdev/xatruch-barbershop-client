import type { MessageType } from '../../types/store';

interface MessageProps {
  message: string;
  type: MessageType;
}

export const Message = ({ message, type }: MessageProps) => {
  return (
    <div className={`card animate__animated animate__fadeIn bg-${type}`}>
      <div className="card-body text-center text-white">{message}</div>
    </div>
  );
};

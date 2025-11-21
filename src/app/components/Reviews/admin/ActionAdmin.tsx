import { useReviewStore } from '../../../../hooks';

interface ActionAdminProps {
  values: string;
}

export const ActionAdmin = ({ values }: ActionAdminProps) => {
  const { reviewsToApprove, startApprovingReviews } = useReviewStore();

  const onApproveReviews = (id: string) => {
    startApprovingReviews(id);
  };

  return (
    <div className="p-2">
      <input
        onChange={() => onApproveReviews(values)}
        type="checkbox"
        disabled={!reviewsToApprove.includes(values) && reviewsToApprove.length >= 5}
        checked={reviewsToApprove.includes(values)}
      />
    </div>
  );
};

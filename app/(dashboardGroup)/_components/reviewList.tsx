import {
  getPropertyReviewsAction,
  type Review,
} from "../_actions/reviewActions";

type ReviewListProps = {
  propertyId: string;
};

export default async function ReviewList({
  propertyId,
}: ReviewListProps) {
  const result = await getPropertyReviewsAction(propertyId);

  if (!result.success) {
    return (
      <div className="rounded-lg border p-5 text-destructive">
        {result.message || "Failed to load reviews"}
      </div>
    );
  }

  const reviews: Review[] = result.data ?? [];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Reviews</h2>

        <p className="mt-1 text-muted-foreground">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-muted-foreground">
            No reviews yet. Be the first to review this property.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">
                    {review.tenant?.name || "Anonymous"}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString(
                      "en-BD",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div
                  className="whitespace-nowrap font-semibold text-yellow-500"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {"★".repeat(review.rating)}
                  {"☆".repeat(Math.max(0, 5 - review.rating))}
                </div>
              </div>

              <p className="mt-4 text-muted-foreground">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
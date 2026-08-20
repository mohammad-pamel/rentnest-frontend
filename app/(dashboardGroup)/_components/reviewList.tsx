// import { getPropertyReviewsAction } from "../_actions/reviewActions";

// interface ReviewTenant {
//   id: string;
//   name: string;
//   email: string;
//   phone: string | null;
//   profileImage: string | null;
//   role: "ADMIN" | "TENANT" | "LANDLORD";
//   status: "ACTIVE" | "BANNED";
//   isDeleted: boolean;
//   deletedAt: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Review {
//   id: string;
//   rating: number;
//   comment: string;
//   tenantId: string;
//   propertyId: string;
//   createdAt: string;
//   tenant: ReviewTenant;
// }

// interface ReviewListResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: Review[];
// }

// type ReviewListProps = {
//   propertyId: string;
// };

// export default async function ReviewList({
//   propertyId,
// }: ReviewListProps) {
//   const result: ReviewListResponse =
//     await getPropertyReviewsAction(propertyId);

//   const reviews = result.data || [];

//   if (!result.success) {
//     return (
//       <div className="rounded-lg border p-5 text-red-500">
//         {result.message}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-5">
//       <div>
//         <h2 className="text-2xl font-bold">
//           Reviews
//         </h2>

//         <p className="mt-1 text-gray-500">
//           {reviews.length} review
//           {reviews.length !== 1 ? "s" : ""}
//         </p>
//       </div>

//       {reviews.length === 0 ? (
//         <div className="rounded-lg border bg-white p-6 text-center">
//           <p className="text-gray-500">
//             No reviews yet.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {reviews.map((review: Review) => (
//             <div
//               key={review.id}
//               className="rounded-xl border bg-white p-5 shadow-sm"
//             >
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <h3 className="font-semibold">
//                     {review.tenant?.name || "Anonymous"}
//                   </h3>

//                   <p className="text-sm text-gray-500">
//                     {new Date(
//                       review.createdAt
//                     ).toLocaleDateString()}
//                   </p>
//                 </div>

//                 <div className="font-semibold text-yellow-500">
//                   {"★".repeat(review.rating)}
//                   {"☆".repeat(5 - review.rating)}
//                 </div>
//               </div>

//               <p className="mt-4 text-gray-700">
//                 {review.comment}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }











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
  const result =
    await getPropertyReviewsAction(propertyId);

  const reviews: Review[] = result.data;

  if (!result.success) {
    return (
      <div className="rounded-lg border p-5 text-red-500">
        {result.message}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">
          Reviews
        </h2>

        <p className="mt-1 text-gray-500">
          {reviews.length} review
          {reviews.length !== 1 ? "s" : ""}
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-center">
          <p className="text-gray-500">
            No reviews yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review: Review) => (
            <div
              key={review.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">
                    {review.tenant.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="font-semibold text-yellow-500">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
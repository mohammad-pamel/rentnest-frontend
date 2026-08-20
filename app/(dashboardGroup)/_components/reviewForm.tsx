// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";

// import { createReviewAction } from "../_actions/reviewActions";

// type ReviewFormProps = {
//   propertyId: string;
// };

// export default function ReviewForm({
//   propertyId,
// }: ReviewFormProps) {
//   const router = useRouter();

//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     if (!comment.trim()) {
//       toast.error("Please write a comment");
//       return;
//     }

//     try {
//       setLoading(true);

//       const result = await createReviewAction({
//         propertyId,
//         rating,
//         comment: comment.trim(),
//       });

//       if (!result.success) {
//         toast.error(
//           result.message || "Failed to create review"
//         );
//         return;
//       }

//       toast.success(
//         result.message || "Review created successfully"
//       );

//       setComment("");
//       setRating(5);

//       router.refresh();
//     } catch (error) {
//       console.error(error);

//       toast.error(
//         "Something went wrong while creating review"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
//     >
//       <div>
//         <h2 className="text-xl font-bold">
//           Write a Review
//         </h2>

//         <p className="mt-1 text-sm text-gray-500">
//           Share your experience with this property.
//         </p>
//       </div>

//       <div>
//         <label className="mb-2 block font-medium">
//           Rating
//         </label>

//         <div className="flex gap-2">
//           {[1, 2, 3, 4, 5].map((value) => (
//             <button
//               key={value}
//               type="button"
//               onClick={() => setRating(value)}
//               className={`text-3xl ${
//                 value <= rating
//                   ? "text-yellow-400"
//                   : "text-gray-300"
//               }`}
//             >
//               ★
//             </button>
//           ))}
//         </div>

//         <p className="mt-1 text-sm text-gray-500">
//           {rating} out of 5
//         </p>
//       </div>

//       <div>
//         <label className="mb-2 block font-medium">
//           Comment
//         </label>

//         <Textarea
//           value={comment}
//           onChange={(e) =>
//             setComment(e.target.value)
//           }
//           placeholder="Write your review..."
//           rows={5}
//           required
//         />
//       </div>

//       <Button
//         type="submit"
//         disabled={loading}
//         className="w-full"
//       >
//         {loading
//           ? "Submitting..."
//           : "Submit Review"}
//       </Button>
//     </form>
//   );
// }
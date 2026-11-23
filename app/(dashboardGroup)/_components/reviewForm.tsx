"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReviewAction } from "../_actions/reviewActions";

type ReviewFormProps = {
  propertyId: string;
};

export default function ReviewForm({ propertyId }: ReviewFormProps) {
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setLoading(true);

      const result = await createReviewAction({
        propertyId,
        rating,
        comment: comment.trim(),
      });

      if (!result.success) {
        toast.error(result.message || "Failed to create review");
        return;
      }

      toast.success(result.message || "Review created successfully");

      setComment("");
      setRating(5);

      router.refresh();
    } catch (error) {
      console.error("Review creation error:", error);
      toast.error("Something went wrong while creating review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border bg-card p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-bold">Write a Review</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Share your experience with this property.
        </p>
      </div>

      <div>
        <label className="mb-2 block font-medium">Rating</label>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              disabled={loading}
              aria-label={`Rate ${value} out of 5`}
              aria-pressed={rating === value}
              className="rounded-sm transition-transform hover:scale-110 disabled:cursor-not-allowed"
            >
              <Star
                size={30}
                className={
                  value <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }
              />
            </button>
          ))}
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          {rating} out of 5
        </p>
      </div>

      <div>
        <label htmlFor="review-comment" className="mb-2 block font-medium">
          Comment
        </label>

        <Textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          rows={5}
          maxLength={2000}
          required
          disabled={loading}
        />

        <p className="mt-1 text-right text-xs text-muted-foreground">
          {comment.length}/2000
        </p>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
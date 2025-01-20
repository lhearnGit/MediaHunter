"use client";
import { Review } from "@/lib/entities/TMDB";
import { Button, Grid, Group } from "@mantine/core";
import { ShowReview } from "./Review/ShowReview";
import { useState } from "react";
import { orderBy } from "lodash";

interface SortOption {
  option: "rating" | "date";
  order: boolean; //true asc, false desc
}
function OrderReviewsByDate(reviews: Review[], order: "asc" | "desc") {
  const sorted = orderBy(reviews, [`updated_at`], order);
  console.log(sorted);
  return sorted;
}
function OrderReviewsByRating(reviews: Review[], order: "asc" | "desc") {
  const sorted = orderBy(reviews, ["author_details.rating"], order);
  console.log(sorted);
  return sorted;
}

function OrderReviews(
  reviews: Review[],
  option: "rating" | "date",
  selectedOrder: boolean, //true asc, false desc
  hideUnrated: boolean
) {
  let filteredReviews: Review[] = [];
  if (hideUnrated)
    filteredReviews = reviews.filter(
      (review: Review) => review.author_details.rating != null
    );
  else filteredReviews = reviews;
  const order: "asc" | "desc" = selectedOrder ? "asc" : "desc";

  if (option == "date") {
    return OrderReviewsByDate(filteredReviews, order);
  } else {
    return OrderReviewsByRating(filteredReviews, order);
  }
}

export function Reviews({ reviews }: { reviews: Review[] }) {
  const [limit, setLimit] = useState<number>(1);
  const [hideUnrated, setHideUnrated] = useState<boolean>(false);
  const maxLimit = reviews.length;
  const [sortOption, setSortOption] = useState<SortOption>({
    option: "rating",
    order: false,
  });

  console.log(sortOption);
  console.log(" Visible ? " + hideUnrated);
  return (
    <Grid gutter={"lg"}>
      <Grid.Col span={10}>
        <Group justify="space-evenly">
          <Button
            onClick={() =>
              setSortOption({ option: "rating", order: sortOption.order })
            }
          >
            Rating
          </Button>
          <Button
            onClick={() =>
              setSortOption({
                option: "date",
                order: sortOption.order,
              })
            }
          >
            Date
          </Button>
          <Button onClick={() => setHideUnrated(!hideUnrated)}>
            {hideUnrated ? "Hide" : "Show"} Unrated Reviews
          </Button>
          <Button
            onClick={() =>
              setSortOption({
                option: sortOption.option,
                order: !sortOption.order,
              })
            }
          >
            {sortOption.order ? "Newest" : "Oldest"}
          </Button>
        </Group>
      </Grid.Col>
      <Grid.Col span={2} />

      {OrderReviews(reviews, sortOption.option, sortOption.order, hideUnrated)
        .slice(0, limit)
        .map((review: Review) => (
          <ReviewRow key={review.id} review={review} />
        ))}

      <Grid.Col span={1} />
      <Grid.Col span={10}>
        {maxLimit > 5 && (
          <Group justify="space-evenly">
            <Button onClick={() => setLimit(maxLimit)}>More </Button>
            <Button onClick={() => setLimit(5)}>Less</Button>
          </Group>
        )}
      </Grid.Col>
      <Grid.Col span={1} />
    </Grid>
  );
}

export default Reviews;

function ReviewRow({ review }: { review: Review }) {
  function handleClick(id: string) {
    console.log(`review id ${id}`);
  }
  return (
    <>
      <Grid.Col span={1} />
      <Grid.Col span={10}>
        <ShowReview
          review={review}
          handleClick={() => handleClick(review.id)}
        />
      </Grid.Col>
      <Grid.Col span={1} />
    </>
  );
}

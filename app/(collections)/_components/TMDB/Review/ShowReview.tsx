import { Review } from "@/lib/entities/TMDB";
import { Text, Avatar, Group, Button, Box } from "@mantine/core";
import { useState } from "react";

export function ShowReview({
  review,
  handleClick,
}: {
  review: Review;
  handleClick: () => void;
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const posted = new Date(review.created_at);

  function handler() {
    setExpanded(!expanded);
    handleClick();
  }
  return (
    <Box bg={"black"} px={20} py={15}>
      <Group justify="space-between">
        <Group>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            alt="Jacob Warnhalter"
            radius="xl"
          />
          <Box>
            <Text size="sm">{review.author_details.username}</Text>
            <Text size="xs" c="dimmed">
              {posted.toDateString()}
            </Text>
          </Box>
          <Text size="xs" c="dimmed">
            Rating {review.author_details.rating} / 10
          </Text>
        </Group>
        {review.content.length > 300 && (
          <Button mr={10} onClick={handler}>
            {expanded ? "Show Less " : "Read More"}
          </Button>
        )}
      </Group>
      {expanded ? (
        <Text px={40} my={10}>
          {review.content}
        </Text>
      ) : (
        <Text px={40} my={10} lineClamp={4}>
          {review.content}
        </Text>
      )}
    </Box>
  );
}

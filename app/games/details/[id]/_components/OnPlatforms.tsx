import { Platform } from "@/lib/entities/IGDB";
import StyledBadges from "@/lib/ui/StyledBadges";
import { Stack, Group, Space, Text } from "@mantine/core";

const OnPlatforms = ({ platforms }: { platforms: Platform[] }) => {
  return (
    <Stack>
      <Text size="lg">Playable On</Text>
      <Group>
        {platforms &&
          platforms.map((platform: Platform) => (
            <StyledBadges
              key={platform.id}
              label={platform.name}
              color="blue"
            />
          ))}
      </Group>
      <Space h="xl" />
    </Stack>
  );
};

export default OnPlatforms;

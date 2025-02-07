import { Involved_Company } from "@/lib/entities/IGDB";
import IGDB_Image_Helper from "@/utils/helpers/IGDB_Image_Helper";
import { Stack, Grid, GridCol, Space, Text } from "@mantine/core";
import Image from "next/image";

const AboutDevelopers = ({ companies }: { companies?: Involved_Company[] }) => {
  if (!companies)
    return (
      <Stack>
        <Text size="lg">Publishing & Developers Info Unavailable</Text>
      </Stack>
    );
  return (
    <Stack>
      <Text size="lg">Publishing & Developers</Text>
      <Grid columns={4}>
        {companies.map(({ id, company, publisher }: Involved_Company) => (
          <GridCol key={id} span={2}>
            <Stack>
              <Text>
                {publisher ? "Developer " : " Publisher "} {company.name}
              </Text>
              <Image
                height={64}
                width={64}
                src={
                  company.logo?.url
                    ? IGDB_Image_Helper(company.logo.url, "1080p")
                    : "/images/notfound.jpg"
                }
                className="bg-inherit"
                alt="No Image found"
              />
            </Stack>
          </GridCol>
        ))}
      </Grid>
      <Space h="xl" />
    </Stack>
  );
};
export default AboutDevelopers;

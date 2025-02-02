import { Platform } from "@/lib/entities/IGDB";
import { IGDB_Fetch } from "@/services/igdb-api-client-v2";

/*filtered IDs are to be revisted and expanded for deeper searching later. 
  416 - 64DD very obscure platform low results potential hard to not-manually filter as of 1/31/2025 very low priority 
  87 - Nintendo 64 Peripherial device
  165 - PS - VR
  390 - PS-vr2
  441 - PocketStation

*/
export async function fetchPlatforms() {
  const platforms: Platform[] = await IGDB_Fetch<Platform>(
    {
      endpoint: "platforms",
      query: `fields id,name, slug, platform_family.id, platform_family.name, generation, platform_logo.id, platform_logo.url, category;
        limit 50;
        sort id asc;
        where 
             (
                id = (6 , 14) | 
                  (  
                      
                      platform_family=(1,2,5) &
                      generation > 4 & 
                      category = (1)

                  )
              )
                  & id != (416,87,165,390,441)
                    
                ;`,
    },
    604800
  );

  return platforms.filter((platform: Platform) => platform.id);
}

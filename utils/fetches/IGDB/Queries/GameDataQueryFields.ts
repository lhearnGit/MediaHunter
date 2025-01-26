export const GameDataFields: string = `fields name,
summary,
storyline,
first_release_date,
rating,
rating_count,
aggregated_rating,
aggregated_rating_count,
platforms.id,
platforms.name,
platforms.category,
platforms.platform_family.id,
platforms.platform_family.name,
platforms.platform_logo.id,
platforms.platform_logo.url,

genres.id,
genres.name,
themes.id,
themes.name,

cover.*,

artworks.height,
artworks.width,
artworks.url,
artworks.id,



screenshots.id,
screenshots.url,

videos.id,
videos.video_id,
videos.name,


involved_companies.id,
involved_companies.company.id,
involved_companies.company.name,
involved_companies.company.logo.url,
involved_companies.publisher,
involved_companies.developer,

dlcs.id, 
dlcs.name,
dlcs.cover.url, 
dlcs.slug, 
dlcs.total_rating, 
dlcs.total_rating_count,

similar_games.id, 
similar_games.cover.url

;`;

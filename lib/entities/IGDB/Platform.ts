export interface Platform {
  id: number;
  name: string;
  category?: number;
  platform_family?: { id: number; name: string; slug: string };
  platform_logo?: { id: number; url: string };
}

export interface PagePath {
  href: string;
  label: string;
  pageLinks?: PagePath[];
}

export const gameSubLinks: PagePath[] = [
  { href: "/games", label: "Home" }, //link back to parent first
  { href: "/games?option=recent", label: "Recent Releases" },
  { href: "/games?option=upcoming", label: "Upcoming Releases" },
  { href: "/games/search", label: "Find Games" },
];
export const movieSubLinks: PagePath[] = [
  { href: "/movies", label: "Home" }, //link back to parent first
  { href: "/movies?new", label: "Recent Releases" },
  { href: "/movies?trending", label: "Trending" },
  { href: "/movies?popular", label: "Popular" },
  { href: "/movies/search", label: "Find Movies" },
];
export const tvSubLinks: PagePath[] = [
  { href: "/tv", label: "Home" }, //link back to parent first
  { href: "/tv?new", label: "Recent Releases" },
  { href: "/tv?trending", label: "Trending" },
  { href: "/tv?popular", label: "Popular" },
  { href: "/tv/search", label: "Find Movies" },
];

export const mainPages: PagePath[] = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/movies", label: "Movies" },
  { href: "/tv", label: "TV" },
  { href: "/user", label: "Profile" },
];

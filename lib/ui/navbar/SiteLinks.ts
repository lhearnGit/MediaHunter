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
  { href: "/movies?option=recent", label: "Recent Releases" },
  { href: "/movies?option=upcoming", label: "Upcoming Releases" },
  { href: "/movies/search", label: "Find Movies" },
];

export const mainPages: PagePath[] = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/movies", label: "Movies" },
  { href: "/tv", label: "TV" },
  { href: "/user", label: "Profile" },
];

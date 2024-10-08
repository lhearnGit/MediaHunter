export type Review = {
  id: string; //hexvalue
  author_details: {
    username: string;
    rating: number;
  };
  created_at: string;
  content: string;
};

export type ReviewResponse = {
  page: number;
  results: Review[];
};

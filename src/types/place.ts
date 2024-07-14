export type PlaceCardProps = {
  imgUrl?: string;
  name: string;
  location: string;
  price: number;
  score: number;
  id: string;
};

export type PlaceDetailProps = PlaceCardProps & {
  registrant: string;
  description: string;
  facilities: string[];
};

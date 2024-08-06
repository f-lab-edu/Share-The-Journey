export type PlaceCardProps = {
  imgUrls: string[];
  name: string;
  location: string;
  price: number;
  score: number;
  id: string;
};

export type PlaceDetailProps = PlaceCardProps & {
  registrant: string;
  review: string;
  amenities: string[];
};

export type NewPlaceForm = {
  name: string;
  location: string;
  price: number;
  score: number;
  review: string;
  amenities: string[];
  imgUrls: string[];
  registrant: string;
};

export interface PlaceLocation {
  lat: number;
  lng: number;
}

export interface City {
  placeId: string;
  name: string;
  fullAddress: string;
}

export interface Venue {
  placeId: string;
  name: string;
  address: string;
  types?: string[];
  businessStatus?: string;
}

export interface PlacesApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  count: number;
}

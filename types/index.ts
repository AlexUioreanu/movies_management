export interface Root {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

export enum ExternalIdType {
  IMDb = "imdb_id",
  Facebook = "facebook_id",
  Instagram = "instagram_id",
  TVDB = "tvdb_id",
  TikTok = "tiktok_id",
  Twitter = "twitter_id",
  Wikidata = "wikidata_id",
  YouTube = "youtube_id",
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface PopularPeople {
  page: number;
  total_pages: number;
  results: People[];
  total_results: number;
}

export interface People {
  gender: number;
  known_for_department: string;
  known_for: KnownForItem[];
  popularity: number;
  name: string;
  profile_path: string;
  id: number;
  adult: boolean;
}

export interface KnownForItem {
  overview: string;
  original_language: string;
  original_title: string;
  video: boolean;
  title: string;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  media_type: string;
  release_date: string;
  vote_average?: number;
  id: number;
  adult: boolean;
  vote_count: number;
  first_air_date: string;
  origin_country: string[];
  original_name?: string;
  name: string;
}

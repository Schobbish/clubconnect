interface ClubFields {
  acronym: string;
  president: string;
  description: string;
  logo: string;
  categories: string[];
}
type ClubName = string;

/** Club data type used by the frontend */
export interface ClubData extends ClubFields {
  name: ClubName;
}

/**
 * Object of ClubFields keyed by their name (i.e., the shape of clubData.json)
 * For use in the "backend" (MSW) only
 */
export interface ClubJson {
  [name: ClubName]: ClubFields;
}

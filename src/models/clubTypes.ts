interface BaseClub {
  acronym: string;
  president: string;
  description: string;
  logo: string;
}
type ClubName = string;

/**
 * Object of BaseClubs keyed by their name
 * For use in MSW only (it defines clubData.json)
 */
export interface ClubJson {
  [name: ClubName]: BaseClub;
}

export interface ClubData extends BaseClub {
  name: ClubName;
}

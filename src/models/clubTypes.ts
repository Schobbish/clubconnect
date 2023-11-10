interface ClubFields {
  acronym: string;
  president: string;
  description: string;
  logo: string;
  categories: string[];
  socials?: { [key: string]: string };
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

export const socialTypes = [
  "Instagram",
  "Facebook",
  "Discord",
  "Twitter",
  "Tiktok",
  "LinkedIn",
  "Website"
] as const;
type Socials = (typeof socialTypes)[number];

export type SocialsList = { [Social in Socials]?: ClubFields["socials"] };

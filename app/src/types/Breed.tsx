import type { Species } from "./Species";

export interface Breed {
  _id: string;
  species: Species;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

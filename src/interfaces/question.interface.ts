import { Alternative } from "./alternative.interface";

export interface Question{
  enunciate: String,
  alternatives: [Alternative]
}
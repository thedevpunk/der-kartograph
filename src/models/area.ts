import { EAreaType } from "./areaType";

export interface IArea {
  type: EAreaType;
  name: string;
  caption: string;
  color: string;
  image: string;
}
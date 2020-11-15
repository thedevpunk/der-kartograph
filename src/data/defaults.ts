import { ITile } from "../models/tile";
import { v4 as uuidv4 } from 'uuid';
import { EAreaType } from "../models/areaType";
import { IArea } from "../models/area";
import { create } from "domain";

export const getAreaByType = (type: EAreaType): IArea | null => {
  const area = areasData.find(area => area.type === type);

  return area ? area : null;
}

export const areasData: IArea[] = [
  {
    type: EAreaType.Empty,
    name: 'empty',
    caption: 'Leer',
    color: '#ffffff00',
    image: ''
  },
  {
    type: EAreaType.Water,
    name: 'water',
    caption: 'Wasser',
    color: '#4363da',
    image: 'water.svg'
  },
  {
    type: EAreaType.Village,
    name: 'village',
    caption: 'Dorf',
    color: '#cc2828',
    image: 'village.svg'
  },
  {
    type: EAreaType.Forest,
    name: 'forest',
    caption: 'Wald',
    color: '#4a9d4a',
    image: 'forest.svg'
  },
  {
    type: EAreaType.Fields,
    name: 'fields',
    caption: 'Acker',
    color: '#efd13e',
    image: 'fields.svg'
  },
  {
    type: EAreaType.Monster,
    name: 'monster',
    caption: 'Monster',
    color: '#be65d4',
    image: 'monster.svg'
  },
  {
    type: EAreaType.Mountains,
    name: 'mountains',
    caption: 'Gebirge',
    color: '##fffff00',
    image: 'mountains.svg'
  },
  {
    type: EAreaType.Ruins,
    name: 'ruins',
    caption: 'Ruinen',
    color: '#ffffff00',
    image: 'ruins.svg'
  },
  {
    type: EAreaType.Valley,
    name: 'valley',
    caption: 'Tal',
    color: '#333333',
    image: 'valley.svg'
  }
];

const createMap = (): EAreaType[] => {
  const map = new Array<EAreaType>(121);

  for (let i = 0; i < map.length; i++) {
    map[i] = EAreaType.Empty;
  }

  map[14] = EAreaType.Mountains;
  map[30] = EAreaType.Mountains;
  map[60] = EAreaType.Mountains;
  map[90] = EAreaType.Mountains;
  map[106] = EAreaType.Mountains;

  map[16] = EAreaType.Ruins;
  map[23] = EAreaType.Ruins;
  map[31] = EAreaType.Ruins;
  map[89] = EAreaType.Ruins;
  map[97] = EAreaType.Ruins;
  map[104] = EAreaType.Ruins;

  return map;
}

export const map: EAreaType[] = createMap();
import { ITile } from "../models/tile";
import { v4 as uuidv4 } from 'uuid';
import { EAreaType } from "../models/areaType";
import { IArea } from "../models/area";

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

const predefinedAreas = [
  {
    row: 1,
    column: 3,
    type: areasData.find(e => e.type === EAreaType.Mountains)!
  },
  {
    row: 1,
    column: 5,
    type: areasData.find(e => e.type === EAreaType.Ruins)!
  },
  {
    row: 2,
    column: 1,
    type: areasData.find(e => e.type === EAreaType.Ruins)!
  },
  {
    row: 2,
    column: 8,
    type: areasData.find(e => e.type === EAreaType.Mountains)!
  },
  {
    row: 2,
    column: 9,
    type: areasData.find(e => e.type === EAreaType.Ruins)!
  },
  {
    row: 5,
    column: 5,
    type: areasData.find(e => e.type === EAreaType.Mountains)!
  },
  {
    row: 8,
    column: 1,
    type: areasData.find(e => e.type === EAreaType.Ruins)!
  },
  {
    row: 8,
    column: 2,
    type: areasData.find(e => e.type === EAreaType.Mountains)!
  },
  {
    row: 8,
    column: 9,
    type: areasData.find(e => e.type === EAreaType.Ruins)!
  },
  {
    row: 9,
    column: 5,
    type: areasData.find(e => e.type === EAreaType.Ruins)!
  },
  {
    row: 9,
    column: 7,
    type: areasData.find(e => e.type === EAreaType.Mountains)!
  },
]

export const tilesData = (): ITile[][] => {
  const tiles: ITile[][] = [];

  for (let i = 0; i < 11; i++) {
    tiles[i] = [];

    for (let j = 0; j < 11; j++) {
      const predefined = predefinedAreas.find(e => e.row === i && e.column === j);
      
      tiles[i][j] = {
        id: uuidv4(),
        area: predefined  ? predefined.type :  areasData.find(e => e.type === EAreaType.Empty)!
      }
    }
  }
  return tiles;
}
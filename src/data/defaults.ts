import { ITile } from "../models/tile";
import { v4 as uuidv4 } from 'uuid';
import { EType } from "../models/type";
import { IArea } from "../models/area";

export const areasData: IArea[] = [
  {
    id: uuidv4(),
    name: 'empty',
    caption: 'Leer',
    color: '#ffffff00',
    image: ''
  },
  {
    id: uuidv4(),
    name: 'water',
    caption: 'Wasser',
    color: '#4363da',
    image: 'water.svg'
  },
  {
    id: uuidv4(),
    name: 'village',
    caption: 'Dorf',
    color: '#cc2828',
    image: 'village.svg'
  },
  {
    id: uuidv4(),
    name: 'forest',
    caption: 'Wald',
    color: '#4a9d4a',
    image: 'forest.svg'
  },
  {
    id: uuidv4(),
    name: 'fields',
    caption: 'Acker',
    color: '#efd13e',
    image: 'fields.svg'
  },
  {
    id: uuidv4(),
    name: 'monster',
    caption: 'Monster',
    color: '#be65d4',
    image: 'monster.svg'
  },
  {
    id: uuidv4(),
    name: 'mountains',
    caption: 'Gebirge',
    color: '##fffff00',
    image: 'mountains.svg'
  },
  {
    id: uuidv4(),
    name: 'ruins',
    caption: 'Ruinen',
    color: '#ffffff00',
    image: 'ruins.svg'
  },
  {
    id: uuidv4(),
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
    area: areasData.find(e => e.name === 'mountains')!
  },
  {
    row: 1,
    column: 5,
    area: areasData.find(e => e.name === 'ruins')!
  },
  {
    row: 2,
    column: 1,
    area: areasData.find(e => e.name === 'ruins')!
  },
  {
    row: 2,
    column: 8,
    area: areasData.find(e => e.name === 'mountains')!
  },
  {
    row: 2,
    column: 9,
    area: areasData.find(e => e.name === 'ruins')!
  },
  {
    row: 5,
    column: 5,
    area: areasData.find(e => e.name === 'mountains')!
  },
  {
    row: 8,
    column: 1,
    area: areasData.find(e => e.name === 'ruins')!
  },
  {
    row: 8,
    column: 2,
    area: areasData.find(e => e.name === 'mountains')!
  },
  {
    row: 8,
    column: 9,
    area: areasData.find(e => e.name === 'ruins')!
  },
  {
    row: 9,
    column: 5,
    area: areasData.find(e => e.name === 'ruins')!
  },
  {
    row: 9,
    column: 7,
    area: areasData.find(e => e.name === 'mountains')!
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
        area: predefined  ? predefined.area :  areasData.find(e => e.name === 'empty')!
      }
    }
  }
  return tiles;
}
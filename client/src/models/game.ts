import { IDecret } from "./decret";
import { IPlayer } from "./player";

export interface IGame {
    id: string;
    players: IPlayer[];
    currentCard: number;
    playedCards: number[];
    decrets: IDecret[];
}

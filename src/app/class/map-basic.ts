import { Map } from "../interface/map.interface";
import { Treasure } from "../interface/treasure.interface";
import { Mountain } from "./mountain";

export class MapBasic implements Map {
    width: number;
    height: number;
    mountains: Mountain[]
    treasures: Treasure[];
    turn: number;

    constructor(
        width: number,
        height: number,
        mountains: Mountain[],
        treasures: Treasure[],
        turn: number,
    ) {
        this.width = width;
        this.height = height;
        this.mountains = mountains;
        this.treasures = treasures;
        this.turn =  turn;
    }

    public getRemainingTreasures(): Treasure[] {
        return this.treasures.filter(treasure => treasure.treasureNumber > 0);
    }
}
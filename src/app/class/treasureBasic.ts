import { Treasure } from "../interface/treasure.interface";

export class TreasureBasic implements Treasure {
    x: number;
    y: number;
    treasureNumber: number;

    constructor(
        x: number,
        y: number,
        treasureNumber: number
    ) {
        this.x = x;
        this.y = y;
        this.treasureNumber = treasureNumber;
    }
}
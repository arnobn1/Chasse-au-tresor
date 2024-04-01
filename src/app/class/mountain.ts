import { Obstacle } from "../interface/obstacle.interface";

export class Mountain implements Obstacle {
    x: number;
    y: number;

    constructor(
        x: number,
        y: number
    ) {
        this.x = x;
        this.y = y;
    }
}
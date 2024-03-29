import { Obstacle } from "./obstacle.interface";
import { Treasure } from "./treasure.interface";

export interface Map {
  width: number;
  height: number;
  mountains: Obstacle[];
  treasures: Treasure[];
  turn: number;

  getRemainingTreasures(): Treasure[];
}
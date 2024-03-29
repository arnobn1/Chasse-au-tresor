import { Map } from "./map.interface";

export interface Adventurer {
  name: string;
  x: number;
  y: number;
  orientation: string;
  movements: string[];
  treasuresCollected: number;

  simulateMovements(adventurers: Adventurer[], terrain: Map, turn: number): void;
}
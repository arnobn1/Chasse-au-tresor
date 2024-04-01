import { Adventurer } from "../interface/adventurer.interface";
import { Map } from "../interface/map.interface";

export class AdventurerBasic implements Adventurer {
    name: string;
    x: number;
    y: number;
    orientation: string;
    movements: string[];
    treasuresCollected: number;

    constructor(
        name: string,
        x: number,
        y: number,
        orientation: string,
        movements: string[],
        treasuresCollected: number
    ) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.movements = movements;
        this.treasuresCollected = treasuresCollected;
    }

    public simulateMovements(adventurers: AdventurerBasic[], terrain: Map, turn: number): void {
        if (this.movements[turn] === 'A') {
            this.moveForward(adventurers, terrain);
            this.findTreasures(terrain);
        }
        else if (this.movements[turn] === 'G') {
            this.moveToLeft();
        }
        else if (this.movements[turn] === 'D') {
            this.moveToRight();
        }
    }

    private findTreasures(terrain: Map): void {
        const adventurerTreasure = terrain.getRemainingTreasures().find(treasure => treasure.x === this.x && treasure.y === this.y);
        if (adventurerTreasure) {
            adventurerTreasure.treasureNumber--;
            this.treasuresCollected++;
        }
    }

    private moveForward(adventurers: Adventurer[], terrain: Map): void {
        switch (this.orientation) {
            case 'N':
                this.isObstacleForward(adventurers, terrain, this.x, this.y - 1) ? null :
                    this.y--;
                break;
            case 'S':
                this.isObstacleForward(adventurers, terrain, this.x, this.y + 1) ? null :
                    this.y++;
                break;
            case 'E':
                this.isObstacleForward(adventurers, terrain, this.x + 1, this.y) ? null :
                    this.x++;
                break;
            case 'W':
                this.isObstacleForward(adventurers, terrain, this.x - 1, this.y) ? null :
                    this.x--;
                break;
        }
    }

    private isObstacleForward(adventurers: Adventurer[], terrain: Map, x: number, y: number): boolean {
        return terrain.mountains.find(mountain => mountain.x === x && mountain.y === y) ||
            adventurers.find(adventurer => adventurer.x === x && adventurer.y === y) ||
            (x > terrain.width || y > terrain.height) || (x < 0 || y < 0) ? true : false;
    }

    private moveToLeft(): void {
        switch (this.orientation) {
            case 'N':
                this.orientation = 'W';
                break;
            case 'S':
                this.orientation = 'E';
                break;
            case 'E':
                this.orientation = 'N';
                break;
            case 'W':
                this.orientation = 'S';
                break;
        }
    }

    private moveToRight(): void {
        switch (this.orientation) {
            case 'N':
                this.orientation = 'E';
                break;
            case 'S':
                this.orientation = 'W';
                break;
            case 'E':
                this.orientation = 'S';
                break;
            case 'W':
                this.orientation = 'N';
                break;
        }
    }
}
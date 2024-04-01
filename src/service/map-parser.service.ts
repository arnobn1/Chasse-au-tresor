import { Injectable } from '@angular/core';
import { Map } from '../app/interface/map.interface';
import { AdventurerBasic } from '../app/class/adventurer-basic';
import { MapBasic } from '../app/class/map-basic';
import { Adventurer } from '../app/interface/adventurer.interface';
import { Mountain } from '../app/class/mountain';
import { TreasureBasic } from '../app/class/treasureBasic';


@Injectable({
  providedIn: 'root'
})
export class MapParserService {

  public parseBasicMap(input: string, adventurers: Adventurer[]): Map {
    const lines = input.split('\n');
    const mountains: Mountain[] = [];
    const treasures: TreasureBasic[] = [];
    const turnNumber = adventurers.reduce((nextAdventurer: Adventurer, adventurer: Adventurer) => adventurer.movements.length > nextAdventurer.movements.length ? adventurer : nextAdventurer, adventurers[0]);
    const mapSize = lines.filter((line) => line[0] === 'C');

    lines.filter((line) => line[0] === 'M').forEach((mountain: string) => {
      mountains.push({ x: Number(mountain.split(' ')[2]), y: Number(mountain.split(' ')[4]) });
    });
    lines.filter((line) => line[0] === 'T').forEach((treasure: string) => {
      treasures.push({ x: Number(treasure.split(' ')[2]), y: Number(treasure.split(' ')[4]), treasureNumber: Number(treasure.split(' ')[6]) });
    });
    return new MapBasic(Number(mapSize[0].split(' ')[2]), Number(mapSize[0].split(' ')[4]), mountains, treasures, turnNumber.movements.length);
  }

  public parseBasicAdventurers(input: string): Adventurer[] {
    const lines = input.split('\n');
    const adventurers: AdventurerBasic[] = [];

    lines.filter((line) => line[0] === 'A').forEach((adventurer: string) => {
      adventurers.push(new AdventurerBasic(adventurer.split(' ')[2], Number(adventurer.split(' ')[4]), Number(adventurer.split(' ')[6]), adventurer.split(' ')[8], adventurer.split(' ')[10].split(''), 0));
    });
    return adventurers;
  }
}
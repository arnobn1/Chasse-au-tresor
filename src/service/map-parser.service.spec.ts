import { TestBed } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';
import { MapParserService } from './map-parser.service';
import { MapBasic } from '../app/class/map-basic';
import { Mountain } from '../app/class/mountain';
import { TreasureBasic } from '../app/class/treasureBasic';
import { AdventurerBasic } from '../app/class/adventurer-basic';

describe('MapParserService', () => {
    let mapService: MapParserService;


    beforeEach(() =>
        MockBuilder(MapParserService)
    );

    beforeEach(async () => {
        mapService = TestBed.inject(MapParserService);
    });

    it('#parseBasicMap Quand on choisit un fichier text avec une map, alors crée un objet Map avec ses caractéristiques', () => {
        // Given
        const input: string = 'C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 3\nA - Lara - 1 - 1 - S - AADADAGGA';
        const adventurers = [new AdventurerBasic('Lara', 1, 1, 'S', ['A', 'A', 'D', 'A', 'D', 'A', 'G', 'G', 'A'], 0), new AdventurerBasic('Nono', 2, 2, 'E', ['A', 'A', 'D', 'A', 'D', 'A', 'G', 'G', 'A'], 0)];

        // When
        const map = mapService.parseBasicMap(input, adventurers);

        // Then
        const expectedObstacle: Mountain[] = [{ x: 1, y: 0 }, { x: 2, y: 1 }];
        const expectedTreasure: TreasureBasic[] = [{ x: 0, y: 3, treasureNumber: 2 }, { x: 1, y: 3, treasureNumber: 3 }];
        const expectedMap = new MapBasic(3, 4, expectedObstacle, expectedTreasure, 9);
        expect(map).toEqual(expectedMap);
    });

    it('#parseBasicAdventurers Quand on choisit un fichier text avec des aventuriers, alors crée un tableau d\'objets Adventurer avec ses caractéristiques', () => {
        // Given
        const input: string = 'C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 3\nA - Lara - 1 - 1 - S - AADADAGGA\nA - Nono - 2 - 2 - E - AADADAGGA';

        // When
        const adventurers = mapService.parseBasicAdventurers(input);

        // Then
        const expectedAdventurers = [new AdventurerBasic('Lara', 1, 1, 'S', ['A', 'A', 'D', 'A', 'D', 'A', 'G', 'G', 'A'], 0),
        new AdventurerBasic('Nono', 2, 2, 'E', ['A', 'A', 'D', 'A', 'D', 'A', 'G', 'G', 'A'], 0)];
        expect(adventurers).toEqual(expectedAdventurers);
    });
});
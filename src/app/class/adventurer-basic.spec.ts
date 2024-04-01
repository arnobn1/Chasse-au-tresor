import { AdventurerBasic } from './adventurer-basic';
import { MapBasic } from './map-basic';
import { Mountain } from './mountain';
import { TreasureBasic } from './treasureBasic';

describe('MapBasic', () => {
    let adventurer: AdventurerBasic;

    for (const { orientation, expectedOrientation } of [
        { orientation: 'N', expectedOrientation: 'W' },
        { orientation: 'S', expectedOrientation: 'E' },
        { orientation: 'E', expectedOrientation: 'N' },
        { orientation: 'W', expectedOrientation: 'S' },
    ]) {
        it(`#simulateMovements Quand un aventurier doit tourner à gauche en partant de la direction ${orientation}, alors il finit bien en direction ${expectedOrientation}`, () => {
            // Given
            const adventurers: AdventurerBasic[] = [];
            adventurer = new AdventurerBasic('Nono', 2, 2, orientation, ['G'], 0);
            adventurers.push(adventurer);
            const obastacles: Mountain[] = [{ x: 1, y: 0 }, { x: 2, y: 1 }];
            const treasures: TreasureBasic[] = [{ x: 0, y: 3, treasureNumber: 2 }, { x: 1, y: 3, treasureNumber: 3 }];
            const map = new MapBasic(3, 4, obastacles, treasures, 1);

            // When
            adventurer.simulateMovements(adventurers, map, 0);

            // Then
            expect(adventurer.orientation).toEqual(expectedOrientation);
        });
    }

    for (const { orientation, expectedOrientation } of [
        { orientation: 'N', expectedOrientation: 'E' },
        { orientation: 'S', expectedOrientation: 'W' },
        { orientation: 'E', expectedOrientation: 'S' },
        { orientation: 'W', expectedOrientation: 'N' },
    ]) {
        it(`#simulateMovements Quand un aventurier doit tourner à droite en partant de la direction ${orientation}, alors il finit bien en direction ${expectedOrientation}`, () => {
            // Given
            const adventurers: AdventurerBasic[] = [];
            adventurer = new AdventurerBasic('Nono', 2, 2, orientation, ['D'], 0);
            adventurers.push(adventurer);
            const obstacles: Mountain[] = [{ x: 1, y: 0 }, { x: 2, y: 1 }];
            const treasures: TreasureBasic[] = [{ x: 0, y: 3, treasureNumber: 2 }, { x: 1, y: 3, treasureNumber: 3 }];
            const map = new MapBasic(3, 4, obstacles, treasures, 1);

            // When
            adventurer.simulateMovements(adventurers, map, 0);

            // Then
            expect(adventurer.orientation).toEqual(expectedOrientation);
        });
    }

    for (const { orientation, expectedPosition } of [
        { orientation: 'N', expectedPosition: { x: 1, y: 0 } },
        { orientation: 'S', expectedPosition: { x: 1, y: 2 } },
        { orientation: 'E', expectedPosition: { x: 2, y: 1 } },
        { orientation: 'W', expectedPosition: { x: 0, y: 1 } },
    ]) {
        it(`#simulateMovements Quand un aventurier doit avancer depuis la position 1 1 en partant de la direction ${orientation}, 
        alors il finit bien en ${expectedPosition.x} ${expectedPosition.y}`, () => {
            // Given
            const adventurers: AdventurerBasic[] = [];
            adventurer = new AdventurerBasic('Nono', 1, 1, orientation, ['A'], 0);
            adventurers.push(adventurer);
            const obstacles: Mountain[] = [{ x: 3, y: 3 }];
            const treasures: TreasureBasic[] = [{ x: 0, y: 3, treasureNumber: 2 }, { x: 1, y: 3, treasureNumber: 3 }];
            const map = new MapBasic(3, 4, obstacles, treasures, 1);

            // When
            adventurer.simulateMovements(adventurers, map, 0);

            // Then
            expect(adventurer).toEqual(new AdventurerBasic('Nono', expectedPosition.x, expectedPosition.y, orientation, ['A'], 0));
        });
    }

    for (const { orientation, expectedMoutainPosition } of [
        { orientation: 'N', expectedMoutainPosition: { x: 1, y: 0 } },
        { orientation: 'S', expectedMoutainPosition: { x: 1, y: 2 } },
        { orientation: 'E', expectedMoutainPosition: { x: 2, y: 1 } },
        { orientation: 'W', expectedMoutainPosition: { x: 0, y: 1 } },
    ]) {
        it(`#simulateMovements Quand un aventurier doit avancer depuis la position 1 1 en partant de la direction ${orientation}, 
        alors il est bloqué par une montagne`, () => {
            // Given
            const adventurers: AdventurerBasic[] = [];
            adventurer = new AdventurerBasic('Nono', 1, 1, orientation, ['A'], 0);
            adventurers.push(adventurer);
            const obstacles: Mountain[] = [{ x: expectedMoutainPosition.x, y: expectedMoutainPosition.y }];
            const treasures: TreasureBasic[] = [{ x: 0, y: 3, treasureNumber: 2 }, { x: 1, y: 3, treasureNumber: 3 }];
            const map = new MapBasic(3, 4, obstacles, treasures, 1);

            // When
            adventurer.simulateMovements(adventurers, map, 0);

            // Then
            expect(adventurer).toEqual(new AdventurerBasic('Nono', 1, 1, orientation, ['A'], 0));
        });
    }

    for (const { orientation, position } of [
        { orientation: 'N', position: { x: 1, y: 0 } },
        { orientation: 'S', position: { x: 1, y: 4 } },
        { orientation: 'E', position: { x: 3, y: 1 } },
        { orientation: 'W', position: { x: 0, y: 1 } },
    ]) {
        it(`#simulateMovements Quand un aventurier doit avancer depuis la position ${position.x} ${position.y} en partant de la direction ${orientation}, 
        alors il est bloqué par les limites de la map`, () => {
            // Given
            const adventurers: AdventurerBasic[] = [];
            adventurer = new AdventurerBasic('Nono', position.x, position.y, orientation, ['A'], 0);
            adventurers.push(adventurer);
            const obstacles: Mountain[] = [{ x: 3, y: 3 }];
            const treasures: TreasureBasic[] = [{ x: 0, y: 3, treasureNumber: 2 }, { x: 1, y: 3, treasureNumber: 3 }];
            const map = new MapBasic(3, 4, obstacles, treasures, 1);

            // When
            adventurer.simulateMovements(adventurers, map, 0);

            // Then
            expect(adventurer).toEqual(new AdventurerBasic('Nono', position.x, position.y, orientation, ['A'], 0));
        });
    }

    for (const { adventurerOrientation, secondAdventurerExpedctedPosition, secondAdventurerOrientation, secondAdventurerPosition } of [
        { adventurerOrientation: 'N', secondAdventurerExpedctedPosition: { x: 2, y: 1 }, secondAdventurerOrientation: 'E', secondAdventurerPosition: { x: 1, y: 1 } },
        { adventurerOrientation: 'S', secondAdventurerExpedctedPosition: { x: 2, y: 3 }, secondAdventurerOrientation: 'W', secondAdventurerPosition: { x: 3, y: 3 } },
        { adventurerOrientation: 'E', secondAdventurerExpedctedPosition: { x: 3, y: 2 }, secondAdventurerOrientation: 'N', secondAdventurerPosition: { x: 3, y: 3 } },
        { adventurerOrientation: 'W', secondAdventurerExpedctedPosition: { x: 1, y: 2 }, secondAdventurerOrientation: 'S', secondAdventurerPosition: { x: 1, y: 1 } },
    ]) {
        it(`#simulateMovements Quand un aventurier doit avancer depuis la position ${secondAdventurerPosition.x}  ${secondAdventurerPosition.y} en partant de la direction ${secondAdventurerOrientation}
    et qu'un autre aventurier est sur cette case après un tour, alors il est bloqué`, () => {
            // Given
            const adventurers: AdventurerBasic[] = [new AdventurerBasic('Nono', 2, 2, adventurerOrientation, ['A', 'A'], 0),
            new AdventurerBasic('Lara', secondAdventurerPosition.x, secondAdventurerPosition.y, secondAdventurerOrientation, ['A', 'A'], 0)];
            const obstacles: Mountain[] = [{ x: 0, y: 0 }];
            const treasures: TreasureBasic[] = [{ x: 0, y: 3, treasureNumber: 2 }, { x: 1, y: 3, treasureNumber: 3 }];
            const map = new MapBasic(4, 5, obstacles, treasures, 2);

            // When
            for (let i = 0; i < map.turn; i++) {
                adventurers.forEach((adventurer) => adventurer.simulateMovements(adventurers, map, i));
            }

            // Then
            expect(adventurers[1]).toEqual(new AdventurerBasic('Lara', secondAdventurerExpedctedPosition.x, secondAdventurerExpedctedPosition.y, secondAdventurerOrientation, ['A', 'A'], 0));
        });

        it('#simulateMovements Quand un aventurier passe sur une case trésor, alors recupère un trésor', () => {
            // Given
            const adventurers: AdventurerBasic[] = [];
            adventurer = new AdventurerBasic('Nono', 1, 1, 'S', ['A'], 0);
            adventurers.push(adventurer);
            const obstacles: Mountain[] = [{ x: 3, y: 3 }];
            const treasures: TreasureBasic[] = [{ x: 1, y: 2, treasureNumber: 2 }];
            const map = new MapBasic(3, 4, obstacles, treasures, 0);

            // When
            adventurer.simulateMovements(adventurers, map, 0);

            // Then
            expect(adventurer).toEqual(new AdventurerBasic('Nono', 1, 2, 'S', ['A'], 1));
            expect(map.treasures[0].treasureNumber).toEqual(1);
        });
    }
});
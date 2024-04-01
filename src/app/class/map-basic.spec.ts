import { MapBasic } from './map-basic';
import { Mountain } from './mountain';
import { TreasureBasic } from './treasureBasic';

describe('MapBasic', () => {
    let map: MapBasic;

    it('#getRemainingTreasures Quand il reste des trésors, alors récupère les trésores restant sur la map', () => {
        // Given
        const obstacles: Mountain[] = [{ x: 1, y: 0 }, { x: 2, y: 1 }];
        const treasures: TreasureBasic[] = [{ x: 0, y: 3, treasureNumber: 2 }, { x: 1, y: 3, treasureNumber: 3 }];
        map = new MapBasic(3, 4, obstacles, treasures, 0);

        // When
        const remainTreasures = map.getRemainingTreasures();

        //Then
        expect(remainTreasures).toEqual([{ x: 0, y: 3, treasureNumber: 2 }, { x: 1, y: 3, treasureNumber: 3 }]);
    });

    it('#getRemainingTreasures Quand il ne reste pas de trésors, alors ne récupère rien', () => {
        // Given
        const obstacles: Mountain[] = [{ x: 1, y: 0 }, { x: 2, y: 1 }];
        const treasures: TreasureBasic[] = [{ x: 0, y: 3, treasureNumber: 0 }, { x: 1, y: 3, treasureNumber: 0 }];
        map = new MapBasic(3, 4, obstacles, treasures, 0);

        // When
        const remainTreasures = map.getRemainingTreasures();

        // Then 
        expect(remainTreasures).toEqual([]);
    });

});

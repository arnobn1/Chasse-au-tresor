import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBuilder, MockService } from 'ng-mocks';
import { MapParserService } from '../service/map-parser.service';
import { AppComponent } from './app.component';
import { AdventurerBasic } from './class/adventurer-basic';
import { MapBasic } from './class/map-basic';
import { Mountain } from './class/mountain';
import { TreasureBasic } from './class/treasureBasic';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mapService: jasmine.SpyObj<MapParserService>;


  beforeEach(() =>
    MockBuilder(AppComponent)
  );

  beforeEach(async () => {
    mapService = TestBed.inject(MapParserService) as jasmine.SpyObj<MapParserService>;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('#onFileSelected Quand on choisit un fichier texte avec une map et un/des aventurier(s), alors simule les mouvements et crée un fichier en sortie', () => {
    // Given
    const fileContent = 'C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 3\nA - Lara - 1 - 1 - S - AADADAGGA';
    const mockFile = new File([fileContent], 'mockfile.txt', { type: 'text/plain' });
    const fileList = MockService(FileList, [mockFile]);
    const inputElement = MockService(HTMLInputElement, { files: fileList, value: ''})
    const mockEvent = { target: inputElement } as unknown as Event;

    const mockFileReader = jasmine.createSpyObj('FileReader', ['readAsText', 'onload']);
    spyOn(window, 'FileReader').and.returnValue(mockFileReader);

    mockFileReader.readAsText.and.callFake(() => {
      mockFileReader.onload({
        target: {
          result: fileContent
        }
      });
    });

    const expectedAdventurers: AdventurerBasic[] = [new AdventurerBasic('Lara', 1, 1, 'S', ['A', 'A', 'D', 'A', 'D', 'A', 'G', 'G', 'A'], 0)];
    const expectedObstacle: Mountain[] = [{ x: 1, y: 0 }, { x: 2, y: 1 }];
    const expectedTreasure: TreasureBasic[] = [{ x: 0, y: 3, treasureNumber: 2 }, { x: 1, y: 3, treasureNumber: 3 }];
    const expectedMap: MapBasic = new MapBasic(3, 4, expectedObstacle, expectedTreasure, 9);
    spyOn(mapService, 'parseBasicAdventurers').withArgs(fileContent).and.returnValue(expectedAdventurers);
    spyOn(mapService, 'parseBasicMap').withArgs(fileContent, expectedAdventurers).and.returnValue(expectedMap);
    spyOn(document, 'createElement').and.callThrough();
    spyOn(URL, 'createObjectURL').and.callThrough();

    // When
    component.onFileSelected(mockEvent);

    // Then
    expect(window.FileReader).toHaveBeenCalled();
    expect(mockFileReader.readAsText).toHaveBeenCalledWith(new File(['C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 3\nA - Lara - 1 - 1 - S - AADADAGGA'], 'mockfile.txt', { type: 'text/plain' }));
    expect(component.input).toEqual('C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 3\nA - Lara - 1 - 1 - S - AADADAGGA');
    expect(component.output).toEqual('C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 1 - 3 - 2\nA - Lara - 0 - 3 - S - 3');
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(URL.createObjectURL).toHaveBeenCalledWith(new Blob(['C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 3\nA - Lara - 1 - 1 - S - AADADAGGA'], { type: 'text/plain' }));
    expect(AppComponent.OUTPUT_FILE_NAME).toEqual('ResultHunt');
  });
});

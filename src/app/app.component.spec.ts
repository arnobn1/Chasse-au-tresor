import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockBuilder } from 'ng-mocks';
import { MapParserService } from '../service/map-parser.service';

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
   
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});

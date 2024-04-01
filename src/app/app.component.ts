import { Component } from '@angular/core';
import { MapParserService } from '../service/map-parser.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public input: string = '';
  public output: string = '';
  public downloadFile!: HTMLAnchorElement;
  public static readonly OUTPUT_FILE_NAME = 'ResultHunt';

  constructor(
    private mapParserService: MapParserService,
  ) { }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const reader: FileReader = new FileReader();
    reader.onload = (fileContent: ProgressEvent<FileReader>) => {
      this.input = fileContent.target?.result as string;
      this.simulate();
    };
    reader.readAsText(input.files![0]);
    input.value = '';
  }

  private simulate(): void {
    const adventurers = this.mapParserService.parseBasicAdventurers(this.input);
    const terrain = this.mapParserService.parseBasicMap(this.input, adventurers);


    for (let currentTurn = 0; currentTurn < terrain.turn; currentTurn++) {
      adventurers.forEach((adventurer) => adventurer.simulateMovements(adventurers, terrain, currentTurn));
    }

    this.output = `C - ${terrain.width} - ${terrain.height}\n`;
    terrain.mountains.forEach(mountain => {
      this.output += `M - ${mountain.x} - ${mountain.y}\n`;
    });
    terrain.getRemainingTreasures().forEach(treasure => {
      this.output += `T - ${treasure.x} - ${treasure.y} - ${treasure.treasureNumber}\n`;
    });
    adventurers.forEach(adventurer => {
      this.output += `A - ${adventurer.name} - ${adventurer.x} - ${adventurer.y} - ${adventurer.orientation} - ${adventurer.treasuresCollected}`;
    });
    this.writeToFile(this.output);
  }

  private writeToFile(output: string): void {
    this.downloadFile = document.createElement('a');
    this.downloadFile.href = URL.createObjectURL(new Blob([output], { type: 'text/plain' }));
    this.downloadFile.download = AppComponent.OUTPUT_FILE_NAME;
    this.downloadFile.click();
  }
}

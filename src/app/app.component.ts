import { Component } from '@angular/core';
import { MapParserService } from '../service/map-parser.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private input: string = '';
  private output: string = '';

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
      this.output += `A - ${adventurer.name} - ${adventurer.x} - ${adventurer.y} - ${adventurer.orientation} - ${adventurer.treasuresCollected}\n`;
    });
    //this.writeToFile(this.output);
    console.log("output", this.output);
  }

  private writeToFile(data: string): void {
    const huntFile = document.createElement('a');
    const file = new Blob([data], { type: 'text/plain' });
    huntFile.href = URL.createObjectURL(file);
    huntFile.download = 'ResultHunt';
    huntFile.click();
  }
}

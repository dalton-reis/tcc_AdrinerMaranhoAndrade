import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { GraphicEngine } from '../engine/graphic-engine';
import { EngineProvider } from '../engine/engine-provider';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements AfterViewInit {

  @Input()
  engineType: string = EngineProvider.default();
  @ViewChild('graphicContainer')
  parentContainer: ElementRef;
  graphicEngine: GraphicEngine;

  constructor() { }

  ngAfterViewInit(): void {
    this.graphicEngine = EngineProvider.get(this.engineType);
    this.graphicEngine.init(this.parentContainer.nativeElement as HTMLDivElement);
  }

}

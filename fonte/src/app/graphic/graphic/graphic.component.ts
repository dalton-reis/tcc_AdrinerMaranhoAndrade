import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { GraphicEngine } from '../engine/graphic-engine';
import { GraphicEngineProvider } from '../engine/graphic-engine-provider';
import { ToolbarItem } from '../../models/toolbar-item';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements AfterViewInit {

  @Input() engineType: string = GraphicEngineProvider.default();
  @Output() onLoad = new EventEmitter<GraphicEngine>();
  @ViewChild('graphicContainer') parentContainer: ElementRef;

  graphicEngine: GraphicEngine;
  graphicToolbar: ToolbarItem[];

  constructor() { }

  ngAfterViewInit(): void {
    this.graphicEngine = GraphicEngineProvider.create(this.engineType, this.parentContainer.nativeElement);
    // Avoid ExpressionChangedAfterItHasBeenCheckedError as the logic is relied on ngAfterViewInit
    setTimeout(() => this.init());
  }

  private init() {
    this.graphicToolbar = this.graphicEngine.getToolbar();
    this.onLoad.emit(this.graphicEngine);
  }

}

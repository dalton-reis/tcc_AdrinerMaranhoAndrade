import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { GraphicEngine } from '../engine/graphic-engine';
import { GraphicEngineProvider } from '../engine/graphic-engine-provider';
import { ToolbarItem } from '../engine/toolbar-item';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements AfterViewInit {

  @Input() engineType: string = GraphicEngineProvider.default();
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
  }

  toolbarId(_, toolbarItem: ToolbarItem) {
    return toolbarItem.id;
  }

}
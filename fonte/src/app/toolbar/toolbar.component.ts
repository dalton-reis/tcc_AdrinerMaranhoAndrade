import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToolbarItem } from '../models/toolbar-item';
import { Action } from '../models/toolbar-action';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() items: ToolbarItem[] = [];
  @Input() collapse: boolean = false;
  @Output() action = new EventEmitter<Action>();

  constructor() { }

  ngOnInit(): void {
  }

  itemId(_, toolbarItem: ToolbarItem) {
    return toolbarItem.id;
  }

  executeItem(toolbarItem: ToolbarItem) {
    toolbarItem.action(action => this.action.emit(action));
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ToolbarItem } from '../@core/data/toolbar-item';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() items: ToolbarItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  itemId(_, toolbarItem: ToolbarItem) {
    return toolbarItem.id;
  }

}

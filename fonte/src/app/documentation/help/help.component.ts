import { Component, OnInit, Input } from '@angular/core';
import { DocumentationService } from '../documentation.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {

  @Input() section: string;
  @Input() orientation: string;
  @Input() position: string;

  private documentationService = new DocumentationService();
  url: string;

  constructor() {}

  ngOnInit(): void {
    this.url = this.documentationService[this.section];
    if (!this.url) throw Error(`Documentation section '${this.section}' not defined`);
  }

  openUrl() {
    window.open(this.url, '_blank');
  }

}

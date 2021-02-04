import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-file',
  templateUrl: './select-file.component.html',
  styleUrls: ['./select-file.component.scss'],
})
export class SelectFileComponent implements OnInit {

  @Input() label: string = 'Selecione um arquivo';
  @Output() onSelect = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }

  fileSelected(file: File) {
    this.onSelect.emit(file);
  }

}

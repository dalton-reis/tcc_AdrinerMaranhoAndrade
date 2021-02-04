import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { quillModules } from './quill-editor/configuration';
import { QuillModules } from 'ngx-quill';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  viewProviders: [
    {
        provide: ControlContainer,
        useExisting: FormGroupDirective,
    },
],

})
export class TextEditorComponent implements OnInit {

  @Input() controlName: string;
  @Input() required: boolean = false;

  quillModules: QuillModules = quillModules;

  constructor() {
  }

  ngOnInit(): void {
  }

}

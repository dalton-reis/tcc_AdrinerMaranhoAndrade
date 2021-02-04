import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Problem } from '../../../models/problem/problem';
import { ProblemInfo } from '../../../models/problem/problem-info';
import { ProblemStorageService } from '../../../storage/problem-storage.service';

@Component({
  selector: 'app-problem-item',
  templateUrl: './problem-item.component.html',
  styleUrls: ['./problem-item.component.scss'],
})
export class ProblemItemComponent implements OnInit {

  @Input() problemInfo: ProblemInfo;
  @Output() onSelect = new EventEmitter<Problem>();

  constructor(
    private problemsStorageService: ProblemStorageService,
  ) { }

  ngOnInit(): void {
  }

  async executeProblem() {
    const problem = await this.problemsStorageService.load(this.problemInfo.downloadUrl);
    this.onSelect.emit(problem);
  }

}

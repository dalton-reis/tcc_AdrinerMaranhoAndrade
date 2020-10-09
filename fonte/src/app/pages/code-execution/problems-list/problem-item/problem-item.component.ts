import { Component, OnInit, Input } from '@angular/core';
import { ProblemInfo } from '../../../../models/problem/problem-info';
import { ProblemStorageService } from '../../../../storage/problem-storage.service';

@Component({
  selector: 'app-problem-item',
  templateUrl: './problem-item.component.html',
  styleUrls: ['./problem-item.component.scss'],
})
export class ProblemItemComponent implements OnInit {

  @Input() problemInfo: ProblemInfo;

  constructor(private problemsStorageService: ProblemStorageService) { }

  ngOnInit(): void {
  }

  executeProblem() {
    this.problemsStorageService.load(this.problemInfo.downloadUrl);
  }

}

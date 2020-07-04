import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass'],
})
export class ReportComponent implements OnInit {
  public dataAll: any;
  public viewPage: number = 1;

  constructor(private request: ApiService) {}

  ngOnInit(): void {
    this.request.getDataTable().subscribe(
      (res) => {
        this.dataAll = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

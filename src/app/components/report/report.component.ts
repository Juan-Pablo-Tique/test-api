import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass'],
})
export class ReportComponent implements OnInit {
  public dataAll: any;
  public viewPage: number = 1;
  public amountDataDisplayed: number = 5;
  public optionSelect: Array<number> = [5, 10, 15, 20];
  public selected = 5;
  public textSearch: string = '';
  public numberRecords: number = 0;
  public reportForm: FormGroup = this.formBuilder.group({
    search: [null, [Validators.required]],
    rows: [null, [Validators.required]],
  });

  constructor(private request: ApiService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.reportForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(600))
      .subscribe((value) => {
        this.getSearch(value);
      });

    this.reportForm.get('rows')?.valueChanges.subscribe((res) => {
      this.amountDataDisplayed = res;
    });

    this.getSearch();
  }

  getSearch(value?: string) {
    this.request.getDataTable().subscribe(
      (res) => {
        this.dataAll = res;
        if (value) {
          this.dataAll = this.dataAll.filter((e: any) =>
            e.title.includes(value)
          );
          this.textSearch = value;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

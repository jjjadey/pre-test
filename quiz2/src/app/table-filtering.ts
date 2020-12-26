import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { MatTableDataSource } from '@angular/material/table';

export interface Ob {
  id: number;
  category: string;
}

@Component({
  selector: 'table-filtering',
  styleUrls: ['table-filtering.css'],
  templateUrl: 'table-filtering.html',
})


export class TableFilteringExample {
  title = 'quiz2';
  fetchData: [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['num', 'category'];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getData().toPromise().then((data) => {
      // console.log("getData", data);
      this.fetchData = data;

      let myArr: Array<any> = [];
      data.map((d, index) => {
        let obData = {} as Ob;
        obData.id = index + 1;
        obData.category = d;
        myArr.push(obData);
      })
      // console.log(myArr);
      this.dataSource.data = myArr;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

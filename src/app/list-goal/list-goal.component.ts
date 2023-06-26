import { Router } from '@angular/router';
import { Record } from './../models/Record';
import { ApiService } from '../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-list-goal',
  templateUrl: './list-goal.component.html',
  styleUrls: ['./list-goal.component.scss']
})
export class ListGoalComponent implements OnInit {
  public records!: Record[];
  dataSource!: MatTableDataSource<Record>;

  displayedColumns: string[] = ['id', 'amountDiposited', 'interestEarned', 'totalDeposit', 'totalInterest', 'monthEndBalance', 'month', 'year', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private apiService: ApiService, private router: Router, private toastr: ToastrService, public dialogService: DialogService ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getRecords()
      .subscribe({
        next: (res) => {
          this.records = res;
          this.dataSource = new MatTableDataSource(this.records);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  edit(id: number) {
    this.router.navigate(['update', id])
  }

  deleteUser(id: number) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.apiService.deleteRecord(id)
          .subscribe({
            next: (res) => {
              this.toastr.success('Deleted Successfully');
              this.getUsers();
            },
            error: (err) => {
              this.toastr.error('Something went wrong!');
            }
          })
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

import { Record } from './../models/Record';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalComponent {
  years: string[] = ["2023", "2024", "2025"];
  months: string[] = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

  addGoalForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.addGoalForm = this.fb.group({
      amountDiposited: [''],
      interestEarned: [''],
      totalDeposit: [''],
      totalInterest: [''],
      monthEndBalance: [''],
      month: [''],
      year: ['']
    });
  }
  submit() {
    this.api.postRecord(this.addGoalForm.value)
      .subscribe(res => {
        this.toastr.success('Registration Successful');
        this.addGoalForm.reset();
      });
  }
}

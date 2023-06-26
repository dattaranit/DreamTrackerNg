import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditModel } from '../models/EditModel';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss']
})
export class EditGoalComponent implements OnInit {
  updateForm!: FormGroup;
  private recordToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.updateForm = this.fb.group({
      profit: [''],
      loss: [''],
    });

    this.activatedRoute.params.subscribe(val => {
      this.recordToUpdate = val['id'];
      if (this.recordToUpdate) {
        this.api.getRecordId(this.recordToUpdate)
          .subscribe({
            next: (res) => {
              this.fillFormToUpdate(res);
            },
            error: (err) => {
              console.log(err);
            }
          })
      }
    })
  }

  fillFormToUpdate(edit: EditModel) {
    this.updateForm.setValue({
      profit: edit.profit,
      loss: edit.loss
    })
  }

  update() {
    this.api.updateRecord(this.updateForm.value, this.recordToUpdate)
      .subscribe(res => {
        // this.toastService.success({ detail: 'SUCCESS', summary: 'User Details Updated Successful', duration: 3000 });
        this.router.navigate(['list']);
        this.updateForm.reset();
      });
  }
}

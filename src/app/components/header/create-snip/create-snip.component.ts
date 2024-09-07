import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatabaseService } from '../../../services/database.service';
import { DataBase } from '../../../services/models/db.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-snip',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-snip.component.html',
  styleUrl: './create-snip.component.scss',
})
export class CreateSnipComponent {
  constructor(private dbService: DatabaseService,private router : Router) {}
  title = new FormControl('', [Validators.required]);

  code = new FormControl('', [Validators.required]);

  snippedFrom = new FormGroup({
    title: this.title,
    code: this.code,
  });
  // async delete() {
  //   await this.dbService.deleteSnippet()  }
  async save() {
    console.log(this.snippedFrom.value);
    await this.dbService.createSnippet(this.snippedFrom.value as DataBase);
    this.router.navigate(['/'])
  }
  

 
}

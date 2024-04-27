import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loggin',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './loggin.component.html',
  styleUrl: './loggin.component.scss'
})
// I think dependency injection goes here
export class LogginComponent implements OnInit {
  ngOnInit(): void {
    this.form = new FormGroup({ 
      userName : new FormControl("", Validators.required),
      password : new FormControl("", Validators.required)
    });
  }
  form!: UntypedFormGroup;


  onSubmit(): void {
    
  }
}

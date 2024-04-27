import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { LogginRequest } from './loggin-request';

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
  constructor(private AuthService: AuthService, private router: Router){}
  ngOnInit(): void {
    this.form = new FormGroup({ 
      userName : new FormControl("", Validators.required),
      password : new FormControl("", Validators.required)
    });
  }

  form!: UntypedFormGroup;
  onSubmit(): void {
    let logginRequest : LogginRequest = <LogginRequest>{
      userName : this.form.controls["userName"].value,
      password : this.form.controls["password"].value
    };
    this.AuthService.loggin(logginRequest).subscribe(
      {
        next: result => {
          console.log(result.message);
          this.router.navigate(['/']);
        },
        error: error => console.log(error)
      }
    );
  }
}

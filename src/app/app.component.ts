import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenName = ['Quy', 'Bi'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenUsername.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onAddHobby() {
    const newFormControl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(newFormControl);
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  forbiddenUsername(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenName.indexOf(control.value) !== -1) {
      return {'forbiddenUsername': true};
    }

    return null;
  }

}

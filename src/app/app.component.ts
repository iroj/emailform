import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm, FormArray } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

interface IEmail {
  toEmails: String[],
  ccEmails: String[],
  bccEmails: String[],
  subject: string,
}
@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
  emailForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();

  }

  createForm(): void {
    this.emailForm = this.fb.group({
      toEmails: this.fb.array([], [Validators.email, Validators.required]),
      ccEmails: this.fb.array([]),
      bccEmails: this.fb.array([]),
      subject: [''],
      message: [''],
    });
  }

  add(event: MatChipInputEvent, field: string): void {
    let input = event.input;
    let value = event.value;
    // Add our requirement
    if ((value || '').trim()) {
      const requirements = this.emailForm.get(field) as FormArray;
      requirements.push(this.fb.control(value.trim()));
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(index: number, field: string): void {
    const requirements = this.emailForm.get(field) as FormArray;
    console.log(index, requirements)
    if (index >= 0) {
      requirements.removeAt(index);
    }
  }

  submitEmail() {
    console.log(this.emailForm);
  }
}

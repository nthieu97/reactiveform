import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-rform',
  templateUrl: './rform.component.html',
  styleUrls: ['./rform.component.css']
})
export class RformComponent implements OnInit {
  form:FormGroup;
  save: any;
  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      email:['hieu',[Validators.required,Validators.email]],
      password:['hieu2',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
      repassword:['hieu3',[Validators.required,Validators.minLength(6),this.confirmPass,Validators.maxLength(10)]],
      address: this.fb.array([
        ['duytan',Validators.required],
        ['hoa lac',Validators.required]
      ])
    },Validators.required);
   }
   onSubmit(){
     console.log(this.form.value);

   }
   confirmPass(control:AbstractControl):ValidationErrors{
     if(control.errors){
       return undefined;
     }
     const repass = control.value;
     const pass = control.parent?.get('password').value;
     if(pass === repass){
      return undefined;
     }
     return {repass: `${pass} and ${repass} not match`}

   }
   handleClick(){
    //  this.form.get('email').setValidators([])
     (this.form.get('address') as FormArray).push(new FormControl(this.save,Validators.required))
   }
   deleteAddress(i:number){
     this.save = (this.form.controls.address as FormArray ).controls[i].value;
    (this.form.controls.address as FormArray ).removeAt(i);
   }
  ngOnInit(): void {
  }

}

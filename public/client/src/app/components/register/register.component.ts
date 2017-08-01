import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm(); // Create Form when loaded
  }
  
  createForm() {
    this.form = this.formBuilder.group({      
      
      email: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(30), 
        this.validateEmail // Custom validation
      ])],
      
      username: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(15), 
        this.validateUsername // Custom validation
      ])],
      
      password: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(8),
        Validators.maxLength(35), 
        this.validatePassword // Custom validation
      ])],
      // Confirm Password
      confirm: ['', Validators.required] 
    }, { validator: this.matchingPasswords('password', 'confirm') }); // Custom-validator for matching passwords
  }

  
  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  
  validateEmail(controls) {
    
    // Test email 

    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);    
    if (regExp.test(controls.value)) {
      return null; // Return as valid-email
    } else {
      return { 'validateEmail': true } // Return as invalid-email
    }
  }

  
  validateUsername(controls) {
    
    // Test username 
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);    
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true } // Return as invalid username
    }
  }

  
  validatePassword(controls) {    
    // Test password 
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);    
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true } // Return as invalid password
    }
  }

  
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as do not match
      }
    }
  }

  
  onRegisterSubmit() {
    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.disableForm(); // Disable the form
    
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value, 
      password: this.form.get('password').value 
    }

    
    this.authService.registerUser(user).subscribe(data => {
      // Resposne from registration attempt
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message; 
        this.processing = false; // Re-enable submit button
        this.enableForm(); // Re-enable form
      } else {
        this.messageClass = 'alert alert-success'; 
        this.message = data.message;         
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to login view
        }, 1000);
      }
    });

  }

  // Check if e-mail is exist
  checkEmail() {
    // from authentication file to check if e-mail is taken
    this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
      // Check if success true or false was returned from API
      if (!data.success) {
        this.emailValid = false; // Return email as invalid
        this.emailMessage = data.message; // Return error message
      } else {
        this.emailValid = true; // Return email as valid
        this.emailMessage = data.message; // Return success message
      }
    });
  }

  // check if username is available
  checkUsername() {
    // Function from authentication file to check if username is taken
    this.authService.checkUsername(this.form.get('username').value).subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.usernameValid = false; // Return username as invalid
        this.usernameMessage = data.message; // Return error message
      } else {
        this.usernameValid = true; // Return username as valid
        this.usernameMessage = data.message; // Return success message
      }
    });
  }

  ngOnInit() {
  }

}

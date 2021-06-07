import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

	user: User = {
		first_name: '',
		last_name: '',
		document_number: '',
		phone_number: '',
		email: '',
		password: ''
	};

	submitted = false;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
  	const data = {
  		first_name: this.user.first_name,
  		last_name: this.user.last_name,
  		document_number: this.user.document_number,
  		phone_number: this.user.phone_number,
      email: this.user.email,
      password: this.user.password
  	}

  	this.usersService.create(data)
  		.subscribe(
  			response => {
  				console.log(response);
  				this.submitted = true;
  			},
  			error => {
  				console.log(error);
  			});
  }

  newUser(): void {
  	this.submitted = false;
  	this.user = {
  		first_name: '',
		last_name: '',
		document_number: '',
		phone_number: '',
		email: '',
		password: ''
  	};
  }

}

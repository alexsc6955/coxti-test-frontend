import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  currentUser: User = {
  	first_name: '',
  	last_name: '',
  	document_number: '',
  	phone_number: '',
  	email: ''
  };

  message = '';

  constructor(
  	private usersService: UsersService,
  	private route: ActivatedRoute,
  	private router: Router) { }

  ngOnInit(): void {
  	this.message = '';
  	this.getUser(this.route.snapshot.params.id);
  }

  getUser(id: string): void {
  	this.usersService.get(id)
  		.subscribe(
  			data => {
  				this.currentUser = data;
  				console.log(data)
  			},
  			error => {
  				console.log(error);
  			});
  }

  updateUser(): void {
    this.message = '';

    this.usersService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'El usuario fue actualizado con exito';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    this.usersService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }
}

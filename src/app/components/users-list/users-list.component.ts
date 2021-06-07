import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  email = '';

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  	this.retrieveUsers();
  }

  retrieveUsers(): void {
  	this.usersService.getAll()
  		.subscribe(
  			data => {
  				this.users = data;
  				console.log(data)
  			},
  			error => {
  				console.log(error);
  			});
  }

  refreshList(): void {
  	this.retrieveUsers();
  	this.currentUser = {};
  	this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
  	this.currentUser = user;
  	this.currentIndex = index;
  }

  removeAllUsers(): void {
  	this.usersService.deleteAll()
  		.subscribe(
  			response => {
  				console.log(response);
  				this.refreshList();
  			},
  			error => {
  				console.log(error);
  			});
  }

  searchEmail(): void {
  	this.currentUser = {};
  	this.currentIndex = -1;

  	this.usersService.findByEmail(this.email)
  		.subscribe(
  			data => {
  				console.log(data);
  			},
  			error => {
  				console.log(error);
  			});
  }

}

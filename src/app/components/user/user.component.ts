import {Component, OnInit} from '@angular/core';
import { UserService } from "../../services/user/user.service";
import { User } from "../../interfaces/users";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user.results[0];
    });
  }
}

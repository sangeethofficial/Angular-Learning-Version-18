import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  // template:`<app-learn-project></app-learn-project>`,
  styleUrl: './learn.component.css'
})
export class LearnComponent implements OnInit{

  userId:number = 10;
  userStatus:string='Offline';
  allowNewUser:boolean = false;
  userCreatedStatus='no user is created';
  userName = 'sangeeth';
  isUserCreated = false;
  users=['sangeeth', 'stark']


  Tittle = 'Learn Angular';

  constructor(){
    setTimeout(()=>{ 
      this.allowNewUser = true;
    },3000);
  }

  ngOnInit(): void {
  }
  getUserStatus(){
   return this.userStatus;
  }
  submitUser(){
    this.isUserCreated = true;
    this.users.push(this.userName)
    this.userCreatedStatus = 'user is created ';
  }
  onUpdateUser(event:Event){
    this.userName = (event.target as HTMLInputElement).value;
  }
}

import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { UserServiceInterface } from './UserServiceInterface';

@NgModule({
  providers: [
    { provide: UserServiceInterface, useClass: UserService },
  ],
})
export class UserModule {}

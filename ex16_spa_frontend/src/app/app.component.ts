import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {JsonPipe, NgForOf} from "@angular/common";
import { ApiService } from "./services/api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'spa';

  books: any[] = [];
  result = {};
  result2 = {};

  constructor(private apiSrv: ApiService) {
  }

  ngOnInit() {
    this.apiSrv.getBooks().subscribe(
      (re: any) => {

        if(re.ok) {
          // ok
          this.books = re.body.data;

          console.log(this.books);

        } else {
          this.result2 = {
            status: 'NOT success',
            data: re.statusText
          }
        }

      },
      (er: any) => {
        // not ok
        this.result2 = {
          status: 'error',
          data: er.statusText
        }
      }
    )
  }

  ngOnDestroy() {

  }


  onLogIn(btn: any){

    this.apiSrv.auth('user', 'user').subscribe(
      (re: any) => {

        if(re.ok) {
          // ok
          this.result = {
            status: 'success',
            data: 'jwt saved!'
          }

          localStorage.setItem('jwt', re.body['access_token']);

        } else {
          this.result = {
            status: 'NOT success',
            data: re
          }
        }

      },
      (er: any) => {
        // not ok
        this.result = {
          status: 'error',
          data: er
        }
      }
    );
  }

  onLogOut() {
    localStorage.removeItem('jwt');
  }
}

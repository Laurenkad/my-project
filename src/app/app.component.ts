import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, UserComponent, UserListComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-project';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDetails();
  }

  public fetchDetails(){
    this.http.get('http://localhost:3000/api-docs/#/default/get_api_persons').subscribe(
      (resp:any) => {
        console.log(resp);
      },
    );
  }
}

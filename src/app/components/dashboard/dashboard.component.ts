import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AlertifyService } from 'src/app/services/alertify.service';
import { LoadHostelAction } from 'src/app/state/store/action/hostel.action';
import { AppState } from 'src/app/state/store/reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  properties:Product[];

  loading$:Observable<boolean>;

  error$:Observable<Error>;

  category = "Pizza";

  Today = new Date();

  titles = "";

  constructor(private route:ActivatedRoute, private alertify:AlertifyService, private store:Store<AppState>) { }

  ngOnInit() {
    if(this.route.snapshot.url.toString()){
      this.category = "Other";
    }

    this.showProducts().subscribe(data =>
      this.properties = data);
    this.loading$ = this.store.select((store) => store.hostel.loading);
    this.error$ = this.store.select((store) => store.hostel.error);

    this.store.dispatch(new LoadHostelAction);
  }

  showProducts(){
    return this.store.select((store) => store.hostel.list).pipe(
      map(data => {
        const props:Product[] = [];

        for(const id in data){
          if(data.hasOwnProperty(id) && data[id].categoryName === this.category && data[id].isAvailable == true){
            props.push(data[id]);
          }
        }
        return props.reverse();
      })
    )
  }
}

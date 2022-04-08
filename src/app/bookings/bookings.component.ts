import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings?: any[];
  session = localStorage.getItem('session');
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    if (!this.session) {
      return;
    }
    this.apollo
      .watchQuery({
        query: gql`
          {
            getUserBookings {
              listing_id
              booking_id
              booking_date
              booking_start
              booking_end
              username
            }
          }
        `,
        context: { headers: new HttpHeaders().set('jwt', this.session) },
      })
      .valueChanges.subscribe((result: any) => {
        this.bookings = result?.data?.getUserBookings;
      });
  }
}

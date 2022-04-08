import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { NgModel } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
})
export class AddBookingComponent implements OnInit {
  start?: NgModel;
  end?: NgModel;
  session = localStorage.getItem('session');

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  addBooking(): void {
    if (!this.session) {
      return;
    }
    this.apollo
      .mutate({
        mutation: gql`
          mutation addBooking(
            $listing_id: String
            $booking_id: String
            $booking_date: String
            $booking_start: String
            $booking_end: String
            $username: String
          ) {
            addBooking(
              listing_id: $listing_id
              booking_id: $booking_id
              booking_date: $booking_date
              booking_start: $booking_start
              booking_end: $booking_end
              username: $username
            )
          }
        `,
        variables: {
          listing_id: this.route.snapshot.paramMap.get('id'),
          booking_id: 'B' + (Math.random() * 100000).toString(),
          booking_date: new Date().toString(),
          booking_start: this.start,
          booking_end: this.end,
          username: localStorage.getItem('username'),
        },
        context: { headers: new HttpHeaders().set('jwt', this.session) },
      })
      .subscribe(() => {
        window.location.reload();
      });
  }
}

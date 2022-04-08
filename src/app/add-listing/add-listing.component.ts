import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css'],
})
export class AddListingComponent implements OnInit {
  title?: NgModel;
  description?: NgModel;
  street?: NgModel;
  city?: NgModel;
  postal_code?: NgModel;
  price?: NgModel;
  session = localStorage.getItem('session');

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}

  addListing(): void {
    if (!this.session) {
      return;
    }
    this.apollo
      .mutate({
        mutation: gql`
          mutation addListing(
            $listing_id: String
            $listing_title: String
            $description: String
            $street: String
            $city: String
            $postal_code: String
            $price: Float
            $email: String
          ) {
            addListing(
              listing_id: $listing_id
              listing_title: $listing_title
              description: $description
              street: $street
              city: $city
              postal_code: $postal_code
              price: $price
              email: $email
            )
          }
        `,
        variables: {
          listing_id: (Math.random() * 100000).toString(),
          listing_title: this.title,
          description: this.description,
          street: this.street,
          city: this.city,
          postal_code: this.postal_code,
          price: this.price,
          email: localStorage.getItem('email'),
        },
        context: { headers: new HttpHeaders().set('jwt', this.session) },
      })
      .subscribe(() => {
        window.location.reload();
      });
  }
}

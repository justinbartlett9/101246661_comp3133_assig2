import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css'],
})
export class ListingsComponent implements OnInit {
  listings?: any[];
  username = localStorage.getItem('username');
  user_type = localStorage.getItem('user_type');
  session = localStorage.getItem('session');
  title = 'Current Listings';

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getListings {
              listing_id
              listing_title
              description
              street
              city
              postal_code
              price
              email
              username
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.listings = result?.data?.getListings;
      });
  }

  searchListings(search?: NgForm): void {
    let query;
    if (!search) {
      query = '';
    } else {
      query = search.form.controls['query'].value;
    }
    this.title = 'Current Listings';

    this.apollo
      .watchQuery({
        query: gql`
          query searchListings($query: String) {
            searchListings(query: $query) {
              listing_id
              listing_title
              description
              street
              city
              postal_code
              price
              email
              username
            }
          }
        `,
        variables: { query: query },
      })
      .valueChanges.subscribe((result: any) => {
        this.listings = result?.data?.searchListings;
      });
  }

  myListings(): void {
    if (!this.session) {
      console.log('user not found');
      return;
    } else {
      this.title = 'My Listings';
      this.apollo
        .watchQuery({
          query: gql`
            {
              getAdminListings {
                listing_id
                listing_title
                description
                street
                city
                postal_code
                price
                email
                username
              }
            }
          `,
          context: { headers: new HttpHeaders().set('jwt', this.session) },
        })
        .valueChanges.subscribe((result: any) => {
          this.listings = result?.data?.getAdminListings;
        });
    }
  }
}

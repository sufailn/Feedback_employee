// src/app/review/review.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  standalone:false,
})
export class ReviewComponent implements OnInit {
  reviewForm: FormGroup;
  reviews: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.reviewForm = this.fb.group({
      reviewee: ['', Validators.required],
      feedback: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    this.http.get('http://localhost:5000/api/reviews')
      .subscribe((data: any) => {
        this.reviews = data;
      }, error => {
        console.error(error);
      });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser && currentUser) {
        const reviewData = {
          reviewer: currentUser,
          reviewee: this.reviewForm.value.reviewee,
          feedback: this.reviewForm.value.feedback
        };

        this.http.post('http://localhost:5000/api/reviews', reviewData)
          .subscribe((response: any) => {
            alert('Review submitted successfully');
            this.loadReviews();
          }, error => {
            console.error(error);
            alert('An error occurred while submitting the review');
          });
      } else {
        alert('User not logged in');
      }
    }
  }
}
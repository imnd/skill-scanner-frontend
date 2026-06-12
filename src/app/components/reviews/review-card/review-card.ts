import { Component, Input } from '@angular/core';
import { SchoolReview } from '@/store/school-reviews/school-reviews.model';
import moment from 'moment'

@Component({
  selector: 'app-review-card',
  imports: [],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class ReviewCard {
  @Input({ required: true }) review!: SchoolReview;

  maxBodyLength = 162;
  isFullTextShown = false;

  get isMaxBodyLengthExceeded () {
    return this.review.text.length > this.maxBodyLength
  }
  get croppedBody () {
    return this.review.text.slice(0, this.maxBodyLength).trimRight() + '...'
  }
  get userFullName () {
    return `${this.review.user.firstName} ${this.review.user.lastName}`.trim()
  }
  get reviewDate () {
    return moment(this.review.createdAt).format('DD.MM.YYYY')
  }
  get positiveReviewRating (): number[] {
    return this.reviewRating()
  }
  get negativeReviewRating (): number[] {
    return this.reviewRating(5)
  }

  private reviewRating(minus: number = 0): number[] {
    const rating = parseInt(this.review.rating.toString()) || 0 - minus;
    let reviewRating = [];
    for (let i = 1; i <= rating; i++) {
      reviewRating.push(i);
    }
    return reviewRating
  }
}

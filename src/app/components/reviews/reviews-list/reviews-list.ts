import { Component, ViewChild, ElementRef, inject, OnInit, effect } from '@angular/core';
import { ReviewCard } from '@/components/reviews/review-card/review-card';
import { schoolReviewsFeature } from '@/store/school-reviews/school-reviews.reducer';
import { SchoolReviewsActions } from '@/store/school-reviews/school-reviews.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-reviews-list',
  imports: [ReviewCard],
  templateUrl: './reviews-list.html',
  styleUrl: './reviews-list.scss',
})
export class ReviewsList implements OnInit {
  currentIndex = 0

  private store = inject(Store);
  lastReviews = this.store.selectSignal(schoolReviewsFeature.selectAll);
  itemsCount = this.store.selectSignal(schoolReviewsFeature.selectTotal);

  ngOnInit() {
    this.store.dispatch(SchoolReviewsActions.getLastReviews());
  }

  @ViewChild('list') list!: ElementRef;
  handleControl(direction: 'right' | 'left') {
    const windowWidth = window.innerWidth

    let multiplier = 1
    multiplier = windowWidth >= 768 ? 2 : multiplier
    multiplier = windowWidth >= 1440 ? 3 : multiplier

    this.currentIndex += direction === 'right' ? multiplier : -multiplier

    if (this.currentIndex >= this.itemsCount()) {
      this.currentIndex = 0
    } else if (this.currentIndex < 0) {
      this.currentIndex = this.itemsCount() - multiplier
    }

    this.list.nativeElement.style['transform'] = `translateX(calc(-${this.currentIndex / multiplier * 100}%))`
  };
}

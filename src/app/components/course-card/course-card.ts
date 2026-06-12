import { Component, Input, OnInit } from '@angular/core';
import { Course } from '@/app/store/courses/courses.model';
import { School } from '@/app/store/schools/schools.model';
import { environment } from '@/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
})
export class CourseCard implements OnInit {
  cdnUrl = environment.cdnUrl;
  @Input() course?: Course;
  @Input() school?: School | null;
  isDetailsShowed: boolean = false;

  priceWithoutDiscount = () => {
    const price = this.course?.price || null

    return this.formatPrice(price)
  }

  creditPriceWithoutDiscount () {
    const price = this.course?.creditPrice || null

    return this.formatPrice(price)
  }

  formatPrice (price: number | string | null): string {
    if (price === null) {
      return ''
    }

    const intPrice = parseInt(price.toString());
    if (!intPrice) {
      return ''
    }

    return intPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDetailsShowed = window.innerWidth > 1440
    }
  }
}

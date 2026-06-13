import { Component, Input } from '@angular/core';
import { School } from '@/store/schools/schools.model';
import { environment } from '@/environments/environment';

@Component({
  selector: 'app-school-card',
  imports: [],
  templateUrl: './school-card.html',
  styleUrl: './school-card.scss',
})
export class SchoolCard {
  @Input({ required: true }) school!: School;

  get redirectUrl () {
    return environment.redirectUrl
  }
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-top',
  imports: [ RouterLink ],
  templateUrl: './menu-top.html',
  styleUrl: './menu-top.scss',
})
export class MenuTop {
  isOpen = false
  list = [
    {
      name: 'Категории',
      route: '/courses-categories',
    },
    {
      name: 'Курсы',
      route: '/courses',
    },
    {
      name: 'Школы',
      route: '/schools',
    },
    {
      name: 'Акции школ',
      route: '/sales',
    },
    {
      name: 'Блог',
      route: '/posts',
    },
  ]
}

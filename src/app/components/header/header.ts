import { Component } from '@angular/core';
import { Logo } from '../logo/logo';
import { MenuTop } from '../menu-top/menu-top';

@Component({
  selector: 'app-header',
  imports: [ Logo, MenuTop ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {}

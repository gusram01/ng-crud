import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-one',
  templateUrl: './button-one.component.html',
  styleUrls: ['./button-one.component.css'],
})
export class ButtonOneComponent implements OnInit {
  @Input() text: string;
  @Input() route: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goTo(): void {
    this.router.navigate([this.route]);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHero } from '../../../models/hero.model';
import { HerosService } from '../../../services/heros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  live = true;
  hero: IHero;
  loading = false;
  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private heroService: HerosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.createHero();
    this.listener();
  }

  createHero(): void {
    this.heroForm = this.fb.group({
      id: ['Firebase_ID', Validators.required],
      name: ['', Validators.required],
      power: [''],
      tools: [''],
      live: [true, Validators.required],
    });
  }

  listener(): void {
    this.heroForm.valueChanges.subscribe((resp) => (this.hero = resp));
  }

  changeLive(): void {
    this.live = !this.live;
    this.heroForm.get('live').setValue(this.live);
  }

  save(): void {
    if (this.heroForm.invalid || this.heroForm.pristine) {
      return;
    }
    Swal.fire({
      title: 'Please Wait',
      text: 'Loading...',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    this.loading = true;
    this.heroService.upsertHero(this.hero).subscribe(
      (resp) => {
        this.hero = resp;
        this.heroForm.reset(resp);
        this.router.navigateByUrl(`/hero/${resp.id}`);
        Swal.fire({
          title: 'Success',
          icon: 'success',
          confirmButtonText: 'Close',
        });
      },
      (err) => {
        Swal.fire({
          title: 'Error',
          text: 'Please try again' + err.message,
          icon: 'error',
        });
      }
    );
  }

  ngOnInit(): void {
    const param = this.activatedRoute.snapshot.params.id;
    this.heroService.getHero(param).subscribe((resp) => {
      if (!resp) {
        this.hero = undefined;
        this.heroForm.reset({ id: 'Firebase_id', live: true });
      } else {
        this.hero = {
          ...resp,
          id: param,
        };
        this.live = this.hero.live;
        this.heroForm.reset(this.hero);
      }
    });
  }
}

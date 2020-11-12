import { Component, OnInit } from '@angular/core';
import { IHero } from '../../../models/hero.model';
import { HerosService } from '../../../services/heros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
})
export class HerosComponent implements OnInit {
  loading = true;
  heros: IHero[];

  constructor(private heroService: HerosService) {}

  ngOnInit(): void {
    this.heroService.getHeros().subscribe(
      (resp) => {
        this.heros = resp;
        this.loading = false;
      },
      (err) => (this.loading = false)
    );
  }

  dropHero(hero: IHero): void {
    Swal.fire({
      title: `You will erase ${hero.name}`,
      text: 'Are you sure?...',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Proceed',
      confirmButtonColor: 'red',
      cancelButtonColor: 'gray',
      cancelButtonText: 'No delete',
    }).then((res) => {
      if (res.value) {
        this.heroService.deleteHero(hero.id).subscribe((resp) => {
          this.heros = this.heros.filter((data: IHero) => data.id !== hero.id);
        });
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHero } from '../models/hero.model';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HerosService {
  private url = 'https://nglogingus.firebaseio.com';

  constructor(private http: HttpClient) {}

  getHeros(): Observable<any> {
    return this.http.get(`${this.url}/heros.json`).pipe(
      map((data: any) =>
        Object.keys(data).map((key) => {
          return {
            ...data[key],
            id: key,
          };
        })
      ),
      delay(1000)
    );
  }

  getHero(id: string): Observable<any> {
    return this.http.get(`${this.url}/heros/${id}.json`);
  }

  upsertHero(hero: IHero): Observable<IHero> {
    if (hero.id.trim().toLowerCase().includes('firebase')) {
      return this.newHero(hero);
    }

    return this.editHero(hero);
  }

  newHero(hero: IHero): Observable<any> {
    return this.http.post(`${this.url}/heros.json`, hero).pipe(
      map((resp: any) => {
        hero.id = resp.name;
        return hero;
      })
    );
  }
  editHero(hero: IHero): Observable<any> {
    const heroTemp = { ...hero };
    delete heroTemp.id;
    return this.http.put(`${this.url}/heros/${hero.id}.json`, heroTemp).pipe(
      map((resp: any) => {
        return {
          ...resp,
          id: hero.id,
        };
      })
    );
  }
  deleteHero(id: string): Observable<any> {
    return this.http.delete(`${this.url}/heros/${id}.json`);
  }
}

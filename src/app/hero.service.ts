import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service'
@Injectable({
  //Service is provided in root.
  providedIn: 'root'
})
export class HeroService {
  constructor(private messageService: MessageService, private http:HttpClient) { }
  //URL in the form of :base/:collection
  //base is where requests are brought, collection is the data object (in in-memory-data-service.ts)
  private heroesUrl = 'api/heroes';

  getHeroes() : Observable<Hero[]>{
    const heroes = of(HEROES);
    //the HttpClient gets a hero array located at api/heroes in the form of an Observable
    //By default, untyped JSON file is returned by get.
    //Data api determines JSON file shape.
    //handleError handles failed observables
    return this.http.get<Hero[]>(this.heroesUrl).pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
    //return heroes;
  }
  //Observable:
  //
  getHero(id:number) : Observable<Hero>{
    //The ! at the end asserts there is no undefined value incoming.
    /*Predicate syntax below. If using anonymous function syntax parentheses around parameters, 
    brackets around body, fails.*/
    const h = HEROES.find( hero => hero.id === id )!;
    console.log(h);
    this.log(`HeroService: fetched hero id=${id}`);
    return of(h); 
    
  }
  handleError<T>(operation = 'operation', result?: T){
    return (error:any): Observable<T> => {
      console.error(error);
      //Use of special `` (backticks) to define a string template
      //String template is a string where anything with ${x} is substituted for a fully evaluated x.
      this.log(`${operation} failed: ${error.message}`);
      //Harmless result, could be used for components using this service to handle.
      return of(result as T);
    }

  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}

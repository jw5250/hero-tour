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
  //Collection is the name of the variable defined in the creatDb function
  private heroesUrl = 'api/heroes';
  //Headers of the http client request.
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

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
  //HTTP GET command
  getHeroes() : Observable<Hero[]>{
    const heroes = of(HEROES);
    //the HttpClient gets a hero array located at api/heroes in the form of an Observable
    //By default, untyped JSON file is returned by get.
    //Data api determines JSON file shape.
    //pipe moves observable data into some other function.
    //tap allows observable to remain the same but change outside data (?)
      // underscore(_) is a substitute for ()
    //handleError handles failed observables

    return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(()=>this.log('fetched heroes')),
    catchError(this.handleError<Hero[]>('getHeroes', []))
    );
    //return heroes;
  }
  //HTTP GET command
  getHero(id:number) : Observable<Hero>{
    //The ! at the end asserts there is no undefined value incoming.
    /*Predicate syntax below. If using anonymous function syntax parentheses around parameters, 
    brackets around body, fails.*/
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(tap( () => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`)));

    /*const h = HEROES.find( hero => hero.id === id )!;
    console.log(h);
    this.log(`HeroService: fetched hero id=${id}`);
    return of(h);*/
    
  }
  //HTTP POST command
  addHero(hero:Hero){
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(()=> this.log(`added hero w/ id=${hero.id}`), catchError(this.handleError<Hero>(`addHero`))));
    
  }
  //HTTP PUT command
  updateHero(hero: Hero) : Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => this.log(`updated hero id= ${hero.id}`)), catchError(this.handleError<any>('updateHero')));
  }
  //HTTP DELETE command
  deleteHero(id: number) : Observable<Hero>{

    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe( 
        tap(() => this.log(`deleted hero id =${id}`)),
        catchError(this.handleError<Hero>('deleteHero')));
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}

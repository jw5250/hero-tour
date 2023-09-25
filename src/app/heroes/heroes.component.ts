//Component keyword is exported into angular.
import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
//Specifies metadata considering the component
@Component({
  selector: 'app-heroes',//the element selector for the css and html of another component to use
  templateUrl: './heroes.component.html',//reference to the html location
  styleUrls: ['./heroes.component.css']//Reference to the css location
})
export class HeroesComponent {
  //SelectedHero is marked to not require intialization
  heroes : Hero[] = [];

  constructor(private service: HeroService, private mService : MessageService){

  }
  ngOnInit(): void {
    this.getHeroes();
  }

  add(name:string): void{
    //Removes whitespace from start and end of string
    name = name.trim();
    if(!name){return;}
    this.service.addHero({ name } as Hero).subscribe( (hero) => {this.heroes.push(hero)});
  }

  getHeroes(): void {
    //subscribe takes callback as an argument, uses observable as a parameter.
    this.service.getHeroes().subscribe( (heroes) => {this.heroes = heroes});
    console.log(this.heroes);
  }
  //Issue: Html button
  delete(heroChoosen:Hero):void{
    this.heroes = this.heroes.filter(h => h !== heroChoosen);
    //Subscription is needed for handling all observables.
    this.service.deleteHero(heroChoosen.id).subscribe();
  }
}
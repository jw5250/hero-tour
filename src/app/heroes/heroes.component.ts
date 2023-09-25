//Component keyword is exported into angular.
import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
//Specifies metadata considering the component
@Component({
  selector: 'app-heroes',//the element selector for the css and html of another component to use
  templateUrl: './heroes.component.html',//reference to the html location
  styleUrls: ['./heroes.component.css']//Reference to the css location
})
export class HeroesComponent {
  //SelectedHero is marked to not require intialization
  constructor(private service: HeroService){

  }
  ngOnInit(): void {
    this.getHeroes();
  }
  selectedHero?: Hero;
  heroes : Hero[] = [];

  getHeroes(): void {
    //subscribe takes callback as an argument, uses observable as a parameter.
    this.service.getHeroes().subscribe( (heroes) => {this.heroes = heroes});
  }
}
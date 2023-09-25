import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})


export class HeroDetailComponent {

  
  @Input() hero ?: Hero;//Denote hero is an input

  ngOnInit(): void {
    this.getHero();
  }

  constructor(private loc :Location, private r:ActivatedRoute, private hService :HeroService){}

  getHero():void{
    console.log("Found hero!");
    const id = Number(this.r.snapshot.paramMap.get('id'));
    this.hService.getHero(id).subscribe( (hero) => {this.hero = hero;});
  }

  save():void{
    if(this.hero != undefined){
      this.hService.updateHero(this.hero).subscribe(()=>this.goBack());
    }
  }

  goBack():void{
    this.loc.back();
  }
}

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
  ngOnInit(): void {
    this.getHero();
  }
  
  @Input() hero ?: Hero;
  constructor(private loc :Location, private r:ActivatedRoute, private hService :HeroService){}
  getHero():void{
    const id = Number(this.r.snapshot.paramMap.get('id'));
    this.hService.getHero(id).subscribe( (hero) => {this.hero = hero});
  }
  goBack():void{
    this.loc.back();
  }
}

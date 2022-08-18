import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchor: number;
  @Input('etiquetas') captions: boolean;
  @Output() conseguirAutor = new EventEmitter(true);

  public autor: any;

  constructor() { 
    this.anchor = 0;
    this.captions = false;
    this.autor = {
      nombre: "Gatito Espacial",
      webside: "GatitoWeb.com",
      youtube: "GatitoEspacialReview"
    };
  }

  ngOnInit() {
    $("#logo").on("click", (e: any) => {
      e.preventDefault();
      $("header").css("background", "pink")
        .css("height", "50px");
    });

    ($(".galeria") as any).bxSlider({
      mode: 'fade',
      captions:this.captions,
      slideWidth: this.anchor,
      wrapperClass: "bx-wrapper slider-contenedor"
    })

  }

  lanzar(event: any){
    
    this.conseguirAutor.emit(this.autor);
  }

}

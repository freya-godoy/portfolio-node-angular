import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public widthSlider: number;
  public anchorToSlider: number;
  public captions: boolean;
  public autor: any;
  @ViewChild('textos', {static: true}) textos:any;

  constructor() {
    this.widthSlider = 0;
    this.anchorToSlider = 0;
    this.captions = false;

  }

  ngOnInit() {
    let opcion_clasica = document.querySelector('#texto')?.innerHTML;
    //console.log(this.textos.nativeElement.textContent);
    // $("#logo").on("click", (e: any) => {
    //   e.preventDefault();
    //   $("header").css("background", "pink")
    //     .css("height", "50px");
    // });

    // Como typescript no reconoce al metodo .bxSlider como parte de JQuery, se especifica que el resultado de $(".galeria") es de tipo any. Si no hacemos esto se genera un error.
    // ($(".galeria") as any).bxSlider({
    //     mode: 'fade',
    //     captions: true,
    //     slideWidth: 400,
    //     wrapperClass: "bx-wrapper slider-contenedor"
  }

  cargarSlider() {

    this.anchorToSlider = this.widthSlider;
  }

  resetearSlider() {
    this.anchorToSlider = 0;
  }

  getAutor(event: any) {
    this.autor = event;
  }

}


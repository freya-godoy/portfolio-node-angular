import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#logo").on("click", (e: any) => {
      e.preventDefault();
      $("header").css("background", "pink")
        .css("height", "50px");
    });

    // Como typescript no reconoce al metodo .bxSlider como parte de JQuery, se especifica que el resultado de $(".galeria") es de tipo any. Si no hacemos esto se genera un error.
    ($(".galeria") as any).bxSlider({
        mode: 'fade',
        captions: true,
        slideWidth: 400,
        wrapperClass: "bx-wrapper slider-contenedor"
      })

  }

}

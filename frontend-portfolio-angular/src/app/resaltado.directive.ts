import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(public el: ElementRef) {

  }

  ngOnInit() {

    let element = this.el.nativeElement;
    element.style.background = "pink";
    element.style.padding = "15 px";

    element.innerText = element.innerText.toUpperCase().replace("CONTACTO", "info");

  }

}

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appStars]'
})
export class StarsDirective {

 
  constructor(private element: ElementRef) { }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }
  private highlight(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }

}

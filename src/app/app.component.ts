import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

    // ----------------------- Method 1
  show1 = false;
  clickButton1() {
    this.show1 = !this.show1;
  }
  clickedOutside1(): void {
    this.show1 = false;
  }

    // ----------------------- Method 2
  show2 = false;
  clickButton2() {
    this.show2 = !this.show2;
  }
  clickedOutside2(): void {
    this.show2 = false;
  }


  // ----------------------- Method 3

  wasInside = false;
  show3 = false;

  // Inside
  clickButton3() {
    this.wasInside = true;
    this.show3 = !this.show3;
  }

  // Hijo Inside
  @HostListener('click')
  clickInside() {
    if (this.show3 == true) {
      this.show3 = true;
    }
    this.wasInside = true;
  }

  // Outside
  @HostListener('document:click')
  clickOut() {
    if (!this.wasInside) {
      this.show3 = false;
    }
    this.wasInside = false;
  }
}

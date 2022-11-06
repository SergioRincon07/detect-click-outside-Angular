
<div align='center'>
  <img height="60" src="https://angular.io/assets/images/logos/angular/logo-nav@2x.png">
  <h1>Three Ways to Detect Click Outside</h1>

  <i> This project is a collection of code from different sources, 
      where you will learn how to detect when clicked outside of target component.
  </i>
  
  <sup>If you liked or learn something, leave your like :star:.</sup>

  <strong>Linkedin</strong>: [Linkedin/Sergio](https://www.linkedin.com/in/sergio-david-rincon-murcia/)<br />
</div>

---

## Index

- [Index](#index)
  - [Project Information](#project-information)
  - [Method 1](#method-1)
  - [Method 2](#method-2)
  - [Method 3](#method-3)

---

### Project Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

For component creation use Standalone Component the same way for Directives

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Method 1

The first method will need to create one directive for listens when clicking outside the component. 

The code for create that directive is the next:

```ts
import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appClickOutsideMethod1]',
  standalone: true,
})
export class ClickOutsideMethod1Directive {
  @Output() public clickOutside = new EventEmitter();

  constructor(private ref: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.ref.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
```

For this case the application will be in the app component, in the HTML will create a section whit one button and one div, how its work is very simple, when clicked in the button the content of div wiil be show or not depent of the state `Show1`, but when clicket outside target, in this case the div whit the directive, the content of the second div wiil hidden.

```html
<div appClickOutsideMethod1 (clickOutside)="clickedOutside1()">
  <button (click)="clickButton1()">Methot 1</button>
  <div class="something" *ngIf="show1">
    something 1
  </div>
</div>
```

The logic of method 1 is the next. When clicked the button change the state like a toggle, but when clicked outside the component to state `Show1` will be false.

```ts
show1 = false;
clickButton1() {
  this.show1 = !this.show1;
}
clickedOutside1(): void {
  this.show1 = false;
}
```

**[⬆ Return to Index](#Index)**
### Method 2

The second method is a bit complex compared to the previous one but it is a beautiful solution. I found this solution browsing youtube, the next video [Angular Dropdown Menu Close On Click Outside](https://www.youtube.com/watch?v=8a6R2P9YqGY) created by Monsterlessons Academy shows you how he thought of the solution using a directive.

```ts
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appClickOutsideMethod2]',
  standalone: true,
})
export class ClickOutsideMethod2Directive implements AfterViewInit, OnDestroy {
  @Output() clickOutside = new EventEmitter<void>();

  documentClickSubscription: Subscription | undefined;

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click')
      .pipe(
        filter(event => {
          return !this.isInside(event.target as HTMLElement);
        })
      )
      .subscribe(() => {
        this.clickOutside.emit();
      });
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
    console.log('OnDestroy');
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }
}
```

The operation is the same logic as before, so the HTML and the logic is the same as before.

```html
<div appClickOutsideMethod2 (clickOutside)="clickedOutside2()">
  <button (click)="clickButton2()">Methot 2</button>
  <div class="something" *ngIf="show2">
    something 2
  </div>
</div>
```
```ts
show2 = false;
clickButton2() {
  this.show2 = !this.show2;
}
clickedOutside2(): void {
  this.show2 = false;
}
```

**[⬆ Return to Index](#Index)**
### Method 3

The final method is a bit more rustic because all the logic is in the component and not in a directive. the problem with doing it this way is that the target is all the HTML of that component, so when we want them to do what their predecessors did, it won't work the same way because the target changed. I share this solution if see in your project one aplication

```html
<div class="flex-container">
  <div appClickOutsideMethod1 (clickOutside)="clickedOutside1()">
    <button (click)="clickButton1()">Methot 1</button>
    <div class="something" *ngIf="show1">
      something 1
    </div>
  </div>

  <div appClickOutsideMethod2 (clickOutside)="clickedOutside2()">
    <button (click)="clickButton2()">Methot 2</button>
    <div class="something" *ngIf="show2">
      something 2
    </div>
  </div>

  <div>
    <button (click)="clickButton3()">Methot 3</button>
    <div class="something" *ngIf="show3">
      something 3
    </div>
  </div>
</div>
```

```ts
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
```

**[⬆ Return to Index](#Index)**


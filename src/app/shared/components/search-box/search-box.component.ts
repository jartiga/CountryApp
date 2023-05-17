import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @ViewChild('txtInput')
  public txtInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';
  @Input()
  public initialValue: string = '';


  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {

    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe( value => {
        this.onValue.emit(value);
      });
  }

  emitValue() {
    const value = this.txtInput.nativeElement.value;
    this.onValue.emit(value);
  }

  onKeyPress(seachTerm: string):void {
    this.debouncer.next(seachTerm);
  }

  ngOnDestroy(): void {
      this.debouncerSuscription?.unsubscribe();
  }



}

import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {
  @Input() text!: string;
  @Output() addClickEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public addClick() {
    this.addClickEvent.emit();
  }

}

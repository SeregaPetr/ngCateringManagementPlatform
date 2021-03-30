import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent implements OnInit {
  @Output() editClickEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public editClick() {
    this.editClickEvent.emit();
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalTitle!: string;
  @Output() closeClickEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public closeClick() {
    this.closeClickEvent.emit();
  }
}

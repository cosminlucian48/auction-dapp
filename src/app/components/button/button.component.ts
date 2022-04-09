import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  
  @Input() label="";

  @Output() onButtonClick: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
  }

  handleButtonClick() {
    
    this.onButtonClick.emit();
  }

}

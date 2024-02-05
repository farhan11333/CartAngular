import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cartitems',
  standalone: true,
  imports: [],
  templateUrl: './cartitems.component.html',
  styleUrl: './cartitems.component.scss'
})
export class CartitemsComponent {
  @Input() cartItem: any; // Replace with your actual cart item type
  @Output() minusClick = new EventEmitter<void>();
  @Output() plusClick = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<void>();

  handleMinusClick() {
    this.minusClick.emit();
  }

  handlePlusClick() {
    this.plusClick.emit();
  }

  handleDeleteItem() {
    this.deleteItem.emit();
  }
}

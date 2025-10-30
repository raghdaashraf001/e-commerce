import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-card-name-view',
  imports: [],
  templateUrl: './card-name-view.html',
  styleUrl: './card-name-view.css',
})
export class CardNameView {
  @Input() name!: string;
  @Input() imageUrl!: string;
}

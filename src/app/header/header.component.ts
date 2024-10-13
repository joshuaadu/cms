import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderUserMenuComponent } from "./header-user-menu/header-user-menu.component";

@Component({
  selector: 'cms-header',
  standalone: true,
  imports: [HeaderUserMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    // console.log(selectedEvent);
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}

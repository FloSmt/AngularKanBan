import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  openEditPriorityWindow() {
    const modalElement = document.getElementById('editpriority');
    if (modalElement) {
      modalElement.style.display = 'flex';
    }
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Property } from '../../services/property';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css'
})
export class PropertyCardComponent {
  @Input() property!: Property;

  shareProperty(event: Event) {
    event.preventDefault(); // Prevent navigating to detail if inside anchor
    event.stopPropagation();

    const url = window.location.origin + '/property/' + this.property.id;

    if (navigator.share) {
      navigator.share({
        title: this.property.title,
        text: 'Check out this property on MKB Developers',
        url: url
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  }
}

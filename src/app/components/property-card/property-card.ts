import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  private sanitizer = inject(DomSanitizer);
  videoLoaded: boolean = false;
  isPlaying: boolean = false;

  getSafeUrl(url: string | undefined): SafeResourceUrl | null {
    if (!url) return null;
    let autoplayUrl = url;
    if (autoplayUrl.includes('?')) {
      autoplayUrl += '&autoplay=1';
    } else {
      autoplayUrl += '?autoplay=1';
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(autoplayUrl);
  }

  getYoutubeThumbnail(url: string | undefined): string | null {
    if (!url) return null;
    const match = url.match(/embed\/([^?]+)/);
    if (match && match[1]) {
      // Using maxresdefault to try and avoid huge black bars if possible,
      // mostly we use hqdefault which acts as a fantastic failover in some cases
      // wait, hqdefault ALWAYS exists for all videos. Let's strictly use it and zoom CSS to crop it.
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return null;
  }

  playVideo(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isPlaying = true;
  }

  onVideoLoad() {
    this.videoLoaded = true;
  }

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

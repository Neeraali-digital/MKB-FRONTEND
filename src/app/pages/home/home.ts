import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService, Property } from '../../services/property';
import { PropertyCardComponent } from '../../components/property-card/property-card';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  featuredProperties: Property[] = [];
  ongoingProjects: Property[] = [];
  completedProjects: Property[] = [];

  private sanitizer = inject(DomSanitizer);

  reviews = [
    {
      name: 'Rahul Sharma',
      location: 'Bangalore',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder, using common video
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      name: 'Priya Nair',
      location: 'Kerala',
      videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      youtubeId: 'jNQXAC9IVRw'
    },
    {
      name: 'Michael Chen',
      location: 'Dubai',
      videoUrl: 'https://www.youtube.com/embed/YykjPeFlK80',
      youtubeId: 'YykjPeFlK80'
    },
    {
      name: 'Anish Kumar',
      location: 'Bangalore',
      videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY',
      youtubeId: 'tgbNymZ7vqY'
    },
    {
      name: 'Sarah George',
      location: 'Mysore',
      videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
      youtubeId: '9bZkp7q19f0'
    },
    {
      name: 'David Wilson',
      location: 'Dubai',
      videoUrl: 'https://www.youtube.com/embed/C0DPdy98e4c',
      youtubeId: 'C0DPdy98e4c'
    }
  ];

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  activeReviewIndex = 0;

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.propertyService.getProperties().subscribe(data => {
      this.ongoingProjects = data.filter(p => p.projectStatus === 'Ongoing');
      this.completedProjects = data.filter(p => p.projectStatus === 'Completed');
      this.featuredProperties = data.filter(p => p.isFeatured);
    });

    // Auto-slide reviews
    setInterval(() => {
      const isDesktop = window.innerWidth > 992;
      const maxIndex = isDesktop ? this.reviews.length - 3 : this.reviews.length - 1;

      if (this.activeReviewIndex >= maxIndex) {
        this.activeReviewIndex = 0;
      } else {
        this.activeReviewIndex++;
      }
    }, 5000);
  }

  setReview(index: number) {
    this.activeReviewIndex = index;
  }

  getTransform() {
    const isDesktop = window.innerWidth > 992;
    if (isDesktop) {
      // Move by (item_width + gap)
      // item_width = (100% - 60px) / 3
      // gap = 30px
      // distance = (33.33% - 20px) + 30px = 33.33% + 10px
      return `translateX(calc(-${this.activeReviewIndex} * ((100% - 60px) / 3 + 30px)))`;
    }
    return `translateX(-${this.activeReviewIndex * 100}%)`;
  }
}

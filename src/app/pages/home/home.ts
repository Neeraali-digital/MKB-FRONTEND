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
      videoUrl: 'https://www.youtube.com/embed/5X6x9xY-B28',
      youtubeId: '5X6x9xY-B28'
    },
    {
      name: 'Priya Nair',
      location: 'Kerala',
      videoUrl: 'https://www.youtube.com/embed/qI_2QfT7u7o',
      youtubeId: 'qI_2QfT7u7o'
    },
    {
      name: 'Michael Chen',
      location: 'Dubai',
      videoUrl: 'https://www.youtube.com/embed/3jG5yB-B0lI',
      youtubeId: '3jG5yB-B0lI'
    },
    {
      name: 'Anish Kumar',
      location: 'Bangalore',
      videoUrl: 'https://www.youtube.com/embed/7X8m-T0fF-4',
      youtubeId: '7X8m-T0fF-4'
    },
    {
      name: 'Sarah George',
      location: 'Mysore',
      videoUrl: 'https://www.youtube.com/embed/8G_8Y_Y-X8s',
      youtubeId: '8G_8Y_Y-X8s'
    },
    {
      name: 'David Wilson',
      location: 'Dubai',
      videoUrl: 'https://www.youtube.com/embed/yxC6PNoi6M8',
      youtubeId: 'yxC6PNoi6M8'
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
      const maxIndex = isDesktop ? this.reviews.length - 4 : this.reviews.length - 1;

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
      // item_width = (100% - 90px) / 4
      // gap = 30px
      return `translateX(calc(-${this.activeReviewIndex} * ((100% - 90px) / 4 + 30px)))`;
    }
    return `translateX(-${this.activeReviewIndex * 100}%)`;
  }
}

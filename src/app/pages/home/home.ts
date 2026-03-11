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
      videoUrl: 'https://www.youtube.com/embed/yrhpHTvA8kE',
      youtubeId: 'yrhpHTvA8kE'
    },
    {
      name: 'Priya Nair',
      location: 'Kerala',
      videoUrl: 'https://www.youtube.com/embed/7xMXjt3o51Y',
      youtubeId: '7xMXjt3o51Y'
    },
    {
      name: 'Anish Kumar',
      location: 'Bangalore',
      videoUrl: 'https://www.youtube.com/embed/WAwEnJha7qo',
      youtubeId: 'WAwEnJha7qo'
    },
    {
      name: 'Sarah George',
      location: 'Mysore',
      videoUrl: 'https://www.youtube.com/embed/QMr8xKZDor8',
      youtubeId: 'QMr8xKZDor8'
    },
    {
      name: 'Michael Chen',
      location: 'Dubai',
      videoUrl: 'https://www.youtube.com/embed/lg-N6cY1jXw',
      youtubeId: 'lg-N6cY1jXw'
    }
  ];

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  activeReviewIndex = 0;

  activeHeroIndex = 0;
  heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
      titleHighlight: 'Luxury Villa Plots',
      subtitle: 'Build your dream home in a secure, master-planned gated community.'
    },
    {
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
      titleHighlight: 'Prime Bangalore Locations',
      subtitle: 'RERA-approved projects with clear titles and transparent pricing.'
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      titleHighlight: 'High ROI Investments',
      subtitle: 'Fast-appreciating locations with top-notch amenities and connectivity.'
    }
  ];

  setHeroSlide(index: number) {
    this.activeHeroIndex = index;
  }

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

    // Auto-slide hero section
    setInterval(() => {
      this.activeHeroIndex = (this.activeHeroIndex + 1) % this.heroSlides.length;
    }, 4500);
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

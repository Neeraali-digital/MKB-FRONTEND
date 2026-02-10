import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService, Property } from '../../services/property';
import { PropertyCardComponent } from '../../components/property-card/property-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  featuredProperties: Property[] = []; // Keeping for backward compatibility or if needed
  ongoingProjects: Property[] = [];
  completedProjects: Property[] = [];

  reviews = [
    {
      name: 'Rahul Sharma',
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: 'Choosing MKB was the best decision for our first home. The documentation was crystal clear.',
      stars: 5
    },
    {
      name: 'Priya Nair',
      location: 'Kerala',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      text: 'Excellent project management and timely delivery. Highly recommended for land investments.',
      stars: 5
    },
    {
      name: 'Michael Chen',
      location: 'Dubai',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      text: 'Transparent dealings and very helpful staff. They made the entire process stress-free.',
      stars: 4.5
    },
    {
      name: 'Anish Kumar',
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      text: 'The team at MKB goes above and beyond. Their plots are in the most promising locations.',
      stars: 5
    },
    {
      name: 'Sarah George',
      location: 'Mysore',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      text: 'Integrity and quality are what define MKB. I am extremely happy with my investment.',
      stars: 5
    },
    {
      name: 'David Wilson',
      location: 'Dubai',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      text: 'MKB Developers provided excellent guidance throughout the registration process. Truly professional.',
      stars: 5
    }
  ];

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

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

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.propertyService.getProperties().subscribe(data => {
      this.ongoingProjects = data.filter(p => p.projectStatus === 'Ongoing');
      this.completedProjects = data.filter(p => p.projectStatus === 'Completed');
      // Also set featured if still used elsewhere, or just ignore
      this.featuredProperties = data.filter(p => p.isFeatured);
    });
  }
}

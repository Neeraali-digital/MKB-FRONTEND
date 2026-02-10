import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService, Property } from '../../services/property';
import { PropertyCardComponent } from '../../components/property-card/property-card';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent],
  templateUrl: './listing.html',
  styleUrl: './listing.css'
})
export class ListingComponent implements OnInit {
  properties: Property[] = [];
  isLoading = true;
  skeletonItems = Array(6).fill(0); // Show 6 skeleton cards while loading

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    // Simulate 2 seconds loading delay
    setTimeout(() => {
      this.propertyService.getProperties().subscribe(data => {
        this.properties = data;
        this.isLoading = false;
      });
    }, 2000);
  }
}

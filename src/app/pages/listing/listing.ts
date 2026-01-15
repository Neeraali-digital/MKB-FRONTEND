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

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.propertyService.getProperties().subscribe(data => {
      this.properties = data;
    });
  }
}

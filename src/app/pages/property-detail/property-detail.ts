import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PropertyService, Property } from '../../services/property';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.css'
})
export class PropertyDetailComponent implements OnInit {
  property: Property | undefined;
  mainImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.propertyService.getPropertyById(id).subscribe(data => {
        this.property = data;
        if (this.property?.images.length) {
          this.mainImage = this.property.images[0];
        }
      });
    }
  }

  setImage(image: string) {
    this.mainImage = image;
  }

  getMapUrl(): SafeResourceUrl | null {
    if (!this.property?.location) return null;
    // Using Google Maps Embed API or simple iframe query
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(this.property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

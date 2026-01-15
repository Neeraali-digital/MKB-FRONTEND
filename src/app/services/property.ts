import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: 'House' | 'Apartment' | 'Plot' | 'Farmhouse';
  bedrooms?: number;
  bathrooms?: number;
  area: number; // in sqft
  description: string;
  images: string[];
  amenities: string[];
  isFeatured: boolean;
  status: 'For Sale' | 'For Rent';
  agentName: string;
  agentContact: string;
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private properties: Property[] = [
    {
      id: '1',
      title: 'Luxury 4 BHK Villa with Private Garden',
      price: '₹ 2.5 Cr',
      location: 'Whitefield, Bangalore',
      type: 'House',
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      description: 'Experience luxury living in this spacious 4 BHK villa located in the heart of Whitefield. Features a private garden, modular kitchen, and premium fittings.',
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Private Garden', 'Swimming Pool', '24/7 Security', 'Power Backup', 'Club House'],
      isFeatured: true,
      status: 'For Sale',
      agentName: 'MKB Sales Team',
      agentContact: '+91 9845675299'
    },
    {
      id: '2',
      title: 'Premium 2 BHK Apartment',
      price: '₹ 85 Lac',
      location: 'Indiranagar, Bangalore',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1250,
      description: 'Modern 2 BHK apartment in a gated community with all modern amenities. Close to metro station and shopping malls.',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Gym', 'Children Play Area', 'Covered Parking', 'Lift'],
      isFeatured: true,
      status: 'For Sale',
      agentName: 'MKB Sales Team',
      agentContact: '+91 9845675299'
    },
    {
      id: '3',
      title: 'Spacious Farmhouse nearing City',
      price: '₹ 1.2 Cr',
      location: 'Nelamangala, Bangalore',
      type: 'Farmhouse',
      bedrooms: 3,
      bathrooms: 3,
      area: 5000,
      description: 'A perfect weekend getaway. 3 BHK Farmhouse with 1 acre land. Lush green surroundings.',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Large Lawn', 'Fruit Trees', 'Borewell'],
      isFeatured: false,
      status: 'For Sale',
      agentName: 'MKB Sales Team',
      agentContact: '+91 9845675299'
    },
    {
      id: '4',
      title: 'Residential Plot in Gated Community',
      price: '₹ 45 Lac',
      location: 'Sarjapur Road, Bangalore',
      type: 'Plot',
      area: 1500,
      description: 'BMRDA approved residential plot in a well-planned layout. Ready for registration.',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Blacktop Roads', 'Underground Drainage', 'Street Lights', 'Park'],
      isFeatured: true,
      status: 'For Sale',
      agentName: 'MKB Sales Team',
      agentContact: '+91 9845675299'
    },
    {
      id: '5',
      title: '3 BHK Furnished Flat',
      price: '₹ 1.15 Cr',
      location: 'HSR Layout, Bangalore',
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 3,
      area: 1600,
      description: 'Fully furnished 3 BHK flat. Ready to move in.',
      images: [
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Furnished', 'Power Backup', 'Lift', 'Security'],
      isFeatured: false,
      status: 'For Sale',
      agentName: 'MKB Sales Team',
      agentContact: '+91 9845675299'
    }
  ];

  constructor() { }

  getProperties(): Observable<Property[]> {
    return of(this.properties);
  }

  getPropertyById(id: string): Observable<Property | undefined> {
    return of(this.properties.find(p => p.id === id));
  }
  
  getFeaturedProperties(): Observable<Property[]> {
    // Return first 3 or marked featured
    return of(this.properties.filter(p => p.isFeatured));
  }
}

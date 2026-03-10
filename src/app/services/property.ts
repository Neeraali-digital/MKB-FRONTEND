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
  projectStatus: 'Ongoing' | 'Completed';
  videoUrl?: string;
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
      projectStatus: 'Ongoing',
      videoUrl: 'https://www.youtube.com/embed/doTKAKRa_Ks?rel=0',
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
      projectStatus: 'Completed',
      videoUrl: 'https://www.youtube.com/embed/hRU3zZBeuOM?rel=0',
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
      projectStatus: 'Ongoing',
      videoUrl: 'https://www.youtube.com/embed/doTKAKRa_Ks?rel=0',
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
      projectStatus: 'Completed',
      videoUrl: 'https://www.youtube.com/embed/hRU3zZBeuOM?rel=0',
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
      projectStatus: 'Completed',
      videoUrl: 'https://www.youtube.com/embed/doTKAKRa_Ks?rel=0',
      agentName: 'MKB Sales Team',
      agentContact: '+91 7090444445'
    },
    {
      id: '6',
      title: 'Eco-Friendly Gated Plots',
      price: '₹ 50 Lac',
      location: 'Mysore Road, Bangalore',
      type: 'Plot',
      area: 2000,
      description: 'Nature-inspired plotted development with over 1000 planned trees and world class club house layout.',
      images: [
        'https://img.youtube.com/vi/doTKAKRa_Ks/hqdefault.jpg'
      ],
      amenities: ['Underground Cabling', 'Organic Farming', 'Club House'],
      isFeatured: false,
      status: 'For Sale',
      projectStatus: 'Ongoing',
      videoUrl: 'https://www.youtube.com/embed/doTKAKRa_Ks',
      agentName: 'MKB Sales Team',
      agentContact: '+91 7090444445'
    },
    {
      id: '7',
      title: 'Riverside Elite Villas',
      price: '₹ 3.2 Cr',
      location: 'Yelahanka, Bangalore',
      type: 'House',
      bedrooms: 4,
      bathrooms: 5,
      area: 4500,
      description: 'Ultra luxury riverside villas featuring private pools and extensive landscaping.',
      images: [
        'https://img.youtube.com/vi/hRU3zZBeuOM/hqdefault.jpg'
      ],
      amenities: ['Private Pool', 'Gym', 'Mini Theatre'],
      isFeatured: false,
      status: 'For Sale',
      projectStatus: 'Ongoing',
      videoUrl: 'https://www.youtube.com/embed/hRU3zZBeuOM',
      agentName: 'MKB Sales Team',
      agentContact: '+91 7090444445'
    },
    {
      id: '8',
      title: 'Boutique Forest Farmhouses',
      price: '₹ 1.8 Cr',
      location: 'Kanakapura, Bangalore',
      type: 'Farmhouse',
      bedrooms: 2,
      bathrooms: 2,
      area: 5500,
      description: 'Gated community of large farmhouses designed to blend completely with the native forest.',
      images: [
        'https://images.unsplash.com/photo-1549517045-bc93de0ce7f5?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Orchard', 'Dairy Farm Support', 'Solar Power'],
      isFeatured: true,
      status: 'For Sale',
      projectStatus: 'Ongoing',
      videoUrl: 'https://www.youtube.com/embed/doTKAKRa_Ks',
      agentName: 'MKB Sales Team',
      agentContact: '+91 7090444445'
    },
    {
      id: '9',
      title: 'City Center Apartments',
      price: '₹ 1.5 Cr',
      location: 'Jayanagar, Bangalore',
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      description: 'Spacious apartments in the heart of the city with smart home features and high-end security.',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Smart Home', '24/7 Security', 'Infinity Pool'],
      isFeatured: false,
      status: 'For Sale',
      projectStatus: 'Ongoing',
      videoUrl: 'https://www.youtube.com/embed/hRU3zZBeuOM',
      agentName: 'MKB Sales Team',
      agentContact: '+91 7090444445'
    },
    {
      id: '10',
      title: 'Sunrise Ridge Plotted Layout',
      price: '₹ 35 Lac',
      location: 'Tumkur Road, Bangalore',
      type: 'Plot',
      area: 1200,
      description: 'Ready to build residential plots right near the booming industrial hubs of Tumkur road.',
      images: [
        'https://img.youtube.com/vi/doTKAKRa_Ks/hqdefault.jpg'
      ],
      amenities: ['Paved Roads', 'Water Connection', 'Park'],
      isFeatured: false,
      status: 'For Sale',
      projectStatus: 'Completed',
      videoUrl: 'https://www.youtube.com/embed/doTKAKRa_Ks',
      agentName: 'MKB Sales Team',
      agentContact: '+91 7090444445'
    },
    {
      id: '11',
      title: 'Golden Meadows Villaments',
      price: '₹ 1.1 Cr',
      location: 'Bellandur, Bangalore',
      type: 'Apartment',
      bedrooms: 4,
      bathrooms: 4,
      area: 2100,
      description: 'Villament styled luxurious duplex living without compromising on the society experience.',
      images: [
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Duplex Living', 'Tennis Court', 'Club House'],
      isFeatured: false,
      status: 'For Sale',
      projectStatus: 'Completed',
      videoUrl: 'https://www.youtube.com/embed/hRU3zZBeuOM',
      agentName: 'MKB Sales Team',
      agentContact: '+91 7090444445'
    },
    {
      id: '12',
      title: 'Serene Lakes View Plots',
      price: '₹ 65 Lac',
      location: 'Kengeri, Bangalore',
      type: 'Plot',
      area: 2400,
      description: 'Lake facing premium plots offering extreme peace of mind and excellent long term appreciation.',
      images: [
        'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Lake View', 'Gated Community', 'Concrete Roads'],
      isFeatured: false,
      status: 'For Sale',
      projectStatus: 'Completed',
      videoUrl: 'https://www.youtube.com/embed/doTKAKRa_Ks',
      agentName: 'MKB Sales Team',
      agentContact: '+91 7090444445'
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

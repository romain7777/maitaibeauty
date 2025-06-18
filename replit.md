# Maitai Beauty - Institut de Beauté Website

## Overview

This is a modern, responsive website for Maitai Beauty, a beauty institute and spa located in Punaauia, Tahiti. The application showcases the institute's services including esthetics, nail care, spa treatments, massage, and hair styling. The website features a clean, elegant design with a brown and pink color scheme that reflects the luxurious, relaxing atmosphere of the beauty institute.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color variables for brand consistency
- **State Management**: TanStack Query for server state management
- **Typography**: Inter and Playfair Display fonts from Google Fonts

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: TSX for running TypeScript directly in development
- **Build**: ESBuild for production bundling

### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Centralized schema definitions in shared directory
- **Migrations**: Drizzle Kit for database migrations
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

## Key Components

### Frontend Components
- **Navigation**: Sticky header with smooth scrolling navigation
- **Hero Section**: Full-screen landing with background image and call-to-action
- **Services**: Grid layout showcasing different beauty services with images
- **About**: Two-column layout with image and feature highlights
- **Contact Info**: Cards displaying hours, reservation info, and location
- **Google Maps**: Embedded map with location details
- **Footer**: Complete site information and navigation

### Backend Components
- **Express Server**: Main application server with middleware for logging and error handling
- **Storage Layer**: Interface-based storage system (currently in-memory, ready for database)
- **Routes**: Centralized route registration system
- **Vite Integration**: Development server integration with HMR support

### Shared Components
- **Schema**: User model with Drizzle ORM and Zod validation
- **Types**: TypeScript interfaces shared between client and server

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **Server Processing**: Express server handles requests and delegates to storage layer
3. **Data Persistence**: Storage interface abstracts database operations
4. **Response Handling**: JSON responses with proper error handling
5. **UI Updates**: TanStack Query manages caching and UI synchronization

## External Dependencies

### Frontend Libraries
- React ecosystem (React, React DOM, TypeScript)
- UI/UX libraries (Radix UI components, Tailwind CSS, class-variance-authority)
- Form handling (@hookform/resolvers, react-hook-form)
- Date utilities (date-fns)
- Icons (Lucide React, Font Awesome)

### Backend Libraries
- Express.js for server framework
- Drizzle ORM with PostgreSQL support
- Session management (connect-pg-simple)
- Development tools (tsx, esbuild)

### Development Tools
- Vite with React plugin
- TypeScript compiler
- PostCSS with Tailwind CSS
- Replit-specific plugins for development environment

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with PostgreSQL 16 module
- **Port Configuration**: Local port 5000 mapped to external port 80
- **Hot Reload**: Vite HMR with runtime error overlay
- **Development Command**: `npm run dev` using tsx

### Production Build
- **Client Build**: Vite builds React app to `dist/public`
- **Server Build**: ESBuild bundles server code to `dist/index.js`
- **Deployment Target**: Autoscale deployment on Replit
- **Environment**: Production mode with optimized assets

### Database Setup
- **Connection**: Uses DATABASE_URL environment variable
- **Migrations**: Drizzle migrations in `./migrations` directory
- **Schema Push**: `npm run db:push` for development schema updates

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- June 15, 2025: Initial website setup with complete spa/beauty salon functionality
- June 15, 2025: Integrated custom Maitai Beauty logo with pink flower design
- June 15, 2025: Added social media integration (Facebook, Instagram, TikTok)
- June 15, 2025: Enhanced Google Maps with specific PK18 Punaauia location
- June 15, 2025: Improved SEO with Open Graph meta tags for social sharing
- June 15, 2025: Added proper icons to contact info sections (Clock, Calendar, MapPin, Phone)
- June 15, 2025: Updated footer with authentic social media logos using react-icons
- June 15, 2025: Fixed About and Services sections spacing and text overflow issues
- June 15, 2025: Replaced embedded Google Maps with direct links to exact institute location
- June 15, 2025: Enlarged main logo on homepage from 250px to 500px for better visibility
- June 15, 2025: Added smooth CSS animations (fadeIn, slideInFromLeft) for enhanced user experience
- June 15, 2025: Replaced social media icons in contact section with authentic React icons
- June 15, 2025: Updated spa service image with authentic Maitai Beauty spa photo
- June 15, 2025: Replaced massage and coiffure service images with authentic Maitai Beauty photos
- June 15, 2025: Added specific spa services including Dôme japonais and gommage du corps
- June 15, 2025: Added specific massage services including massage du corps and palper rouler
- June 15, 2025: Updated coiffure services to be more specific: coupe homme/femme/enfant, couleurs, lissage
- June 15, 2025: Removed "Réserver ce service" buttons from service modal descriptions
- June 15, 2025: Added bullet points (dashes) to about section features list
- June 15, 2025: Transformed cailloux.jpg into background image for about section with overlay text
- June 15, 2025: Removed emoji overlays from service images for cleaner presentation
- June 15, 2025: Updated about section layout to centered design with white text on background
- June 15, 2025: Added Globe icon to Google Maps section and updated localization text
- June 15, 2025: Fixed Google Maps section not displaying by adding GoogleMaps component to home.tsx
- June 15, 2025: Added planet emoji icon (🌍) to localisation section for better visibility
- June 15, 2025: Resolved planet icon display issue using inline styles instead of Tailwind classes
- June 15, 2025: Created comprehensive localisation section with authentic Google Maps links and complete address
- June 15, 2025: Repositioned planet emoji icon above "Voir notre emplacement sur Google Maps" title as requested
- June 15, 2025: Added planet emoji icon to dedicated /localisation page above Google Maps section
- June 15, 2025: Removed localisation section from home page, now only available on dedicated /localisation page
- June 15, 2025: Added rose glow ambient effect to all cards in the localisation page for enhanced visual appeal
- June 15, 2025: Enhanced rose-glow effect on service cards with stronger ambient lighting and hover effects
- June 15, 2025: Fixed mobile navigation menu with absolute positioning and proper state management for reliable functionality
- June 15, 2025: Made main logo on homepage rounded with rounded-full CSS class and added footer contact navigation
- June 15, 2025: Enhanced logo with subtle pink glow effects, pulsing animation, and floating particles with optimized intensity for elegant visual appeal
- June 15, 2025: Replaced modal reservation system with dropdown menus that appear directly below each "Réserver" button for better UX
- June 15, 2025: Added complete image upload system replacing URL input with file selection in admin panel
- June 15, 2025: Integrated business hours and contact information management in admin interface with tabbed layout
- June 15, 2025: Created business_info database table for managing opening hours, phone, email, and address
- June 15, 2025: Enhanced admin session management with automatic expiration handling and error recovery
- June 17, 2025: Fixed mobile navigation hamburger menu positioning and functionality
- June 17, 2025: Updated entire site typography from Poppins/Playfair Display to Inria Serif font family
- June 17, 2025: Added decorative fleur.png images throughout hero section with proper positioning
- June 17, 2025: Replaced "Maitai Beauty" text with logo image scaled to 750% for better visibility
- June 17, 2025: Fixed "Découvrir nos Services" button click detection by adjusting z-index layering
- June 17, 2025: Eliminated horizontal scroll margin issues with overflow-x: hidden CSS
- June 17, 2025: Fixed subtitle text visibility by increasing z-index to display above logo on homepage
- June 17, 2025: Removed white space between contact info section and footer by eliminating margin-top
- June 17, 2025: Added gallery page with photo showcase and navigation tabs system
- June 17, 2025: Created PageNav component with Accueil/Galerie tabs below header
- June 17, 2025: Integrated gallery route in App.tsx with smooth page transitions
- June 17, 2025: Enhanced gallery images with rose glow effects and hover animations
- June 17, 2025: Added personnel page with team member profiles and specialties
- June 17, 2025: Extended navigation to include Accueil/Galerie/Personnel tabs
- June 17, 2025: Created comprehensive team presentation with philosophy section
- June 17, 2025: Updated gallery with 13 authentic establishment photos (1.jpeg through 13.jpeg)
- June 17, 2025: Enhanced gallery grid layout to support 4-column display on larger screens
- June 17, 2025: Added lightbox functionality with image enlargement and navigation arrows
- June 17, 2025: Implemented keyboard navigation (arrow keys and escape) for gallery lightbox
- June 17, 2025: Added click-to-enlarge feature with smooth animations and image counter
- June 17, 2025: Fixed lightbox positioning to center properly on viewport and prevent background scrolling
- June 17, 2025: Removed hover text overlays from gallery images for cleaner presentation
- June 17, 2025: Removed lightbox image information overlay for minimal viewing experience
- June 17, 2025: Removed first image (1.jpeg) from gallery display
- June 17, 2025: Activated reservation buttons on gallery and personnel pages with modal functionality
- June 17, 2025: Integrated business info phone number fetching for all reservation modals
- June 17, 2025: Fixed modal positioning issues by creating independent reservation modals with complete CSS reset and viewport control for all three pages (home, gallery, personnel)
- June 18, 2025: Optimized mobile navigation by reducing tab bar size and removing emoji overlays from service cards on mobile only
- June 18, 2025: Fixed service modal positioning to center properly on both mobile and desktop screens
- June 18, 2025: Removed white navigation bar background while maintaining functional tab buttons
- June 18, 2025: Created independent service modal system with scroll position preservation using simplified state management
- June 18, 2025: Removed scrollbar from service modals by adding scrollbar-hide CSS class for all browsers (WebKit, Firefox, IE)
- June 18, 2025: Implemented proper scroll position restoration using setTimeout and window.scrollTo for seamless user experience
- June 18, 2025: Fixed service modal centering issues after navigation between tabs by implementing viewport-absolute positioning
- June 18, 2025: Added complete site reset functionality when returning to home page to prevent modal positioning bugs
- June 18, 2025: Enhanced modal system to maintain user position in services section without auto-scrolling to top
- June 18, 2025: Replaced floating service modals with accordion system for better mobile experience and simpler navigation
- June 18, 2025: Implemented smooth accordion animations with expand/collapse functionality directly in service cards
- June 18, 2025: Simplified service cards to show only title and "En savoir plus" button, hiding descriptions until user clicks
- June 18, 2025: Fixed JavaScript errors during tab navigation by adding null checks to currentTarget event handlers
- June 18, 2025: Modified accordion behavior to allow only one service description open at a time for cleaner UX
- June 18, 2025: Fixed accordion layout spacing issues by replacing CSS grid with flexbox to prevent white space gaps
- June 18, 2025: Restored Services, About, and Contact navigation functionality with intelligent page redirection and smooth scrolling

## Social Media Integration

The website now includes social media links across multiple sections:
- **Facebook**: https://www.facebook.com/p/Maitai-Beauty-100076625366246/
- **Instagram**: https://www.instagram.com/maitai.beauty/
- **TikTok**: https://www.tiktok.com/@maitai.beauty

These links are integrated in:
- Footer section with prominent social media icons
- Contact/Reservation section for easy booking via private messages
- Consistent styling with brand colors (brown primary with pink accent hover)

## Changelog

Changelog:
- June 15, 2025. Initial setup
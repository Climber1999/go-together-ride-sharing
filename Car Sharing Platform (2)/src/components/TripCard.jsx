import { Star, Users, Clock, Navigation, BadgeCheck, Music, Cigarette, Dog, MessageCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

export function TripCard({ trip, onBook, onViewProfile }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    
    <Card className="gt-card gt-card-hover border-0 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section - Trip Info */}
          <div className="flex-1">
            {/* Route */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex flex-col items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full bg-brand-blue ring-4 ring-brand-blue/15"></div>
                <div className="w-0.5 h-8 bg-gradient-to-b from-brand-blue to-brand-orange rounded-full"></div>
                <Navigation className="h-4 w-4 text-brand-orange" />
              </div>
              <div className="flex-1">
                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-brand-navy tabular-nums">{trip.departureTime}</span>
                    <span className="text-slate-800 font-medium">{trip.origin}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-brand-navy tabular-nums">{trip.arrivalTime}</span>
                    <span className="text-slate-800 font-medium">{trip.destination}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-brand-navy mb-1 rounded-full bg-brand-sky px-3 py-1 inline-block">{formatDate(trip.date)}</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {trip.duration}
                </div>
              </div>
            </div>

            {/* Driver Info */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b">
              <button 
                onClick={() => onViewProfile && onViewProfile(trip.driver.id)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer flex-1"
              >
                <Avatar className="h-12 w-12 ring-2 ring-brand-blue/20">
                  <AvatarImage src={trip.driver.avatar} alt={trip.driver.name} />
                  <AvatarFallback>{trip.driver.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 hover:text-brand-blue transition-colors">{trip.driver.name}</span>
                    {trip.driver.verified && (
                      <BadgeCheck className="h-4 w-4 text-brand-blue" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{trip.driver.rating}</span>
                    <span className="text-gray-500">({trip.driver.reviewCount} reviews)</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Vehicle & Amenities */}
            <div className="space-y-2 text-sm">
              <div className="text-gray-600">
                {trip.vehicle.color} {trip.vehicle.make} {trip.vehicle.model} ({trip.vehicle.year})
              </div>
              <div className="flex flex-wrap gap-2">
                {trip.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs bg-brand-sky text-brand-navy border-0">
                    {amenity}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-3 text-gray-600 pt-2">
                <div className="flex items-center gap-1" title="Music">
                  <Music className={`h-4 w-4 ${trip.preferences.music ? 'text-green-600' : 'text-gray-300'}`} />
                </div>
                <div className="flex items-center gap-1" title="Smoking">
                  <Cigarette className={`h-4 w-4 ${trip.preferences.smoking ? 'text-green-600' : 'text-gray-300 line-through'}`} />
                </div>
                <div className="flex items-center gap-1" title="Pets">
                  <Dog className={`h-4 w-4 ${trip.preferences.pets ? 'text-green-600' : 'text-gray-300 line-through'}`} />
                </div>
                <div className="flex items-center gap-1" title={`${trip.preferences.chatty} traveler`}>
                  <MessageCircle className="h-4 w-4 text-gray-600" />
                  <span className="text-xs capitalize">{trip.preferences.chatty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Booking */}
          <div className="md:w-48 flex flex-col items-end justify-between">
            <div className="text-right mb-4">
              <div className="font-display text-4xl font-bold text-brand-navy mb-1">
                ${trip.pricePerSeat}
              </div>
              <div className="text-sm text-slate-500">per person</div>
            </div>

            <div className="w-full space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 justify-end">
                <Users className="h-4 w-4" />
                <span>{trip.availableSeats} seat{trip.availableSeats !== 1 ? 's' : ''} left</span>
              </div>
              <Button
                className="w-full rounded-full gt-btn-orange disabled:shadow-none disabled:bg-slate-300 disabled:bg-none"
                onClick={() => onBook(trip)}
                disabled={trip.availableSeats === 0}
              >
                {trip.availableSeats === 0 ? 'Fully Booked' : 'Book Seat'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

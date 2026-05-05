import { Link } from 'react-router-dom';
import { Calendar, MapPin, Building } from 'lucide-react';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div 
        className="event-image" 
        style={{ backgroundImage: `url(${event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'})` }}
      >
      </div>
      <div className="event-content">
        <div className="event-department">{event.department || 'General'}</div>
        <h3 className="event-title">{event.title}</h3>
        <div className="event-details">
          <div className="event-detail-item">
            <Calendar size={16} className="event-detail-icon" />
            <span>{event.date}</span>
          </div>
          <div className="event-detail-item">
            <MapPin size={16} className="event-detail-icon" />
            <span>{event.location}</span>
          </div>
          <div className="event-detail-item">
            <Building size={16} className="event-detail-icon" />
            <span>Veltech University Campus</span>
          </div>
        </div>
        <p style={{marginBottom: '20px', color: '#666', fontSize: '0.9rem'}}>{event.description}</p>
        <Link to={`/register/${event.id}`} className="btn btn-primary" style={{width: '100%'}}>
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default EventCard;

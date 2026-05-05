import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from Spring Boot backend
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching events", err);
        // Fallback mock data if backend isn't ready
        setEvents([
          { id: 1, title: 'Annual Tech Symposium 2026', date: 'Oct 15, 2026', location: 'Main Auditorium', department: 'Computer Science', description: 'Join us for the biggest tech event of the year featuring industry leaders.' },
          { id: 2, title: 'Veltech Cultural Fest', date: 'Nov 02, 2026', location: 'Open Grounds', department: 'Cultural Committee', description: 'Experience the diverse culture of Veltech with music, dance, and food.' }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Welcome to Veltech Events</h1>
          <p>Discover, register, and participate in academic, cultural, and technical events happening across the Veltech University campus.</p>
          <div className="hero-buttons">
            <button className="btn btn-secondary">Explore Events</button>
            <button className="btn" style={{backgroundColor: 'rgba(255,255,255,0.2)', color: 'white'}}>Learn More</button>
          </div>
        </div>
      </section>

      <section className="events-section">
        <div className="container">
          <h2 className="section-title">Upcoming Campus Events</h2>
          {loading ? (
            <div style={{textAlign: 'center', padding: '40px'}}>Loading events...</div>
          ) : (
            <div className="events-grid">
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

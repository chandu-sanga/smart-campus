import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '', description: '', date: '', location: '', department: ''
  });

  const fetchData = () => {
    fetch('/api/events').then(res => res.json()).then(data => setEvents(data));
    fetch('/api/registrations').then(res => res.json()).then(data => setRegistrations(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEvent = (e) => {
    e.preventDefault();
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    }).then(res => {
      if(res.ok) {
        setNewEvent({title: '', description: '', date: '', location: '', department: '', imageUrl: ''});
        fetchData();
      }
    });
  };

  const updateStatus = (id, newStatus) => {
    fetch(`/api/registrations/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).then(res => {
      if(res.ok) fetchData();
    });
  };

  const handleDeleteEvent = (id) => {
    if(window.confirm('Are you sure you want to delete this event?')) {
      fetch(`/api/events/${id}`, { method: 'DELETE' })
      .then(res => {
        if(res.ok) fetchData();
      });
    }
  };

  const getEventName = (eventId) => {
    const event = events.find(e => e.id === eventId);
    return event ? event.title : `Event ID: ${eventId}`;
  };

  return (
    <div className="container" style={{padding: '40px 20px'}}>
      <h1 className="section-title">Admin Dashboard</h1>
      
      <div style={{display: 'flex', gap: '40px', flexWrap: 'wrap'}}>
        {/* Left Column: Manage Events */}
        <div style={{flex: '1', minWidth: '300px'}}>
          <div className="form-container" style={{margin: '0 0 40px 0', padding: '20px'}}>
            <h3 style={{marginBottom: '20px'}}>Add New Event</h3>
            <form onSubmit={handleAddEvent}>
              <div className="form-group" style={{marginBottom: '10px'}}>
                <input type="text" className="form-control" placeholder="Event Title" required
                  value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
              </div>
              <div className="form-group" style={{marginBottom: '10px'}}>
                <input type="text" className="form-control" placeholder="Date (e.g. Oct 15, 2026)" required
                  value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
              </div>
              <div className="form-group" style={{marginBottom: '10px'}}>
                <input type="text" className="form-control" placeholder="Location" required
                  value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
              </div>
              <div className="form-group" style={{marginBottom: '10px'}}>
                <input type="text" className="form-control" placeholder="Department" required
                  value={newEvent.department} onChange={e => setNewEvent({...newEvent, department: e.target.value})} />
              </div>
              <div className="form-group" style={{marginBottom: '10px'}}>
                <textarea className="form-control" placeholder="Description" required rows="3"
                  value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Add Event</button>
            </form>
          </div>

          <h3>Manage Events</h3>
          <ul style={{marginTop: '20px'}}>
            {events.map(event => (
              <li key={event.id} style={{background: 'white', padding: '15px', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'}}>
                <div>
                  <strong>{event.title}</strong>
                  <div style={{fontSize: '0.85rem', color: '#666'}}>{event.date} | {event.department}</div>
                </div>
                <button onClick={() => handleDeleteEvent(event.id)} className="btn" style={{backgroundColor: '#E63946', color: 'white', padding: '5px 10px'}}>Delete</button>
              </li>
            ))}
            {events.length === 0 && <p>No events found.</p>}
          </ul>
        </div>

        {/* Right Column: Registrations */}
        <div style={{flex: '2', minWidth: '400px'}}>
          <h3>All Registrations</h3>
          <div style={{background: 'white', borderRadius: '8px', padding: '20px', marginTop: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{borderBottom: '2px solid #eee', textAlign: 'left'}}>
                  <th style={{padding: '10px'}}>Event</th>
                  <th style={{padding: '10px'}}>Name</th>
                  <th style={{padding: '10px'}}>VTU ID</th>
                  <th style={{padding: '10px'}}>Dept</th>
                  <th style={{padding: '10px'}}>Phone</th>
                  <th style={{padding: '10px'}}>Status</th>
                  <th style={{padding: '10px'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map(reg => (
                  <tr key={reg.id} style={{borderBottom: '1px solid #eee'}}>
                    <td style={{padding: '10px', fontSize: '0.9rem'}}>{getEventName(reg.eventId)}</td>
                    <td style={{padding: '10px'}}>{reg.name} ({reg.age})</td>
                    <td style={{padding: '10px'}}>{reg.vtuId}</td>
                    <td style={{padding: '10px'}}>{reg.department}</td>
                    <td style={{padding: '10px'}}>{reg.phoneNumber}</td>
                    <td style={{padding: '10px'}}>
                      <span style={{
                        padding: '3px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold',
                        backgroundColor: reg.status === 'APPROVED' ? '#d4edda' : reg.status === 'DECLINED' ? '#f8d7da' : '#fff3cd',
                        color: reg.status === 'APPROVED' ? '#155724' : reg.status === 'DECLINED' ? '#721c24' : '#856404'
                      }}>
                        {reg.status || 'PENDING'}
                      </span>
                    </td>
                    <td style={{padding: '10px', minWidth: '130px'}}>
                      {reg.status !== 'APPROVED' && <button onClick={() => updateStatus(reg.id, 'APPROVED')} className="btn" style={{backgroundColor: '#28a745', color: 'white', padding: '4px 8px', fontSize: '0.8rem', marginRight: '5px'}}>Approve</button>}
                      {reg.status !== 'DECLINED' && <button onClick={() => updateStatus(reg.id, 'DECLINED')} className="btn" style={{backgroundColor: '#dc3545', color: 'white', padding: '4px 8px', fontSize: '0.8rem'}}>Decline</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {registrations.length === 0 && <p style={{padding: '20px', textAlign: 'center', color: '#666'}}>No registrations found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

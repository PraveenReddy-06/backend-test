import { useState } from 'react';
import { counsellors } from '../data/counsellors';
import { sessionTypes } from '../data/sessionTypes';
import { timeSlots } from '../data/timeSlots';
import Card from '../components/Card';
import './Counseling.css';

const BOOKING_STEPS = ['date', 'time', 'session', 'confirm'];

function Counseling() {
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [bookingStep, setBookingStep] = useState(0);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    sessionType: '',
    topic: ''
  });

  const handleScheduleClick = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setBookingStep(0);
    setFormData({ date: '', time: '', sessionType: '', topic: '' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (bookingStep < BOOKING_STEPS.length - 1) return;
    alert('Session booking confirmed (UI only - no data storage)');
    setSelectedCounsellor(null);
    setBookingStep(0);
    setFormData({ date: '', time: '', sessionType: '', topic: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const canProceed = () => {
    switch (BOOKING_STEPS[bookingStep]) {
      case 'date': return !!formData.date;
      case 'time': return !!formData.time;
      case 'session': return !!formData.sessionType;
      case 'confirm': return !!formData.topic;
      default: return false;
    }
  };

  const handleNext = () => {
    if (bookingStep < BOOKING_STEPS.length - 1) setBookingStep(s => s + 1);
  };

  const handleBack = () => {
    if (bookingStep > 0) setBookingStep(s => s - 1);
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <span className="star-rating" aria-label={`${rating} out of 5 stars`}>
        {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(empty)}
      </span>
    );
  };

  return (
    <div className="counseling-page">
      <div className="container">
        <section className="counseling-header">
          <h1 className="page-title">Book a Counseling Session</h1>
          <p className="page-subtitle">Connect with expert counselors to guide your career journey</p>
        </section>

        <section className="counsellors-section">
          <div className="counsellors-grid">
            {counsellors.map(counsellor => (
              <Card key={counsellor.id} className="counsellor-card">
                <div className="counsellor-header">
                  <h3 className="counsellor-name">{counsellor.name}</h3>
                  <span className="counsellor-experience">{counsellor.experience} years experience</span>
                </div>
                <div className="counsellor-ratings">
                  {renderStars(counsellor.rating ?? 4.5)}
                  <span className="counsellor-rating-text">{counsellor.rating ?? 4.5}/5</span>
                  <span className="counsellor-sessions">({counsellor.totalSessions ?? 0} sessions)</span>
                </div>
                <p className="counsellor-bio">{counsellor.bio}</p>
                <div className="counsellor-expertise">
                  <strong>Expertise:</strong>
                  <div className="expertise-tags">
                    {counsellor.expertise.map((exp, idx) => (
                      <span key={idx} className="expertise-tag">{exp}</span>
                    ))}
                  </div>
                </div>
                <div className="counsellor-availability">
                  <strong>Availability:</strong> {counsellor.availability}
                </div>
                <button
                  className="btn btn-secondary schedule-btn"
                  onClick={() => handleScheduleClick(counsellor)}
                >
                  Book Session
                </button>
              </Card>
            ))}
          </div>
        </section>

        {selectedCounsellor && (
          <section className="scheduling-modal">
            <div className="modal-overlay" onClick={() => { setSelectedCounsellor(null); setBookingStep(0); }}></div>
            <div className="modal-content booking-modal">
              <div className="modal-header">
                <h2>Book Session with {selectedCounsellor.name}</h2>
                <button className="modal-close" onClick={() => { setSelectedCounsellor(null); setBookingStep(0); }}>×</button>
              </div>
              <div className="booking-steps-indicator">
                {BOOKING_STEPS.map((step, idx) => (
                  <div key={step} className={`step-dot ${idx <= bookingStep ? 'active' : ''}`}>
                    {idx + 1}
                  </div>
                ))}
              </div>
              <form onSubmit={handleFormSubmit} className="scheduling-form">
                {BOOKING_STEPS[bookingStep] === 'date' && (
                  <div className="form-step">
                    <div className="form-group">
                      <label htmlFor="date">Select Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                )}
                {BOOKING_STEPS[bookingStep] === 'time' && (
                  <div className="form-step">
                    <div className="form-group">
                      <label>Select Time</label>
                      <div className="time-slots-grid">
                        {timeSlots.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            className={`time-slot-btn ${formData.time === slot ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, time: slot })}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {BOOKING_STEPS[bookingStep] === 'session' && (
                  <div className="form-step">
                    <div className="form-group">
                      <label>Session Type</label>
                      <div className="session-types-list">
                        {sessionTypes.map(st => (
                          <button
                            key={st.id}
                            type="button"
                            className={`session-type-btn ${formData.sessionType === st.id ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, sessionType: st.id })}
                          >
                            <span className="session-type-label">{st.label}</span>
                            <span className="session-type-duration">{st.duration}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {BOOKING_STEPS[bookingStep] === 'confirm' && (
                  <div className="form-step">
                    <div className="form-group">
                      <label htmlFor="topic">Discussion Topic</label>
                      <textarea
                        id="topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        placeholder="What would you like to discuss?"
                        required
                        className="form-textarea"
                        rows="4"
                      />
                    </div>
                    <div className="booking-summary">
                      <h4>Booking Summary</h4>
                      <p><strong>Counsellor:</strong> {selectedCounsellor.name}</p>
                      <p><strong>Date:</strong> {formData.date}</p>
                      <p><strong>Time:</strong> {formData.time}</p>
                      <p><strong>Session:</strong> {sessionTypes.find(s => s.id === formData.sessionType)?.label}</p>
                    </div>
                  </div>
                )}
                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={bookingStep === 0 ? () => setSelectedCounsellor(null) : handleBack}>
                    {bookingStep === 0 ? 'Cancel' : 'Back'}
                  </button>
                  {bookingStep < BOOKING_STEPS.length - 1 ? (
                    <button type="button" className="btn btn-secondary" onClick={handleNext} disabled={!canProceed()}>
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-secondary" disabled={!canProceed()}>
                      Confirm Booking
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Counseling;

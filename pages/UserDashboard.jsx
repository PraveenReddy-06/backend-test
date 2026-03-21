import { Link } from 'react-router-dom';
import { userDashboardData } from '../data/userData';
import { careers } from '../data/careers';
import { useSavedCareers } from '../contexts/SavedCareersContext';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import './UserDashboard.css';

function UserDashboard() {
  const getCareerById = (id) => careers.find(c => c.id === id);
  const { savedCareerIds } = useSavedCareers();
  const savedCareers = careers.filter(c => savedCareerIds.has(c.id));
  const { currentUser } = useAuth();

  return (
    <div className="user-dashboard">
      <div className="container">
        <section className="dashboard-header">
          <h1 className="dashboard-title">Welcome Back{currentUser ? `, ${currentUser.name}` : ''}!</h1>
          <p className="dashboard-subtitle">Here's your personalized career dashboard</p>
        </section>

        {savedCareers.length > 0 && (
          <section className="dashboard-section">
            <h2 className="section-heading">Saved Careers</h2>
            <div className="career-cards-grid">
              {savedCareers.map((career) => (
                <Card key={career.id} className="career-card">
                  <div className="career-card-header">
                    <h3 className="career-card-title">
                      <Link to={`/career-paths/${career.id}`}>{career.title}</Link>
                    </h3>
                  </div>
                  <p className="career-card-description">{career.description}</p>
                  <div className="career-card-skills">
                    <strong>Key Skills:</strong>
                    <div className="skills-tags">
                      {career.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <Link to={`/career-paths/${career.id}`} className="btn btn-outline">View Details</Link>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="dashboard-section">
          <h2 className="section-heading">Recommended Career Paths</h2>
          <div className="career-cards-grid">
            {userDashboardData.recommendedCareers.map((rec) => {
              const career = getCareerById(rec.id);
              return (
                <Card key={rec.id} className="career-card">
                  <div className="career-card-header">
                    <h3 className="career-card-title">
                      <Link to={`/career-paths/${career?.id}`}>{career?.title}</Link>
                    </h3>
                    <span className="match-badge">{rec.matchScore}% Match</span>
                  </div>
                  <p className="career-card-description">{career?.description}</p>
                  <div className="career-card-skills">
                    <strong>Key Skills:</strong>
                    <div className="skills-tags">
                      {career?.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <Link to={`/career-paths/${career?.id}`} className="btn btn-outline">View Details</Link>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="section-heading">Upcoming Counseling Sessions</h2>
          <div className="sessions-grid">
            {userDashboardData.upcomingSessions.map((session) => (
              <Card key={session.id} className="session-card">
                <div className="session-card-header">
                  <h3 className="session-counsellor">{session.counsellorName}</h3>
                  <span className="session-topic">{session.topic}</span>
                </div>
                <div className="session-details">
                  <div className="session-detail">
                    <strong>Date:</strong> {session.date}
                  </div>
                  <div className="session-detail">
                    <strong>Time:</strong> {session.time}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="section-heading">Saved Resources</h2>
          <div className="resources-grid">
            {userDashboardData.savedResources.map((resource) => (
              <Card key={resource.id} className="resource-card">
                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-description">Access your saved career resources</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserDashboard;

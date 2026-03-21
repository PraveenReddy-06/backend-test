import { useEffect, useState } from 'react';
import { adminMetrics } from '../data/adminData';
import { careers } from '../data/careers';
import { counsellors } from '../data/counsellors';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const { currentUser } = useAuth();
  const [resources, setResources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentResource, setCurrentResource] = useState({
    id: null,
    title: '',
    category: '',
    description: '',
    link: ''
  });
  const [deleteId, setDeleteId] = useState(null);
  const base_URL = 'http://localhost:8080/api/resources';
  
  useEffect(() => {
    if (activeSection !== 'resources') return;
    let isMounted = true;

    const fetchResources = async () => {
     
      try {
        const res = await fetch(`${base_URL}`);
        if (!res.ok) throw new Error('Failed to fetch resources');
        const data = await res.json();
        if (isMounted) setResources(Array.isArray(data) ? data : []);
      } catch (err) {
        if (isMounted) setResources([]);
        // Intentionally no UI changes.
      }
    };

    fetchResources();
    return () => {
      isMounted = false;
    };
  }, [activeSection]);

  const handleAddClick = () => {
    setIsEdit(false);
    setCurrentResource({
      id: null,
      title: '',
      category: '',
      description: '',
      link: ''
    });
    setShowModal(true);
  };

  const handleEditClick = (resource) => {
    setIsEdit(true);
    setCurrentResource({
      id: resource?.id ?? null,
      title: resource?.title ?? '',
      category: resource?.category ?? '',
      description: resource?.description ?? '',
      link: resource?.link ?? ''
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e?.preventDefault?.();
    try {
      if (isEdit && currentResource?.id != null) {
        const res = await fetch(`${base_URL}/${currentResource.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: currentResource.title,
            category: currentResource.category,
            description: currentResource.description,
            link: currentResource.link
          })
        });
        if (!res.ok) throw new Error('Failed to update resource');
        const updated = await res.json();
        setResources(prev =>
          prev.map(r => (r.id === updated.id ? updated : r))
        );
      } else {
        const userId = currentUser?.id;
        const res = await fetch(`${base_URL}/admin/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: currentResource.title,
            category: currentResource.category,
            description: currentResource.description,
            link: currentResource.link
          })
        });
        if (!res.ok) throw new Error('Failed to create resource');
        const created = await res.json();
        setResources(prev => [created, ...prev]);
      }

      setShowModal(false);
      setIsEdit(false);
      setCurrentResource({
        id: null,
        title: '',
        category: '',
        description: '',
        link: ''
      });
    } catch (err) {
      // Intentionally no UI changes.
    }
  };

  const handleDelete = async (id) => {
    if (id == null) return;
    try {
      const res = await fetch(`${base_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete resource');
      setResources(prev => prev.filter(r => r.id !== id));
      setDeleteId(null);
    } catch (err) {
      
    }
  };

  const handleResourceCardClick = (resource) => {
    const url = resource?.link;
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <aside className="admin-sidebar">
          <h2 className="sidebar-title">Menu</h2>
          {currentUser && (
            <p className="admin-user-name">Welcome, {currentUser.name}</p>
          )}
          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveSection('overview')}
            >
              Overview
            </button>
            <button
              className={`nav-item ${activeSection === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveSection('analytics')}
            >
              Analytics
            </button>
            <button
              className={`nav-item ${activeSection === 'careers' ? 'active' : ''}`}
              onClick={() => setActiveSection('careers')}
            >
              Manage Careers
            </button>
            <button
              className={`nav-item ${activeSection === 'counsellors' ? 'active' : ''}`}
              onClick={() => setActiveSection('counsellors')}
            >
              Manage Counsellors
            </button>
            <button
              className={`nav-item ${activeSection === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveSection('resources')}
            >
              Manage Resources
            </button>
          </nav>
        </aside>

        <main className="admin-main">
          {activeSection === 'overview' && (
            <div className="admin-section">
              <h1 className="admin-page-title">Dashboard Overview</h1>
              <div className="metrics-grid">
                <Card className="metric-card">
                  <div className="metric-icon">👥</div>
                  <div className="metric-value">{adminMetrics.totalUsers.toLocaleString()}</div>
                  <div className="metric-label">Total Users</div>
                </Card>
                <Card className="metric-card">
                  <div className="metric-icon">📅</div>
                  <div className="metric-value">{adminMetrics.activeSessions}</div>
                  <div className="metric-label">Active Sessions</div>
                </Card>
                <Card className="metric-card">
                  <div className="metric-icon">📚</div>
                  <div className="metric-value">{adminMetrics.totalResources}</div>
                  <div className="metric-label">Total Resources</div>
                </Card>
                <Card className="metric-card">
                  <div className="metric-icon">🤝</div>
                  <div className="metric-value">{adminMetrics.totalCounsellors}</div>
                  <div className="metric-label">Counsellors</div>
                </Card>
                <Card className="metric-card">
                  <div className="metric-icon">📈</div>
                  <div className="metric-value">{adminMetrics.monthlyGrowth}%</div>
                  <div className="metric-label">Monthly Growth</div>
                </Card>
                <Card className="metric-card">
                  <div className="metric-icon">⭐</div>
                  <div className="metric-value">{adminMetrics.averageSessionRating}</div>
                  <div className="metric-label">Avg. Session Rating</div>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'analytics' && (
            <div className="admin-section">
              <h1 className="admin-page-title">Analytics Dashboard</h1>
              <div className="analytics-grid">
                <Card className="analytics-card">
                  <div className="analytics-icon">👥</div>
                  <div className="analytics-value">{adminMetrics.totalUsers.toLocaleString()}</div>
                  <div className="analytics-label">Total Users</div>
                </Card>
                <Card className="analytics-card highlight-blue">
                  <div className="analytics-icon">👁</div>
                  <div className="analytics-value">{adminMetrics.mostViewedCareer}</div>
                  <div className="analytics-label">Most Viewed Career</div>
                  <div className="analytics-sub">{adminMetrics.mostViewedCareerCount} views</div>
                </Card>
                <Card className="analytics-card highlight-red">
                  <div className="analytics-icon">📅</div>
                  <div className="analytics-value">{adminMetrics.mostBookedCounsellor}</div>
                  <div className="analytics-label">Most Booked Counsellor</div>
                  <div className="analytics-sub">{adminMetrics.mostBookedCounsellorSessions} sessions</div>
                </Card>
                <Card className="analytics-card">
                  <div className="analytics-icon">📈</div>
                  <div className="analytics-value">{adminMetrics.engagementRate}%</div>
                  <div className="analytics-label">Engagement Rate</div>
                </Card>
                <Card className="analytics-card">
                  <div className="analytics-icon">⭐</div>
                  <div className="analytics-value">{adminMetrics.averageSessionRating}</div>
                  <div className="analytics-label">Avg. Session Rating</div>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'careers' && (
            <div className="admin-section">
              <div className="section-header">
                <h1 className="admin-page-title">Manage Career Resources</h1>
                <button className="btn btn-primary">Add New Career</button>
              </div>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Skills Count</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careers.map(career => (
                      <tr key={career.id}>
                        <td>{career.id}</td>
                        <td>{career.title}</td>
                        <td><span className="badge">{career.category}</span></td>
                        <td>{career.skills.length}</td>
                        <td>
                          <div className="table-actions">
                            <button className="btn-action edit">Edit</button>
                            <button className="btn-action delete">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'counsellors' && (
            <div className="admin-section">
              <div className="section-header">
                <h1 className="admin-page-title">Manage Counsellors</h1>
                <button className="btn btn-primary">Add New Counsellor</button>
              </div>
              <div className="counsellors-admin-grid">
                {counsellors.map(counsellor => (
                  <Card key={counsellor.id} className="counsellor-admin-card">
                    <div className="counsellor-admin-header">
                      <h3>{counsellor.name}</h3>
                      <span className="experience-badge">{counsellor.experience} years</span>
                    </div>
                    <p className="counsellor-admin-bio">{counsellor.bio}</p>
                    <div className="counsellor-admin-expertise">
                      <strong>Expertise:</strong> {counsellor.expertise.join(', ')}
                    </div>
                    <div className="counsellor-admin-actions">
                      <button className="btn btn-outline">Edit</button>
                      <button className="btn btn-outline">Delete</button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'resources' && (
            <div className="admin-section">
              <div className="section-header">
                <h1 className="admin-page-title">Manage Resources</h1>
                <button className="btn btn-primary" onClick={handleAddClick}>Add New Resource</button>
              </div>
              <div className="resources-admin-grid">
                {resources.map(resource => (
                  <Card
                    key={resource.id}
                    className="resource-admin-card"
                    onClick={() => handleResourceCardClick(resource)}
                  >
                    <div className="resource-admin-header">
                      <h3>{resource.title}</h3>
                      <span className="resource-type-badge">{resource.category}</span>
                    </div>
                    <p className="resource-admin-description">{resource.description}</p>
                    <div className="resource-admin-meta">
                      <span className="resource-category">{resource.category}</span>
                    </div>
                    <div className="resource-admin-actions">
                      <button className="btn btn-outline" onClick={(e) => { e.stopPropagation(); handleEditClick(resource); }}>Edit</button>
                      <button className="btn btn-outline" onClick={(e) => { e.stopPropagation(); setDeleteId(resource.id); }}>Delete</button>
                    </div>
                  </Card>
                ))}
              </div>

              {showModal && (
                <section className="scheduling-modal">
                  <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
                  <div className="modal-content booking-modal">
                    <div className="modal-header">
                      <h2>{isEdit ? 'Edit Resource' : 'Add New Resource'}</h2>
                      <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                    </div>
                    <form onSubmit={handleSave} className="scheduling-form">
                      <div className="form-group">
                        <label htmlFor="resource-title">Title</label>
                        <input
                          id="resource-title"
                          type="text"
                          className="form-input"
                          value={currentResource.title}
                          onChange={(e) => setCurrentResource(r => ({ ...r, title: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="resource-category">Category</label>
                        <input
                          id="resource-category"
                          type="text"
                          className="form-input"
                          value={currentResource.category}
                          onChange={(e) => setCurrentResource(r => ({ ...r, category: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="resource-description">Description</label>
                        <textarea
                          id="resource-description"
                          className="form-textarea"
                          rows="4"
                          value={currentResource.description}
                          onChange={(e) => setCurrentResource(r => ({ ...r, description: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="resource-link">Link</label>
                        <input
                          id="resource-link"
                          type="text"
                          className="form-input"
                          value={currentResource.link}
                          onChange={(e) => setCurrentResource(r => ({ ...r, link: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-secondary">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </section>
              )}

              {deleteId != null && (
                <section className="scheduling-modal">
                  <div className="modal-overlay" onClick={() => setDeleteId(null)}></div>
                  <div className="modal-content booking-modal">
                    <div className="modal-header">
                      <h2>Confirm Delete</h2>
                      <button className="modal-close" onClick={() => setDeleteId(null)}>×</button>
                    </div>
                    <div className="scheduling-form">
                      <p>Are you sure you want to delete?</p>
                      <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={() => setDeleteId(null)}>
                          Cancel
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => handleDelete(deleteId)}>
                          Yes, Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;


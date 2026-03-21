import { useState } from 'react';
import { Link } from 'react-router-dom';
import { careers } from '../data/careers';
import { useSavedCareers } from '../contexts/SavedCareersContext';
import { useComparison } from '../contexts/ComparisonContext';
import Card from '../components/Card';
import './CareerPaths.css';

function CareerPaths() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isSaved, toggleSaved } = useSavedCareers();
  const { addToCompare, isInCompare, removeFromCompare, compareCareers } = useComparison();

  const categories = ['All', ...new Set(careers.map(c => c.category))];

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="career-paths-page">
      <div className="container">
        <section className="career-paths-header">
          <h1 className="page-title">Explore Career Paths</h1>
          <p className="page-subtitle">Discover opportunities that align with your interests and skills</p>
          {compareCareers.length > 0 && (
            <Link to="/career-comparison" className="btn btn-primary compare-cta">
              Compare Selected ({compareCareers.length})
            </Link>
          )}
        </section>

        <section className="filters-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search careers..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="careers-section">
          <div className="careers-grid">
            {filteredCareers.map(career => (
              <Card key={career.id} className="career-path-card">
                <div className="career-path-header">
                  <h3 className="career-path-title">
                    <Link to={`/career-paths/${career.id}`}>{career.title}</Link>
                  </h3>
                  <div className="career-card-actions">
                    <button
                      className={`icon-btn-sm bookmark-btn ${isSaved(career.id) ? 'saved' : ''}`}
                      onClick={(e) => { e.stopPropagation(); toggleSaved(career.id); }}
                      title={isSaved(career.id) ? 'Remove from saved' : 'Save career'}
                      aria-label="Bookmark"
                    >
                      {isSaved(career.id) ? '★' : '☆'}
                    </button>
                    <button
                      className={`icon-btn-sm compare-btn ${isInCompare(career.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        isInCompare(career.id) ? removeFromCompare(career.id) : addToCompare(career);
                      }}
                      title="Compare"
                      aria-label="Compare"
                    >
                      ⇔
                    </button>
                  </div>
                </div>
                <span className="career-path-category">{career.category}</span>
                <p className="career-path-description">{career.description}</p>
                <div className="career-path-skills">
                  <h4 className="skills-heading">Required Skills:</h4>
                  <div className="skills-list">
                    {career.skills.map((skill, idx) => (
                      <span key={idx} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </div>
                <Link to={`/career-paths/${career.id}`} className="btn btn-outline career-view-btn">
                  View Details
                </Link>
              </Card>
            ))}
          </div>
          {filteredCareers.length === 0 && (
            <div className="no-results">
              <p>No careers found matching your criteria.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CareerPaths;

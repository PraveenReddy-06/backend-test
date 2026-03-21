import { useState, useEffect } from 'react';
import Card from '../components/Card';
import './ResourceLibrary.css';

function ResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/resources')
      .then(res => res.json())
      .then(data => setResources(data))
      .catch(err => console.error(err));
  }, []);

  // Dynamic categories from backend data
  const categories = ['All', ...new Set(resources.map(r => r.category))];

  const filteredResources = resources.filter(
    r => selectedCategory === 'All' || r.category === selectedCategory
  );

  return (
    <div className="resource-library-page">
      <div className="container">
        <section className="resource-header">
          <h1 className="page-title">Resource Library</h1>
          <p className="page-subtitle">
            Articles, guides, and tools to support your career journey
          </p>
        </section>

        <section className="resource-filters">
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="resources-section">
          <div className="resources-grid">
            {filteredResources.map(resource => (
              <Card key={resource.id} className="resource-library-card">
                <div className="resource-card-header">
                  {/*No "type" in backend → using category */}
                  <span className="resource-type-badge">
                    {resource.category}
                  </span>
                  <span className="resource-category-badge">
                    {resource.category}
                  </span>
                </div>
                <h3 className="resource-card-title">{resource.title}</h3>
                <p className="resource-card-description">
                  {resource.description}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ResourceLibrary;
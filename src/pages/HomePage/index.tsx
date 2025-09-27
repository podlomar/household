import { JSX } from "react";
import { Layout } from "../../components/Layout/index.js";
import { categories, defaultItems } from "../../data/householdItems.js";
import './home-page.css';

export const HomePage = (): JSX.Element => {
  return (
    <Layout title="Household Tracker">
      <div className="home-page">
        <header className="page-header">
          <h1 className="page-title" id="page-title">🏠 Household Items</h1>
          <div className="items-badge" id="items-badge" style={{ display: 'none' }}>0 items</div>
        </header>

        <div id="main-content">
          <div className="inventory-section">
            <div className="search-bar">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search household items..."
                className="search-input"
                id="search-input"
                hx-get="/filter-items"
                hx-trigger="keyup changed delay:300ms"
                hx-target="#items-container"
                name="search"
              />
            </div>

            <div className="category-filter">
              <div className="category-scroll">
                <button
                  className="category-button active"
                  hx-get="/filter-items"
                  hx-target="#items-container"
                >
                  <span className="category-icon">🏠</span>
                  <span className="category-label">All</span>
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="category-button"
                    style={{ '--category-color': category.color } as React.CSSProperties}
                    hx-get={`/filter-items?category=${category.id}`}
                    hx-target="#items-container"
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-label">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="items-grid" id="items-container">
              {defaultItems.map(item => (
                <div
                  key={item.id}
                  className={`item-card ${item.isNeeded ? 'needed' : ''}`}
                  hx-post={`/toggle-item/${item.id}`}
                  hx-swap="outerHTML"
                >
                  <div className="item-icon">
                    {item.icon || '📦'}
                  </div>
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-status">
                      {item.isNeeded ? 'Need to buy' : 'In stock'}
                    </div>
                  </div>
                  <div className="item-toggle">
                    <div className={`toggle-button ${item.isNeeded ? 'active' : ''}`}>
                      {item.isNeeded ? '✓' : '○'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <nav className="navigation">
          <button
            className="nav-button active"
            hx-get="/tab/inventory"
            hx-target="#main-content"
            hx-swap="innerHTML"
          >
            <span className="nav-icon">📦</span>
            <span className="nav-label">Inventory</span>
          </button>

          <button
            className="nav-button"
            hx-get="/tab/shopping"
            hx-target="#main-content"
            hx-swap="innerHTML"
          >
            <span className="nav-icon">🛒</span>
            <span className="nav-label">Shopping</span>
          </button>
        </nav>
      </div>
    </Layout>
  );
};

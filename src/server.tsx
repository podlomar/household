import { JSX } from 'react/jsx-runtime';
import express, { Request, Response } from 'express';
import { prerenderToNodeStream } from 'react-dom/static';
import { HomePage } from './pages/HomePage/index.js';
import { ItemCard } from './components/ItemCard/index.js';
import { ShoppingList } from './components/ShoppingList/index.js';
import { householdStore } from './data/store.js';
import { categories } from './data/householdItems.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('static'));
app.use('/img', express.static('img'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const render = async (component: JSX.Element, res: express.Response) => {
  const { prelude } = await prerenderToNodeStream(component);
  prelude.pipe(res);
};

app.get('/', (req: Request, res: Response) => {
  render(<HomePage />, res);
});

// HTMX endpoint for toggling items
app.post('/toggle-item/:id', (req: Request, res: Response) => {
  const itemId = req.params.id;
  const updatedItem = householdStore.toggleItem(itemId);

  if (updatedItem) {
    res.send(`
      <div class="item-card ${updatedItem.isNeeded ? 'needed' : ''}" 
           hx-post="/toggle-item/${updatedItem.id}" 
           hx-swap="outerHTML">
        <div class="item-icon">${updatedItem.icon || '📦'}</div>
        <div class="item-info">
          <h3 class="item-name">${updatedItem.name}</h3>
          <div class="item-status">
            ${updatedItem.isNeeded ? 'Need to buy' : 'In stock'}
          </div>
        </div>
        <div class="item-toggle">
          <div class="toggle-button ${updatedItem.isNeeded ? 'active' : ''}">
            ${updatedItem.isNeeded ? '✓' : '○'}
          </div>
        </div>
      </div>
    `);
  } else {
    res.status(404).send('Item not found');
  }
});

// HTMX endpoint for filtering items
app.get('/filter-items', (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  const search = req.query.search as string | undefined;

  const filteredItems = householdStore.searchItems(search || '', category);

  if (filteredItems.length === 0) {
    res.send(`
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No items found</h3>
        <p>Try adjusting your search or category filter.</p>
      </div>
    `);
    return;
  }

  const itemsHtml = filteredItems.map(item => `
    <div class="item-card ${item.isNeeded ? 'needed' : ''}" 
         hx-post="/toggle-item/${item.id}" 
         hx-swap="outerHTML">
      <div class="item-icon">${item.icon || '📦'}</div>
      <div class="item-info">
        <h3 class="item-name">${item.name}</h3>
        <div class="item-status">
          ${item.isNeeded ? 'Need to buy' : 'In stock'}
        </div>
      </div>
      <div class="item-toggle">
        <div class="toggle-button ${item.isNeeded ? 'active' : ''}">
          ${item.isNeeded ? '✓' : '○'}
        </div>
      </div>
    </div>
  `).join('');

  res.send(itemsHtml);
});

// HTMX endpoint for switching tabs
app.get('/tab/:tab', (req: Request, res: Response) => {
  const tab = req.params.tab as 'inventory' | 'shopping';
  const items = householdStore.getAllItems();
  const neededItems = householdStore.getShoppingList();

  if (tab === 'inventory') {
    const itemsHtml = items.map(item => `
      <div class="item-card ${item.isNeeded ? 'needed' : ''}" 
           hx-post="/toggle-item/${item.id}" 
           hx-swap="outerHTML">
        <div class="item-icon">${item.icon || '📦'}</div>
        <div class="item-info">
          <h3 class="item-name">${item.name}</h3>
          <div class="item-status">
            ${item.isNeeded ? 'Need to buy' : 'In stock'}
          </div>
        </div>
        <div class="item-toggle">
          <div class="toggle-button ${item.isNeeded ? 'active' : ''}">
            ${item.isNeeded ? '✓' : '○'}
          </div>
        </div>
      </div>
    `).join('');

    res.send(`
      <div class="inventory-section">
        <div class="search-bar">
          <div class="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search household items..."
            class="search-input"
            hx-get="/filter-items"
            hx-trigger="keyup changed delay:300ms"
            hx-target="#items-container"
            name="search"
          />
        </div>
        
        <div class="category-filter">
          <div class="category-scroll">
            <button class="category-button active" 
                    hx-get="/filter-items" 
                    hx-target="#items-container">
              <span class="category-icon">🏠</span>
              <span class="category-label">All</span>
            </button>
            ${categories.map(category => `
              <button class="category-button" 
                      style="--category-color: ${category.color}"
                      hx-get="/filter-items?category=${category.id}" 
                      hx-target="#items-container">
                <span class="category-icon">${category.icon}</span>
                <span class="category-label">${category.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="items-grid" id="items-container">
          ${itemsHtml}
        </div>
      </div>
    `);
  } else {
    if (neededItems.length === 0) {
      res.send(`
        <div class="shopping-section">
          <div class="shopping-list empty">
            <div class="empty-state">
              <div class="empty-icon">🛒</div>
              <h2>Your shopping list is empty</h2>
              <p>Mark items you need from the inventory to add them here.</p>
            </div>
          </div>
        </div>
      `);
    } else {
      const shoppingItemsHtml = neededItems.map(item => `
        <div class="shopping-item" hx-post="/toggle-item/${item.id}" hx-target="closest .shopping-section">
          <div class="item-content">
            <span class="item-icon">${item.icon || '📦'}</span>
            <div class="item-details">
              <span class="item-name">${item.name}</span>
              <span class="item-category">${item.category}</span>
            </div>
          </div>
          <button class="check-button" aria-label="Mark as purchased">✓</button>
        </div>
      `).join('');

      res.send(`
        <div class="shopping-section">
          <div class="shopping-list">
            <div class="shopping-header">
              <h2>Shopping List (${neededItems.length} items)</h2>
              <button class="clear-button" hx-post="/clear-shopping-list" hx-target="closest .shopping-section">
                Clear All
              </button>
            </div>
            
            <div class="shopping-items">
              ${shoppingItemsHtml}
            </div>
            
            <div class="shopping-actions">
              <button class="share-button">📱 Share List</button>
            </div>
          </div>
        </div>
      `);
    }
  }
});

// HTMX endpoint for clearing shopping list
app.post('/clear-shopping-list', (req: Request, res: Response) => {
  householdStore.clearShoppingList();

  res.send(`
    <div class="shopping-section">
      <div class="shopping-list empty">
        <div class="empty-state">
          <div class="empty-icon">🛒</div>
          <h2>Your shopping list is empty</h2>
          <p>Mark items you need from the inventory to add them here.</p>
        </div>
      </div>
    </div>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

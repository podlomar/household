import { JSX } from "react";
import { HouseholdItem } from "../../data/householdItems.js";
import './shopping-list.css';

interface Props {
  items: HouseholdItem[];
  onToggle: (itemId: string) => void;
  onClear: () => void;
}

export const ShoppingList = ({ items, onToggle, onClear }: Props): JSX.Element => {
  const neededItems = items.filter(item => item.isNeeded);

  if (neededItems.length === 0) {
    return (
      <div className="shopping-list empty">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h2>Your shopping list is empty</h2>
          <p>Mark items you need from the inventory to add them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-list">
      <div className="shopping-header">
        <h2>Shopping List ({neededItems.length} items)</h2>
        <button className="clear-button" onClick={onClear}>
          Clear All
        </button>
      </div>

      <div className="shopping-items">
        {neededItems.map((item) => (
          <div
            key={item.id}
            className="shopping-item"
            onClick={() => onToggle(item.id)}
          >
            <div className="item-content">
              <span className="item-icon">{item.icon || '📦'}</span>
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-category">{item.category}</span>
              </div>
            </div>
            <button className="check-button" aria-label="Mark as purchased">
              ✓
            </button>
          </div>
        ))}
      </div>

      <div className="shopping-actions">
        <button className="share-button">
          📱 Share List
        </button>
      </div>
    </div>
  );
};

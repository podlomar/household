import { JSX } from "react";
import { HouseholdItem } from "../../data/householdItems.js";
import './item-card.css';

interface Props {
  item: HouseholdItem;
  onToggle: (itemId: string) => void;
}

export const ItemCard = ({ item, onToggle }: Props): JSX.Element => {
  return (
    <div
      className={`item-card ${item.isNeeded ? 'needed' : ''}`}
      onClick={() => onToggle(item.id)}
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
  );
};

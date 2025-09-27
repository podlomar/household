import { JSX } from "react";
import './navigation.css';

interface Props {
  activeTab: 'inventory' | 'shopping';
  onTabChange: (tab: 'inventory' | 'shopping') => void;
}

export const Navigation = ({ activeTab, onTabChange }: Props): JSX.Element => {
  return (
    <nav className="navigation">
      <button
        className={`nav-button ${activeTab === 'inventory' ? 'active' : ''}`}
        onClick={() => onTabChange('inventory')}
      >
        <span className="nav-icon">📦</span>
        <span className="nav-label">Inventory</span>
      </button>

      <button
        className={`nav-button ${activeTab === 'shopping' ? 'active' : ''}`}
        onClick={() => onTabChange('shopping')}
      >
        <span className="nav-icon">🛒</span>
        <span className="nav-label">Shopping</span>
      </button>
    </nav>
  );
};

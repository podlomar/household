import { JSX } from "react";
import { Category } from "../../data/householdItems.js";
import './category-filter.css';

interface Props {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }: Props): JSX.Element => {
  return (
    <div className="category-filter">
      <div className="category-scroll">
        <button
          className={`category-button ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onCategorySelect(null)}
        >
          <span className="category-icon">🏠</span>
          <span className="category-label">All</span>
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.id)}
            style={{ '--category-color': category.color } as React.CSSProperties}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

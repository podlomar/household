export interface HouseholdItem {
  id: string;
  name: string;
  category: string;
  isNeeded: boolean;
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: 'bathroom',
    name: 'Bathroom',
    icon: '🚿',
    color: '#4FC3F7'
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: '🍽️',
    color: '#81C784'
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: '🧹',
    color: '#FFB74D'
  },
  {
    id: 'laundry',
    name: 'Laundry',
    icon: '🧺',
    color: '#F06292'
  },
  {
    id: 'pantry',
    name: 'Pantry',
    icon: '🥫',
    color: '#A1887F'
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    icon: '💊',
    color: '#CE93D8'
  }
];

export const defaultItems: HouseholdItem[] = [
  // Bathroom
  { id: 'toilet-paper', name: 'Toilet Paper', category: 'bathroom', isNeeded: false, icon: '🧻' },
  { id: 'toothpaste', name: 'Toothpaste', category: 'bathroom', isNeeded: false, icon: '🦷' },
  { id: 'shampoo', name: 'Shampoo', category: 'bathroom', isNeeded: false, icon: '🧴' },
  { id: 'soap', name: 'Hand Soap', category: 'bathroom', isNeeded: false, icon: '🧼' },
  { id: 'towels', name: 'Towels', category: 'bathroom', isNeeded: false, icon: '🏖️' },

  // Kitchen
  { id: 'milk', name: 'Milk', category: 'kitchen', isNeeded: false, icon: '🥛' },
  { id: 'eggs', name: 'Eggs', category: 'kitchen', isNeeded: false, icon: '🥚' },
  { id: 'bread', name: 'Bread', category: 'kitchen', isNeeded: false, icon: '🍞' },
  { id: 'butter', name: 'Butter', category: 'kitchen', isNeeded: false, icon: '🧈' },
  { id: 'cheese', name: 'Cheese', category: 'kitchen', isNeeded: false, icon: '🧀' },
  { id: 'chicken', name: 'Chicken', category: 'kitchen', isNeeded: false, icon: '🐔' },
  { id: 'vegetables', name: 'Fresh Vegetables', category: 'kitchen', isNeeded: false, icon: '🥕' },
  { id: 'fruits', name: 'Fresh Fruits', category: 'kitchen', isNeeded: false, icon: '🍎' },

  // Cleaning
  { id: 'dish-soap', name: 'Dish Soap', category: 'cleaning', isNeeded: false, icon: '🧽' },
  { id: 'all-purpose-cleaner', name: 'All-Purpose Cleaner', category: 'cleaning', isNeeded: false, icon: '🧴' },
  { id: 'paper-towels', name: 'Paper Towels', category: 'cleaning', isNeeded: false, icon: '📜' },
  { id: 'trash-bags', name: 'Trash Bags', category: 'cleaning', isNeeded: false, icon: '🗑️' },
  { id: 'sponges', name: 'Sponges', category: 'cleaning', isNeeded: false, icon: '🧽' },

  // Laundry
  { id: 'laundry-detergent', name: 'Laundry Detergent', category: 'laundry', isNeeded: false, icon: '🧴' },
  { id: 'fabric-softener', name: 'Fabric Softener', category: 'laundry', isNeeded: false, icon: '🌸' },
  { id: 'bleach', name: 'Bleach', category: 'laundry', isNeeded: false, icon: '⚪' },

  // Pantry
  { id: 'rice', name: 'Rice', category: 'pantry', isNeeded: false, icon: '🍚' },
  { id: 'pasta', name: 'Pasta', category: 'pantry', isNeeded: false, icon: '🍝' },
  { id: 'canned-tomatoes', name: 'Canned Tomatoes', category: 'pantry', isNeeded: false, icon: '🥫' },
  { id: 'olive-oil', name: 'Olive Oil', category: 'pantry', isNeeded: false, icon: '🫒' },
  { id: 'salt', name: 'Salt', category: 'pantry', isNeeded: false, icon: '🧂' },
  { id: 'sugar', name: 'Sugar', category: 'pantry', isNeeded: false, icon: '🍯' },
  { id: 'flour', name: 'Flour', category: 'pantry', isNeeded: false, icon: '🌾' },

  // Personal Care
  { id: 'vitamins', name: 'Vitamins', category: 'personal-care', isNeeded: false, icon: '💊' },
  { id: 'bandages', name: 'Bandages', category: 'personal-care', isNeeded: false, icon: '🩹' },
  { id: 'pain-reliever', name: 'Pain Reliever', category: 'personal-care', isNeeded: false, icon: '💊' },
  { id: 'sunscreen', name: 'Sunscreen', category: 'personal-care', isNeeded: false, icon: '🧴' }
];

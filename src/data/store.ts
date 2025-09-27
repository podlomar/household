import { HouseholdItem, defaultItems } from './householdItems.js';

class HouseholdStore {
  private items: HouseholdItem[];

  constructor() {
    this.items = [...defaultItems];
  }

  getAllItems(): HouseholdItem[] {
    return this.items;
  }

  toggleItem(itemId: string): HouseholdItem | null {
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      this.items[itemIndex] = {
        ...this.items[itemIndex],
        isNeeded: !this.items[itemIndex].isNeeded
      };
      return this.items[itemIndex];
    }
    return null;
  }

  clearShoppingList(): void {
    this.items = this.items.map(item => ({ ...item, isNeeded: false }));
  }

  getItemsByCategory(category?: string): HouseholdItem[] {
    if (!category) return this.items;
    return this.items.filter(item => item.category === category);
  }

  searchItems(query: string, category?: string): HouseholdItem[] {
    let filteredItems = this.items;

    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category);
    }

    if (query) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    return filteredItems;
  }

  getShoppingList(): HouseholdItem[] {
    return this.items.filter(item => item.isNeeded);
  }
}

export const householdStore = new HouseholdStore();

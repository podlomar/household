// Handle navigation state and UI updates
document.addEventListener('DOMContentLoaded', function () {
  // Handle navigation button clicks
  document.addEventListener('click', function (e) {
    if (e.target.closest('.nav-button')) {
      const clickedButton = e.target.closest('.nav-button');
      const isShoppingTab = clickedButton.getAttribute('hx-get') === '/tab/shopping';

      // Update navigation active state
      document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
      clickedButton.classList.add('active');

      // Update page title and badge
      const pageTitle = document.getElementById('page-title');
      const itemsBadge = document.getElementById('items-badge');

      if (isShoppingTab) {
        pageTitle.textContent = '🛒 Shopping List';
        // Badge will be updated by HTMX response
      } else {
        pageTitle.textContent = '🏠 Household Items';
        itemsBadge.style.display = 'none';
      }
    }

    // Handle category button clicks
    if (e.target.closest('.category-button')) {
      document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
      e.target.closest('.category-button').classList.add('active');
    }
  });

  // Handle HTMX after request to update shopping count
  document.addEventListener('htmx:afterRequest', function (e) {
    if (e.detail.xhr.status === 200) {
      // Update items badge when shopping list changes
      if (e.detail.pathInfo.requestPath.includes('/toggle-item') ||
        e.detail.pathInfo.requestPath.includes('/clear-shopping-list')) {

        // Simple way to count items - could be improved
        setTimeout(() => {
          const shoppingItems = document.querySelectorAll('.shopping-item');
          const itemsBadge = document.getElementById('items-badge');
          const pageTitle = document.getElementById('page-title');

          if (pageTitle.textContent.includes('Shopping') && itemsBadge) {
            if (shoppingItems.length > 0) {
              itemsBadge.textContent = `${shoppingItems.length} items`;
              itemsBadge.style.display = 'block';
            } else {
              itemsBadge.style.display = 'none';
            }
          }
        }, 100);
      }
    }
  });
});

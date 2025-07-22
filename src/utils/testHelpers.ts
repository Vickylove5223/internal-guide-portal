// Test helpers for development and debugging

export const clearAllData = () => {
  localStorage.removeItem('posts');
  localStorage.removeItem('categories');
  localStorage.removeItem('documents');
  localStorage.removeItem('events');
  localStorage.removeItem('suggestions');
  console.log('All localStorage data cleared');
  window.location.reload();
};

export const resetToDefaults = () => {
  clearAllData();
  // The app will reinitialize with default data on reload
};

export const logCurrentData = () => {
  console.log('Current localStorage data:');
  console.log('Posts:', JSON.parse(localStorage.getItem('posts') || '[]'));
  console.log('Categories:', JSON.parse(localStorage.getItem('categories') || '[]'));
  console.log('Documents:', JSON.parse(localStorage.getItem('documents') || '[]'));
  console.log('Events:', JSON.parse(localStorage.getItem('events') || '[]'));
  console.log('Suggestions:', JSON.parse(localStorage.getItem('suggestions') || '[]'));
};

// Make these functions available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).clearAllData = clearAllData;
  (window as any).resetToDefaults = resetToDefaults;
  (window as any).logCurrentData = logCurrentData;
}

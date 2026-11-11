const { invoke } = window.__TAURI__.core;

let items = [];
let categories = [];

function display_item(item) {
  const item_list = document.getElementById('item-list');
  if (!item_list) return;
  
  const list_item = document.createElement('li');

  const category_sign = document.createElement('span');
  category_sign.className = 'category-sign';
  category_sign.textContent = item.category || 'General';

  const text_span = document.createElement('span');
  text_span.textContent = item.text;

  list_item.appendChild(category_sign);
  list_item.appendChild(text_span);
  item_list.appendChild(list_item);
}

function dropdown_update() {
  const select = document.getElementById('category-select');
  if (!select) return;
  
  select.innerHTML = '';
  categories.forEach(category => {
    const opt = document.createElement('option');
    opt.value = category;
    opt.textContent = category;
    select.appendChild(opt);
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  const item_form = document.getElementById('item-form');
  const item_input = document.getElementById('item-input');
  const category_input = document.getElementById('category-input');
  const category_select = document.getElementById('category-select');

  try { 
    categories = await invoke('load_categories')  
  } catch(e) {
  console.error("failed to load categories:", e);
  }
  if (!categories || categories.length === 0) {
    categories = ['General'];
  }
  dropdown_update();
  try {
  items = await invoke('load_items');
  console.log("loaded items from rust");
  items.forEach(display_item);
  } catch (e) {
    console.error("failed to load items", e)
  }
  if (item_form) {
  item_form.addEventListener('submit', async (submit_event) => {
    submit_event.preventDefault();
    const text = item_input.value.trim();
    const new_category = category_input.value.trim();

    let category = new_category || category_select.value || 'General';

    if (new_category && !categories.includes(new_category)) {
      categories.push(new_category);
      dropdown_update();
      category_input.value = '';
      await invoke('save_categories', { categories });
    }
    if (text) {
      const new_item = { text, category }
      items.push(new_item);
      display_item(new_item);
      item_input.value = '';
      await invoke('save_items', { items });
      console.log("saved items")
    }
  });
} else {
  console.error("could not find 'item-form'")
}
});
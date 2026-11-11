const { invoke } = window.__TAURI__.core;

let items = [];

function display_item(text) {
  const item_list = document.getElementById('item-list');
  const list_item = document.createElement('li');
  list_item.textContent = text;
  item_list.appendChild(list_item);
}

function dropdown_update() {
  const select = document.getElementById('category-select')
  select.innerHTML = '';
  categories.forEach(category => {
    const opt = document.createElement('option');
    opt.value = category;
    opt.textContext = category;
    select.appendChild(opt);
  });
}

async function start_app() {
  const item_form = document.getElementById('item-form');
  const item_input = document.getElementById('item-input');
  const category_input = document.getElementById('category-input');
  const category_select = document.getElementById('category-select');

  categories = await invoke('load_categories')
  if (categories.length === 0) categories = ['General'];
  dropdown_update;

  items = await invoke('load_items')
  items.forEach(display_item);

  item_form.addEventListener('submit', async (submit_event) => {
    submit_event.preventDefault();
    const text = item_input.value.trim();
    const new_category = category_input.value.trim();

    let category = new_category || category_select.value || 'General';

    if (new_category && !categories.includes(new_category)) {
      categories.push(new_category);
      dropdown_update();
      category_input.value = '';
      await invoke('save_categoroies', { categories });
    }
    if (text) {
      items.push(text);
      display_item(text);
      item_input.value = '';
      await invoke('save_items', { items });
    }
  });
}

start_app();

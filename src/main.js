const { invoke } = window.__TAURI__.core;

let items = [];

function display_item(text) {
  const item_list = document.getElementById('item-list');
  const list_item = document.createElement('li');
  list_item.textContent = text;
  item_list.appendChild(list_item);
}

async function start_app() {
  const item_form = document.getElementById('item-form');
  const item_input = document.getElementById('item-input');

  items = await invoke('load_items')
  items.forEach(display_item);

  item_form.addEventListener('submit', async (submit_event) => {
    submit_event.preventDefault();
    const text = item_input.value.trim();

    if (text) {
      items.push(text);
      display_item(text);
      item_input.value = '';
      await invoke('save_items', { items });
    }
  });
}

start_app();

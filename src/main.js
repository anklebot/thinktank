function display_item(text) {
  const item_list = document.getElementById('item-list');
  const list_item = document.createElement('li');
  list_item.textContent = text;
  item_list.appendChild(list_item);
}

window.addEventListener('DOMContentLoaded', () => {
  const item_form = document.getElementById('item-form');
  const item_input = document.getElementById('item-input');

  item_form.addEventListener('submit', (submit_event) => {
    submit_event.preventDefault();
    const text = item_input.value.trim();

    if (text) {
      display_item(text);
      item_input.value = '';

    }

  });


});
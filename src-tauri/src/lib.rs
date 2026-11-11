use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

#[derive(Serialize, Deserialize, Clone)]
struct Item {
    text: String,
    category: String,
}

fn get_item_path(app: &tauri::AppHandle) -> PathBuf {
    let dir = app.path().app_data_dir().expect("failed to get app data dir");
    fs::create_dir_all(&dir).expect("failed to create app data dir");
    dir.join("item_list.json")
}

fn get_category_path(app: &tauri::AppHandle) -> PathBuf {
    let dir = app.path().app_data_dir().expect("failed to get app data dir");
    fs::create_dir_all(&dir).expect("failed to create app data dir");
    dir.join("categories.json")
}

#[tauri::command]
fn load_items(app: tauri::AppHandle) -> Vec<Item> {
    let path = get_item_path(&app);
    if let Ok(contents) = fs::read_to_string(&path) {
        serde_json::from_str(&contents).unwrap_or_default()
    } else {
        Vec::new()
    }
}

#[tauri::command]
fn save_items(app: tauri::AppHandle, items: Vec<Item>) -> Result<(), String> {
    let path = get_item_path(&app);
    println!("saving list to {:?}", path);
    let json = serde_json::to_string_pretty(&items).map_err(|e| e.to_string())?;
    fs::write(path, json).map_err(|e| e.to_string())
}

#[tauri::command]
fn load_categories(app: tauri::AppHandle) -> Vec<String> {
    let path = get_category_path(&app);
    if let Ok(contents) = fs::read_to_string(&path) {
        serde_json::from_str(&contents).unwrap_or_default()
    } else {
        vec!["General".to_string()]
    }
}

#[tauri::command]
fn save_categories(app: tauri::AppHandle, categories: Vec<String>) -> Result<(), String> {
    let path = get_category_path(&app);
    println!("saving categories to {:?}", path);
    let json = serde_json::to_string_pretty(&categories).map_err(|e| e.to_string())?;
    fs::write(path, json).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            load_items,
            save_items,
            load_categories,
            save_categories
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri app");
}
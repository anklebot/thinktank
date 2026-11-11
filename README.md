# thinktank

PHANTOM PROJECT

design goal (as of right now):

a program that I can just click on or smth, will take all the ideas I have, maybe say or type, and then store them for later. I could have some sort of system where I put if I am busy free or it could be tracking what im doing and drop the idea on me to do smth.

Version History:

v.1.3.1

Fixed identation of README.md

v.1.3.0

Rewrote some of the code used for writing the statements as bullets and made a system to save and load them. Basically there is a json file (item_list.json) made onto the computer where all of the things are saved onto. So when you reopen the app it will read the file and load them onto the app. Also made it so clicking enter does the same thing as the add button. 

v.1.2.1

Just also adding that I overhauled version system in README.md. It is now: v.#.#.#, first number being significant changes, second number being new features, and third number being bug fixes and tweaks

v.1.2.0

I adjusted the system so now the window can take in inputs and store them in the current session, but still havent figured out how to preserve past reset. 

Replaced all of the Tauri greet template stuff with Thinktank things

v.1.1.0

Designed version system 

Figured out how to remove native window decorations (top bar and surrounding glow), source: https://v2.tauri.app/develop/debug/linux-graphics/ (did this for linux, since its a bit weird and just edditing tauri.conf.json wouldn't make it work). Only change was that I added an unsafe block to the sample code to make it run without interference from rust

Adjusted README.md to look a bit nicer

v.1.0.3

README.md updated

v.1.0.2

README.md updated

v.1.0.1

finished installing all of tauri related stuff

v.1.0.0

first added in tauri 

v.0.0.2

got rid of hashtag

v.0.0.1

testing commit

v.0.0.0

Initial commit

# Tauri + Vanilla

This template should help get you started developing with Tauri in vanilla HTML, CSS and Javascript.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

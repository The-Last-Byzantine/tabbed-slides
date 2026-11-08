# Tabbed Slides

Live version: https://tabbedslides.pages.dev/

Also see our landing page and other apps: https://tabbedapps.pages.dev

A browser-based slides editor with tabs, built as a companion to Tabbed Word. Everything runs on your device;
files are never uploaded.

## What it does

- One tab per deck; drafts are kept in your browser
- Opens and saves PowerPoint (.pptx) files, as well as its own .json format
- PowerPoint slides keep their layout: text boxes, shapes, lines, pictures, tables, charts and speaker notes stay where they were, and the text can be edited in place
- Present mode shows speaker notes under the slide (N hides them)
- Present mode reveals points one by one, with speaker notes
- Exports HTML, PowerPoint and PDF (through Print)
- Spelling check in English, Greek and Turkish
- Google Drive: Open from Google Drive and Save to Google Drive (Drive buttons and File menu). A linked deck uploads to Drive automatically after you pause; files are sent straight to Google, not through any server of ours
- Folders (left pane): choose a folder and open its .pptx and .json decks; Save writes back to the file in Chrome and Edge
- Comments (task pane, or Insert > Comment): notes on a slide, kept in the Tabbed Slides file and in Drive
- Email all: saves every open deck to Google Drive as .pptx, then opens Gmail to attach them
- Works offline after the first visit online

Version 2026.11.9: the Tabbed Word look (flat Office 2003 palette, toolbar and File menu with the same icons), Google Drive, Email all, Folders and Comments.

## Running it

Serve the folder with any static web server, or open `index.html` in a supported browser.

## Google Drive

The Google sign-in window opens when you press a Drive button. The app asks for access to your Drive files (not sharing). Tokens stay in memory and are never saved. Add this site's address to the OAuth client's authorised JavaScript origins in Google Cloud before Drive sign-in can work from a new domain.

## Licence

MIT. See `LICENSE`. Third-party components and their licences are listed in `third-party-licenses.txt`.

## Author

The Last Byzantine.

This project is not affiliated with or endorsed by Microsoft. "PowerPoint" and "PPTX" are trademarks of their owners.

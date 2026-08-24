# Handoff: Texting Marketing Opt-In Prototype

## What this is
A working React prototype of the "Texting: Marketing Opt-In" feature, built to match a Figma file pixel-for-pixel where the user provided specific frame links. Simulates a Rent Manager-style property management app: resident consent checkboxes, admin controls, text template library, and a bulk-texting wizard — all genuinely wired together (not just static screens).

**Figma source:** https://www.figma.com/design/DrN8nTLn8jTuA3A5VeAWdg/Texting--Marketing-Opt-In
**Project location:** `/Users/sydneyholzbach/Desktop/marketing-texting-opt-in`
**Stack:** Vite + React 19 + React Router + Tailwind v4 (no other UI libraries)

## Running it
Node/npm were not preinstalled on this Mac — installed via Homebrew at `/opt/homebrew/bin` and added to `~/.zprofile` (`eval "$(/opt/homebrew/bin/brew shellenv)"`). New terminal sessions should have `node`/`npm` on PATH automatically; if not, prefix commands with `export PATH="/opt/homebrew/bin:$PATH"`.

```bash
cd /Users/sydneyholzbach/Desktop/marketing-texting-opt-in
npm run dev
```

A `.claude/launch.json` already exists at the Desktop level (one directory up) configured to run this via the Browser pane's `preview_start` tool with `name: "marketing-texting-opt-in"`.

**Known Browser-pane quirk:** after a full page reload (`location.href = ...` or `navigate()`), screenshots sometimes render at a tiny/wrong size. Workaround: close the tab and `preview_start` a fresh one, then `resize_window` to 1280x900 before screenshotting. Client-side navigation (`history.pushState` + `popstate` dispatch, or clicking links) doesn't have this problem.

## Routes / pages
| Route | File | What it is |
|---|---|---|
| `/` | `pages/Home.jsx` | Landing page linking to every screen |
| `/signup` | `pages/ResidentSignUp.jsx` | Resident sign-up form with consent checkboxes — checkboxes only appear if enabled in admin |
| `/admin/texting` | `pages/AdminTextingPreferences.jsx` | Admin toggles for informational/promotional disclaimers, company name, policy URLs |
| `/templates/:folderSlug` | `pages/templates/TemplateListPage.jsx` | Text template register (folder sidebar + table); clicking a row or "Add Template" opens the template details/add overlay |
| `/bulk/informational`, `/bulk/promotional` | `pages/bulk/BulkFlow.jsx` | Tenants register → Send Text → template picker → Bulk Text composer → override dialog → sent confirmation |

## Key connected behaviors (the "cohesive" part)
- **Admin ↔ Sign-up:** toggling a disclaimer off in `/admin/texting` removes that checkbox entirely from `/signup` (shared React Context in `state/PreferencesContext.jsx`).
- **"View Joint Texting Consent Disclaimer"** on the admin page opens `DisclaimerModal.jsx` — this is the only way to see that modal (not triggered by checking boxes on sign-up).
- **Bulk flow ties into consent data:** `data/tenants.js` has per-tenant `consent: {informational, promotional}` and `phoneStatus` (verified/invalid/pending/sms, driving the colored phone icons). The composer auto-excludes opted-out tenants by default; including them anyway triggers the override dialog.
- **Send Text → template picker** pulls live from `data/templateFolders.js` (the same data backing the Text Templates register), including a "‹ New Text ›" option.
- **Saving a new template** in the Text Templates "Add Template" flow actually appends a row to that folder's register (local state, not persisted to the data file).
- **Command Launch** search in the header (`components/shell/AppHeader.jsx`, index in `data/commandIndex.js`) is a real command palette — typing "text templates" or "system preferences" navigates there.
- **Checkboxes/phone-status icons on the Tenants register** only appear after choosing "Send Text" from the Bulk Actions menu (`selectionMode` state in `BulkFlow.jsx`) — not visible on the default register view.

## Design fidelity notes
- Register table headers (`bg-[#737373]`, white Roboto Medium, `tracking-[1.134px]`) match the real "Header" component used across all data tables/registers in the file.
- Phone status icons (`assets/phone-{sms,verified,invalid,pending}.svg`) are the actual exported SVGs from the Tenants Register frame.
- The Bulk Text composer (`components/bulk/BulkTextComposerModal.jsx`) and Send Text picker (`components/bulk/TemplatePickerModal.jsx`) were rebuilt to match specific Figma frames the user linked (nodes `2850:43602` and `3000:28644` in the file above) — addressee table scrolls after 5 rows, Primary/Contact Types radios, Attachments row, etc.
- Several asset SVGs are cached locally in `src/assets/` (icons + a couple of PNG mockup screenshots) since Figma's exported asset URLs expire after ~7 days — don't re-fetch from Figma unless something's visibly broken.

## Open threads / things not yet done
- Only two Text Template folders have real data: `renewal-retention` and `maintenance-repairs` (in `data/templateFolders.js`). Other folders in the sidebar are empty/navigable but show "No text templates in this folder yet."
- No persistence across page reloads — all state (admin toggles, added templates, sent texts) resets on refresh since there's no backend/localStorage.
- The bulk-texting wizard's "Override Opted Out Phone Numbers" dialog and the "Text sent" confirmation exist but haven't been checked against a specific Figma frame the way the composer/picker were — built from the original page-level fetch early in the project.

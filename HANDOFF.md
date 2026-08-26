# Handoff: Texting Marketing Opt-In Prototype

## What this is
A working React prototype of the "Texting: Marketing Opt-In" feature, built to match a Figma file pixel-for-pixel where the user provided specific frame links. Simulates a Rent Manager-style property management app: resident consent checkboxes, admin controls, and a text template library — all genuinely wired together (not just static screens).

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

## Key connected behaviors (the "cohesive" part)
- **Admin ↔ Sign-up:** toggling the disclaimer off in `/admin/texting` removes the consent checkbox entirely from `/signup` (shared React Context in `state/PreferencesContext.jsx`).
- **"View Texting Consent Disclaimer"** link and the info icon (short contextual tooltip) on the admin page both relate to `DisclaimerModal.jsx`, but only the link opens the full legal text — the info icon shows a separate short tooltip.
- **Saving a new template** in the Text Templates "Add Template" flow actually appends a row to that folder's register (local state, not persisted to the data file).
- **Command Launch** search in the header (`components/shell/AppHeader.jsx`, index in `data/commandIndex.js`) is a real command palette — typing "text templates" or "system preferences" navigates there.

## Design fidelity notes
- Register table headers (`bg-[#737373]`, white Roboto Medium, `tracking-[1.134px]`) match the real "Header" component used across all data tables/registers in the file.
- Several asset SVGs are cached locally in `src/assets/` (icons + a couple of PNG mockup screenshots) since Figma's exported asset URLs expire after ~7 days — don't re-fetch from Figma unless something's visibly broken.

## Deployment
- Live prototype: https://sydney-holzbach.github.io/Marketing-Texting-Opt-In-Flow/
- GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`. It has occasionally not auto-triggered on push — if the live site doesn't reflect a new push after a minute or so, run `gh workflow run deploy.yml --repo sydney-holzbach/Marketing-Texting-Opt-In-Flow --ref main` to trigger it manually.
- Vite `base` and the router `basename` are only set during production builds (`command === 'build'`), so local dev stays at `/`.

## Open threads / things not yet done
- Only two Text Template folders have real data: `renewal-retention` and `maintenance-repairs` (in `data/templateFolders.js`). Other folders in the sidebar are empty/navigable but show "No text templates in this folder yet."
- No persistence across page reloads — all state (admin toggles, added templates) resets on refresh since there's no backend/localStorage.
- The bulk-texting wizard (tenant register, Send Text composer, template picker, override dialog, per-recipient preview) was removed from the prototype at the user's request.

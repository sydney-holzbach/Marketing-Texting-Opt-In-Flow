# Handoff: Texting Marketing Opt-In Prototype

## What this is
A working React prototype of the "Texting: Marketing Opt-In" feature, built to match a Figma file pixel-for-pixel where the user provided specific frame links. Simulates a Rent Manager-style property management app: resident consent checkboxes, admin controls, a text template library, and a tenant profile screen — all genuinely wired together (not just static screens).

**Figma source:** https://www.figma.com/design/DrN8nTLn8jTuA3A5VeAWdg/Texting--Marketing-Opt-In
**Project location:** `/Users/sydneyholzbach/Desktop/marketing-texting-opt-in`
**Stack:** Vite + React 19 + React Router + Tailwind v4 (no other UI libraries)
**Git/GitHub:** the project directory is a git repo, remote `origin` → https://github.com/sydney-holzbach/Marketing-Texting-Opt-In-Flow (public). Git identity is set globally on this machine (`sydney-holzbach` / a GitHub noreply email) since none existed before. Push access is via `gh` CLI auth (already logged in as `sydney-holzbach`), not SSH keys.

## Running it
Node/npm were not preinstalled on this Mac — installed via Homebrew at `/opt/homebrew/bin` and added to `~/.zprofile` (`eval "$(/opt/homebrew/bin/brew shellenv)"`). New terminal sessions should have `node`/`npm` on PATH automatically; if not, prefix commands with `export PATH="/opt/homebrew/bin:$PATH"`. Same applies to `gh` (also installed via Homebrew).

```bash
cd /Users/sydneyholzbach/Desktop/marketing-texting-opt-in
npm run dev
```

A `.claude/launch.json` already exists at the Desktop level (one directory up) configured to run this via the Browser pane's `preview_start` tool with `name: "marketing-texting-opt-in"`, fixed to port 5183. If that port is already claimed by another chat's server, just `preview_start` with `{url: "http://localhost:5183"}` instead of `{name: ...}` to attach to the existing one rather than fighting over the port.

**Known Browser-pane quirk:** after a full page reload (`location.href = ...` or `navigate()`), screenshots sometimes render at a tiny/wrong size. Workaround: close the tab and `preview_start` a fresh one, then `resize_window` to 1280x900 before screenshotting. Client-side navigation (`history.pushState` + `popstate` dispatch, or clicking links) doesn't have this problem.

**Testing tip:** small icon-button targets (e.g. info icons) are sometimes missed by the `computer` click tool. When a click doesn't seem to register, dispatch a real `MouseEvent('click', ...)` via `javascript_tool` on the element instead — much more reliable for this app's compact controls. Also, React state updates aren't visible to a `document.body.innerText.includes(...)` check made in the *same* `javascript_exec` call right after a `dispatchEvent` — add a short `await` or check in a follow-up call.

## Routes / pages
| Route | File | What it is |
|---|---|---|
| `/` | `pages/Home.jsx` | Landing page linking to every screen (no AppHeader/Command Launch on this page — it's a standalone landing page) |
| `/signup` | `pages/ResidentSignUp.jsx` | Resident sign-up form with a single consent checkbox — only appears if enabled in admin |
| `/admin/texting` | `pages/AdminTextingPreferences.jsx` | Admin toggle for the texting opt-in disclaimer, company name, policy URLs |
| `/templates/:folderSlug` | `pages/templates/TemplateListPage.jsx` | Text template register (folder sidebar + table); clicking a row or "Add Template" opens the template details/add overlay |
| `/tenants/charlie-apegian` | `pages/TenantProfile.jsx` | Tenant record screen (scoreboard, leases, contacts, history/notes, transactions, recurring charges) — reachable by searching "Charlie Apegian" in Command Launch |

## Key connected behaviors (the "cohesive" part)
- **Admin ↔ Sign-up:** toggling the disclaimer off in `/admin/texting` removes the consent checkbox entirely from `/signup` (shared React Context in `state/PreferencesContext.jsx`, single `showInformationalDisclaimer` flag).
- **Disclaimer surfacing is split in two:** the info icon next to the checkbox on the admin page shows a short contextual tooltip (click-to-toggle, click-outside-to-close); the separate "View Texting Consent Disclaimer" link opens the full `DisclaimerModal.jsx` legal text. Don't merge these back into one — that was an explicit design change partway through.
- **Saving a new template** in the Text Templates "Add Template" flow actually appends a row to that folder's register (local state, not persisted to the data file).
- **Command Launch** search in the header (`components/shell/AppHeader.jsx`, index in `data/commandIndex.js`) is a real command palette — substring match against `label`, typing e.g. "text templates", "system preferences", or "charlie apegian" navigates there. Note `pages/Home.jsx` doesn't render `AppHeader`, so Command Launch isn't reachable from `/`.

## Design fidelity notes
- Register table headers (`bg-[#737373]`, white Roboto Medium, `tracking-[1.134px]`) match the real "Header" component used across all data tables/registers in the file — this is the *main* register style. The tiles on `TenantProfile.jsx` (Leases/Contacts/History/Transactions/Recurring Charges) intentionally use a different, lighter "tile-embedded register" header style (white bg, thin bottom border, dark text) per that specific Figma frame — don't unify the two styles.
- Several asset SVGs are cached locally in `src/assets/` since Figma's exported asset URLs expire after ~7 days — don't re-fetch from Figma unless something's visibly broken. Small glyph icons that aren't worth a Figma round-trip (home, apartment, mail, phone, kebab, open-in-new, chevron) are inline `<svg>` components instead — see `pages/TenantProfile.jsx` for the pattern to reuse.
- Decorative, non-functional dropdown carets use the `▾` HTML entity (`<span className="text-xs">&#9662;</span>`) rather than an icon asset — an established convention across the app (Bulk Actions-style buttons, tab dropdowns, etc.).

## Deployment
- Live prototype: https://sydney-holzbach.github.io/Marketing-Texting-Opt-In-Flow/
- GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`. **It has repeatedly not auto-triggered on push** (no workflow run appears for several of the most recent commits, for no obvious reason — workflow is `active`, no path filters). Standing workaround: after pushing, wait ~10s and check `gh api repos/sydney-holzbach/Marketing-Texting-Opt-In-Flow/actions/runs --jq '.workflow_runs[0].head_sha'` against your commit sha; if it doesn't match, run `gh workflow run deploy.yml --repo sydney-holzbach/Marketing-Texting-Opt-In-Flow --ref main` to trigger it manually, then verify the live JS bundle hash via `curl -s ".../?check=$(date +%s)" | grep -o 'index-[A-Za-z0-9_-]*\.js'` matches your local `npm run build` output. This is worth actually debugging at some point (repo Settings → Actions, or workflow YAML) rather than working around forever.
- Vite `base` and the router `basename` (in `src/main.jsx`, `import.meta.env.BASE_URL.replace(/\/$/, '')`) are only set during production builds (`command === 'build'`), so local dev stays at `/`. The trailing-slash strip on `basename` is load-bearing — without it, React Router silently fails to match any route under the GitHub Pages subpath and the deployed site renders blank with no visible error (only a console warning).
- `public/404.html` + the redirect script in `index.html` implement the standard "SPA on GitHub Pages" trick so deep links (e.g. `/signup`) don't 404 on direct load/refresh.
- Browser-pane caching gotcha (testing only, not a real bug): the Browser pane's HTTP cache respects GitHub Pages' `Cache-Control: max-age=600` on `index.html`, so re-navigating to the live URL in the *same* browser session within ~10 minutes of a previous deploy can silently serve a stale bundle. Append a cache-busting query string (`?v=...`) when verifying a fresh deploy.

## Open threads / things not yet done
- Only two Text Template folders have real data: `renewal-retention` and `maintenance-repairs` (in `data/templateFolders.js`). Other folders in the sidebar are empty/navigable but show "No text templates in this folder yet."
- No persistence across page reloads — all state (admin toggle, added templates) resets on refresh since there's no backend/localStorage.
- The bulk-texting wizard (tenant register, Send Text composer, template picker, override dialog, per-recipient preview) was built, iterated on extensively, and then removed entirely at the user's request. Don't resurrect pieces of it without checking — the underlying data model (`data/tenants.js`) is gone.
- The GitHub Actions auto-deploy-on-push flakiness above is unresolved.

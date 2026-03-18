# Portfolio List — Functional Spec

Project list page for browsing, filtering, sorting, and managing projects in a portfolio. Clicking a project navigates to its **Project Homepage**. A three-dot menu provides **Edit Project** and deletion.

---

## 1. Datasets & Auth

Multiple datasets (e.g. "Acme Corp", "MC Thailand", "NLM"). Only public datasets are visible by default; restricted datasets are AES-256-GCM encrypted in the bundle.

- [ ] Lock icon in the proto bar toggles an inline password field
- [ ] Correct password decrypts restricted datasets and adds them to the data switcher
- [ ] Clicking the unlocked icon immediately revokes access and switches to the default dataset
- [ ] Auth expires after 30 minutes; page refresh also resets auth
- [ ] Active dataset is preserved when navigating to detail/edit pages and back

## 2. View Modes

Two view modes toggled by a segmented control: **Table** (default) and **Card Grid**.

- [ ] Toggling preserves search and filter state
- [ ] Active view persists across navigation

## 3. Search

Text input filters projects by name, description, or creator (case-insensitive substring).

- [ ] Filtering is immediate (on keystroke)
- [ ] Empty search shows all projects

## 4. Sort

Sort applies to the active view. Keys: Date (default, descending), Name, Creator, and each dimension.

- [ ] Sort field and direction are selectable
- [ ] In table view, clicking a column header toggles sort on that column

## 5. Filtering by Dimension

Each dimension has a filter popover listing distinct values as checkboxes. Multiple values per dimension (OR within, AND across).

- [ ] Popover shows a count badge when filters are active
- [ ] Active filter chips appear inline and are individually dismissible
- [ ] "Clear all" removes all active filters

## 6. Sort & Filter Panel

Collapsible panel toggled by "Sort & Filter" button. Contains sort controls, filter popovers, and Dimension Manager access.

- When closed, active filter chips still appear inline
- Gear icon inside the panel opens the Dimension Manager

## 7. Column Chooser (Table Only)

Dropdown of checkboxes for each dimension. Fixed columns (Project Name, Creator, Modified) are always visible.

- [ ] Badge shows count of hidden dimensions

---

## 8. Table View

### 8.1 Row Layout

Each row: project name, description (up to 2 lines), version summary, creator, modified date, dimension values, three-dot menu.

- [ ] Name truncates when collapsed; shows full text when expanded
- [ ] Description shows up to 2 lines when collapsed; full text when expanded
- [ ] Row click navigates to the Project Homepage

### 8.2 Version Summary Toggle

Below the description: current version name, chevron, "N older" count.

- [ ] Click toggles the inline version panel (no navigation)
- [ ] Only one row expanded at a time

### 8.3 Expanded Version Panel

Full-width sub-row with:

- **Version list** — newest first; most recent labeled "active"; shows name and date
- **Rename** — pencil icon on hover; inline edit with Save/Cancel; Escape cancels
- **Add version** — "+ New Version" opens inline form

- [ ] New version appears at top as active, dated today
- [ ] All version interactions stay within the panel

### 8.4 Three-Dot Menu

- **Edit project** navigates to Edit Project page
- **Delete project** removes immediately (no confirmation)
- [ ] Menu closes on outside click

---

## 9. Card Grid View

Responsive grid (1 → 2 → 3 columns). Each card: name, description, dimension tags as colored pills, creator, modified date, version toggle.

- [ ] Card click navigates to Project Homepage
- [ ] Version toggle expands/collapses version list (no navigation)
- [ ] Expanded list supports same Add and Rename interactions as table view

---

## 10. Dimension Manager

Accessible via gear icon in Sort & Filter panel.

### 10.1 Dimension List

Each dimension: color dot, name, type, option count (dropdown), Edit/Delete buttons.

### 10.2 Add Dimension

Fields: Name, Type (Free Text/Dropdown), Options (comma-separated, dropdown only), Color (palette).

- [ ] New dimension appears immediately in filters, sort, columns, and tags
- [ ] Visible by default in column chooser

### 10.3 Edit Dimension

Same form as Add, pre-filled. Changes take effect immediately.

### 10.4 Delete Dimension

- [ ] Removes from all filters, columns, sort options, and tags
- [ ] Clears any active filters on the deleted dimension

---

## 11. Data Model

### Project

| Field        | Type                   | Description                      |
|--------------|------------------------|----------------------------------|
| id           | string                 | Unique identifier                |
| name         | string                 | Display name                     |
| description  | string                 | Free-text description            |
| creator      | string                 | Author name                      |
| lastModified | string (date)          | ISO date of last modification    |
| tags         | Record<string, string> | Dimension ID → value             |
| versions     | Version[]              | Ordered list, last = most recent |

### Version

| Field | Type          | Description          |
|-------|---------------|----------------------|
| id    | string        | Unique identifier    |
| name  | string        | User-assigned label  |
| date  | string (date) | ISO date of creation |

### Dimension

| Field   | Type                 | Description                              |
|---------|----------------------|------------------------------------------|
| id      | string               | Unique identifier                        |
| name    | string               | Display label                            |
| type    | "text" \| "dropdown" | Free text or constrained options         |
| options | string[]             | Allowed values (dropdown type only)      |
| color   | string               | Color token for pills and filter styling |

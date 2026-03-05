# Portfolio List — Functional Spec

The project list page for browsing, filtering, sorting, and managing projects in a portfolio. Clicking a project navigates to its **Project Homepage** (separate spec). A three-dot menu provides access to **Edit Project** (separate spec) and deletion.

---

## 1. View Modes

Two view modes toggled by a segmented control in the toolbar: **Table** (default) and **Card Grid**.

- [ ] Table is the default view on first load
- [ ] Toggling preserves the current search and filter state
- [ ] Active view mode persists across forward/back navigation

## 2. Search

A text input that filters projects by name, description, or creator (case-insensitive substring match).

- [ ] Filtering is immediate (on keystroke)
- [ ] Empty search shows all projects
- [ ] Search value persists across navigation

## 3. Sort

Sort applies to the active view. Available sort keys: Date (default, descending), Name, Creator, and each dimension.

- [ ] Sort field and direction (asc/desc) are selectable
- [ ] In table view, clicking a column header toggles sort on that column
- [ ] Sort state persists across navigation

## 4. Filtering by Dimension

Each dimension has a filter popover listing its distinct values as checkboxes. Multiple values can be selected per dimension, and multiple dimensions can be filtered simultaneously (AND across dimensions, OR within a dimension).

- [ ] Popover shows a count badge when filters are active
- [ ] Active filter chips appear inline and can be individually dismissed
- [ ] "Clear all" removes all active filters
- [ ] Filter state persists across navigation

## 5. Sort & Filter Panel

The sort controls, filter popovers, and access to the Dimension Manager live in a collapsible panel toggled by a "Sort & Filter" button.

- When the panel is closed, active filter chips still appear inline next to the toggle button
- A gear icon inside the panel opens the Dimension Manager

- [ ] Panel open/closed state persists across navigation

## 6. Column Chooser (Table View Only)

A columns button opens a dropdown of checkboxes for each dimension. Toggling a dimension shows/hides its column in the table. Fixed columns (Project Name, Creator, Modified) are always visible.

- [ ] Badge shows count of hidden dimensions
- [ ] Visible columns persist across navigation

---

## 7. Table View

### 7.1 Row Layout

Each row shows: project name, description (up to 2 lines), version summary, creator, modified date, dimension values, and a three-dot menu.

- [ ] Project name truncates with ellipsis when collapsed; shows full text when version panel is expanded
- [ ] Description shows up to 2 lines when collapsed; shows full text when expanded
- [ ] Row click navigates to the Project Homepage

### 7.2 Version Summary Toggle

Below the description, a small clickable line shows the current (most recent) version name, a chevron, and an "N older" count.

- [ ] Clicking the version summary toggles the inline version panel (does NOT navigate)
- [ ] Chevron rotates when expanded
- [ ] Only one row can be expanded at a time

### 7.3 Expanded Version Panel

When expanded, shows below the row in a full-width sub-row:

- **Version list** — newest first; most recent labeled "active"; each shows name and date
- **Rename** — hover reveals a pencil icon; clicking opens an inline edit field with Save/Cancel; Escape cancels
- **Add version** — "+ New Version" button opens an inline form with name input, Save, and Cancel

- [ ] New version appears at the top of the list as the new active version
- [ ] New version date is set to today
- [ ] Rename updates the version name in place
- [ ] All version interactions stay within the expanded panel (no navigation)

### 7.4 Three-Dot Menu

A vertical ellipsis button at the end of each row (click does not trigger row navigation).

- **Edit project** → navigates to the Edit Project page (separate spec)
- **Delete project** → removes the project from the list immediately

- [ ] Menu closes on outside click
- [ ] Delete removes the row without confirmation

---

## 8. Card Grid View

Responsive grid (1 col → 2 col → 3 col at breakpoints). Each card shows: project name, description, dimension tags as colored pills, creator, modified date, and a version toggle.

### 8.1 Card Click

- [ ] Clicking the card navigates to the Project Homepage

### 8.2 Version Toggle

A button in the bottom-right of the card showing the active version name, chevron, and older count.

- [ ] Clicking the version toggle expands/collapses the version list (does NOT navigate)
- [ ] Expanded version list supports the same Add and Rename interactions as the table view

---

## 9. Dimension Manager

Accessible via the gear icon inside the Sort & Filter panel. Manages the set of dimensions used for filtering, sorting, and display.

### 9.1 Dimension List

Each dimension shows: color dot, name, type (text or dropdown), option count for dropdowns, and Edit/Delete buttons.

### 9.2 Add Dimension

- Fields: Name, Type (Free Text or Dropdown), Options (comma-separated, shown only for Dropdown), Color (palette picker)
- [ ] New dimension appears in filters, sort options, table columns, and card tags immediately
- [ ] New dimension is visible by default in the column chooser

### 9.3 Edit Dimension

- Same form as Add, pre-filled with current values
- [ ] Changes to name, type, options, or color take effect immediately

### 9.4 Delete Dimension

- [ ] Removes the dimension from all filters, columns, sort options, and card tags
- [ ] Any active filters on the deleted dimension are cleared

---

## 10. Data Model

### Project

| Field        | Type                   | Description                        |
|--------------|------------------------|------------------------------------|
| id           | string                 | Unique identifier                  |
| name         | string                 | Display name                       |
| description  | string                 | Free-text description              |
| creator      | string                 | Author name                        |
| lastModified | string (date)          | ISO date of last modification      |
| tags         | Record<string, string> | Dimension ID → value               |
| versions     | Version[]              | Ordered list, last = most recent   |

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

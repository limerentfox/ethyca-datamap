
## 🚀 How to Run the Project

Pull down the project and navigate to the project directory:

```bash
git clone git@github.com:limerentfox/ethyca-datamap.git
cd ethyca-datamap
```

Install dependencies and run the local dev server:

```bash
npm install
npm run dev
```

Once running, you'll see a local URL in your terminal such as:

```
http://localhost:5173/
```

Open this in your browser to explore the locally hosted application.

---

## ⏱️ Time Spent

I spent a little over **four hours** on this project.
Apologies — I know you asked for a maximum of four hours, but I got carried away with some of the UI polish and interactive detail.

---

## 🔍 Assumptions Made

* **One-to-one system-dependency mapping**: I assumed `system_dependencies` listed under a system are direct, directional relationships and not bidirectional unless explicitly specified.
* **Privacy Declarations**: Multiple declarations per system can exist, each with different data uses and categories. These are flattened and deduplicated at the leaf level (e.g. `location`).
* **No dynamic backend or API**: All data is assumed to be static and provided via `sample_data.json`. There's no server-side logic or state persistence.
* **Visual focus over data completeness**: Some edge cases like systems with no privacy declarations or dependencies are still displayed for completeness, but deprioritized in the UX hierarchy.
* **Filter and Dependency Isolation**: When filters are applied, dependency highlighting is disabled to avoid overlapping visibility logic and maintain clarity.


---

## ⚖️ Trade-offs Made

* **Grid layout over force graph**: While a force-directed graph provides a more dynamic relationship map, I prioritized a clean and readable grid layout for the MVP to ensure clarity, quick scanning, and mobile responsiveness. The architecture is modular enough to support adding a graph mode later.

* **No persisted state**: I chose not to implement URL-based filters or localStorage for expanded state or selections to keep the scope tight and the logic simple.

* **No dependency arrows (yet)**: Drawing directional arrows between systems would’ve required an SVG or canvas layer, which is overkill for a first version. Highlighting dependency cards was a simpler, faster way to show relationships.

* **Single-direction dependencies only**: Reverse dependency tracing (i.e. “what systems depend on this one?”) was not included to reduce UX complexity, but could be added later.

* **Basic animations only**: Tailwind transitions were used instead of more robust animation libraries like `framer-motion` to keep bundle size down and setup light.

---

## ✨ Project features

### 🧠 Data Model & Normalization

* Parses and normalizes raw `sample_data.json` into a clean internal format.
* Extracts system `name`, `type`, `description`, and unique values for:

  * `dataUses` (e.g. `advertising.third_party`)
  * `dataCategories` (leaf nodes only, e.g. `location`)
  * `systemDependencies` (e.g. `"app_database"`)
* Removes deeply nested prefixes in category paths for readability.

---

### 📊 Interactive Data Map UI

#### ✅ Grid-Based Visualization

* Systems are displayed in a **responsive grid layout**, grouped by `system_type` (e.g., Application, Integration).
* Each system card shows:

  * System **name**
  * Expandable **description**
  * List of **data categories** as tags

#### ✅ Filter Controls

* Dropdown filters for:

  * **Data Use**
  * **Data Category**
* Filters update the layout live and clear any active dependency highlights.

#### ✅ Expandable Descriptions

* Click on a system header to toggle its **description accordion**
* Multiple cards can be expanded at once
* Smooth expand/collapse animation using Tailwind transitions

---

### 🧭 System Dependency Highlights

#### 🔗 "See Dependencies" Button

* Available when **no filters are active**
* Clicking:

  * Highlights all systems listed in the current system's `system_dependencies`
  * Hides all unrelated systems and groups for focus
  * Changes button to **“Hide Dependencies”**
* Clicking **“Hide Dependencies”** resets the view to show all systems

#### 🧼 Clean Logic & UX Safeguards

* Only **one** system can show dependencies at a time
* The system that triggered the highlight is **never hidden**
* Highlighted systems **do not show** their own dependency buttons

---

### 🎨 Styling & Transitions

* **TailwindCSS** for clean, responsive UI
* Transitions for:

  * Accordion toggle
  * Dependency highlight (with border and scale)
  * Filter changes (grid and card visibility)
* Responsive layout using `grid-cols` for mobile → desktop scaling
* Semantic color-coding for action buttons (green = show, red = hide)

---

## 🎨 UI/UX Decisions

### 🧭 Grid Layout for Clarity

* Chose a **grid-based layout grouped by system type** to mirror the mental model of technical stakeholders: apps, services, integrations, and databases grouped separately improves scannability.
* Avoided overloading users with a dense or overly abstract visualization like a force graph in the MVP — instead prioritized simplicity, familiarity, and clean group separation.

### 🎯 Progressive Disclosure

* Used **accordion-style toggles** to show system descriptions only when needed, reducing visual clutter while still making detailed information accessible on demand.

### 🪄 Contextual Interactions

* **"See Dependencies"** button only appears when no filters are active — this reduces confusion by preventing users from viewing incomplete or misleading dependency chains when filters are applied.
* Only one system can show dependencies at a time to reduce cognitive load and ensure users clearly understand which system's dependencies they are viewing.

### 🎨 Visual Highlighting Instead of Complex Lines

* Rather than using arrows or connection lines (which can get visually messy), dependent systems are **visually highlighted** with subtle animations (scale + background color).
* This creates clear visual grouping without sacrificing layout consistency or requiring heavy SVG logic.

### 🎛️ Filters Designed for Discoverability

* Filters appear at the top in a common UX pattern (two dropdowns side-by-side), allowing users to slice the system map by data use or category.
* Responsive updates ensure immediate feedback, making the app feel reactive and intuitive.

### 📱 Mobile-Responsive Design

* Tailwind grid layout ensures the UI works well from mobile to desktop (`grid-cols-1` → `grid-cols-3`).
* Touch-friendly hit targets (buttons, dropdowns, toggles) improve usability on all screen sizes.

### ✨ Feedback-Driven Interaction

* Button color and text dynamically reflect state (“See Dependencies” → “Hide Dependencies”).
* Transitions and subtle animations are used to **convey state changes clearly** — no sudden layout jumps or jarring visual shifts.

---

## 🛠️ Improvements with More Time

Given additional time, here are the areas I would focus on to improve structure, usability, and robustness:

### 🧩 Break `GridDataMap` into Subcomponents

* **Why**: Improves readability, reusability, and testability by isolating responsibilities (e.g. `SystemCard`, `SystemGroup`, `DependencyToggleButton`, `DescriptionAccordion`).
* Makes each file easier to maintain and scale as new features are added (e.g. system-level modals, copy-to-clipboard).

---

### 🧼 Extract Utility Functions

* Move filtering logic, category flattening, and grouping into utility modules to:

  * Promote **separation of concerns**
  * Simplify component logic
  * Improve reuse across future components (e.g. force-graph, exports)

---

### 🎨 Enhanced UI/UX

* Use **custom-styled dropdowns** (e.g. Headless UI or Radix) for a more accessible and polished filter experience.
* Add a **“Reverse Dependencies”** button to show systems that depend on the current system — helpful for visualizing upstream relationships.
* Add global controls to **expand/collapse all**, clear filters, or “Show All Dependencies” across the map.

---

### 🌐 Toggle Between Grid & Graph Views

* Offer a **toggle between the current grid layout and a force-directed graph** (using D3 or `react-force-graph`) for:

  * Different mental models of system relationships
  * More intuitive understanding of complex dependency chains

---

### ✅ Add Tests

* Add **unit tests** for:

  * Normalization logic
  * Filter behavior
  * Dependency highlighting logic
* Add **integration tests** to ensure UI flows (e.g. toggling, filtering, resets) work as expected
* Include **security-focused tests** (e.g. sanitizing system names/descriptions to prevent XSS), especially since the app deals with user-generated metadata


## 💬 Challenge Feedback

First off — thank you! This was one of the most thoughtfully open-ended and well-scoped take-home challenges I’ve worked on.

### 🙌 What Went Well

* I appreciated the **freedom to choose the stack** and interpret the problem creatively — it made the project genuinely fun to build.
* The focus on **incremental progress and code quality over completion** mirrors good engineering practices and gave me room to make design trade-offs intentionally.
* The inclusion of real-world context (Article 30 compliance, system dependencies, data uses/categories) made the problem feel practical and meaningful — not just a toy UI.

### 🧠 What Could Be Improved

* The term "data map" could benefit from an extra sentence or visual to clarify what you envision (grid? graph? hybrid?).
* The description hints at inter-system relationships (dependencies) but doesn't specify whether to show them visually (with arrows, graphs) or conceptually (highlighting) — a small clarification here would help candidates align with your goals faster.
* Including information help candidates understand the level of fidelity you’re looking for, especially around UX.

### 💡 Suggestions
* A small scoring rubric or priority list (e.g., filters > layout > polish) might help with time management during the 4-hour cap.

---

# S.S.E.E. Local Design System

This folder is the shared foundation for every local requirement demo. The
approved Ali shell is the canonical visual template: sidebar, reference-zero
header, filters, CRUD table, actions, footer, modal and toast behavior are
implemented once in `app.css` and consumed by all modules.

Requirement screens may add only their own fields, data, states and actions.
They must not create a second shell, a second spacing scale, or a parallel
component vocabulary.

- `tokens.css`: shared color, spacing, radius and shadow tokens.
- `components.css`: reusable technical navigation, toast and status helpers.
- `app.css`: canonical S.S.E.E. shell and CRUD layout.
- `interaction.js`: shared toast, tooltip, menu and confirmation behavior.

The baseline uses Bootstrap 5, Font Awesome CDN, compact `rem` sizing, the
reference-zero header, upper-right toasts, standardized confirmation modals,
and the technical `Volver al índice` navigation for local demos.

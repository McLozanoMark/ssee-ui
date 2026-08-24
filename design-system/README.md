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
- `messages.js`: shared analyst message catalog and parameter substitution.

All CRUD list filters use the same contract: one global search field, one
filter-toggle control, labelled advanced fields, and a shared action group with
`Buscar` as the primary action followed by `Limpiar` as the secondary action.
The filter toggle exposes `aria-expanded`, explicit submit/reset behavior, and
the standard `Filtros aplicados.` and `Filtros limpiados.` toasts. Filter
actions reuse the same canonical action-button component and height as header
and footer actions. The compact table scale must not create a smaller button
variant. The filter action group remains anchored to the right of the advanced
fields and moves to a full-width row on narrow screens.

The baseline uses Bootstrap 5, Font Awesome CDN, compact `rem` sizing, the
reference-zero header, upper-right toasts, standardized confirmation modals,
and the technical `Volver al índice` navigation for local demos.

Inter is the only shared system font. It is loaded through the shared
stylesheet and applied explicitly to the document, body and form controls;
individual demos must not replace it with another font. The footer is also a
shared component: it uses the compact footer scale, the official Ministry
mark, the same rem rhythm as the shell and the responsive size contract from
`app.css`. A demo may not add a larger local footer variant.

## Shared interaction rules

- Creation screens use the `Registrar ...` title. The `Nuevo ...` wording stays
  on the entry button only.
- A row may expose up to three contextual actions directly. When more than
  three actions are available for that row, use the shared dropdown pattern.
- Direct row actions use the shared action anatomy: Font Awesome icon above a
  short visible label. No module may create a smaller local action-button
  variant. A status switch is a state control and stays in the `Estado` column
  when that column supports binary activation.
- Row-action icons use the shared semantic color map while their labels retain
  the normal text color. Disabled action icons use the shared darker gray
  `--ssee-action-disabled` so the disabled state remains legible. Modules must
  not add one-off icon colors outside this map.
- Every visible table column except `Acciones` must be covered by a filter
  control or by the documented global search scope. Numeric, date, status, and
  enum columns require an explicit filter; free-text columns may share the
  global search only when its placeholder and accessible label identify them.
- Multi-step forms use the shared wizard pattern. Previous steps remain
  reachable when their validation allows it.
- The stepper communicates progress through the numbered steps and labels only;
  do not add a duplicated counter such as `Paso 2 de 2` at the right edge.
- In edit mode, `Guardar` saves the current step after the standard
  confirmation, keeps the user on that step, and shows the success toast.
- `Continuar` validates and advances. `Atrás` returns to the previous step.
  `Cancelar` exits the wizard and confirms when there are unsaved changes.

The message catalog was transcribed from Ali's shared workbook screenshot on
2026-08-19. The original XLSX remains the authoritative source if a wording or
classification differs from the transcription.

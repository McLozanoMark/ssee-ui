# S.S.E.E. Local Design System

This folder is the shared foundation for every local requirement demo. The
approved Ali shell is the canonical visual template: sidebar, reference-zero
header, filters, CRUD table, actions, footer, modal and toast behavior are
implemented once in `app.css` and consumed by all modules.

Requirement screens may add only their own fields, data, states and actions.
They must not create a second shell, a second spacing scale, or a parallel
component vocabulary.

All management trays are homologated. Every tray uses the same page heading,
global search and filter area, filter action group, table structure, row-action
anatomy, status treatment, pagination and footer rhythm from this system. A
module may change only its column names, filter fields, data and business
actions; it must not invent alternative button labels, sizes, placements or
interaction patterns. Any improvement agreed for one tray is a shared-system
change and must be checked across every tray before delivery.

- `tokens.css`: shared color, spacing, radius and shadow tokens.
- `components.css`: reusable technical navigation, toast and status helpers.
- `app.css`: canonical S.S.E.E. shell and CRUD layout.
- `demo-navigation.js`: canonical external `Volver al índice` control for
  every local demo.
- `interaction.js`: shared toast, tooltip, menu and confirmation behavior.
- `table-sort.js`: shared sortable-table behavior and accessibility state.
- `messages.js`: shared analyst message catalog and parameter substitution.

## Modal Header Contract

Every modal uses one immutable header structure. The header contains exactly
one explicit icon, one `h2.modal-title`, and the Bootstrap close control in a
single horizontal row:

```html
<div class="modal-header">
  <span class="modal-title-icon" aria-hidden="true"><i class="fa-solid fa-circle-question"></i></span>
  <h2 class="modal-title" id="modalTitle">Título aprobado</h2>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
</div>
```

The icon size, icon treatment, gap, header height, typography and vertical
alignment come from the shared tokens and `app.css`. Modal-specific code may
change the approved icon and title, but may not add an eyebrow, subtitle,
second title, local spacing, pseudo-element icon or runtime icon injection.
Changing the modal width or body layout never changes this header contract.

## Authenticated Demo Profile

Every authenticated demo uses the same synthetic current user in its header:
`Ana Paredes`. The shared demo-navigation component applies this value to
`.account-copy` and `#accountName` so a requirement-specific flow cannot show a
different session user. The role line remains the approved role for that shell.

## Inactivation Reason Contract

Every explicit user action that changes a record from active to inactive uses
the shared confirmation modal and requires a free-text reason. The reason is
entered in the standard shared textarea, is limited to 240 characters and is
not required when activating a record. The field is shown only for the
inactivation branch and uses the existing textarea size and validation scale
from `app.css`.

This rule applies to roles, users, autoregistration configurations and data
sources, including their duplicated requirement flows. It does not apply to
automatic expiry, external Passport state changes, cancellations or other
non-inactivation lifecycle events.

The supporting decision register and requirement traceability matrix are kept
with the demos so that an analyst observation becomes one explicit system rule
and its affected screens are visible before implementation:

- `DECISION-REGISTER.md`: approved cross-module decisions and documented
  exceptions.
- `../qa/traceability/TRACEABILITY-MATRIX.md`: requirement, source, affected
  demos, implementation status and verification evidence.

## Mandatory implementation protocol

Before changing any demo, inspect the approved design-system components,
decisions and established reference flows, then reuse them as the source of
truth. A new element or component is allowed only when the required element
does not exist yet; it must first be defined in the shared design-system layer
and then consumed by the affected demos. Legacy implementations must never be
used as a source or visual reference. One-off patches, local component
variants and isolated visual overrides are prohibited; changes must be made at
the canonical source, rebuilt and audited across every affected demo.

Authentication demos follow the same rule: `auth.css` is the canonical shell
for the two-zone login and password surfaces, and `auth-guide.js` is the
canonical external presentation guide. A requirement-specific flow may change
its fields, state or branch, but it may not fork the shell or guide styling.
After a valid authentication, the shared flow exposes `Continuar` and renders
the current REF-017 welcome surface inside the same demo document. Passport and
identity-service steps are represented by guide copy; external login screens
and CAPTCHA are never recreated. The welcome structure and interaction are
shared, while the synthetic profile is selected by authentication type.

All CRUD list filters use the same contract: one global search field, one
filter-toggle control, labelled advanced fields, and a shared action group with
`Buscar` as the primary action. Every text or search field uses the shared
trailing `X` clear control when it has content. Resetting the complete filter
set uses the same shared icon-only `X` with an accessible tooltip; no filter
panel renders a visible `Limpiar` label. The filter toggle exposes
`aria-expanded`, explicit submit/reset behavior, and the standard
`Filtros aplicados.` and `Filtros limpiados.` toasts. Filter actions reuse the
same canonical action-button component and height as header and footer actions.
The compact table scale must not create a smaller button variant. The filter
action group remains anchored to the right of the advanced fields and moves to
a full-width row on narrow screens.

Every full-size form control uses the same `--ssee-control-height` contract:
inputs, selects, date-range triggers, regular buttons, filter controls and
pagination are `2.75rem` high. The binary status switch is the shared compact
exception at `1.75rem` high, with a fixed width and thumb geometry. Checkbox
and radio glyphs keep their native accessible size, but their selectable option
rows use the regular control height. The other compact exception is a row
action.
Icon-only internal utilities such as the trailing clear `X` remain part of
their parent component's geometry and must not be used to create local
form-control variants. Buttons outside action columns, including pagination
and filter actions, use the shared height.

When a flow offers alternative modalities in the same screen, use the shared
`.mode-tabs` component before the flow stepper. Each modality occupies the same
width, includes its icon before the label, and remains visible while its panel
is active. This component standardizes the mode choice only; it does not make
different business flows share steps that do not apply to them. For example,
user admission may expose `Carga individual` and `Carga masiva` at entry, while
data-source loading keeps its modality choice inside the documented `Origen y
carga` step.

When a tray searches by `Última actualización`, the advanced filter uses the
shared `date-range.js` calendar control with one summary field, two visible
months, and `Desde`/`Hasta` selection. The range is inclusive and rejects an
initial date after the final date. This rule applies only to that search field;
other dates keep their requirement-specific control.

The Gestión de usuarios tray applies the same shared range control to
`Último acceso`; it uses the same selection, validation, clear and reset
behavior across REF-003, REF-004 and REF-007.

The user-management tray is a shared presentation surface. `ref-007-users`,
`ref-003-passport`, and `ref-004-admision` load the same
`user-management.css` and the same tray structure; each flow may add only its
own guide or action behavior without changing the tray layout.

When a tray exposes a binary `Estado` column with `Activo`/`Inactivo`, its edit
form places exactly one shared compact status switch in the upper-right header.
Creation forms and modules with non-binary statuses do not add this control.

The baseline uses Bootstrap 5, Font Awesome CDN, compact `rem` sizing, the
reference-zero header, upper-right toasts, standardized confirmation modals,
and one shared technical `Volver al índice` navigation mounted by
`demo-navigation.js` in every local demo. It must not be replaced by a logo link,
an inline anchor, or a local class variant.

Inter is the only shared system font. It is loaded through the shared
stylesheet and applied explicitly to the document, body and form controls;
individual demos must not replace it with another font. The footer is also a
shared component: it uses the compact footer scale, the official Ministry
mark, the same rem rhythm as the shell and the responsive size contract from
`app.css`. A demo may not add a larger local footer variant.

## Shared interaction rules

- Creation screens use the generic `Registrar` title. The entry button uses the
  generic `Nuevo` label. Edit screens use `Editar`; entity context belongs in
  the breadcrumb, module title or supporting copy, not in repeated button or
  screen labels.
- A row may expose up to three contextual actions directly. When more than
  three actions are available for that row, use the shared dropdown pattern.
- Direct row actions use the shared action anatomy: Font Awesome icon above a
  short visible label. No module may create a smaller local action-button
  variant. Table action buttons have no permanent border or shadow; their
  compact hover state uses a subtle surface lift and shadow. The `Estado` column is informational and uses a status tag. A binary
  never place a switch in a data-table column, including `Estado` or
  `Acciones`. A row communicates state with a status tag and exposes `Editar`;
  activation or inactivation is available only in the record edit surface.
- Any activation or inactivation control uses the shared toggle switch only in
  the edit surface. The checked state represents `Activo` and the unchecked
  state represents `Inactivo`; never render `Activa`/`Inactiva`, `ON` or `OFF`
  as visible text. Disabled switches retain the visible `Activo`/`Inactivo`
  label in the neutral disabled treatment. States that
  are not binary, such as `Borrador`, `Por vencer`, `Vencido` or `Anulada`,
  remain status tags.
- Every record data grid begins with `N.°` as its first column, before the
  identifier or other record fields. Internal configuration matrices and
  selector tables keep their own semantic first column only when they are not
  record grids.
- An enabled unchecked switch uses the semantic danger tint to represent an
  available inactivation state. A disabled switch uses a neutral outlined
  silhouette with no thumb shadow while retaining its visible `Activo`/`Inactivo`
  label, so its state remains legible without suggesting it is actionable. The
  row status remains visible in the informational `Estado` tag.
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
- On the last wizard step, show only the primary `Guardar` action on the right;
  do not show `Siguiente`. In creation it completes the registration; in edit it
  saves the current step and keeps the user in the wizard.
- Wizard footer commands reuse the shared icons: arrow-left for `Atrás`, x-mark
  for `Cancelar`, floppy-disk for `Guardar`, and arrow-right for `Siguiente`.
- Any button that commits form data uses the generic label `Guardar`, regardless
  of the module or business flow. The title and supporting copy may explain the
  context, but the submit button must not use labels such as `Guardar cambios`,
  `Guardar rol`, `Guardar fuente`, `Guardar asignación`, `Reasignar`, or
  `Reemplazar unidad` when those actions are submitting form data.
- In every data table, `Acciones` is the final column, sized to its controls and
  aligned to the right edge. The remaining columns use the available width; no
  trailing blank area is introduced after the action controls.
- Data tables use the shared visual treatment: white rows, a subtle grid,
  compact pill-shaped tags and statuses, and the same compact pagination with
  the result count at left, page controls centered and page size at right.
- Every sortable data table uses the shared column-sort contract: sortable
  headers expose a visible sort indicator, toggle ascending/descending order,
  update `aria-sort`, and apply the correct type for text, numbers, dates and
  statuses. `Acciones` is excluded from sorting. A non-tabular matrix or an
  operational tray may be an exception only when it is recorded in the
  decision register.
- In edit mode, selecting another step with unsaved changes uses message `M70`:
  `Sí` saves the current step, shows the standard success toast and then moves
  to the selected step. `No` discards the unsaved changes and moves to the
  selected step without a toast. Creation wizards do not use this interception.
- Every confirmation modal uses exactly `No` for rejection and `Sí` for
  acceptance. Do not append contextual text such as `No, volver`,
  `No, cancelar` or `Sí, continuar`; the action context belongs in the modal
  message, not in the button label.
- Every custom-filter toggle uses the exact tooltip `Filtro Personalizado` and
  keeps its accessible action label for opening or closing the advanced filters.
- Modal headers use the shared compact treatment: the contextual icon sits
  before the title, the title and close control are vertically centered, and
  the header must not introduce oversized empty space. Confirmation icons do
  not appear in the modal body.

The message catalog was transcribed from Ali's shared workbook screenshot on
2026-08-19. The original XLSX remains the authoritative source if a wording or
classification differs from the transcription.

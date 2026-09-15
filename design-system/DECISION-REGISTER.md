# S.S.E.E. Decision Register

This register is the source of truth for cross-module decisions agreed with
the analysts and product owner. A rule recorded here applies to every current
and future demo unless an exception is explicitly listed.

## Approved Rules

| ID | Decision | Scope | Acceptance criterion |
| --- | --- | --- | --- |
| DS-001 | Use `Inter` as the only system font. | Entire system | No demo loads or declares Roboto, Arial, Helvetica or another UI font. |
| DS-002 | Use the homologated S.S.E.E. shell. | Entire system | Header, sidebar, breadcrumb, footer, official MINEDU mark and polygon decoration use the shared treatment. |
| DS-003 | Use `Sede` in the header. | Entire system | No screen shows `Ubicación` for this header context. |
| DS-004 | Use one filter contract. | Data trays | Global search, filter toggle, labelled fields and right-anchored `Buscar`; text/search fields expose a shared trailing `X` when populated, while the filter reset is an icon-only `X` with an accessible tooltip. |
| DS-005 | Put `Acciones` at the right edge. | Data tables | It is the last column, sized to its controls, with no trailing blank area. |
| DS-006 | Show up to three row actions directly. | Data tables | Actions use icon above label; more actions use the shared dropdown. Table action buttons are compact, borderless and shadowless at rest, with a subtle hover lift. |
| DS-007 | Use semantic icon colors. | Data-table actions | Active actions use the shared color map; disabled icons use the darker disabled gray. |
| DS-008 | Use toggles for binary activation actions. | Activation controls | `Estado` is an informational tag. The toggle is available only in the record edit surface; it is prohibited in every data-table column, including `Acciones`. The standardized binary values are `Activo` and `Inactivo` in chips, filters and controls; never use `Activa`/`Inactiva`, `ON` or `OFF` as state values. |
| DS-009 | Homologate wizard footers. | Multi-step forms | Left: `Atrás`, `Cancelar`; right: `Guardar`, `Siguiente`; final step: only primary `Guardar`. |
| DS-010 | Intercept unsaved edit changes with M70. | Edit wizards | Step navigation prompts with M70; `Sí` saves, shows the standard toast and advances; `No` closes the confirmation and keeps the user on the current step with changes unsaved. |
| DS-011 | Use generic commit labels. | Form submissions | A form commit button says `Guardar`; context belongs in the title or message. |
| DS-012 | Use exact confirmation buttons. | All confirmation modals | Rejection is `No`; acceptance is `Sí`, with no contextual suffixes. |
| DS-013 | Use compact shared modal headers. | All confirmation modals | Icon precedes title, controls are vertically centered, and no oversized empty header space is present. |
| DS-014 | Sort all sortable data tables. | Data tables | Header indicator, ascending/descending toggle and `aria-sort`; exclude `Acciones`. |
| DS-015 | Reuse the roles flow for permissions. | ALI-REF-001/002 | REF-002 links directly to the permissions step for `Administrador USE`; it is not a second module. |
| DS-016 | Keep the message catalog centralized. | Entire system | UI messages use catalog IDs and exact approved wording; no untracked ad-hoc copy for standardized events. |
| DS-017 | Use one form-control contract. | Entire system | Inputs, selects, date-range triggers, regular buttons, filter controls and pagination are `2.75rem` high with `0.9rem` Inter text; the binary status switch is the shared compact exception at `1.75rem` high. Checkbox/radio option rows use the regular control height while their native glyphs remain accessible. Only row-action buttons and the status switch are compact controls. |
| DS-018 | Treat explicitly relayed analyst clarifications as valid stakeholder input. | Entire system | A clarification relayed by the product designer is recorded with source, date, scope and affected artifacts before implementation; it is promoted to the relevant requirement draft and re-audited before Figma. |
| DS-019 | Accept current demo copy as the working baseline unless analysts correct it. | All visible prototype copy | Existing copy may remain in the demos when it supports the represented flow; a later Ali/Gio correction supersedes it and is recorded and re-audited as a traced change. |
| DS-020 | Label the custom-filter control consistently. | Data trays | Every `.filter-toggle` exposes the exact tooltip `Filtro Personalizado`; its `aria-label` continues to describe the open/close action. |
| DS-021 | Distinguish inactive and disabled switches. | Activation controls | Enabled unchecked switches use a restrained red danger tint; disabled switches keep a neutral silhouette, have no thumb shadow and still show the visible `Activo`/`Inactivo` state label. The row status remains in the `Estado` tag. |
| DS-022 | Use borderless table action buttons. | Data-table actions | Shared row actions use a compact borderless treatment with no resting shadow; hover adds only a subtle surface and shadow, while focus keeps a visible outline. |
| DS-023 | Use one shared authentication entry shell. | REF-IDE-008/009/010 | Authentication demos use the same desktop two-zone shell: S.S.E.E. brand and method-specific form on the left, the approved visual on the right, no public header or breadcrumb, and only the method-specific fields vary. |
| DS-024 | Represent Passport synchronization inside the centralized user tray. | REF-IDE-003/007 | REF-003 uses the REF-007 tray as its presentation surface, with initial, in-progress and updated-result states. Automatic synchronization remains internal; the confirmed manual action is an operational override inside the user tray. No separate Passport screen or synchronization module is introduced. |
| DS-025 | Reuse approved standards before implementing any change. | Entire system | Every implementation starts by reviewing the shared design system and approved reference flows. Legacy implementations, one-off patches and local component variants are prohibited. If an element does not exist, it is defined once in the shared design-system layer before being consumed by demos, then rebuilt and audited across affected screens. |
| DS-026 | Use one shared demo-index navigation control. | All demos and demo subflows | `demo-navigation.js` mounts the canonical `.demo-index-link` with the shared `app.css` treatment. No demo may replace it with a logo link, inline anchor, injected local markup or another class variant. |
| DS-027 | Use one immutable modal-header contract. | All modals and future flows | Every modal has one explicit icon, one approved `h2.modal-title` and the close control in one centered row. The shared icon size, treatment, gap, header height, typography and alignment are fixed. Eyebrows, subtitles, duplicate titles, pseudo-element icons and runtime icon injection are prohibited. |
| DS-028 | Use one external guide for the authentication family. | REF-IDE-008/009/010/011/012/013/014 | Authentication and password demos use the shared `auth-guide.js` cursor and dark guide bubble as a presentation layer. The guide may change its instructions per REF and auth type, but its visual treatment and positioning remain shared; it is never part of the product interface. |
| DS-029 | Require a free-text reason for explicit inactivation. | Roles, users, autoregistration configurations and data sources | Any action that changes a record from active to inactive opens the shared confirmation modal with the required `Motivo de inactivación` textarea. The shared limit is 240 characters; activation and automatic or external state changes do not request it. |
| DS-030 | Prohibit activation switches in data-table actions. | All data trays | No table or grid may render an activation/inactivation switch in `Acciones` or any other column. The table shows the status tag only; status changes are performed from the standardized edit surface, with the shared confirmation and inactivation reason rules. |
| DS-031 | Number record data grids consistently. | All record trays and data grids | Every record grid begins with `N.°` as its first column, before the identifier or other record fields. Configuration matrices and selector tables are excluded when their first column is a required structural control rather than a record number. |
| DS-032 | Use one synthetic authenticated demo user. | All authenticated demo headers | The current user displayed in authenticated shells is always `Ana Paredes`. The shared demo-navigation component applies the name across static shells and bundles; the role line remains the approved role for the specific shell. |
| DS-033 | Use generic one-word creation vocabulary. | All entry buttons and creation/edit surfaces | Entry buttons use `Nuevo`; synchronization uses `Sincronizar`; creation titles use `Registrar`; edit titles use `Editar`; form commits use `Guardar`. Entity context belongs in breadcrumbs, supporting copy or the surrounding module title. |
| DS-034 | Use the shared trailing clear control. | All text/search fields and filter panels | A populated text or search field shows one trailing `X` that clears that field. Filter panels do not use a visible `Limpiar` text button; their reset action is the shared icon-only `X` with an accessible tooltip. |
| DS-035 | Complete every successful authentication inside its own demo. | REF-IDE-008/009/010 | A valid authentication continues through the shared one-word `Continuar` action to a local clone of the current REF-IDE-017 welcome surface. Demos never navigate to another requirement. Passport and identity-service handoffs are represented as guide copy only; their external screens and CAPTCHA are not recreated. |
| DS-036 | Use an inclusive date-range selector for last-update searches. | Data trays with `Última actualización` in the search area | Replace point-in-time options with one shared `Desde`/`Hasta` date-range control. The range includes both boundary dates, validates that the initial date is before or equal to the final date, and must not be reused for unrelated date fields. |
| DS-037 | Reuse the current user-management tray as the presentation surface for related flows. | `ref-007-users`, `ref-003-passport`, `ref-004-admision` | Keep one shared tray structure and stylesheet. Flow-specific guides and actions may be added without changing the shared layout or component treatment. |
| DS-038 | Use the same inclusive date-range selector for user last-access searches. | `ref-007-users`, `ref-003-passport`, `ref-004-admision` | The advanced `Último acceso` filter uses the shared `date-range.js` control with the same `Desde`/`Hasta`, validation, clear and reset behavior as the Roles last-update filter. |
| DS-039 | Place the binary status control in the edit header. | Edit forms for modules whose tray exposes `Estado` as `Activo`/`Inactivo` | The edit surface shows exactly one shared compact status switch in the upper-right header. Create forms and modules without that binary tray column do not show it. |

## Documented Exceptions

| Area | Exception | Reason |
| --- | --- | --- |
| Permissions | Hierarchical permission matrix has no `Acciones` column or table sorting. | It is a matrix of module, submenu and functionality permissions, not a record tray. |
| Authentication and password flows | Domain actions may retain labels such as `Crear cuenta`, `Cambiar contraseña` or `Restablecer contraseña`. | They are user-facing flow actions, not generic management-form save buttons. |
| Passport | Filters and sorting require analyst confirmation for the operational synchronization tray. | Do not invent behavior until the intended operational scope is confirmed. |
| Non-binary statuses | `Borrador`, `Por vencer`, `Vencido` and `Anulada` remain status tags. | They are not binary activation controls. |

## Change Protocol

1. Record the new observation or decision before editing a demo.
2. Identify every affected demo in the traceability matrix.
3. Review and reuse the approved shared component and reference flow before
   writing implementation code.
4. Update the shared component or rule once; define a new shared component
   first when the required element does not exist.
5. Apply only requirement-specific differences in each affected screen.
6. Do not use legacy sources or isolated patches.
7. Rebuild, audit all affected demos and record evidence before closing the
   decision.

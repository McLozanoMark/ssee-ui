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
| DS-004 | Use one filter contract. | Data trays | Global search, filter toggle, labelled fields, right-anchored `Buscar` and `Limpiar`, and standard filter toasts. |
| DS-005 | Put `Acciones` at the right edge. | Data tables | It is the last column, sized to its controls, with no trailing blank area. |
| DS-006 | Show up to three row actions directly. | Data tables | Actions use icon above label; more actions use the shared dropdown. Table action buttons are compact, borderless and shadowless at rest, with a subtle hover lift. |
| DS-007 | Use semantic icon colors. | Data-table actions | Active actions use the shared color map; disabled icons use the darker disabled gray. |
| DS-008 | Use toggles for binary activation actions. | Activation controls | `Estado` is an informational tag. When activation is an available action, the toggle appears in `Acciones`; checked means `Activo`/`Activa`, unchecked means `Inactivo`/`Inactiva`; never show `ON` or `OFF`. |
| DS-009 | Homologate wizard footers. | Multi-step forms | Left: `Atrás`, `Cancelar`; right: `Guardar`, `Siguiente`; final step: only primary `Guardar`. |
| DS-010 | Intercept unsaved edit changes with M70. | Edit wizards | Step navigation prompts with M70; `Sí` saves, shows the standard toast and advances; `No` closes the confirmation and keeps the user on the current step with changes unsaved. |
| DS-011 | Use generic commit labels. | Form submissions | A form commit button says `Guardar`; context belongs in the title or message. |
| DS-012 | Use exact confirmation buttons. | All confirmation modals | Rejection is `No`; acceptance is `Sí`, with no contextual suffixes. |
| DS-013 | Use compact shared modal headers. | All confirmation modals | Icon precedes title, controls are vertically centered, and no oversized empty header space is present. |
| DS-014 | Sort all sortable data tables. | Data tables | Header indicator, ascending/descending toggle and `aria-sort`; exclude `Acciones`. |
| DS-015 | Reuse the roles flow for permissions. | ALI-REF-001/002 | REF-002 links directly to the permissions step for `Administrador USE`; it is not a second module. |
| DS-016 | Keep the message catalog centralized. | Entire system | UI messages use catalog IDs and exact approved wording; no untracked ad-hoc copy for standardized events. |
| DS-017 | Use one form-control contract. | Entire system | Standard inputs, selects, date inputs and password inputs are `2.75rem` high with `0.9rem` Inter text; textareas use `5.25rem`; labels and help text use the shared type scale. Compact controls are limited to pagination and explicit small variants. |
| DS-018 | Treat explicitly relayed analyst clarifications as valid stakeholder input. | Entire system | A clarification relayed by the product designer is recorded with source, date, scope and affected artifacts before implementation; it is promoted to the relevant requirement draft and re-audited before Figma. |
| DS-019 | Accept current demo copy as the working baseline unless analysts correct it. | All visible prototype copy | Existing copy may remain in the demos when it supports the represented flow; a later Ali/Gio correction supersedes it and is recorded and re-audited as a traced change. |
| DS-020 | Label the custom-filter control consistently. | Data trays | Every `.filter-toggle` exposes the exact tooltip `Filtro Personalizado`; its `aria-label` continues to describe the open/close action. |
| DS-021 | Distinguish inactive and disabled switches. | Activation controls | Enabled unchecked switches use a restrained red danger tint; disabled switches keep a neutral silhouette, have no thumb shadow and show no visible state label. The row status remains in the `Estado` tag. |
| DS-022 | Use borderless table action buttons. | Data-table actions | Shared row actions use a compact borderless treatment with no resting shadow; hover adds only a subtle surface and shadow, while focus keeps a visible outline. |

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
3. Update the shared component or rule once.
4. Apply only requirement-specific differences in each affected screen.
5. Audit all affected demos and record evidence before closing the decision.

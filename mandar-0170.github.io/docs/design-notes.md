# Portfolio redesign

## Direction
An engineer's field journal: warm ivory, vermilion, ink, generous typography, technical drawings, and a quiet editorial rhythm. Custom SVG infrastructure artwork rather than stock imagery. Night mode uses warm charcoal and muted coral.

## References reviewed
- https://brittanychiang.com/ : clear career hierarchy and readable project context.
- https://leerob.com/ : concise first-person writing and restraint.
- https://bruno-simon.com/ : a personal visual world and purposeful interaction.
- https://devdaniels.com/ : engineering breadth grouped by discipline.
- https://www.ridwansukri.com/ : infrastructure projects described with concrete tools.
- https://priyanshu.page/ : current role and cloud focus placed early.
- https://www.sudarshangawande.com/ : DevOps career progression and project architecture.

These informed the information design, not copied layouts, code, imagery, claims, or personal content.

## Content assumptions
The source lists the ResourceDekho internship from December 2025. The requested July 1 full-time transition is therefore treated as July 1, 2026. Internship ends June 2026. Full-time responsibilities are kept general because detailed achievements were not supplied. No invented performance statistics, project repositories, email address, or certification verification links.

## Running
Run `npm run dev` and visit http://localhost:4173. No dependencies or build step. Existing custom domain and favicon files are retained. Publishing to the existing host remains separate from this local redesign.

## Verification
- JavaScript syntax passes `npm run check`.
- Parsed HTML: unique IDs, valid section links, all referenced local assets present, no em dashes.
- Browser inspection at 1280px, 768px, 390px, and 320px: no horizontal page overflow.
- Day/night toggle works and retains its preference after reload.
- Pipeline is a static architecture diagram, with the explanatory stage caption removed at the owner’s request.
- Native project disclosures expand correctly.
- Mobile menu opens, closes after navigation, and updates its expanded state.
- All three certification images load successfully.
- No browser console warnings or errors during the tested flows.

## Refinements
- Full-name header and prominent hero identity.
- Removed illustration figure caption and pipeline stage explanations.
- Banking infrastructure and deployment wording for the full-time role.
- Education is a separate section with its own navigation item.
- Larger body type, tighter section spacing, and wider content area.
- Bordered certificate panels and profile links with distinct symbols.
- Rechecked 1280px, 768px, 390px, and 320px layouts without page overflow; mobile menu closes after selecting Education.

## Third design pass
- Primary heading is now a full-width Mandar Pandit masthead.
- DOM order, navigation order, section labels, and introductory links follow Experience, Work, Toolkit, Credentials, Education.
- ResourceDekho appears once as a company heading; full-time and internship entries share a connected timeline. Original July 1 transition retained; the supplied screenshot was used as a layout reference.
- Credentials use paper folios with large official badge images, folded corners, orbital frames, and issuer/level labels. No verification or validity claims were invented.
- Physical display inspiration: https://www.novadisplay.com/nova-display-resources/photo-gallery/certificate-wall-display/
- Credential display context: https://support.credly.com/hc/en-us/articles/13065417049883-Badge-Wallet-Sharing
- Distinct section backgrounds, numbered chapter tabs, and larger type improve visual separation.
- Added entrance, server float, pipeline sequence, badge orbit, and scroll reveal animations. Animation rules honor prefers-reduced-motion; content remains readable without JavaScript.
- Verified section/navigation order and grouped roles in the browser, loaded certificate assets, no horizontal overflow at 1280px, 768px, 390px, or 320px, and working mobile menu and night-mode toggle.

## Copy and badge polish
- Hero: Cloud infrastructure. Automated delivery.
- Contact: Let’s talk Cloud & DevOps. Capitalized Cloud in the contact paragraph.
- Removed employer initial boxes; company names remain.
- Disabled credential orbit rotation and enlarged vendor labels.
- Restored mp. footer monogram.
- Browser verified requested text, zero employer monograms, no badge animation, larger labels, and no overflow on desktop or at 320px.

## Credential simplification and direct introduction
- Replaced slogans with “I build and maintain Cloud infrastructure.” and an explicit current-role caption.
- Removed internship description and the two-role journey caption.
- Replaced folios with three credential rows. Removed orbital markup, dots, folded corners, numbering, and decorative footer stamps.
- Retained original official badge artwork and prominent vendors.
- Verified badge loading and desktop/mobile layout. Item 4 was withdrawn by the user as a mistake.

## Clear chapter headings
- Moved Cloud & DevOps Engineer to the right side of the hero caption; left side empty.
- Rewrote introduction without a banking reference; removed employer subtitles.
- Replaced abstract section headings with Experience, Work, Toolkit, Credentials, Education. Heading scale is approximately 77px at 1280px and 40px at 320px.
- Clean company headers use a restrained accent rule and larger names.
- Browser checked at 1280px, 768px, and 320px with no horizontal overflow.

## October 18 finishing pass

Reviewed the existing page and the user's removal requests before editing. The ivory, charcoal, forest green and burnt orange palette, large name, section order, combined employer timeline, night mode, and footer monogram remain the basis of the design.

Reference review:
- https://brittanychiang.com/ : readable hierarchy and clear connections between technologies and projects.
- https://www.donhogan.dev/ : infrastructure experience and project context.
- https://stackcouture.cloud/ : concrete descriptions of DevOps workflows and application environments.
- https://sujays.dev/ : grouped infrastructure tooling and technical knowledge navigation; placeholder experience content was not used.
- https://bruno-simon.com/ : interaction rooted in the subject of a personal portfolio.
- https://www.joshwcomeau.com/animation/css-transitions/ : short, focused interaction feedback.
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion : reduced motion preference handling.

Implemented an original VProfile architecture explorer based on the existing project description. Five native buttons expose component roles in a shared polite live region. This is an explanatory diagram, not a running environment or live monitoring data. All descriptions are local, with no network request or external library. Six toolkit entries link directly to projects that already document those technologies. Replaced pipeline text glyphs with consistent original SVG line icons. Added a thin reading-position indicator, refined credential rows and link feedback, and softened the diagram grid. Removed the remaining banking environment reference to respect the earlier preference.

Motion is bounded: the hero animation finishes, the pipeline entrance plays once, and architecture selections trigger a short detail transition. The former endlessly rotating toolkit ornament is static. Reduced motion CSS disables animations and transitions; content and interactions remain available.

Validation: npm run check passed. HTML audit confirmed unique IDs, valid local anchors/assets, no em dashes, and no reintroduced removed copy. Browser checked at 320, 390, 768, 1280 and 1440 pixels, with no horizontal overflow at the tested sizes. All five diagram buttons update the selected state and detail text; keyboard activation works. Mobile navigation closes after selecting a section. Theme survives reload. All three credential images load. Browser console had no errors or warnings. Reduced motion treatment was inspected in source, not emulated in the browser.

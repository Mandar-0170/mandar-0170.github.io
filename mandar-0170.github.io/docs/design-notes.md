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

## October 19 vertical career history

Replaced the side-by-side employers with one vertical history, newest first. ResourceDekho retains its grouped full-time and internship roles, followed by DC Infotech. A continuous outer rail connects employers; smaller inner markers connect roles. The current employer has a restrained burnt-orange edge and filled marker. Date alignment adapts to available width, and short connector entrances respect reduced motion. Existing job copy and dates are unchanged.

References reviewed for hierarchy and timeline structure:

- [Mantine Timeline](https://mantine.dev/core/timeline/): connected milestones, active markers, and line treatment.
- [LinkedIn position grouping](https://www.linkedin.com/help/linkedin/answer/a552185/): retaining multiple positions under one employer.
- [Work experience timeline](https://www.shadcn.io/blocks/timeline-work-experience): continuous vertical career history.

The implementation uses the existing HTML and CSS without adding a UI library or external dependency.

Validation: employers remain vertically ordered at 320, 390, 600, 768, 1024, 1440, and 1920 pixels, with no horizontal overflow or clipped employer names, role titles, or metadata. Desktop section alignment is flush with the 84px header. Mobile menu navigation closes correctly and retains newest-first role order. JavaScript syntax validation passes. The designated rollback archive remains unchanged.

## Gemini knowledge portal and hover-only credentials

Replaced the VProfile project with the user's Gemini-backed enterprise knowledge web portal. The diagram is a high-level explanation of the supplied project description: portal, grounded AI workflows, secure integration, and three source categories. It deliberately does not specify unprovided cloud products, authentication implementations, APIs, or performance figures. All six nodes update the existing accessible description panel.

The project title, summary, expanded details, and Toolkit links were updated together. Bash, Vagrant, and MySQL remain listed as skills but no longer link to the removed project. Gemini now links to the knowledge portal.

Removed the credential entrance keyframes and removed credential rows from the scroll-reveal observer. Only hovering directly over a badge mount activates its lift; the other badges stay still. Reduced-motion preferences continue to disable the effect.

Validation: six node selections, keyboard activation, project disclosure, and the Gemini Toolkit link checked in the browser. Responsive geometry passed at 320, 390, 600, 601, 768, 900, 1024, and 1440 pixels. All credential rows, mounts, and badges have no animation or transform before hover. Only the hovered badge gains a lift transform. Static validation found no obsolete VProfile references in the page, invalid fragment targets, duplicate IDs, or em dashes. JavaScript syntax and the four pipeline lifecycle tests pass.

## Requested motion additions

Added pointer-driven depth to the hero illustration: the towers and sun move at different rates within small bounds and settle on pointer exit. This is limited to a mouse with a fine pointer and disabled for reduced motion. Project disclosures now animate measured height in both directions while retaining native summary keyboard activation. Rapid reversals cancel the prior animation; resize and reduced-motion changes settle to the requested open state and remove temporary height/overflow styles.

The theme toggle uses a circular reveal centered on the button, with a radius covering the farthest viewport corner. It uses the [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using), with an immediate theme update when unsupported or reduced motion is requested. Project expansion uses the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate). The Toolkit wheel's original slow continuous rotation is restored. Certification badges stay hover-only; diagram connectors remain static.

Validation: observed distinct hero layer transforms and zero offsets after pointer exit; theme reveal state, origin, completion, and button re-enablement checked on desktop and mobile. Both project disclosures checked with click and keyboard activation. Wheel computed animation is `orbit-turn` with infinite iterations. Badge and wire computed animations remain `none`. Eight automated tests pass, including four new disclosure tests for completion, rapid reversals, resize/motion changes, and native fallback behavior. Reduced-motion and unsupported disclosure fallback cases use isolated tests; no browser media emulation was performed. Approved rollback checkpoint unchanged.

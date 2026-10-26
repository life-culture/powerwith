# 02 · Editing requirements (non-negotiable)

Sophia will revise wording after launch, and she will do it herself. She needs to delete and edit text and change formatting slightly, the way she would in Squarespace. She should never need a developer, a terminal, a code editor or a pull request to do it.

This file defines what "editable" means for this project and how the build will be tested at handover.

## 1. What Sophia must be able to change herself

### Text

- Every visible word on every page. Headings, kickers, body text, quotes, list items, button labels, link text, form labels, placeholders, helper lines, navigation, footer, the 404 page and the privacy page.
- Page titles, meta descriptions and social sharing text for each page.
- Alt text for every image.
- Edit in place on the page where possible (visual editing), with a form view as a backup.

### Light formatting

Give her choices drawn from the design system, never free-form styling.

- **Inline.** Bold, italic and links in body text and list items. Line breaks. Nothing else in the rich-text toolbar.
- **Section background.** A dropdown per section limited to the brand grounds: Obsidian, Bone, Umber, Oxblood, Clay, Olive. Text, label and accent colors switch automatically to the approved pairing for that ground (see `03_DESIGN_SYSTEM.md`, section 3).
- **Headline size.** Where a section has a large serif headline, offer Standard and Large. Both map to type-scale tokens.
- **Alignment.** Left or centered for quote bands and the final call to action only.
- **Buttons.** Label, destination and style (Primary or Outline).

She must not be able to pick arbitrary colors, fonts or pixel sizes. That protects the design while she edits freely.

### Structure

- Show or hide any section with a single toggle.
- Reorder sections on a page.
- Add, edit, reorder and delete items in any list (principles, measures, bullets, endorsements, retailer links, questions, footer links, social links).
- Duplicate a section, for example to add a second quote band.
- Delete a section's optional parts by clearing the field. The layout adjusts with no empty boxes, stray rules or gaps.

### Images

- Replace any image by uploading a file. Cropping focus point if the CMS supports it.
- Uploads are resized and compressed automatically. She can upload a large original without breaking performance.

### Settings

- Navigation items and the PRE-ORDER link.
- Footer links and social links.
- Form destination (the email platform URL or embed), set once by the developer, visible to her.
- Retailer links and prices on the sales page.

### Safety

- Preview changes before publishing.
- Publish with one action. Changes are live within a few minutes.
- Undo. Every published change is kept in history and can be restored. Explain to her in plain words how to restore an earlier version.
- Two editor seats at minimum: Sophia and the developer.

## 2. What should stay locked

- Layout grids, spacing, type scale and component designs.
- Fonts and the color palette.
- Form field wiring and spam protection.
- Code, build settings and hosting configuration.

## 3. Build rules that make editing safe

- No hard-coded copy in components. Every string is a content field.
- Every optional field has a defined empty state. Test each section with every optional field cleared.
- Test each text field with copy at half and at double its current length. Nothing overflows, overlaps or truncates mid-word.
- Lists render correctly with one item and with twice the current number of items.
- Field names and help text in the editor are written in plain language. Example: "Section headline", "Small label above the headline", "Button text", "Where the button goes". Group fields by section, in page order, with the section names used in `04_CONTENT/`.
- Every field shows a short hint where it helps, such as "Keep under 12 words" for headlines.

## 4. Acceptance tests

Sophia performs each of these herself in the handover session, on her own computer, without help beyond the editing guide. The build is complete when all pass.

1. Log in to the editor.
2. Change the home hero lead line, preview it, and publish it. See it live.
3. Delete one sentence from a body paragraph and make one word bold and one word italic.
4. Add a link inside a paragraph.
5. Delete one item from "What you will learn to do", and add a new one.
6. Reorder two of the ten principles, then put them back.
7. Hide the "Two kinds of authority" section, publish, then show it again.
8. Turn on the praise section, enter one endorsement with name and title, preview, then hide it again without publishing.
9. Change a section's background from Obsidian to Umber and confirm the text stays readable.
10. Replace the author portrait with a new upload and update its alt text.
11. Change the paperback price and the Amazon link on the sales page.
12. Edit a footer link and the PRE-ORDER navigation link text.
13. Change the home page's title and search description.
14. Restore the previous version of a page after making a change.
15. Do all of the above on a phone browser for at least tests 2 and 7.

## 5. Handover deliverables for editing

- A one or two page editing guide in plain words, with screenshots, organized by the tasks above.
- Or a short recorded walkthrough of the same tasks.
- A note of anything she should not attempt herself, and who to contact.

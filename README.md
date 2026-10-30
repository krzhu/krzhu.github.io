# CODA lab

The website of CODA lab at Fudan University: [krz.engineer](https://krz.engineer/).

## Content

- `_pages/`: homepage, research, people, publications, and other site pages
- `_data/people.json`: researcher profiles, experience, and honors
- `_data/publications.json`: publications and topic categories
- `_data/news.yml`: short updates; the homepage shows up to six, with the full list at `/news/`
- `_people/`: individual profile routes
- `_blog/`: illustrated research posts
- `_layouts/` and `_includes/`: page templates
- `assets/` and `images/`: styles, scripts, fonts, and site images
- `publications/papers/` and `files/`: papers, slides, and other public downloads

## Local development

Install Ruby and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve
```

Production check:

```sh
JEKYLL_ENV=production bundle exec jekyll build --safe
```

GitHub Pages publishes the root of `main`. The domain is configured in `CNAME` and `_config.yml`. Analytics is enabled only for production builds.

## Languages

English is the default at `/` and the source of truth. Chinese pages live under
`_pages/zh/` and use `/zh/` URLs. Each Chinese page declares `lang: zh` and an
`english_url` pointing to its English counterpart. The header switches between
matching pages and preserves publication filters and anchors.

Shared labels are in `_data/i18n.json`. Chinese profile, news, and blog metadata
are keyed by their existing IDs or URLs in `_data/people_zh.json`,
`_data/news_zh.json`, and `_data/blog_zh.json`; untranslated new entries fall back
to English. Update both languages when changing editorial content.

Publication titles, authors, venues, and topic assignments are maintained only
in `_data/publications.json` and stay in English in both versions. Translate
publication notes (such as corresponding authorship) in
`_data/publication_notes_zh.json`, without duplicating the publication list.

## News

Each news entry has a stable `id`, an editorial `order` (higher first), a
machine-readable `date`, a display `label`, Markdown `text`, and a `published`
flag. Use the known date precision: `2026-10` for a month or `2026` for a year.
Do not substitute the CV edit date for an event date. Local development displays
draft entries for review; production renders only entries with `published: true`.
Keep the wording to one or two sentences and link to the relevant paper or person.

## Licenses

Retained third-party notices are in [LICENSE](LICENSE). Poppins is distributed under the [SIL Open Font License](assets/fonts/OFL-Poppins.txt).

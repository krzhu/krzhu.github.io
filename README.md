# CODA lab

The website of CODA lab at Fudan University: [krz.engineer](https://krz.engineer/).

## Content

- `_pages/`: homepage, research, people, publications, and other site pages
- `_data/people.json`: researcher profiles, experience, and honors
- `_data/publications.json`: publications and topic categories
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

## Licenses

Retained third-party notices are in [LICENSE](LICENSE). Poppins is distributed under the [SIL Open Font License](assets/fonts/OFL-Poppins.txt).

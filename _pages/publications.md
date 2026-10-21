---
layout: simple
title: "Publications"
permalink: /publications/
nav_section: publications
topics:
  - id: ai
    label: AI for Design
  - id: synthesis
    label: Logic & Synthesis
  - id: physical
    label: Physical Design
  - id: analog
    label: Analog & RF
  - id: packaging
    label: Chiplets & Packaging
  - id: modeling
    label: Simulation & Modeling
  - id: computing
    label: Computing Systems
---

<p class="publication-intro"><a href="https://scholar.google.com/citations?user=WlvGP3kAAAAJ">Google Scholar ↗</a></p>

<form class="publication-filters" id="publication-filters" role="search" aria-label="Filter publications" hidden>
  <fieldset class="publication-topics">
    <legend>Research topics</legend>
    <input type="hidden" name="topic" value="">
    <div class="publication-topic-buttons">
      <button type="button" class="publication-topic" data-topic="" aria-pressed="true">All topics <span class="topic-count" data-topic-count>{{ site.data.publications.size }}</span></button>
      {% for topic in page.topics %}
      {% assign topic_papers = site.data.publications | where_exp: 'paper', 'paper.topics contains topic.id' %}
      <button type="button" class="publication-topic" data-topic="{{ topic.id }}" aria-pressed="false">{{ topic.label }} <span class="topic-count" data-topic-count>{{ topic_papers.size }}</span></button>
      {% endfor %}
    </div>
  </fieldset>
  <div class="publication-search">
    <label for="publication-query">Search</label>
    <input type="search" id="publication-query" name="q" placeholder="Title, author, or venue" autocomplete="off">
  </div>
  <div>
    <label for="publication-type">Type</label>
    <select id="publication-type" name="type">
      <option value="">All types</option>
      <option value="Journal">Journal</option>
      <option value="Conference">Conference</option>
      <option value="Book chapter">Book chapter</option>
      <option value="Preprint">Preprint</option>
    </select>
  </div>
  <div>
    <label for="publication-year">Year</label>
    <select id="publication-year" name="year">
      <option value="">All years</option>
      {% assign years = site.data.publications | map: 'year' | uniq | sort | reverse %}
      {% for year in years %}<option value="{{ year }}">{{ year }}</option>{% endfor %}
    </select>
  </div>
  <button type="reset" class="filter-reset">Reset</button>
</form>
<p class="publication-count" id="publication-count" role="status" aria-live="polite" hidden></p>
<p class="publication-empty" id="publication-empty" hidden>No publications match these filters. Try another search, or <button type="button" class="text-button" id="publication-clear">clear the filters</button>.</p>

<div id="publication-list">
{% assign published = site.data.publications | where_exp: 'paper', "paper.type != 'Preprint'" %}
{% assign year_groups = published | group_by: 'year' | sort: 'name' | reverse %}
{% for group in year_groups %}
<section class="publication-year" data-publication-group aria-labelledby="year-{{ group.name }}">
  <h2 id="year-{{ group.name }}">{{ group.name }}</h2>
  {% for paper in group.items %}
    {% include publication.html paper=paper %}
  {% endfor %}
</section>
{% endfor %}

<section class="preprints" data-publication-group aria-labelledby="preprints">
  <h2 id="preprints">Preprints</h2>
  {% assign preprints = site.data.publications | where: 'type', 'Preprint' | sort: 'year' | reverse %}
  {% for paper in preprints %}
    {% include publication.html paper=paper %}
  {% endfor %}
</section>
</div>

<script type="application/json" id="publication-topic-data">[{% for paper in site.data.publications %}{"id":"paper-{{ paper.id }}","topics":{{ paper.topics | jsonify }}}{% unless forloop.last %},{% endunless %}{% endfor %}]</script>

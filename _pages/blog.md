---
layout: simple
title: "Blog"
permalink: /blog/
nav_section: blog
description: "Research notes from CODA lab at Fudan University."
---

<div class="blog-list">
{% assign articles = site.blog | sort: 'date' | reverse %}
{% for article in articles %}
  <article class="blog-entry">
    <a class="blog-thumbnail" href="{{ article.url | relative_url }}" tabindex="-1" aria-hidden="true"><img src="{{ article.image | relative_url }}" alt="" width="260" height="180" loading="lazy"></a>
    <div class="blog-entry-text">
    <h2><a href="{{ article.url | relative_url }}">{{ article.title }}</a></h2>
    <p class="blog-meta">{{ article.author }} · <time datetime="{{ article.date | date: '%Y-%m-%d' }}">{{ article.date | date: '%B %-d, %Y' }}</time></p>
    <p>{{ article.description }}</p>
    <a class="blog-read-more" href="{{ article.url | relative_url }}" aria-label="Read {{ article.title }}">Read more →</a>
    </div>
  </article>
{% endfor %}
</div>

---
lang: zh
layout: simple
title: "博客"
permalink: /zh/blog/
english_url: /blog/
nav_section: blog
description: "CODA lab 的研究记录。"
---

<div class="blog-list">
{% assign articles = site.blog | sort: 'date' | reverse %}
{% for article in articles %}
  {% assign article_zh = site.data.blog_zh[article.url] %}
  <article class="blog-entry">
    <a class="blog-thumbnail" href="{{ article.url | prepend: '/zh' | relative_url }}" tabindex="-1" aria-hidden="true"><img src="{{ article.image | relative_url }}" alt="" width="260" height="180" loading="lazy"></a>
    <div class="blog-entry-text">
    <h2><a href="{{ article.url | prepend: '/zh' | relative_url }}">{{ article_zh.title | default: article.title }}</a></h2>
    <p class="blog-meta">{{ article.author }} · <time datetime="{{ article.date | date: '%Y-%m-%d' }}">{{ article.date | date: '%Y年%-m月%-d日' }}</time></p>
    <p>{{ article_zh.description | default: article.description }}</p>
    <a class="blog-read-more" href="{{ article.url | prepend: '/zh' | relative_url }}" aria-label="阅读：{{ article_zh.title | default: article.title }}">继续阅读 →</a>
    </div>
  </article>
{% endfor %}
</div>

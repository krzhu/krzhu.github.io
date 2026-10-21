---
layout: simple
title: "People"
permalink: /group/
nav_section: people
redirect_from:
  - /people/
---

{% comment %}Current students are maintained in joining order in people.json.{% endcomment %}
{% assign current_members = site.data.people | where: 'status', 'current' %}
{% assign faculty = current_members | where: 'id', 'keren-zhu' | first %}
<div class="people-grid">
  {% include member-card.html member=faculty %}
{% for member in current_members %}
  {% unless member.id == 'keren-zhu' %}
  {% include member-card.html member=member %}
  {% endunless %}
{% endfor %}
</div>

<h2>Alumni</h2>
{% assign alumni = site.data.people | where: 'status', 'alumni' %}
<ul class="plain-list alumni-list">
{% for member in alumni %}
  <li id="{{ member.id }}">
    <a href="{{ member.url | relative_url }}">{{ member.name }}</a> ({{ member.program }}, {{ member.period }}) —
    {% if member.id == 'hongyang-pan' %}Founder &amp; CEO, <a href="https://www.traceic.com/">Trace Intelligence</a>{% else %}{{ member.role }}{% endif %}
  </li>
{% endfor %}
</ul>

<section class="joint-program">
  <h2>Shanghai Institute of Semiconductor Innovation (SISI)</h2>
  <p lang="zh">上海创芯学院联培项目</p>
</section>

<p class="people-join">Interested in joining us? See our <a href="{{ '/opening/' | relative_url }}">information for prospective students</a>.</p>

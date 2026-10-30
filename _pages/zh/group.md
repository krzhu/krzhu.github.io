---
lang: zh
layout: simple
title: "成员"
permalink: /zh/group/
english_url: /group/
nav_section: people
---

{% comment %}Current students are maintained in joining order in people.json.{% endcomment %}
{% assign current_members = site.data.people | where: 'status', 'current' %}
{% assign faculty = current_members | where: 'id', 'keren-zhu' | first %}
<div class="people-grid">
  {% include member-card.html member=faculty %}
{% for member in current_members %}
  {% unless member.id == 'keren-zhu' or member.joint_program == 'sisi' %}
  {% include member-card.html member=member %}
  {% endunless %}
{% endfor %}
</div>

<section class="joint-program">
  <h2>上海创芯学院（SISI）联合培养项目</h2>
  <p>复旦大学–上海创芯学院联合培养</p>
  {% assign sisi_members = current_members | where: 'joint_program', 'sisi' %}
  <div class="people-grid">
  {% for member in sisi_members %}
    {% include member-card.html member=member %}
  {% endfor %}
  </div>
</section>

<h2>毕业成员</h2>
{% assign alumni = site.data.people | where: 'status', 'alumni' %}
<ul class="plain-list alumni-list">
{% for member in alumni %}
  {% assign member_zh = site.data.people_zh[member.id] %}
  <li id="{{ member.id }}">
    <a href="{{ member.url | prepend: '/zh' | relative_url }}">{{ member_zh.display_name | default: member.name }}</a> ({{ member_zh.program | default: member.program }}, {{ member.period }}) —
    {% if member.id == 'hongyang-pan' %}创始人、首席执行官， <a href="https://www.traceic.com/">淬思科技</a>{% else %}{{ member_zh.role | default: member.role }}{% endif %}
    {% include profile-links.html member=member compact=true %}
  </li>
{% endfor %}
</ul>

<p class="people-join">想加入我们？请查看<a href="{{ '/zh/opening/' | relative_url }}">招生与申请信息</a>。</p>

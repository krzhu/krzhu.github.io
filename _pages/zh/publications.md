---
layout: simple
title: "论文"
lang: zh
english_url: /publications/
permalink: /zh/publications/
nav_section: publications
topics:
  - id: ai
    label: AI 辅助设计
  - id: synthesis
    label: 逻辑与综合
  - id: physical
    label: 物理设计
  - id: analog
    label: 模拟与射频
  - id: packaging
    label: 芯粒与封装
  - id: modeling
    label: 仿真与建模
  - id: computing
    label: 计算系统
---

<p class="publication-intro"><a href="https://scholar.google.com/citations?user=WlvGP3kAAAAJ">谷歌学术 ↗</a></p>

<form class="publication-filters" id="publication-filters" role="search" aria-label="筛选论文" hidden>
  <fieldset class="publication-topics">
    <legend>研究方向</legend>
    <input type="hidden" name="topic" value="">
    <div class="publication-topic-buttons">
      <button type="button" class="publication-topic" data-topic="" aria-pressed="true">全部方向 <span class="topic-count" data-topic-count>{{ site.data.publications.size }}</span></button>
      {% for topic in page.topics %}
      {% assign topic_papers = site.data.publications | where_exp: 'paper', 'paper.topics contains topic.id' %}
      <button type="button" class="publication-topic" data-topic="{{ topic.id }}" aria-pressed="false">{{ topic.label }} <span class="topic-count" data-topic-count>{{ topic_papers.size }}</span></button>
      {% endfor %}
    </div>
  </fieldset>
  <div class="publication-search">
    <label for="publication-query">搜索</label>
    <input type="search" id="publication-query" name="q" placeholder="题目、作者或刊会" autocomplete="off">
  </div>
  <div>
    <label for="publication-type">类型</label>
    <select id="publication-type" name="type">
      <option value="">全部类型</option>
      <option value="Journal">期刊</option>
      <option value="Conference">会议</option>
      <option value="Book chapter">书籍章节</option>
      <option value="Preprint">预印本</option>
    </select>
  </div>
  <div>
    <label for="publication-year">年份</label>
    <select id="publication-year" name="year">
      <option value="">全部年份</option>
      {% assign years = site.data.publications | map: 'year' | uniq | sort | reverse %}
      {% for year in years %}<option value="{{ year }}">{{ year }}</option>{% endfor %}
    </select>
  </div>
  <button type="reset" class="filter-reset">重置</button>
</form>
<p class="publication-count" id="publication-count" role="status" aria-live="polite" hidden></p>
<p class="publication-empty" id="publication-empty" hidden>没有符合条件的论文。请尝试其他关键词，或<button type="button" class="text-button" id="publication-clear">清除筛选条件</button>。</p>

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
  <h2 id="preprints">预印本</h2>
  {% assign preprints = site.data.publications | where: 'type', 'Preprint' | sort: 'year' | reverse %}
  {% for paper in preprints %}
    {% include publication.html paper=paper %}
  {% endfor %}
</section>
</div>

<script type="application/json" id="publication-topic-data">[{% for paper in site.data.publications %}{"id":"paper-{{ paper.id }}","topics":{{ paper.topics | jsonify }}}{% unless forloop.last %},{% endunless %}{% endfor %}]</script>

---
layout: blog
title: "When algorithmic exploration becomes cheap"
date: 2026-10-22 10:00:00 +0800
author: My AI Agent
image: /images/blog/rooted-tree-tradeoff.svg
image_alt: "Two rooted trees illustrate the tradeoff between total length and root-to-terminal distance."
nav_section: blog
description: "What we learned from eight EDA research projects with AI agents and a study of 8,420 papers."
---

What changes when we can test an algorithmic idea at much lower cost? Over the summer, we explored this question through eight EDA research projects involving one faculty member and seven students. Some students had not yet published a paper, and several projects took us into unfamiliar subjects.

We supplied questions, codebases, and ways to evaluate the results, and left much of the algorithmic exploration to AI agents. Working on routing-tree theory, logic optimization, clock trees, and placement, we began to see where progress came quickly, where it slowed down, and how our own role changed. We shared these experiences in our ICICM invited talk on October 17 and in the [companion paper](https://arxiv.org/abs/2610.10129).

## Learning through concrete results

<figure>
  <a href="{{ '/images/blog/rooted-tree-tradeoff.svg' | relative_url }}"><img src="{{ '/images/blog/rooted-tree-tradeoff.svg' | relative_url }}" width="760" height="320" loading="lazy" alt="Two schematic trees on the same terminals: a shared-edge tree and a tree with direct connections to the root."></a>
  <figcaption>Two competing objectives in routing-tree design: sharing edges reduces total length, while direct root connections can shorten root-to-terminal paths. Edges are schematic; the study uses rectilinear distances.</figcaption>
</figure>

We began one project with a classical routing question: how can a tree keep both its total wirelength and its longest root-to-terminal path small? After an early proposed guarantee failed on a counterexample, the search led to a height-partition construction that bounds both quantities within twice their respective lower bounds. We reconstructed the proof and developed a practical implementation. Our [tree paper](https://arxiv.org/abs/2607.17005) and [code](https://github.com/CODA-Team/hp-rcrst) describe that progression.

In another project, we explored an existing logic-optimization tool. By tracing relationships among its transformations, the agents found an exact argument for reducing 40 available actions to 31. Understanding the implementation became part of discovering the result. In our [timing-aware rewriting](https://arxiv.org/abs/2609.02470) work, we removed repeated computation by batching candidates within the same decision. The selected action stayed the same across all 250 evaluated decisions.

These projects gave us a different way to learn. We could start with a question and build our understanding by examining proposed constructions, failed experiments, and working code. Having a concrete result in front of us made it easier to ask the next question and decide what to try.

## From an idea to a working tool

We found it easier to improve a specific part of a problem than to improve a complete tool. In physical remapping, an exact solution to an approximate objective could make the routed design worse. In clock-tree optimization, stronger certificates reduced feasibility checks, but solving the complete model was still faster. In placement, we developed several useful components without reaching our target of a five-percent improvement in the complete placer.

Finding a promising direction was also only part of the work. In rewriting, we chose our direction by day three of a 23-day project. In LUT optimization, we began the C++ experiments by day seven of 54. Much of the remaining time went into implementation, comparisons, and revision.

We often found useful opportunities in small but costly parts of existing tools: redundant choices, repeated evaluations, and constraints that had received little attention. Improvements there were easier to carry through to the final objective. Improving the whole tool meant getting many of these choices to work well together.

<figure>
  <a href="{{ '/images/blog/research-development-timelines.svg' | relative_url }}"><img src="{{ '/images/blog/research-development-timelines.svg' | relative_url }}" width="760" height="330" loading="lazy" alt="Project timelines: rewriting reached its milestone by day 3 of 23, contraction by day 5 of 32, and LUT optimization by day 7 of 54."></a>
  <figcaption>Our first milestones came early: choosing a direction in rewriting, completing a 40-netlist study in contraction, and starting C++ experiments in LUT optimization. The bars show elapsed calendar days within each recorded project period.</figcaption>
</figure>

## How much of EDA can be explored this way?

To place these experiences in a wider context, we collected 8,420 papers from DAC, ICCAD, DATE, ASP-DAC, TCAD, and TODAES over 2022–2026. We defined research categories and used AI agents to classify the papers from their titles and abstracts. Of the 2,380 papers assigned to nine core EDA topics, 1,789 studied established computational formulations, 536 introduced new computational formulations, and 55 required new physical experiments, fabrication, or human participation.

<figure>
  <a href="{{ '/images/blog/eda-research-settings.svg' | relative_url }}"><img src="{{ '/images/blog/eda-research-settings.svg' | relative_url }}" width="760" height="290" loading="lazy" alt="Of 2,380 core EDA papers, 1,789 address established computational formulations, 536 address new computational formulations, and 55 require external intervention."></a>
  <figcaption>Research settings in the core EDA subset. Categories were assigned from titles and abstracts; the publication snapshot is October 7, 2026.</figcaption>
</figure>

The two computational categories together account for 97.7% of these papers. In this part of EDA, we can learn from experiments using existing software, models, and data. There is room for new problem definitions, too: changing a capacity constraint or an objective can open up a substantial research question that we can investigate on a computer.

We also looked at authors who published in DAC, DATE, and ASP-DAC in both 2025 and 2026. For this comparison, we included core EDA and related AI-for-EDA papers and excluded papers explicitly about LLMs or agents. The same 73 last authors published 142 papers in 2025 and 184 in 2026. A separate group of 45 recurring first authors went from 49 papers to 54.

For the last-author group, the number of distinct first–last coauthor pairs grew from 134 to 164, while papers per pair stayed close to one. We are interested in how these collaborations develop over time, and what they might tell us about the way groups pursue several research questions in parallel.

<figure>
  <a href="{{ '/images/blog/publication-partnerships.svg' | relative_url }}"><img src="{{ '/images/blog/publication-partnerships.svg' | relative_url }}" width="760" height="340" loading="lazy" alt="For the same 73 last authors, papers grew from 142 to 184 and distinct first-last author pairs grew from 134 to 164 between 2025 and 2026."></a>
  <figcaption>Publication output and distinct first–last author partnerships in the same 73-person last-author cohort, 2025–2026. The subset covers core EDA and related AI-for-EDA papers, excluding explicitly LLM/agent-themed papers and Late Breaking Results.</figcaption>
</figure>

## What becomes more valuable?

When trying another idea costs less, we can consider more questions and more ways to approach them. Our experiments brought us back to what we want from a result: does it help someone understand a problem, build on an algorithm, reproduce a comparison, or improve a tool?

As more ideas become experiments we can run, choosing the question and making sense of the outcome become more important parts of our work. We also see a useful way for students to enter unfamiliar subjects: start investigating, work through concrete results, and learn along the way. Sharing the tools and explaining what we find gives others a place to continue.

<p class="blog-source-note">Based on the ICICM 2026 invited talk, <em>When Algorithmic Exploration Becomes Cheap</em>, and the <a href="https://arxiv.org/abs/2610.10129">study</a> by Keren Zhu, Yu Deng, Xiaoyu Hao, Liwen Jiang, Zijian Jiang, Cunqing Lan, Boxiang Song, Pujun Su, and Yaojia Wang.</p>

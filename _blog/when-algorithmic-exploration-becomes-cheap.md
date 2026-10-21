---
layout: blog
title: "When algorithmic exploration becomes cheap"
date: 2026-10-22 10:00:00 +0800
author: My AI Agent
image: /images/blog/rooted-tree-tradeoff.svg
image_alt: "Two rooted trees illustrate the tradeoff between total length and root-to-terminal distance."
nav_section: blog
description: "What eight agentic EDA experiments and a study of 8,420 papers suggest about algorithm research."
---

What changes when trying an algorithmic idea becomes much less expensive? Over the summer, CODA lab explored this question through eight EDA research projects. One faculty member and seven students took part, including students who had not yet published a paper. Several projects addressed topics new to the participants.

The participants supplied questions, codebases, and ways to evaluate the results, while leaving much of the algorithmic exploration to AI agents. The projects ranged from routing-tree theory and logic optimization to clock trees and placement. They showed where progress came quickly, where it slowed down, and how the researchers' role changed. Keren Zhu discussed these experiences at ICICM on October 17; the full study is in the [companion paper](https://arxiv.org/abs/2610.10129).

## Learning through concrete results

<figure>
  <a href="{{ '/images/blog/rooted-tree-tradeoff.svg' | relative_url }}"><img src="{{ '/images/blog/rooted-tree-tradeoff.svg' | relative_url }}" width="760" height="320" loading="lazy" alt="Two schematic trees on the same terminals: a shared-edge tree and a tree with direct connections to the root."></a>
  <figcaption>Two competing objectives in routing-tree design: sharing edges reduces total length, while direct root connections can shorten root-to-terminal paths. Edges are schematic; the study uses rectilinear distances.</figcaption>
</figure>

One project started with a classical routing question: how can a tree keep both its total wirelength and its longest root-to-terminal path small? An early proposed guarantee failed on a counterexample. The subsequent search produced a height-partition construction that bounds both quantities within twice their respective lower bounds. The team reconstructed the proof and developed a practical implementation. The [tree study](https://arxiv.org/abs/2607.17005) and [code](https://github.com/CODA-Team/hp-rcrst) describe that progression.

A different project started inside an existing logic-optimization tool. By tracing relationships among its transformations, the agents found an exact argument for reducing a menu of 40 actions to 31. Understanding the implementation was part of discovering the result. In [timing-aware rewriting](https://arxiv.org/abs/2609.02470), batching candidates within the same decision removed repeated work while preserving the selected action across 250 evaluated decisions.

These projects changed the order of learning. Participants could begin with a question, then build their understanding by examining proposed constructions, failed experiments, and working code. A concrete result gave them something specific to question and improve.

## From an idea to a better tool

Focused results came more readily than complete-tool gains. In physical remapping, an exact solution to an approximate objective could make the routed design worse. In clock-tree optimization, stronger certificates reduced feasibility checks, while a solver for the complete model was still faster. The placement project developed several useful components but missed its target of a five-percent improvement in the complete placer.

Integration also took time after a promising direction emerged. The rewriting project selected its direction by day three of a 23-day development window. The LUT-optimization project entered its C++ campaign by day seven of 54. Implementation, comparisons, and revision occupied much of the remaining calendar time.

Opportunities emerged in small, expensive parts of existing tools: redundant choices, repeated evaluations, and constraints that had received little attention. Their effects were often easier to carry through to the final objective. Strong end-to-end tools required more of those choices to work well together.

<figure>
  <a href="{{ '/images/blog/research-development-timelines.svg' | relative_url }}"><img src="{{ '/images/blog/research-development-timelines.svg' | relative_url }}" width="760" height="330" loading="lazy" alt="Project timelines: rewriting reached its milestone by day 3 of 23, contraction by day 5 of 32, and LUT optimization by day 7 of 54."></a>
  <figcaption>Early milestones left substantial development ahead: direction selection in rewriting, a 40-netlist study in contraction, and the start of C++ experiments in LUT optimization. Lengths show calendar days within the recorded project windows.</figcaption>
</figure>

## How much of EDA can be explored this way?

Alongside the experiments, the team collected 8,420 papers from DAC, ICCAD, DATE, ASP-DAC, TCAD, and TODAES over 2022–2026. They defined research categories and used AI agents to classify titles and abstracts. Within the 2,380 papers assigned to nine core EDA topics, 1,789 studied established computational formulations, 536 introduced new computational formulations, and 55 required new physical experiments, fabrication, or human participation.

<figure>
  <a href="{{ '/images/blog/eda-research-settings.svg' | relative_url }}"><img src="{{ '/images/blog/eda-research-settings.svg' | relative_url }}" width="760" height="290" loading="lazy" alt="Of 2,380 core EDA papers, 1,789 address established computational formulations, 536 address new computational formulations, and 55 require external intervention."></a>
  <figcaption>Research settings in the core EDA subset. Categories were assigned from titles and abstracts; the publication snapshot is October 7, 2026.</figcaption>
</figure>

The two computational categories together account for 97.7% of this subset. They describe a large body of research whose feedback comes from existing software, models, and data. This includes new problem definitions: a new capacity constraint or objective can create a substantial research question while keeping the experiment executable on a computer.

The study also compared recurring author groups in DAC, DATE, and ASP-DAC. This analysis covered core EDA and related AI-for-EDA papers, excluding papers whose subject explicitly involved LLMs or agents. The same 73 last authors appeared in both 2025 and 2026; their output rose from 142 papers to 184. A separate cohort of 45 recurring first authors went from 49 papers to 54.

For the last-author cohort, distinct first–last coauthor pairs rose from 134 to 164, while papers per pair stayed close to one. Tracking these collaborations over time could help show how parallel research develops within groups.

<figure>
  <a href="{{ '/images/blog/publication-partnerships.svg' | relative_url }}"><img src="{{ '/images/blog/publication-partnerships.svg' | relative_url }}" width="760" height="340" loading="lazy" alt="For the same 73 last authors, papers grew from 142 to 184 and distinct first-last author pairs grew from 134 to 164 between 2025 and 2026."></a>
  <figcaption>Publication output and distinct first–last author partnerships in the same 73-person last-author cohort, 2025–2026. The subset covers core EDA and related AI-for-EDA papers, excluding explicitly LLM/agent-themed papers and Late Breaking Results.</figcaption>
</figure>

## What becomes more valuable?

Cheaper exploration could make more parallel investigations and problem variants practical. The experiments also raised a practical question: how does a result help others understand a problem, build on an algorithm, reproduce a comparison, or improve a tool?

As more ideas reach a runnable experiment, choosing the question and interpreting the outcome become central parts of the work. For students, this opens a way to enter unfamiliar subjects through active investigation. For the field, it makes shared tools, clear explanations, and careful research judgment increasingly valuable.

<p class="blog-source-note">Based on the ICICM 2026 invited talk, <em>When Algorithmic Exploration Becomes Cheap</em>, and the <a href="https://arxiv.org/abs/2610.10129">study</a> by Keren Zhu, Yu Deng, Xiaoyu Hao, Liwen Jiang, Zijian Jiang, Cunqing Lan, Boxiang Song, Pujun Su, and Yaojia Wang.</p>

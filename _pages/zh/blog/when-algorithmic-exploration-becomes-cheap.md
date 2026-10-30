---
layout: blog
lang: zh
title: "当算法探索变得便宜"
permalink: /zh/blog/when-algorithmic-exploration-becomes-cheap/
english_url: /blog/when-algorithmic-exploration-becomes-cheap/
date: 2026-10-22 10:00:00 +0800
author: My AI Agent
image: /images/blog/rooted-tree-tradeoff.svg
image_alt: "两棵有根树展示总线长与根节点到终端距离之间的权衡。"
nav_section: blog
description: "八项 AI 智能体 EDA 研究实验与 8,420 篇论文的分析，带来哪些关于算法研究的观察？"
---

当尝试一个算法想法的成本大幅下降，研究会发生什么变化？这个夏天，CODA lab 通过八项 EDA 研究项目探索了这个问题。一位教师与七位学生参与其中，包括尚未发表过论文的学生；若干项目的主题对参与者而言也是新的。

参与者提供问题、代码库和评估方法，将相当一部分算法探索交给 AI 智能体。项目覆盖布线树理论、逻辑优化、时钟树和布局，展示了进展容易发生在哪里、又会在哪里放缓，以及研究者的角色如何变化。Keren Zhu（朱可人）在10月17日的 ICICM 报告中分享了这些经历，完整研究见[配套论文](https://arxiv.org/abs/2610.10129)。

## 从具体结果中学习

<figure>
  <a href="{{ '/images/blog/rooted-tree-tradeoff.svg' | relative_url }}"><img src="{{ '/images/blog/rooted-tree-tradeoff.svg' | relative_url }}" width="760" height="320" loading="lazy" alt="同一组终端上的两棵示意树：一棵共享更多边，另一棵让终端直接连接根节点。"></a>
  <figcaption>布线树设计中的两个目标：共享边有助于减少总线长，直接连接根节点则有助于缩短根到终端的路径。图中连线为示意，研究采用直角距离。</figcaption>
</figure>

一个项目从经典的布线问题出发：如何让一棵树同时具有较小的总线长和较短的最长根到终端路径？早期提出的保证被一个反例推翻，后续搜索得到了一种高度分区构造，将两个量都控制在各自下界的两倍以内。团队重建了证明，并开发出实际实现。[布线树论文](https://arxiv.org/abs/2607.17005)与[代码](https://github.com/CODA-Team/hp-rcrst)记录了这一过程。

另一个项目从现有逻辑优化工具内部开始。通过追踪不同变换之间的关系，智能体找到了将40个动作精确缩减为31个的论证。理解实现本身成为发现结果的一部分。在[时序感知重写](https://arxiv.org/abs/2609.02470)项目中，将同一次决策中的候选批量处理，减少了重复计算，并在所评估的250次决策中保持了相同的动作选择。

这些项目改变了学习的顺序。参与者可以先从问题出发，再通过检查候选构造、失败实验和可运行代码建立理解。一个具体结果，给了他们可以追问和改进的对象。

## 从一个想法走向更好的工具

局部结果比完整工具的性能提升更容易取得。在物理重映射中，近似目标的精确解可能使布线后的设计变差；在时钟树优化中，更强的证书减少了可行性检查，但直接求解完整模型的求解器仍然更快。布局项目开发出若干有用的组件，却没有达到完整布局器性能提升5%的目标。

即使已经找到有希望的方向，集成仍需要时间。重写项目在23天开发窗口中的第3天确定了方向；LUT 优化项目在54天窗口中的第7天进入 C++ 实验阶段。实现、对比和修改占据了剩余时间中的很大一部分。

机会经常出现在现有工具中规模不大却开销显著的部分：冗余选择、重复评估，以及较少受到关注的约束。这些改动的作用通常更容易传递到最终目标。要得到强大的端到端工具，则需要更多这样的选择协同发挥作用。

<figure>
  <a href="{{ '/images/blog/research-development-timelines.svg' | relative_url }}"><img src="{{ '/images/blog/research-development-timelines.svg' | relative_url }}" width="760" height="330" loading="lazy" alt="项目时间线：重写在23天中的第3天达到早期节点，收缩在32天中的第5天，LUT 优化在54天中的第7天。"></a>
  <figcaption>早期节点之后仍有大量开发工作：重写项目确定方向、收缩项目完成40个网表的研究，以及 LUT 优化项目开始 C++ 实验。长度表示已记录项目窗口内的日历天数。</figcaption>
</figure>

## 有多少 EDA 问题可以这样探索？

在实验之外，团队收集了2022–2026年间 DAC、ICCAD、DATE、ASP-DAC、TCAD 和 TODAES 的8,420篇论文。研究者定义分类，并让 AI 智能体根据题目与摘要进行归类。在归入九个核心 EDA 方向的2,380篇论文中，1,789篇研究已有计算问题，536篇提出新的计算问题，55篇需要新的物理实验、制造或人员参与。

<figure>
  <a href="{{ '/images/blog/eda-research-settings.svg' | relative_url }}"><img src="{{ '/images/blog/eda-research-settings.svg' | relative_url }}" width="760" height="290" loading="lazy" alt="2,380篇核心 EDA 论文中，1,789篇研究已有计算问题，536篇提出新计算问题，55篇需要外部干预。"></a>
  <figcaption>核心 EDA 子集中的研究类型。分类依据为题目和摘要，论文数据快照日期为2026年10月7日。</figcaption>
</figure>

两个计算类合计占该子集的97.7%。它们对应大量可以从现有软件、模型与数据中获得反馈的研究，其中也包括新问题的定义：一个新的容量约束或优化目标，就可能形成有分量的研究问题，同时保持实验可以在计算机上执行。

研究还比较了 DAC、DATE 和 ASP-DAC 中连续出现的作者群体。这项分析覆盖核心 EDA 及相关 AI-for-EDA 论文，排除了主题明确涉及大语言模型或智能体的论文。2025年和2026年都出现的73位末位作者，其论文数量从142篇增至184篇；另一组连续出现的45位第一作者，论文数量则从49篇增至54篇。

对于末位作者群体，不同的“第一作者—末位作者”合作组合从134组增至164组，而每组合作对应的论文数仍接近一篇。持续观察这些合作关系，有助于理解课题组内部的并行研究如何发展。

<figure>
  <a href="{{ '/images/blog/publication-partnerships.svg' | relative_url }}"><img src="{{ '/images/blog/publication-partnerships.svg' | relative_url }}" width="760" height="340" loading="lazy" alt="同一组73位末位作者，2025至2026年的论文数从142增至184，不同的第一作者—末位作者组合从134增至164。"></a>
  <figcaption>同一组73位末位作者在2025–2026年的论文产出与第一作者—末位作者合作组合数。子集包含核心 EDA 及相关 AI-for-EDA 论文，不含明确以大语言模型／智能体为主题的论文及 Late Breaking Results。</figcaption>
</figure>

## 什么会变得更有价值？

探索成本下降，可能使更多并行研究与问题变体成为现实。这些实验也提出了一个实际问题：一项结果如何帮助他人理解问题、改进算法、复现比较，或者提升工具？

当更多想法能够进入可运行的实验，选择问题和解释结果就成为研究中的关键环节。对学生而言，这提供了一条通过主动探索进入陌生领域的路径；对整个领域而言，共享工具、清晰解释与审慎的研究判断，会变得更加重要。

<p class="blog-source-note">基于 ICICM 2026 邀请报告 <em>When Algorithmic Exploration Becomes Cheap</em>，以及 Keren Zhu、Yu Deng、Xiaoyu Hao、Liwen Jiang、Zijian Jiang、Cunqing Lan、Boxiang Song、Pujun Su 和 Yaojia Wang 的<a href="https://arxiv.org/abs/2610.10129">研究论文</a>。</p>

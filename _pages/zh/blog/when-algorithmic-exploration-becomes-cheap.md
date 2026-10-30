---
layout: blog
lang: zh
title: "当算法探索变得廉价"
permalink: /zh/blog/when-algorithmic-exploration-becomes-cheap/
english_url: /blog/when-algorithmic-exploration-becomes-cheap/
date: 2026-10-22 10:00:00 +0800
author: My AI Agent
image: /images/blog/rooted-tree-tradeoff.svg
image_alt: "两棵有根树展示总线长与根节点到终端距离之间的权衡。"
nav_section: blog
description: "我们从八个 AI 智能体辅助的 EDA 研究项目和 8,420 篇论文中，看到了哪些变化？"
---

当我们能以更低的成本尝试一个算法想法，研究会发生什么变化？这个夏天，我们通过八个 EDA 研究项目，尝试回答这个问题。参与其中的是一位教师和七位学生，有的同学还没有发表过论文，有的项目也涉及大家此前不熟悉的方向。

我们提出问题，提供代码库和评估方法，把相当一部分算法探索交给 AI 智能体。从布线树理论、逻辑优化，到时钟树和布局，我们逐渐看到了哪些环节进展较快、哪些环节仍然费时，以及我们自己的工作如何随之变化。我们在10月17日的 ICICM 邀请报告中分享了这些经历，也将它们整理成了[论文](https://arxiv.org/abs/2610.10129)。

## 从具体结果中学习

<figure>
  <a href="{{ '/images/blog/rooted-tree-tradeoff.svg' | relative_url }}"><img src="{{ '/images/blog/rooted-tree-tradeoff.svg' | relative_url }}" width="760" height="320" loading="lazy" alt="同一组终端上的两棵示意树：一棵共享更多边，另一棵让终端直接连接根节点。"></a>
  <figcaption>布线树设计中的两个目标：共享边有助于减少总线长，直接连接根节点则有助于缩短根到终端的路径。图中连线为示意，研究采用直角距离。</figcaption>
</figure>

在一个项目中，我们从经典的布线问题出发：怎样构造一棵树，让总线长和最长的根到终端路径都尽可能短？早期提出的理论保证被一个反例推翻，后续探索则找到了一种高度分区构造，能将两个量都控制在各自下界的两倍以内。我们重新推导了证明，并将算法实现出来。[布线树论文](https://arxiv.org/abs/2607.17005)与[代码](https://github.com/CODA-Team/hp-rcrst)记录了这个过程。

在另一个项目中，我们深入了一款现有逻辑优化工具的实现。智能体通过追踪不同变换之间的关系，找到了将40种可选操作精简为31种的严格依据。理解代码的过程，也成了发现问题的过程。在[考虑时序的逻辑重写](https://arxiv.org/abs/2609.02470)项目中，我们把同一次决策中的候选方案放在一起处理，减少了重复计算；在所评估的250次决策中，最终选择的操作都保持不变。

这些经历让我们尝试了另一种学习方式：先带着问题动手，再通过候选构造、失败的实验和可运行的代码，逐步建立理解。眼前有了具体结果，接下来该追问什么、该尝试什么，也就更清楚了。

## 从一个想法到可用的工具

我们发现，改善一个具体环节，往往比提升整个工具更容易。在物理重映射中，即便精确求解了近似目标，布线后的设计也可能变差；在时钟树优化中，更强的可行性证书减少了检查次数，但直接求解完整模型仍然更快。布局项目中，我们做出了几个有用的组件，最终却没有达到完整布局器性能提升5%的目标。

找到值得尝试的方向，也只是工作的一部分。重写项目一共进行了23天，我们在第3天就确定了方向；LUT 优化项目持续了54天，第7天便开始了 C++ 实验。后面的大量时间，花在了实现、对比和反复修改上。

回头看，我们经常在现有工具中不大起眼、却很耗时的环节找到机会，比如冗余的选择、重复的评估，以及较少受到关注的约束。改进这些环节，比较容易在最终结果中看到效果。而要提升整个工具，就需要让许多这样的改动配合起来。

<figure>
  <a href="{{ '/images/blog/research-development-timelines.svg' | relative_url }}"><img src="{{ '/images/blog/research-development-timelines.svg' | relative_url }}" width="760" height="330" loading="lazy" alt="项目时间线：重写在23天中的第3天达到早期节点，收缩在32天中的第5天，LUT 优化在54天中的第7天。"></a>
  <figcaption>我们较早就完成了几个阶段性步骤：重写项目确定方向、收缩项目完成40个网表的研究、LUT 优化项目开始 C++ 实验。图中长度按各项目记录的日历天数绘制。</figcaption>
</figure>

## 有多少 EDA 问题可以这样探索？

为了把这些经历放到更大的背景中理解，我们收集了2022–2026年间 DAC、ICCAD、DATE、ASP-DAC、TCAD 和 TODAES 的8,420篇论文。我们先定义研究类型，再让 AI 智能体根据题目和摘要归类。其中，2,380篇论文属于九个核心 EDA 方向：1,789篇研究已有的计算问题，536篇提出新的计算问题，55篇需要新的物理实验、制造或人员参与。

<figure>
  <a href="{{ '/images/blog/eda-research-settings.svg' | relative_url }}"><img src="{{ '/images/blog/eda-research-settings.svg' | relative_url }}" width="760" height="290" loading="lazy" alt="2,380篇核心 EDA 论文中，1,789篇研究已有计算问题，536篇提出新计算问题，55篇需要外部干预。"></a>
  <figcaption>九个核心 EDA 方向中的研究类型。我们根据题目和摘要进行分类，使用的论文数据截至2026年10月7日。</figcaption>
</figure>

前两类占这2,380篇论文的97.7%。在这部分研究中，我们可以利用现有的软件、模型和数据开展实验、获得反馈。这也包括提出新问题：改变一个容量约束或优化目标，就可能带来值得深入研究的问题，而实验仍然可以在计算机上完成。

我们还比较了在2025年和2026年都有论文发表于 DAC、DATE 或 ASP-DAC 的作者。这里统计的是核心 EDA 及相关 AI-for-EDA 论文，不包括明确以大语言模型或智能体为主题的论文。同一组73位末位作者的论文数量，从142篇增至184篇；另一组45位第一作者的论文数量，则从49篇增至54篇。

在这组末位作者中，不同的“第一作者—末位作者”合作组合从134组增至164组，每组合作对应的论文数仍接近一篇。我们关心这些合作关系如何随时间变化，以及它们能否帮助我们理解课题组同时开展多项研究的方式。

<figure>
  <a href="{{ '/images/blog/publication-partnerships.svg' | relative_url }}"><img src="{{ '/images/blog/publication-partnerships.svg' | relative_url }}" width="760" height="340" loading="lazy" alt="同一组73位末位作者，2025至2026年的论文数从142增至184，不同的第一作者—末位作者组合从134增至164。"></a>
  <figcaption>同一组73位末位作者在2025–2026年的论文产出与第一作者—末位作者合作组合数。子集包含核心 EDA 及相关 AI-for-EDA 论文，不含明确以大语言模型／智能体为主题的论文及 Late Breaking Results。</figcaption>
</figure>

## 什么会变得更有价值？

当尝试另一个想法的成本降低，我们就能考虑更多问题，也能多试几条路径。这些实验让我们重新思考，一项研究结果究竟能带来什么：帮助别人理解一个问题，接着改进一个算法，复现一次比较，或是把工具做得更好？

当更多想法能变成真正跑起来的实验，选择什么问题、如何理解结果，就成了我们工作中更加重要的部分。我们也看到了同学们进入陌生方向的一条路径：从动手探索开始，在具体的问题和结果中逐步学习。把工具分享出来，把发现讲清楚，别人也就能从这里继续往前走。

<p class="blog-source-note">基于 ICICM 2026 邀请报告 <em>When Algorithmic Exploration Becomes Cheap</em>，以及 Keren Zhu、Yu Deng、Xiaoyu Hao、Liwen Jiang、Zijian Jiang、Cunqing Lan、Boxiang Song、Pujun Su 和 Yaojia Wang 的<a href="https://arxiv.org/abs/2610.10129">研究论文</a>。</p>

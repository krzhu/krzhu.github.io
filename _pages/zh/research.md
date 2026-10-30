---
layout: simple
lang: zh
title: "研究"
permalink: /zh/research/
english_url: /research/
nav_section: research
---

我们研究学习、优化与物理模型如何共同用于芯片设计，将算法、电路和物理实现联系起来，覆盖数字、模拟与射频系统。

<section class="research-area" id="learning">
  <figure>
    <a href="https://ieeexplore.ieee.org/document/11195806/"><img class="research-visual" src="{{ '/images/research/pigmap2-routing-demand.png' | relative_url }}" width="2523" height="2223" loading="lazy" alt="PigMap2 的布线需求热力图，红色表示局部高需求区域。"></a>
    <figcaption>PigMap2 中的布线需求估计。</figcaption>
  </figure>
  <div>
    <h2>面向设计的学习与优化</h2>
    <p>我们将学习方法与数学优化相结合，研究高层次综合和逻辑综合。程序与电路结构，以及综合和物理设计工具的反馈，帮助我们在大规模设计空间中开展搜索。</p>
    <ul class="work-list">
      <li><a href="{{ '/zh/publications/' | relative_url }}#lens-hls">LENS-HLS</a> <span>— 大语言模型引导的高层次综合设计空间探索 · TRETS 2026 / FPT Journal Track</span></li>
      <li><a href="{{ '/zh/publications/' | relative_url }}#encylogic">EncyLogic</a> <span>— 将逻辑综合建模为序列生成 · ICCAD 2026</span></li>
      <li><a href="https://ieeexplore.ieee.org/document/11195806/">PigMap2</a> <span>— 物理信息引导的工艺映射 · TCAD 2025</span></li>
    </ul>
    <p class="research-links"><a href="https://github.com/krzhu/abcRL">abcRL 代码</a><a href="{{ '/zh/publications/' | relative_url }}#conference-papers">相关论文</a></p>
  </div>
</section>

<section class="research-area" id="co-design">
  <figure>
    <a href="{{ '/images/research/damil-dcim-layout-web.png' | relative_url }}"><img class="research-visual research-layout" src="{{ '/images/research/damil-dcim-layout-web.png' | relative_url }}" width="1600" height="670" loading="lazy" alt="DAMIL-DCIM 生成的数字存内计算版图，包含存储、计算与控制区域。"></a>
    <figcaption>DAMIL-DCIM 生成的存内计算电路版图。</figcaption>
  </figure>
  <div>
    <h2>跨层协同设计</h2>
    <p>逻辑、数据流和封装层面的决策，共同决定物理设计能够达到的性能。我们通过物理感知综合、数据流感知的存内计算版图，以及考虑制造约束的芯粒布局，将这些决策联系起来。</p>
    <ul class="work-list">
      <li><a href="{{ '/zh/publications/' | relative_url }}#phyls">PhyLS</a> <span>— AI 驱动的物理感知综合 · FCS 2026</span></li>
      <li><a href="https://ieeexplore.ieee.org/document/11154029/">DAMIL-DCIM+</a> <span>— 数据流感知的数字存内计算版图综合 · TCAD 2025</span></li>
      <li><a href="https://ieeexplore.ieee.org/document/11740930">ULTRA-2.5D</a> <span>— 大规模跨光罩芯粒布局 · TCAD 2026</span></li>
    </ul>
    <p class="research-links"><a href="https://github.com/panhomyoung/phyLS">PhyLS 代码</a><a href="https://phyls.readthedocs.io/en/latest/">文档</a></p>
  </div>
</section>

<section class="research-area" id="physical-modeling">
  <figure>
    <a href="{{ '/zh/publications/' | relative_url }}#perifi"><img class="research-visual" src="{{ '/images/research/perifi-rf-geometry.png' | relative_url }}" width="1076" height="1274" loading="lazy" alt="PeRIFi 优化得到的射频金属几何形状与端口位置。"></a>
    <figcaption>PeRIFi 设计的射频匹配网络几何结构。</figcaption>
  </figure>
  <div>
    <h2>模拟、射频与物理信息引导的设计</h2>
    <p>模拟与射频设计需要同时考虑电路行为、器件选择和几何结构。我们研究电路尺寸优化与版图综合、面向射频逆向设计的物理信息模型，并开发用于研究这些问题的开源工具和基准测试。</p>
    <ul class="work-list">
      <li><a href="{{ '/zh/publications/' | relative_url }}#perifi">PeRIFi</a> <span>— 融合物理信息的射频逆向设计 · DAC 2026</span></li>
      <li><a href="https://github.com/CODA-Team/AnalogGym">AnalogGym</a> <span>— 电路综合基准测试 · ICCAD 2024</span></li>
      <li><a href="https://github.com/magical-eda/MAGICAL">MAGICAL</a> <span>— 从网表到 GDSII 的模拟版图自动化</span></li>
    </ul>
    <p class="research-links"><a href="https://github.com/CODA-Team/AnalogGym">AnalogGym 代码</a><a href="https://github.com/magical-eda/MAGICAL">MAGICAL 代码</a></p>
  </div>
</section>

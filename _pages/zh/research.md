---
layout: simple
lang: zh
title: "研究"
permalink: /zh/research/
english_url: /research/
nav_section: research
---

我们研究芯片设计与计算系统中的算法问题，关注学习方法、数学优化与物理模型如何相互配合。我们的工作从算法和电路延伸到物理实现，涉及数字、模拟与射频系统。

<section class="research-area" id="learning">
  <figure>
    <a href="https://ieeexplore.ieee.org/document/11195806/"><img class="research-visual" src="{{ '/images/research/pigmap2-routing-demand.png' | relative_url }}" width="2523" height="2223" loading="lazy" alt="PigMap2 的布线需求热力图，红色表示局部高需求区域。"></a>
    <figcaption>PigMap2 中的布线需求估计。</figcaption>
  </figure>
  <div>
    <h2>芯片设计中的学习与优化</h2>
    <p>我们结合学习方法与数学优化，研究高层次综合和逻辑综合。面对庞大的设计空间，我们利用程序和电路的结构，以及综合和物理设计工具给出的反馈，寻找更好的设计方案。</p>
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
    <p>我们关注逻辑、数据流和封装层面的选择如何影响最终设计。在综合中引入物理设计反馈，在生成存内计算版图时考虑数据流，在芯粒布局中纳入制造约束，是我们连接这些设计层次的几种方式。</p>
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
    <h2>模拟与射频设计</h2>
    <p>我们把电路行为、器件选择与几何结构放在一起考虑，研究模拟与射频电路的设计方法。具体工作包括电路尺寸优化、版图综合，以及融合物理信息的射频逆向设计模型。我们也开发开源工具与测试基准，方便大家研究这些问题、比较不同方法。</p>
    <ul class="work-list">
      <li><a href="{{ '/zh/publications/' | relative_url }}#perifi">PeRIFi</a> <span>— 融合物理信息的射频逆向设计 · DAC 2026</span></li>
      <li><a href="https://github.com/CODA-Team/AnalogGym">AnalogGym</a> <span>— 电路综合基准测试 · ICCAD 2024</span></li>
      <li><a href="https://github.com/magical-eda/MAGICAL">MAGICAL</a> <span>— 从网表到 GDSII 的模拟版图自动化</span></li>
    </ul>
    <p class="research-links"><a href="https://github.com/CODA-Team/AnalogGym">AnalogGym 代码</a><a href="https://github.com/magical-eda/MAGICAL">MAGICAL 代码</a></p>
  </div>
</section>

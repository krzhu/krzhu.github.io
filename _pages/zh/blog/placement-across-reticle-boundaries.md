---
layout: blog
lang: zh
title: "连接计算任务与工艺选择"
permalink: /zh/blog/placement-across-reticle-boundaries/
english_url: /blog/placement-across-reticle-boundaries/
date: 2026-10-22 09:00:00 +0800
author: My AI Agent
nav_section: blog
description: "从数据流、电源网络到跨光罩布局，以计算任务为起点理解系统–工艺协同优化。"
image: /images/blog/stco-task-feedback.svg
image_alt: "计算任务、物理实现与工艺选择，通过时序、供电和热反馈联系起来。"
---

改进一个矩阵乘法引擎，可以增加计算单元、让存储更靠近计算、采用更快的器件，或者改变芯片的堆叠方式。每一种选择也会改变通信、供电与散热。要比较这些方案，需要让同一个计算任务经过具体的物理实现。

这是Keren Zhu（朱可人）在 ICCC 2026 关于系统–工艺协同优化（STCO）报告中的核心问题。架构描述系统需要完成什么，器件与制造技术决定系统可以怎样实现，物理设计则将两者连接起来。电源网络优化与跨光罩芯粒布局，分别展示了这种连接的两个侧面。

## 从同一个计算任务出发

先固定矩阵维度、数值精度和批大小。脉动阵列通过相邻乘加单元之间的数据传递，复用操作数。提高并行度可以减少计算周期，但存储系统必须及时供给数据。将存储移到另一层，会改变通信距离、垂直互连与热量分布。

任务执行时间同时取决于所需周期数与可用频率：

<p><i>T</i><sub>task</sub> = <i>N</i><sub>cycles</sub> / <i>f</i><sub>run</sub>。</p>

这里的周期数包括计算和等待数据的时间。运行频率则取决于实现后的信号路径、供电电压与温度。如果物理实现要求降低时钟频率，数据流节省的周期就可能无法转化为执行时间的收益。

评估这种权衡，需要将逻辑映射到标准单元，完成布局布线，再分析互连、供电与热。这些结果会反过来影响并行度、存储位置与工艺选择。

<figure>
  <a href="{{ '/images/blog/stco-task-feedback.svg' | relative_url }}"><img src="{{ '/images/blog/stco-task-feedback.svg' | relative_url }}" loading="lazy" alt="任务映射与工艺选择在物理实现中汇合，时序、供电与热特性共同决定任务时间与能耗。"></a>
  <figcaption>ICCC 报告中的比较方式：沿着同一个任务走到物理实现，再通过时间、能耗、面积和成本比较系统与工艺方案。</figcaption>
</figure>

## 供电决定可用频率

在高密度芯粒系统中，大量计算核心同时切换会产生尖锐的电流峰值。微凸点、中介层金属与硅通孔（TSV）的寄生效应会影响电源网络的响应。电压跌落削弱晶体管驱动能力、增大门延迟，进而限制架构能够运行的频率。

[CNE-PDN](https://doi.org/10.1145/3831252.3833978) 通过元件级模型，将这些效应与版图决策联系起来。电磁仿真提供参考响应，用于拟合等效电阻、电感与电容。固定的 TSV 结构复用拟合参数，变化的金属几何则由神经网络预测其参数，之后按照候选版图的连接关系组装元件。

<figure>
  <a href="{{ '/images/blog/cne-pdn-component-models.png' | relative_url }}"><img src="{{ '/images/blog/cne-pdn-component-models.png' | relative_url }}" width="1560" height="932" loading="lazy" alt="中介层水平金属与垂直 TSV 结构的等效电阻、电感和电容模型。"></a>
  <figcaption>CNE-PDN 用相互耦合的电路元件表示金属段与 TSV，在版图评估中保留其几何与连接关系。</figcaption>
</figure>

组装后网络的阻抗与开关电流波形共同决定电压响应。将开关时间窗口内的平均电压转换为供电限制下的频率估计，就建立了从金属尺寸、TSV 位置到系统运行指标的联系。

完成拟合与训练后，候选方案评估约需8秒，而 HFSS–SPICE 流程约需50分钟。搜索可以联合调整金属尺寸与 TSV 位置，并考虑布线拥塞和禁布区域。在所评估的 CPU/GPU/HBM 设计中，保持芯粒组成与金属尺寸不变，仅调整 TSV 位置，就使估计的供电受限频率从1.935 GHz 提高到2.029 GHz。

<figure>
  <a href="{{ '/images/blog/cne-pdn-tsv-layout.png' | relative_url }}"><img src="{{ '/images/blog/cne-pdn-tsv-layout.png' | relative_url }}" width="2671" height="1531" loading="lazy" alt="在芯粒占用区域与禁布区域周围，沿电源网格调整 TSV 位置。"></a>
  <figcaption>CNE-PDN 搜索的几何空间。蓝色区域为芯粒，粉色区域为 TSV 禁布区；供电与接地 TSV 的位置沿网格调整。</figcaption>
</figure>

## 制造规则改变可行布局

[ULTRA-2.5D](https://ieeexplore.ieee.org/document/11740930) 研究另一层联系：规模更大的芯粒系统可能需要跨越多个光刻曝光区域的中介层。曝光区域之间的拼接，会在边界处引入对准效应和不同的布线规则。

这些规则影响芯粒可以放在哪里，以及引脚如何连接。一个芯粒可以跨接相邻曝光区域，使关键连接留在同一区域内；它的旋转或翻转方向，则可能决定这种安排是否可行。因此，制造约束会直接改变布局搜索问题。

ULTRA-2.5D 将多光罩分区、可微的位置与方向优化、以及合法化结合起来，完成了七个基准测试，最大规模为1,225个芯粒。在 ATPlace2.5D 也能完成的五个测试中，以几何平均计算，基线方法的总半周长线长为 ULTRA-2.5D 的1.40倍。该方法将光罩结构与芯粒连接关系一起纳入物理优化。

<figure>
  <a href="{{ '/images/blog/ultra-placement.png' | relative_url }}"><img src="{{ '/images/blog/ultra-placement.png' | relative_url }}" width="1043" height="525" loading="lazy" alt="ULTRA-2.5D 对22个和225个芯粒的布局过程，从初始位置到跨越四个光罩区域的最终布局。"></a>
  <figcaption>ULTRA-2.5D 在22个和225个芯粒测试上的布局快照。背景颜色区分光罩区域，各幅图依次展示布局过程。</figcaption>
</figure>

## 比较完整的工艺方案

同样的思路也适用于器件与集成方式的选择。器件模型决定单元延迟、功耗与面积，金属和键合规则决定互连负载；映射与物理设计把这些属性转化为具体信号路径，供电与热分析则确定可用的运行条件。

存储带宽、键合密度和散热条件，会进一步影响哪种架构更合适。更多计算单元需要更多数据和电力，更近的存储可以缩短通信距离，也会改变散热路径。最终需要比较的是：完成同一个任务的时间与能耗，以及面积和制造成本。

CNE-PDN 展示了物理模型如何引导几何优化，改善可用运行频率；ULTRA-2.5D 展示了如何将制造规则纳入大规模布局问题。两项工作都为系统与工艺方案的比较提供了物理设计反馈。

<p class="blog-source-note">基于Keren Zhu（朱可人）在 ICCC 2026 的报告《面向三维堆叠芯片的跨层设计自动化与 STCO》。相关工作：<a href="https://doi.org/10.1145/3831252.3833978">CNE-PDN</a>（ICCAD 2026；<a href="https://github.com/ckzhu-research/CNE-PDN">代码</a>）与 <a href="https://ieeexplore.ieee.org/document/11740930">ULTRA-2.5D</a>（IEEE TCAD 2026）。</p>

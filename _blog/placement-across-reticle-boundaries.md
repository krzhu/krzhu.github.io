---
layout: blog
title: "Connecting computing tasks to technology choices"
date: 2026-10-22 09:00:00 +0800
author: My AI Agent
nav_section: blog
description: "A task-level view of system–technology co-optimization, from dataflow to power delivery and multi-reticle placement."
image: /images/blog/stco-task-feedback.svg
image_alt: "Computing tasks, physical implementation, and technology choices linked by timing, power, and thermal feedback."
---

A matrix-multiplication engine can be improved by adding compute units, bringing memory closer, using faster devices, or changing how dies are stacked. Each choice also changes communication, power delivery, and heat. Comparing them means following the same workload through a physical implementation.

This was the central theme of Keren Zhu's ICCC 2026 talk on system–technology co-optimization (STCO). Architecture expresses what the system should do; device and manufacturing technologies determine how it can be built. Physical design connects them. Power-delivery optimization and multi-reticle chiplet placement illustrate two parts of this connection.

## Start with the same computing task

Fix the matrix dimensions, numerical precision, and batch size. A systolic array reuses operands as they move between neighboring multiply–accumulate units. Increasing parallelism can reduce compute cycles, but the memory system must supply data quickly enough. Moving memory onto another tier changes the communication distance, vertical connections, and distribution of heat.

The task time depends on both the required cycles and the usable frequency:

<p><i>T</i><sub>task</sub> = <i>N</i><sub>cycles</sub> / <i>f</i><sub>run</sub>.</p>

Here, the cycle count includes computation and waiting for data. The running frequency depends on implemented signal paths, supply voltage, and temperature. A dataflow that saves cycles can lose that benefit if its physical implementation forces a lower clock rate.

Evaluating this tradeoff requires mapping logic into cells, placing and routing them, and analyzing interconnect, power delivery, and heat. Those results feed back into decisions about parallelism, memory placement, and technology.

<figure>
  <a href="{{ '/images/blog/stco-task-feedback.svg' | relative_url }}"><img src="{{ '/images/blog/stco-task-feedback.svg' | relative_url }}" loading="lazy" alt="Task mapping and technology choices meet in a physical implementation, whose timing, power, and thermal behavior determines task time and energy."></a>
  <figcaption>The ICCC talk's central comparison: follow the same task through implementation, then use its time, energy, area, and cost to compare system and technology choices.</figcaption>
</figure>

## Power delivery changes the usable frequency

In a dense chiplet system, many cores switching together create sharp current peaks. Parasitics in microbumps, interposer metal, and through-silicon vias (TSVs) affect the power network's response. Voltage droop weakens transistor drive and increases gate delay, limiting the frequency at which the architecture can run.

[CNE-PDN](https://doi.org/10.1145/3831252.3833978) connects these effects to layout decisions through a component-level model. Electromagnetic simulation supplies reference responses for fitting equivalent resistance, inductance, and capacitance. Fixed TSV structures reuse fitted parameters; a neural predictor supplies parameters for changing metal geometries. The components are then assembled according to the candidate layout.

<figure>
  <a href="{{ '/images/blog/cne-pdn-component-models.png' | relative_url }}"><img src="{{ '/images/blog/cne-pdn-component-models.png' | relative_url }}" width="1560" height="932" loading="lazy" alt="Equivalent resistance, inductance, and capacitance models for horizontal interposer metal and vertical TSV structures."></a>
  <figcaption>CNE-PDN represents metal segments and TSVs with coupled circuit components, preserving their geometry and connections during layout evaluation.</figcaption>
</figure>

The assembled network's impedance and the switching-current waveform give the voltage response. Voltage averaged over the switching window is converted into a supply-limited frequency estimate. This gives the optimizer a path from metal dimensions and TSV locations to a system-level consequence.

After fitting and training, candidate evaluation takes about eight seconds, compared with roughly fifty minutes for the HFSS–SPICE flow. The search can jointly vary metal dimensions and TSV placement while accounting for routing congestion and keep-out regions. In the evaluated CPU/GPU/HBM design, changing TSV locations raised the estimated supply-limited frequency from 1.935 to 2.029 GHz with the chiplet composition and metal dimensions held fixed.

<figure>
  <a href="{{ '/images/blog/cne-pdn-tsv-layout.png' | relative_url }}"><img src="{{ '/images/blog/cne-pdn-tsv-layout.png' | relative_url }}" width="2671" height="1531" loading="lazy" alt="TSV positions adjusted on a power grid around chiplet footprints and a keep-out region."></a>
  <figcaption>The geometry being searched in CNE-PDN. Blue regions are chiplets; pink marks a TSV keep-out zone. Supply and ground TSV positions are adjusted along the grid.</figcaption>
</figure>

## Manufacturing changes the feasible layout

[ULTRA-2.5D](https://ieeexplore.ieee.org/document/11740930) addresses another connection: larger chiplet systems may need interposers spanning several lithographic exposure fields. Stitching these fields introduces alignment effects and different routing rules at their boundaries.

These rules affect where chiplets can go and how their pins connect. A chiplet may bridge adjacent fields so that critical connections remain within one field. Its rotation or flip can determine whether that arrangement is possible. Manufacturing constraints therefore change the placement search itself.

ULTRA-2.5D combines multi-reticle partitioning, differentiable position-and-orientation optimization, and legalization. It completed seven benchmarks with up to 1,225 chiplets. Across the five cases also completed by ATPlace2.5D, the baseline required 1.40 times the total half-perimeter wirelength, using the geometric mean. The method makes the reticle structure part of physical optimization alongside chiplet connectivity.

<figure>
  <a href="{{ '/images/blog/ultra-placement.png' | relative_url }}"><img src="{{ '/images/blog/ultra-placement.png' | relative_url }}" width="1043" height="525" loading="lazy" alt="ULTRA-2.5D placement snapshots for 22 and 225 chiplets, from initial positions to final layouts across four reticle regions."></a>
  <figcaption>ULTRA-2.5D placement snapshots for 22 and 225 chiplets. Background colors distinguish reticle regions; successive panels show the placement process.</figcaption>
</figure>

## Compare complete technology choices

The same reasoning applies to device and integration choices. Device models determine cell delay, power, and area. Metal and bonding rules determine interconnect loads. Mapping and physical design turn those properties into signal paths, while power and thermal analysis determine usable operating conditions.

Memory bandwidth, bonding density, and cooling then affect which architecture is worthwhile. More compute units need more data and power. Closer memory can shorten communication while changing thermal paths. The relevant comparison is the time and energy to finish the same task, together with area and manufacturing cost.

CNE-PDN shows how a physical model can guide geometry toward a useful operating frequency. ULTRA-2.5D shows how manufacturing rules can be incorporated into a large placement problem. They provide physical-design feedback for comparing system and technology choices.

<p class="blog-source-note">Based on Keren Zhu's ICCC 2026 talk, <em>System–Technology Co-design for Three-Dimensional Chips</em>. Related work: <a href="https://doi.org/10.1145/3831252.3833978">CNE-PDN</a> (ICCAD 2026; <a href="https://github.com/ckzhu-research/CNE-PDN">code</a>) and <a href="https://ieeexplore.ieee.org/document/11740930">ULTRA-2.5D</a> (IEEE TCAD 2026).</p>

---
title: AI-driven robotics for catalyst development
summary: >-
  Building a self-driving lab (SDL) for catalysis development: robotics, high-throughput
  experimentation, agentic AI and edge AI working in a closed loop.
institution: ICIQ · Universitat Rovira i Virgili
period: Nov 2025 – present
order: 0
status: current
featured: true
tags:
  - Self-driving labs
  - Agentic AI
  - Edge AI
  - Robotics
  - Embedded Systems
  - High-throughput experimentation
  - Catalysis
---

## A self-driving lab for catalysis

My PhD project, **"AI-Driven Robotics for Catalyst Development"**, is funded by the ICIQ Fellowship and carried out within the Spanish national grant **2AID** **RAISE** subgroup. The goal is a *self-driving lab* (SDL): a system in which robots run experiments, instruments characterise the results in real time, and agentic AI models decide which experiment to run next, closing the loop between hypothesis and measurement.

## What I work on

- **An AI-driven autonomous flow photoreactor** for catalyst development and reaction optimisation.
- **High-throughput synthesis workflows** that make catalyst preparation reproducible and scalable.
- **Real-time characterisation and closed-loop optimisation**, connecting robotics, machine learning and autonomous experimentation.
- **The hardware and software stack** for automated control, data acquisition and AI-based decision making.
- **Agentic AI** that plans experiments, operates instruments and robots through tools, and reasons over results to decide the next step.
- **Edge and embedded AI**: machine-learning models running on the instruments and controllers themselves, for fast, local decisions close to the hardware.
- **Scientific documentation**, technical reports and publications with multidisciplinary collaborators.

## First building blocks

The agentic layer starts with the instruments themselves. I built LLM-driven drivers for an [oscilloscope](/projects/rigol-mso5000-agentic-driver/) and a [programmable power supply](/projects/ps2084-agentic-power-supply-driver/): an agent turns a plain-language request into a reviewable plan, safety limits are checked, and the instrument runs only after approval.

## Where it comes from

The project builds on my earlier work as a Research Software Engineer at ICIQ, where I automated a [high-power parallel photoreactor](/research/photoreactor-automation/) and built [PhotoScale](/research/photoscale-flow-photoreactor/), a continuous-flow photoreactor designed as a testbed for closed-loop, autonomous photocatalysis, and on my background in embedded systems, robotics and instrument control.

*Institute of Chemical Research of Catalonia (ICIQ), Prof. Julio Lloret-Fillol group · Universitat Rovira i Virgili, Doctoral School of Nanosystems, Bioengineering and Energy (research line: power electronics, energy conversion and control engineering). Supported by the ICIQ Fully Funded PhD Programme 2025.*

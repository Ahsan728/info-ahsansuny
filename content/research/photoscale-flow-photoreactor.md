---
title: 'PhotoScale: an automated continuous-flow photoreactor'
summary: >-
  A continuous-flow photoreactor with embedded sensing, control and logging,
  built as a platform for data-driven, autonomous photocatalysis. Presented as
  a poster at the ICIQ Summer School 2026.
institution: ICIQ · Universitat Rovira i Virgili
period: '2025'
order: 0.5
status: past
featured: true
imageFit: contain
tags:
  - Flow chemistry
  - Photocatalysis
  - Raspberry Pi
  - Lab automation
  - Edge AI
links:
  - label: PCB & software portfolio (PDF)
    url: /files/ahsan-pcb-and-software-portfolio.pdf
  - label: DisplayUI on GitHub
    url: https://github.com/Ahsan728/DisplayUI
  - label: Poster (PDF)
    url: /files/photoscale-poster-iciq-summer-school-2026.pdf
image: /images/research/photoscale-flow-photoreactor/1.webp
gallery:
  - /images/research/photoscale-flow-photoreactor/1.webp
  - /images/research/photoscale-flow-photoreactor/3.webp
  - /images/research/photoscale-flow-photoreactor/4.webp
  - /images/research/photoscale-flow-photoreactor/5.webp
  - /images/research/photoscale-flow-photoreactor/6.webp
  - /images/research/photoscale-flow-photoreactor/2.webp
  - /images/research/photoscale-flow-photoreactor/poster.webp
---

## Overview

PhotoScale is an automated continuous-flow photoreactor built at ICIQ as a platform for data-driven, autonomous photocatalysis. Optimising a new photochemical transformation means searching a high-dimensional space (catalyst loading, reagents, solvents, photon flux, residence time, temperature), and manual screening limits both throughput and reproducibility.

PhotoScale embeds sensing, control and logging in the hardware, and defines a layered upgrade path: structured logging with quality-control gating, machine-vision kinetics, **edge-AI closed-loop optimisation**, and an **LLM pipeline** that distils catalyst knowledge from the literature.

## Architecture

- **Recirculating flow path:** reagent reservoir → peristaltic pump → in-line ultrasonic flow meter → glass tubular reactor.
- **Illumination:** eight 450 nm LUXEON high-power LED matrix plates (48 LEDs each) surround the reactor, water-cooled by an external chiller.
- **Control:** a Raspberry Pi runs a full-screen touchscreen app, started at boot as a system service, with remote operation and configuration over VNC.
- **Light and logging:** four PWM channels set LED intensity from 0 to 100 % (two plates per channel) with independent on/off; temperatures and flow are logged for every run.

| Hardware at a glance | |
| --- | --- |
| Light source | 8 × 450 nm LUXEON LED matrix plates (48 LEDs each) |
| LED power | Phoenix Contact 48 V / 20 A supply |
| Dimming | 4 PWM channels, 0–100 %, independent on/off |
| Flow sensing | In-line ultrasonic flow meter |
| Thermal | Up to 8 temperature sensors + external chiller |
| Control | Raspberry Pi · 7″ touchscreen · VNC · per-run logs |

## Control software

The control unit runs on a **Raspberry Pi 4B** with a touchscreen app I wrote in **Python** with **PyGame**:

- **Touchscreen control** of light intensity for each LED channel, plus manual control through LED dimmers.
- **Real-time temperature monitoring** with DS18B20 one-wire sensors on every reactor plate.
- **Wireless control** through a 2.4 GHz RF module.
- **Data logging** of temperature and light intensity for every run.
- **Fail-safe:** if the system fails, the dimmers fall back to a safe default state.

The code is split into an application core, GPIO/PWM control, sensor reading and reusable UI components. The app is open source on GitHub as [DisplayUI](https://github.com/Ahsan728/DisplayUI).

## Status and results

- The platform is built and validated in routine use: touchscreen UI, PWM LED control, eight-channel temperature logging, flow meter, hotspot and VNC all work and start automatically at boot.
- Standard recirculation runs are logged as a reference, and the software is tracked under Git.
- Every module ships with a simulation mode, so APIs, dashboards and logging can progress regardless of hardware availability.
- Next steps: current and light sensors, the machine-vision pipeline and the edge-AI control loop, which feed into my [self-driving lab research](/research/self-driving-lab-catalysis/).

## Poster

Presented at the **ICIQ Summer School 2026** (20–22 July 2026).

**MD. Shahnauze Ahsan, Damian Giziński, Julio Lloret-Fillol.** *PhotoScale: An Automated Continuous-Flow Photoreactor for Data-Driven Photocatalysis.* Institute of Chemical Research of Catalonia (ICIQ); Universitat Rovira i Virgili (URV); ICREA.

[Download the poster (PDF)](/files/photoscale-poster-iciq-summer-school-2026.pdf)

*Prof. Julio Lloret-Fillol Research Group, ICIQ, Tarragona, Spain.*

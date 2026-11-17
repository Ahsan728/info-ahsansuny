---
title: Electrical data acquisition and supervision over LTE-M
summary: >-
  An ADS131M08-based acquisition system streaming electrical measurements over
  LTE-M to MATLAB and Arduino Cloud.
institution: Schneider Electric · Grenoble INP Esisar
period: Feb – Jul 2023
order: 2
featured: true
tags:
  - Embedded
  - IoT
  - LTE-M
  - Data acquisition
links:
  - label: Code (AcqSys)
    url: 'https://github.com/Ahsan728/AcqSys'
  - label: PCB & software portfolio (PDF)
    url: /files/ahsan-pcb-and-software-portfolio.pdf
  - label: Thesis (PDF)
    url: >-
      https://drive.google.com/file/d/1FN8dkyus_iZ6lrGVRxJu6EXFci4fXtlX/view?usp=sharing
image: /images/research/ads131m08-lte-m-acquisition/1.webp
gallery:
  - /images/research/ads131m08-lte-m-acquisition/1.webp
  - /images/research/ads131m08-lte-m-acquisition/2.webp
  - /images/research/ads131m08-lte-m-acquisition/3.webp
---

## Background

At Schneider Electric, engineers developing AI algorithms need high-quality data samples. Collecting that data in the field is hard, because field products have limited connectivity.

## What I built

A ready-to-run acquisition system for monitoring electrical parameters such as **voltage, current, temperature and noise**. It is highly accurate, runs efficiently on battery, and connects to the cloud over narrowband IoT (**LTE-M**).

The acquired data is analysed with local **MATLAB and Simulink** tools. The Simulink embedded algorithms then generate **C code** that is integrated into the firmware, enabling **RMS measurements and anomaly detection** for various loads.

## Firmware and hardware

- **Platform:** Arduino MKR NB 1500 (ARM Cortex-M0, SAMD21) with a u-blox SARA LTE-M/NB-IoT modem, and two **ADS131M08** 8-channel, 24-bit delta-sigma ADCs sampling at **4 kSPS** over SPI.
- **Firmware:** C++ on **FreeRTOS**, with tasks for ADC sampling and RMS calculation, cloud updates, LED states, debounced push buttons and DAC waveform generation, plus error handling. The new architecture made acquisition and cloud configuration **30% more efficient**.
- **PCB:** designed and fabricated in **KiCad**.
- **Cloud:** Arduino IoT Cloud and its API for remote monitoring, data logging and MATLAB access.

*Schneider Electric, Eybens, Grenoble, France.*

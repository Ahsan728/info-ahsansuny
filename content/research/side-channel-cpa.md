---
title: Side-channel and fault attacks on embedded targets
summary: >-
  Correlation power analysis on STM32, RSA and clock-glitching experiments in
  the embedded security lab.
institution: Grenoble INP Esisar
period: 2022 – 2023
order: 3
featured: true
tags:
  - Hardware security
  - STM32
  - CPA
  - Fault injection
links:
  - label: CPA-Attack
    url: 'https://github.com/Ahsan728/CPA-Attack'
  - label: Lab reports
    url: >-
      https://drive.google.com/drive/folders/1iYe0dfkOt3_xFnr54iZBnURFTRqUf_Zb?usp=sharing
image: /images/research/side-channel-cpa/1.webp
gallery:
  - /images/research/side-channel-cpa/1.webp
  - /images/research/side-channel-cpa/2.webp
  - /images/research/side-channel-cpa/3.webp
  - /images/research/side-channel-cpa/4.webp
  - /images/research/side-channel-cpa/5.webp
---

## Overview

Hands-on experiments using **Correlation Power Analysis (CPA)** on an **AES** implementation written in C and running on an **STM32 ARM** microcontroller. The goal was to study the AES algorithm and the STM32 Nucleo board, propose a measurement method, capture power traces with an oscilloscope, and complete the attack by running CPA on the captured traces.

## Steps

1. Preparing the Nucleo board for a CPA attack
2. Focusing the attack on the point of maximum leakage
3. Interfacing the AES implementation with the computer
4. Performing the attack with a MATLAB script

The lab also covered **RSA encryption** on an FPGA using an exponentiation module, and **fault injection by clock glitching** with a ChipWhisperer-Lite (STM32F303 and Spartan-6 targets).

*Grenoble INP Esisar, France.*

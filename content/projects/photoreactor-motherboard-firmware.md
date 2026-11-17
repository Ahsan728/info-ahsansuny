---
category: software
title: Photoreactor motherboard firmware (STM32F412)
summary: >-
  Firmware for the STM32F412 on the photoreactor motherboard: links the ESP32
  and two LED control cards, logs to SD and keeps the system running safely.
context: ICIQ, Lloret-Fillol group · 2024–2025
year: 2025
tags:
  - Firmware
  - STM32
  - C++
  - PlatformIO
  - Embedded
image: /images/projects/photoreactor-motherboard-firmware/architecture.webp
imageFit: contain
gallery:
  - /images/projects/photoreactor-motherboard-firmware/architecture.webp
  - /images/research/photoreactor-automation/6.webp
  - /images/research/photoreactor-automation/7.webp
  - /images/research/photoreactor-automation/5.webp
---

## Why

The [automated photoreactor](/research/photoreactor-automation/) is built from several boards: a motherboard with an STM32F412 and an ESP32, and peripheral control cards (PCC) that drive the LED currents. The motherboard firmware is the hub that ties them together, so its job is to route commands reliably, keep a record and recover on its own if something goes wrong.

## What it does

- **Routes commands** between the USB host, the **ESP32** (Wi-Fi and Bluetooth for the web and Android interfaces) and **two PCC boards**, each on its own serial link.
- **Logs data to a microSD card** over the fast SDIO interface, with timestamps from the on-chip **real-time clock**.
- **USB CDC** connection for commands and tracing during development and service.
- **Watchdog** to recover automatically from faults.
- Board start-up: pin configuration, card detection, reset and sync lines for the connected boards, and status LEDs.

## How it is built

- **C++ on the Arduino core for STM32** (stm32duino), built and flashed with **PlatformIO** over ST-Link.
- STM32SD, FatFs and STM32 RTC libraries, with a custom FatFs configuration.
- Separate test sketches for the RTC and SD card used during board bring-up.

## My role

I designed the [motherboard PCB](/research/photoreactor-automation/) and wrote this firmware, from bring-up tests to the communication and logging code.

## Code availability

Developed at ICIQ in Prof. Julio Lloret-Fillol's group as part of the photoreactor project. The firmware is in a private ICIQ repository and is not published here.

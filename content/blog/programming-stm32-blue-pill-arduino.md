---
title: Programming the STM32 Blue Pill with the Arduino IDE
description: The STM32 Blue Pill is a powerful 72 MHz ARM Cortex-M3 board, but programming it can confuse newcomers. Here are the three common ways to upload sketches from the Arduino IDE.
date: '2021-01-20'
lang: en
category: technical
series: microcontroller-notes
---

The **STM32 Blue Pill** is a feature-rich development board based on the **STM32F103C8T6**, a 32-bit ARM Cortex-M3 processor running at 72 MHz. Unlike a common Arduino board, which is easy to use, programming the Blue Pill can be confusing, especially for a new user.

There are several ways to program it from the Arduino IDE. Some need extra hardware; others need only a USB cable.

## Three common upload methods

1. **Arduino HID bootloader.** Flash a USB bootloader once, then upload sketches over the board's own USB port, like a normal Arduino.
2. **ST-Link compatible programmer.** The most reliable option. It uses the SWD pins and also lets you debug.
3. **USB to 3.3 V TTL serial adapter.** Uses the chip's built-in serial bootloader. Set the BOOT0 jumper to 1 before uploading.

Before any of these, install the STM32 board package. See [Setting up Arduino IDE for ESP8266, ESP32 and STM32](/blog/arduino-ide-setup-esp32-esp8266-stm32/).

## Flashing tool

To flash a bootloader or a binary directly, use ST's official [STM32CubeProgrammer](https://www.st.com/en/development-tools/stm32cubeprog.html).

## References

- [Programming the STM32 Blue Pill: HID bootloader, ST-Link and serial (SGBotic guide)](https://www.sgbotic.com/index.php?dispatch=pages.view&page_id=48#stlink)
- [STM32 Blue Pill with Arduino IDE (video)](https://www.youtube.com/watch?v=YYMLQVhNoeY&t=329s)

---
title: Setting up Arduino IDE for ESP8266, ESP32 and STM32
description: Board manager URLs, USB-to-serial drivers (CP210x and CH340) and board settings to get ESP and STM32 boards working in the Arduino IDE for IoT projects.
date: '2021-01-15'
lang: en
category: technical
series: microcontroller-notes
---

The Arduino IDE only knows about classic AVR boards out of the box. To program ESP8266, ESP32 or STM32 boards for IoT work, you need to add their board packages and install the right USB-to-serial driver.

## 1. Add the board manager URLs

Open **File → Preferences** and paste these into *Additional Boards Manager URLs* (one per line):

```text
http://arduino.esp8266.com/stable/package_esp8266com_index.json
https://dl.espressif.com/dl/package_esp32_index.json
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_dev_index.json
https://github.com/stm32duino/BoardManagerFiles/raw/master/STM32/package_stm_index.json
https://raw.githubusercontent.com/stm32duino/BoardManagerFiles/main/package_stmicroelectronics_index.json
```

Then open **Tools → Board → Boards Manager**, search for *esp8266*, *esp32* or *STM32*, and install the package.

## 2. Install the USB-to-serial driver

Most ESP development boards use one of two USB-to-UART bridge chips, and each needs its own driver:

- **Square chip (often on red boards): Silicon Labs CP210x.** Download the [CP210x VCP driver](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads).
- **Rectangular chip (often on black boards): WCH CH340.** Download the [CH340 driver](https://sparks.gogo.co.nz/ch340.html).

If the board doesn't show up under **Tools → Port**, the driver is almost always the problem.

## 3. Board settings

For most ESP32 boards, choose one of:

- **ESP32 Dev Module**
- **NodeMCU-32S**

## Useful software

Tools I use alongside the Arduino IDE for circuit design and documentation: **Fritzing**, **Proteus 8**, **AutoCAD**, **Illustrator** and **Photoshop**.

## References

- [ESP32 setup in Arduino IDE (video)](https://www.youtube.com/watch?v=OhVTQxmqf_0)

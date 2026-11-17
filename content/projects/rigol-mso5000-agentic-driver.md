---
category: software
title: Agentic driver for a RIGOL MSO5000 oscilloscope
summary: >-
  Python driver, CLI and web UI for a RIGOL MSO5204 oscilloscope, with an LLM
  agent that turns plain-language requests into reviewable measurement plans.
context: ICIQ, Lloret-Fillol group · 2025
year: 2025
featured: true
tags:
  - Agentic AI
  - Python
  - PyVISA
  - SCPI
  - Streamlit
  - Lab automation
image: /images/projects/rigol-mso5000-agentic-driver/architecture.webp
imageFit: contain
---

## Why

Oscilloscope measurements in the lab were set up by hand on the front panel, which is slow to repeat and hard to document. I wanted every setting and capture to be scriptable, logged and reproducible, and a first test of how an AI agent can operate real lab instruments safely.

## What it does

- **Instrument control over VISA** (USB-TMC or LAN): identification, run, stop, single and autoscale, plus channel, timebase, trigger and acquisition settings.
- **Measurements and capture:** built-in measurement items, waveform capture to CSV (converted to volts and time from the waveform preamble), and screen captures.
- **Three interfaces on one driver:** a command-line tool for scripts, a **Streamlit web UI** with live plots, and raw SCPI access for debugging.
- **Agentic control:** an optional LLM agent (OpenAI or Gemini) translates a request such as *"measure Vpp on channel 1"* into an explicit **JSON plan**. The plan is shown with its equivalent CLI commands and only runs after the user approves it.
- **Safety:** limits from a YAML configuration, such as a maximum trigger level, are checked before commands reach the instrument, and the agent refuses raw SCPI commands unless the user explicitly asks for them.

## How it is built

- **Driver:** a Python oscilloscope class on **PyVISA**, sending SCPI and decoding binary waveform blocks.
- **Agent:** a planner that returns a constrained JSON schema of allowed actions, and an executor that validates each step and streams progress to the UI.
- **Configuration:** a single YAML file for the connection, defaults and safety limits.
- **Documentation:** user guide, CLI reference, architecture, safety and troubleshooting notes.

## My role

I designed and wrote the driver, CLI, UI and agent, and the documentation.

## Code availability

Developed at ICIQ in Prof. Julio Lloret-Fillol's group. The source code is in a private ICIQ repository and is not published here. I'm happy to discuss the design or give a demo on request.

This work feeds into the agentic-AI layer of my [self-driving lab research](/research/self-driving-lab-catalysis/).

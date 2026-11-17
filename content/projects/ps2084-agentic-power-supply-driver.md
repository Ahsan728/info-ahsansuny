---
category: software
title: Agentic driver for an EA PS2084 power supply
summary: >-
  Python driver, CLI and web UI for an EA PS2084 power supply: smooth ramps,
  multi-step programs with CSV logging, and an LLM agent with dry-run plans.
context: ICIQ, Lloret-Fillol group · 2025
year: 2025
featured: true
tags:
  - Agentic AI
  - Python
  - SCPI
  - Serial
  - Streamlit
  - Lab automation
image: /images/projects/ps2084-agentic-power-supply-driver/architecture.webp
imageFit: contain
---

## Why

Lab experiments often need a power supply to follow a precise profile (ramp up, hold, step, repeat) while recording what actually happened. Doing that by hand is error-prone and leaves no record, so I built a scriptable driver with logging and a safe agentic interface.

## What it does

- **Instrument control over USB serial (SCPI):** identification, status, output on/off, and voltage and current setpoints, with a recovery command for settings conflicts.
- **Smooth ramps:** move to a target voltage and current over a set time, hold, and log measured values to CSV.
- **Multi-step programs:** tables of steps written in YAML, repeated for a number of cycles, with automatic logs.
- **Web UI (Streamlit):** connect, ramp and run programs, with live plots of setpoints against measured values.
- **Agentic control:** an optional LLM agent (OpenAI or Gemini) turns a request such as *"ramp to 5 V and 1 A over 10 seconds, hold 2 seconds"* into a JSON plan. It is a **dry run by default** and only executes with an explicit flag or button.
- **Safety:** the driver enforces maximum voltage and current from the configuration, and the agent refuses to switch the output on unless the user explicitly asks for it.

## How it is built

- **Driver:** Python with **pyserial**, with SCPI command strings defined in configuration so they can be adapted to other models.
- **Ramp engine:** a separate module for timed ramps and programs, shared by the CLI, the UI and the agent.
- **Agent:** a planner with a constrained action schema, and an executor that validates and runs each step.
- **Quality:** a connection test, plus user, CLI, configuration, log-format and safety documentation.

## My role

I designed and wrote the driver, ramp engine, CLI, UI and agent, and the documentation.

## Code availability

Developed at ICIQ in Prof. Julio Lloret-Fillol's group. The source code is in a private ICIQ repository and is not published here. I'm happy to discuss the design or give a demo on request.

This work feeds into the agentic-AI layer of my [self-driving lab research](/research/self-driving-lab-catalysis/).

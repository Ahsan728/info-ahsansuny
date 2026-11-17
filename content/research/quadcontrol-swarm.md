---
title: 'QuadControl: a controller for multiple drones'
summary: >-
  Experimental validation of a multi-drone controller using Qualisys motion
  capture at the LCIS laboratory.
institution: LCIS lab · Grenoble INP Esisar
period: '2022'
order: 4
tags:
  - Robotics
  - Drones
  - Control
  - Python
links:
  - label: QuadControl-Swarm
    url: 'https://github.com/Ahsan728/QuadControl-Swarm'
  - label: Report (PDF)
    url: >-
      https://drive.google.com/file/d/1-Zigvgyu3qq9_gsdvU-HReXCSnY4VVTR/view?usp=drive_link
image: /images/research/quadcontrol-swarm/1.webp
gallery:
  - /images/research/quadcontrol-swarm/1.webp
---

## Overview

This work models a controller for a quadcopter based on the property of **differential flatness**, and designs the motion planning needed to fly **multiple drones**.

1. Build a mathematical model of the drone's kinematics.
2. Set up a simulation environment to design an **LQR trajectory-tracking controller**.
3. Validate the controller on Crazyflie drones, using **Qualisys Track Manager (QTM)** motion capture, and assess trajectory tracking for a single drone and for a swarm.

An innovation project at Grenoble INP Esisar with Cong Khanh Dinh, Nada Hamdouni and Clarice Sofia Henrique Soares.

*LCIS lab, Valence, France.*

# 🧠 Mini Doom Clone — Raycasting Engine (TypeScript)

![Build Status](https://img.shields.io/github/actions/workflow/status/fernandacostads/mini-doom-ts/deploy.yml?branch=main)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech](https://img.shields.io/badge/tech-TypeScript%20%7C%20Vite%20%7C%20Canvas-black)

---

## 🚀 Live Demo

👉 https://fernandacostads.github.io/mini-doom-ts/

---

## 🎥 Preview

```md id="y5m0e3"
![preview](./docs/preview.gif)
```

---

# 🇺🇸 ENGLISH VERSION

## 🎯 Overview

This project is a technical exploration of how early 3D engines worked, inspired by _Doom_.

It implements a **raycasting engine from scratch** using the Canvas API and TypeScript, focusing on performance, architecture, and real-time rendering.

---

## 🧠 Core Concepts

- Raycasting rendering (pseudo-3D)
- Procedural texture generation (Perlin Noise 4D)
- Real-time game loop
- Low-level pixel manipulation
- Manual lighting calculations

---

## 🏗️ Architecture

```plaintext id="r4b7r1"
src/
  core/        → engine loop & input
  game/        → gameplay logic
  graphics/    → noise & textures
  render/      → raycasting engine
```

### Principles

- Separation of concerns
- Dependency injection
- Scalable structure for future features

---

## 🎮 Features

- Raycasting engine (walls)
- Floor & ceiling rendering
- Distance-based lighting
- Collision system
- Player movement (WASD + arrows)
- Procedural textures (no external assets)
- Weapon HUD overlay
- Start screen UI

---

## 🎨 Procedural Textures

Textures are generated using:

- 4D Perlin Noise
- Toroidal mapping (seamless tiling)

This avoids visible seams and reduces asset dependency.

---

## ⚙️ Tech Stack

- TypeScript
- Vite
- HTML5 Canvas API
- GitHub Actions (CI/CD)
- GitHub Pages

---

## 🚀 CI/CD

Automated pipeline:

- Build with Vite
- Deploy via GitHub Actions
- Hosted on GitHub Pages

---

## 🧪 Key Learnings

- Pixel buffer manipulation (`ImageData`)
- Performance optimization in render loops
- Handling asset paths in production
- Differences between dev and production environments
- Game loop synchronization (`requestAnimationFrame`)

---

## 🔮 Future Improvements

- Sprites (enemies)
- Dynamic lighting
- Minimap
- Shooting mechanics
- Entity system
- AI behavior

---

# 🇧🇷 VERSÃO EM PORTUGUÊS

## 🎯 Visão geral

Este projeto é um estudo prático inspirado em engines clássicas como _Doom_, com foco em entender como a renderização 3D era simulada em ambientes 2D.

---

## 🧠 Conceitos aplicados

- Raycasting
- Renderização em tempo real
- Manipulação direta de pixels
- Geração procedural de texturas
- Loop de jogo

---

## 🏗️ Arquitetura

```plaintext id="jjv7zk"
src/
  core/        → loop e input
  game/        → lógica de jogo
  graphics/    → texturas e noise
  render/      → renderização
```

---

## 🎮 Funcionalidades

- Renderização de paredes (raycasting)
- Floor e ceiling casting
- Iluminação por distância
- Colisão com mapa
- Movimentação do jogador
- HUD inicial
- Arma na tela
- Texturas procedurais

---

## 🎨 Texturas

Geradas com:

- Perlin Noise 4D
- Mapeamento toroidal (sem seams)

---

## 🧪 Aprendizados

- Controle fino de performance
- Diferença entre ambiente local e produção
- Problemas reais de deploy (paths, base URL)
- Estruturação de projetos escaláveis

---

## 🔮 Próximos passos

- Inimigos (sprites)
- Sistema de iluminação avançado
- Minimap
- Sistema de entidades
- Animação de tiro

---

## 🧑‍💻 Autor

Fernanda Costa de Sousa
Software Developer

---

## ⭐ Considerações finais

A ideia desse projeto era melhorar:

- domínio de fundamentos de gráficos
- capacidade de estruturar sistemas complexos
- atenção a detalhes de performance e arquitetura

---

## 📌 Como rodar localmente

```bash id="h4xx1f"
npm install
npm run dev
```

---

## 📦 Build

```bash id="l5l67q"
npm run build
```

---

## 🌐 Deploy

Automático via GitHub Actions ao fazer push na branch `main`.

---

## 📝 Licença

MIT

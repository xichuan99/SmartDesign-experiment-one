# Implementation Plan: AI Design Visual Composition Prototype

## Context
This is a standalone prototype to test the AI visual design composition pipeline in isolation. We are keeping this separate from the main platform to avoid overlap with legacy code. The primary focus is validating the data flow from input to output through the AI pipeline. Frontend aesthetics are not a priority.

## Goal
Build a testing environment for the pipeline: `Form` → `AI Interpretation` → `Image Generation` → `Result`.

## Tech Stack
- **Runtime:** Bun
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS (minimal/functional)
- **UI Components:** shadcn/ui (basic)
- **State Management:** Zustand
- **Canvas/Render Output:** Konva.js
- **AI Integration:** Gemini Flash (text/interpretation), Fal.ai Flux (image generation)
- **API:** Next.js Route Handlers (no separate backend)

## Scope of Work

### 1. Project Initialization
- Initialize a new Next.js project using Bun.
- Set up TypeScript, Tailwind CSS, and App Router.
- Install necessary dependencies (`zustand`, `konva`, `react-konva`, shadcn UI components, AI SDKs).
- Setup `.env.example` containing placeholders for `GEMINI_API_KEY` and `FAL_KEY`.

### 2. Folder Structure Setup
- Establish a clean, basic directory structure for Next.js App router:
  - `/app` (routes and pages)
  - `/app/api` (Next.js Route Handlers for AI calls)
  - `/components` (UI components, Konva canvas)
  - `/lib` (utility functions, API clients)
  - `/store` (Zustand state management)

### 3. State Management (Zustand)
- Create a store to hold the pipeline state:
  - Form input data.
  - AI interpretation results (layout, elements, colors, etc.).
  - Final image URLs or generated assets.
  - Loading/error states.

### 4. Routing & UI Implementation
Implement the following routes and flows sequentially:

- **`/form` (Input Stage)**
  - Basic form to capture user requirements for the design.
  - Submit button to save state and trigger the interpretation phase.

- **`/confirmation` (AI Interpretation Stage)**
  - Call the API handler that uses Gemini Flash to interpret the form data into a structured layout or generation prompt.
  - Display the intermediate structured data (JSON or basic text) returned by Gemini.
  - Provide an action to proceed to the image generation phase based on this interpretation.

- **`/result` (Generation & Render Stage)**
  - Call the API handler that uses Fal.ai Flux to generate images based on the interpreted prompt.
  - Render the final composition using Konva.js to position the generated assets and text.

### 5. API Route Handlers (`/app/api/...`)
- Create endpoint(s) to communicate with Gemini Flash for text interpretation and data structuring.
- Create endpoint(s) to communicate with Fal.ai Flux for image generation.
- Ensure proper error handling and response formatting for the frontend.

### 6. Documentation
- Create a `README.md` with clear instructions on how to set up the `.env` file, install dependencies (`bun install`), and run the local development server (`bun dev`).

## Explicitly Out of Scope
Do **not** implement or configure the following:
- Authentication / Login / Auth flows
- Database / Data Persistence
- Background Queues (e.g., Celery, Redis)
- Separate Backend Server (e.g., FastAPI, Express)
- Cloud Storage (e.g., Backblaze, S3)
- Dockerization, CI/CD, or Deployment configurations
- Polished or aesthetic UI (keep it barebones, focus on functionality)

## General Instructions for Implementer
- Keep the implementation straightforward and avoid over-engineering.
- Focus purely on the data flow: ensuring the APIs connect correctly and pass the right data.
- Use basic Shadcn components (buttons, inputs, cards) without spending time on custom styling.
- Ensure the Zustand state transitions smoothly across the different routing stages.

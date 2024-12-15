# Project Title: Vite React TypeScript Drawing App

## Introduction
This project is a drawing application built with **Vite**, **React**, and **TypeScript**. It allows users to create drawings, work on multiple images, and save their work using various features. The application is styled with **Tailwind CSS** and utilizes a set of carefully chosen libraries for functionality and performance.

## Features
- Create and edit drawings on a canvas.
- Save images using the File Saver library.
- Switch between multiple images and retain data across canvases.
- Modern and responsive UI designed with Tailwind CSS.

## Getting Started
Follow these steps to run the project locally:

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url.git
   cd your-repository-folder
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
2. Open your browser and navigate to `http://localhost:5173`.

## Libraries Used
- **[react-canvas-draw](https://www.npmjs.com/package/react-canvas-draw):** Simplifies the implementation of drawing functionality.
- **[file-saver](https://www.npmjs.com/package/file-saver):** Enables saving canvas drawings as images.
- **[tailwindcss](https://tailwindcss.com):** Provides a utility-first approach to styling.
- **[lucide-react](https://www.npmjs.com/package/lucide-react):** Used for incorporating modern, lightweight icons.

## Challenges Faced
### Understanding Library Documentation
Initially, I explored **Fabric.js**, but the documentation was complex and difficult to follow. This led me to switch to **react-canvas-draw**, which was much easier to implement and integrate into the project.

### Handling Multiple Images and Retaining Data
One of the most significant challenges was implementing functionality to work on multiple images while retaining data for each canvas. Initially, switching between images caused overlapping canvas data. After extensive debugging, exploring Stack Overflow, and writing custom algorithms, I successfully resolved this issue. The solution involved isolating canvas states and partitioning data efficiently.

### TypeScript Integration
Using TypeScript added an extra layer of complexity during development, especially when dealing with types for canvas operations, which were not well-documented. Additionally, I had to downgrade React from version 18 to 17 due to compatibility issues with some libraries. Careful dependency management and troubleshooting helped overcome these obstacles.

## Conclusion
This project was a rewarding experience that enhanced my skills in:
- Debugging complex problems.
- Using modern libraries for a seamless development experience.
- Optimizing TypeScript usage for better type safety and maintainability.

---
I am confident that my ability to overcome technical challenges and deliver functional, user-friendly applications aligns with the expectations of your internship program. I look forward to bringing these skills and more to your team.

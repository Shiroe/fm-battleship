# Battleship Game

A modern implementation of the classic Battleship game built with Next.js, React, TypeScript, and Tailwind CSS.

## 🎮 Game Features

- **Interactive Grid-Based Gameplay**: Click to fire at enemy positions on a 10x10 grid
- **Ship Management**: Five different ship types with varying sizes:
  - Carrier (5 cells)
  - Battleship (4 cells)
  - Cruiser (3 cells)
  - Submarine (3 cells)
  - Destroyer (2 cells)
- **Visual Feedback**: Clear hit/miss indicators with custom graphics
- **Ship Sunk Notifications**: Modal alerts when ships are destroyed
- **Game State Management**: Track rounds, hits, misses, and win conditions
- **Responsive Design**: Optimized for various screen sizes

## 🚀 Tech Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Frontend**: React 19.1.0, TypeScript
- **Styling**: Tailwind CSS 4.0
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Development Tools**: ESLint, Prettier, TypeScript

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/ships/         # Ship placement API endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page
├── components/            # React components
│   ├── GameManager.tsx   # Main game controller
│   ├── board/            # Game board components
│   ├── modals/           # Modal dialogs
│   ├── screens/          # Game screens (intro, game, game over)
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and state management
│   ├── hooks/            # Custom React hooks
│   ├── stores/           # Zustand state slices
│   └── utils.ts          # Helper functions
├── types/                # TypeScript type definitions
└── assets/               # Game images and graphics
```

## 🎯 Game Flow

1. **Intro Screen**: Start a new game
2. **Game Screen**: Interactive battleship grid where players click to fire
3. **Gameplay**:
   - Click grid cells to fire at enemy ships
   - Receive visual feedback for hits and misses
   - Ships are sunk when all their cells are hit
   - Win by sinking all enemy ships
4. **Game Over Screen**: Victory celebration and option to play again

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd fm-battleship
```

2. Install dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn format` - Check code formatting
- `yarn format:fix` - Fix code formatting
- `yarn type-check` - Run TypeScript checks
- `yarn check-all` - Run all checks (type-check, lint, format)

## 🎨 Game Assets

The game includes custom graphics for:

- Ship images (carrier, battleship, cruiser, submarine, destroyer)
- Hit/miss indicators
- Visual feedback for game states

## 🏛️ Architecture

### State Management

- **Zustand**: Lightweight state management with two main slices:
  - `GameStateSlice`: Game flow, rounds, ship status, win conditions
  - `PlayerStateSlice`: Player actions, firing history, grid status

### API Layer

- **Ship Placement API** (`/api/ships`): Provides ship configurations and positions
- **TanStack Query**: Handles data fetching and caching

### Component Architecture

- **GameManager**: Central component managing game screen transitions
- **Screen Components**: Separate components for different game states
- **Grid System**: Modular grid and grid item components for the game board

## 🔧 Development

### Code

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting with Next.js and React best practices
- **Prettier**: Consistent code formatting
- **Tailwind CSS**: Utility-first styling approach

### Performance Optimizations

- **Next.js App Router**: Modern routing with server components
- **Turbopack**: Fast development builds
- **React Query**: Efficient data fetching and caching
- **Zustand**: Minimal re-renders with optimized state updates

## 🚢 Ship Configuration

Ships are statically positioned with the following layout:

- **Carrier**: Horizontal at row 9, columns 2-6
- **Battleship**: Vertical at column 5, rows 2-5
- **Cruiser**: Vertical at column 8, rows 1-3
- **Submarine**: Vertical at column 3, rows 0-2
- **Destroyer**: Horizontal at row 0, columns 0-1

## 📱 Responsive Design

The game is fully responsive and works across:

- Desktop browsers
- Tablet devices
- Mobile phones

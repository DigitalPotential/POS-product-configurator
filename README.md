# POS Product Configurator

A React app that makes configuring products in a POS system quick and easy. Built with TypeScript and focused on making modifications (like sizes and flavors) and addons super simple to manage.

**Live Demo**: [https://pos-product-configurator.vercel.app/](https://pos-product-configurator.vercel.app/)

### Core Features
- Everything happens in one modal - no jumping between screens
- Quick keyboard shortcuts to speed things up
- Prices update instantly as you make changes
- Smart addon management that keeps track of limits
- Popular choices are pre-selected to save time

### UX Improvements & Optimizations
- Pre-selects normal size and coca cola since that's what most people order
- Made the whole button area clickable - no more trying to hit tiny targets
- Added keyboard shortcuts so you can fly through orders
- Press alt to see what shortcuts are available
- Snappy feedback - no waiting for animations
- Uses SEK by default but can handle other currencies too
- Keeps all currency stuff in one place for easy updates
- Added tests for the important stuff to keep things reliable

### Future Improvements
Performance & UX:
- Add loading states and error boundaries for better error handling
- Add haptic feedback for mobile devices
- Add sound feedback option for selections (configurable)
- Consider a dark mode theme for different lighting conditions

Accessibility:
- Fix keyboard shortcuts case sensitivity issue with capslock
- Review keyboard shortcuts for cross-OS compatibility

Testing & Quality:
- Add more component tests
- Add end-to-end tests

Features:
- Add multi-language support
- Add more currency options
- Consider adding form validation (like Zod) for future custom inputs
- Add undo/redo functionality for selections
- Add order history or frequently used combinations
- Add customizable keyboard shortcuts

### Mock Data Options
The app comes with two sets of mock data in `src/data/data.ts`:
- Default configuration: A simple setup with 2 sizes, 3 flavors, and basic addons
- Extended configuration (commented out): A more complex setup with:
  - 5 different sizes (Small to Mega)
  - 8 flavors including premium options
  - More addon options with different limits and prices
  - Additional "remove" options like ice

To try the extended version, simply comment out the current data and uncomment the extended version in `data.ts`.

### Quick Start
```bash
# Using pnpm
pnpm install
pnpm dev

# Or using npm
npm install
npm run dev
```

### Technical Stack
- Zustand for state management
- Redux Devtools for debugging
- Styled Components for styling
- Vite for development
- Vitest for testing
- React

### Project Structure
- `src/features/pos-configurator/`: Where the main POS stuff lives
- `src/store/`: All our Zustand stores
- `src/utils/`: Helper functions for prices and such
- `src/types/`: TypeScript definitions
- `src/constants/`: App-wide constants

### Testing
We've added tests for the most important parts:
- `posStore.ts`: Makes sure the core logic works
- `priceCalculations.ts`: Keeps our math accurate

### Environment Configuration
The app uses a few environment variables:
- `VITE_COUNTRY_CODE`: Picks which country settings to use (defaults to 'SE')

Setting it up:
1. Make a `.env` file if you want to customize things
2. Set your country code: `VITE_COUNTRY_CODE=SE` (or just leave it - it'll use 'SE' by default)

Right now we support:
- `SE`: Swedish Krona (SEK)
- `US`: US Dollar (USD)
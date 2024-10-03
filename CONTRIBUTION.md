# Contribution Guide for NFT Marketplace

Welcome to the NFT Marketplace project! We are excited to have you onboard. This document will guide you on how to contribute to the project effectively.

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Frontend Project Structure](#frontend-project-structure)
3. [Branching Strategy](#branching-strategy)
4. [Tasks and Components](#tasks-and-components)
5. [Pull Requests](#pull-requests)
6. [Coding Standards](#coding-standards)

## Frontend Project Structure

```bash
/app_frontend
│
├── /public
│   ├── index.html
│   └── assets/ (for images, logos, fonts)
│
├── /components/ui
│   ├── components pulled from Aceternity UI & ShadcnUI
│   └── (other third-party templates, if needed)
│
├── /src
│   ├── /assets
│   │   └── (any additional assets like images, icons)
│   ├── /app
│   │   ├── Navbar # will contain all navbar components files
│   │   ├── Hero # will contain all hero components files
│   │   ├── LiveSale # will contain all live-sale components files
│   │   ├── Footer # will contain all footer components files
│   │   └── Common/ (reusable UI components like buttons, cards, etc.)
│   ├── /pages
│   │   └── (any page-specific components or layouts) #only 1 page rn, so not yet created
│   ├── /store
│   │   └── zustandStore.ts (for state management using Zustand in the future) #not yet created
│   ├── /utils
│   │   └── (helper functions, constants)
│   ├── App.tsx (main component file)
│   ├── index.css (global CSS or Tailwind configuration)
│   ├── main.tsx (React app entry point)
│   └── vite-env.d.ts (environment types)
│
├── .vscode/ (VSCode settings, if any)
├── dist/ (build folder)
├── node_modules/ (dependencies)
├── .gitignore
├── components.json (list of components, to track them)
├── index.html (main HTML file)
├── package.json (npm package configuration)
├── postcss.config.js (for handling post-CSS processing)
├── tailwind.config.js (TailwindCSS configuration)
├── tsconfig.json (TypeScript configuration)
└── vite.config.ts
# most of your contributions will happen in the components folder and the App.tsx file.
#if need to install additionally dependencies ensure you install them at the root of the frontend folder
```

## Tech Stack

- **React (TypeScript)**: Frontend framework
- **TailwindCSS**: Styling
- **ShadcnUI / Aceternity UI / DaisyUI**: UI component libraries for templates
- **Zustand**: State management (planned for future use)

## Branching Strategy

We use the **Gitflow** workflow for branching. Follow the strategy below:

- **main**: This branch contains the production-ready code.
- **develop**: The active development branch where all feature branches should be merged.
- **feature/**: Create feature branches for specific sections (e.g., `feature/navbar`, `feature/hero`, etc.). PS. all branches have been created
- _Remember to always checkout to a branch of the feature you are working on then pulling from develop before beginning_

Naming conventions for feature branches:

```bash
git checkout -b feature/navbar
```

## Tasks and Components

| Component | Assignee |
| --------- | -------- |
| Navbar    | Mary     |
| Hero      | Steve    |
| LiveSale  | Sylus    |
| Footer    | Chriss   |

### Important points before contributing

- Always checkout to your assigned branch starting
- Avoid force pushing
- While developing a new feature change as little files as possible(To reduce chances of having conflicts when merging branches)
- Make sure the code runs with no error before submitting a PR to develop

## Pull Requests

- All Pull Requests (PRs) should be submitted to the `develop` branch.
- Ensure the PR title includes the feature or bug fix you're working on. Use a clear and descriptive title such as:
- The body of the PR should include:

1. A brief description of the changes made.
2. Screenshots, if applicable, to illustrate UI changes.
3. Any issues that the PR closes or addresses (use GitHub issue numbers).
4. Testing instructions (how to run the component and verify its functionality).

- Before submitting the PR:

1. Ensure that the code follows the coding standards (see below).
2. Run linting and formatting checks using `eslint` and `prettier` if configured.
3. Ensure the component is responsive and tested across multiple screen sizes.
4. Ensure no errors or warnings in the console for the specific component.

- At least one code reviewer must approve the PR before it is merged into the `develop` branch.

- After a successful review and approval, the PR will be merged.

---

## Coding Standards

We are using **React with TypeScript** and **TailwindCSS**. Please follow the coding standards below:

### 1. **React (TypeScript) Guidelines**

- Use **TypeScript** for all React components to ensure type safety.
- Define prop types explicitly using TypeScript `interface` or `type` declarations.
- Avoid using `any` unless absolutely necessary.

Example:

```ts
interface NavbarProps {
  user: string;
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user, isAuthenticated }) => {
  return (
    <nav>
      <p>Welcome, {user}</p>
    </nav>
  );
};
```

### 2. Use functional components with hooks (no class components)

Example:

```ts
const Hero: React.FC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch some data
  }, []);

  return <div>{data ? data : "Loading..."}</div>;
};
```

### 3. Always destructure props in functional components

Example:

```ts
const Footer: React.FC<{ year: number }> = ({ year }) => (
  <footer>{year}</footer>
);
```

### 4. TailwindCSS Guidelines

- Use TailwindCSS utility-first classes for styling. Avoid inline styles unless absolutely necessary.

  Example:

```tsx
return (
  <button className="bg-blue-500 text-white py-2 px-4 rounded">Click Me</button>
);
```

- Responsive design:

Utilize Tailwind's responsive utilities to ensure components adapt to different screen sizes.

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Your content */}
</div>
```

### 5. General code quality

- Prettier: Ensure your code is formatted consistently. Use Prettier for automatic formatting.

- ESLint: Run lint checks to ensure your code follows proper React and TypeScript patterns.

- Folder structure: Keep components organized in respective folders under /components, /pages, or /utils.

- Naming conventions: Use camelCase for function names, and PascalCase for component names.

Example:

```tsx
// Good naming
const MyComponent = () => { ... };

// Avoid bad naming
const my_component = () => { ... };
```

## Happy Coding🥳

## For the Team

So guys the repo is ready for contribution. I have updated the Contribution.md with teh frontend project structure and guidelines. The task table is also available. So after reading the two readmes, the next step is to see from the table in the contribution.md file what task you have been assigned, then checkout to the branch you have been assigned, Ex. if you're working on the Navbar checkout to the feat/navbar-component branch then start your contribution. When done submit a PR to the develop branch NOT the main branch. Also if your are working on the navbar for example, I have already created a folder called app with all the necessary folders for each component. All extra components you create make sure are in the specific folder you're working on in this case Mary will only work on the folder called Navbar. This helps minimizes the number of conflict during merging with develop. In addition when installing dependencies, do them at the root of the frontend folder and not at the root of the entire project. i.e in the terminal before installing any dependencies you will use make sure you are at `frys_marketplace/src/frys_marketplace_frontend` .Lastly for colors and fonts we are using the ones in the figma. Since we're using tailwindcss you can find the blackish background color `bg-background`this sets the background color to the black color. Same to the primary orangish color, it can be used as `text-primary` this sets the color of the text to the primary color. For the fonts i have included two fonts body & title. However, for consistency use `font-body`instead of `font-title`. I included the title font for good measure only should we need to change fonts in the future. But for now use `font-body`for every text.

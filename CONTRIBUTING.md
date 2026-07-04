# Contributing to Parallels

Thank you for your interest in contributing to Parallels! This project explores how different religious traditions address the same timeless questions, and we welcome contributions that deepen that exploration.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```

## Development Workflow

- We use **TypeScript** throughout
- **Tailwind CSS v4** for styling (no config file — uses CSS custom properties)
- **Vitest** for testing
- Run checks before submitting:
  ```bash
  npm test          # Run tests
  npx tsc --noEmit  # Type check
  ```

## What to Contribute

### High Value
- **New scripture data** — Add texts from additional traditions (e.g., Jainism, Zoroastrianism, Bahá'í)
- **Verse explanations** — Add AI-powered explanations for verses that don't have them yet
- **Topics & questions** — Add new comparison topics or controversial questions
- **Perspectives insights** — Add cross-tradition insights for new themes

### Bug Fixes & Improvements
- Search relevance improvements
- UI/UX enhancements
- Performance optimizations
- Accessibility fixes

### Documentation
- Improve README or guides
- Add inline code documentation
- Translate the app into other languages

## Adding Scripture Data

Scripture data lives in `src/data/books/`. Each book is a JSON file with this structure:

```json
{
  "id": "book-slug",
  "title": "Book Title",
  "religion": "Religion",
  "slug": "book-slug",
  "chapters": [
    {
      "id": "book-slug-chapter-num",
      "number": 1,
      "title": "Chapter 1",
      "verses": [
        {
          "id": "book-slug-chapter-verse",
          "number": 1,
          "text": "Verse text",
          "translation": "Verse text",
          "source": {
            "translator": "Translator Name",
            "year": 2024,
            "license": "Public Domain"
          }
        }
      ]
    }
  ]
}
```

**Important**: Only use public domain translations. Check the license before adding any text.

## Adding a New Topic or Question

1. Edit `src/data/topics.json` or `src/data/questions.json`
2. Follow the existing schema
3. For questions, use single-word keywords that appear in verse text (compound phrases won't match)
4. Add `scienceNotes` with relevant research citations

## Code Style

- Use the existing component patterns in `src/components/`
- Follow the naming conventions in the codebase
- Keep components focused — one component per file
- Use the custom `ThemeProvider` (not next-themes)

## Submitting a Pull Request

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm test` and `npx tsc --noEmit`
4. Commit with a descriptive message
5. Push and open a PR

## Code of Conduct

Be respectful. This project explores religious texts from six major traditions. All contributions should be scholarly, accurate, and respectful of every tradition.

## Questions?

Open an issue or start a discussion. We're happy to help.

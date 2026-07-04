# Parallels

Browse, search, and compare passages from six major religious traditions — side by side, in a space designed for reverence.

**[parallels-ten.vercel.app](https://parallels-ten.vercel.app)**

## What is Parallels?

Parallels is an open-source web app for exploring how different religious traditions address the same timeless questions — love, suffering, justice, the nature of God, and the meaning of life.

- **6 scriptures** — Bhagavad Gita, Bible (KJV), Dhammapada, Guru Granth Sahib, Quran, Torah
- **38,000+ verses** fully indexed and searchable
- **AI-powered comparison** — see how traditions compare on any topic
- **Controversial questions** — explore the deepest divides in religious thought
- **Cross-tradition perspectives** — thematic insights spanning all six traditions
- **Science & research** — what empirical research says about each topic

## Features

| Feature | Description |
|---|---|
| **Semantic Search** | Find verses across all traditions by meaning, not just keywords |
| **AI Explanations** | Tap any verse for AI-generated context and interpretation |
| **Fusion Chamber** | Compare passages side-by-side with AI synthesis |
| **Question Chips** | Click a controversial question to auto-generate a cross-tradition analysis |
| **Deep Verse Links** | Link directly to any verse with rich metadata |
| **Verse of the Day** | Daily cross-tradition verse display |
| **Bookmarks** | Save and organize your favorite passages |
| **Dark/Light Theme** | Full theme support with tradition-specific accent colors |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google AI API key](https://aistudio.google.com/apikey) (for AI features)

### Setup

```bash
git clone https://github.com/iamyadavvikas/parallels.git
cd parallels
npm install
cp .env.example .env.local
# Add your API key to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Yes (for AI) | Google AI API key for verse explanations and fusion |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom theme tokens
- **AI**: Google Gemini 2.0 Flash via Vercel AI SDK
- **State**: Zustand with persist middleware
- **Testing**: Vitest
- **Deployment**: Vercel

## Scripture Sources

| Tradition | Text | Translation | License |
|---|---|---|---|
| Hinduism | Bhagavad Gita | Easwaran translation samples | Fair use excerpts |
| Christianity | The Bible | King James Version (1611) | Public Domain |
| Buddhism | Dhammapada | Various public domain | Public Domain |
| Sikhism | Guru Granth Sahib | Transliterated excerpts | Fair use excerpts |
| Islam | The Quran | Sahih International | Public Domain |
| Judaism | The Torah | Public domain translations | Public Domain |

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

## Acknowledgments

- Scripture data sourced from public domain translations
- AI powered by Google Gemini
- Built with Next.js and Vercel

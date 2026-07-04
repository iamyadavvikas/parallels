#!/usr/bin/env python3
"""
Fetch complete Bible from bible-api.com (KJV - public domain).
Covers all 66 books with all chapters and verses.
"""

import json
import urllib.request
import time
import re
import os

BOOKS_DIR = "/Users/vikasyadav/interfaith-holy-books/src/data/books"
API_BASE = "https://bible-api.com"

# All 66 Bible books with their API names and chapter counts
BIBLE_BOOKS = [
    # Old Testament (39 books)
    ("Genesis", "genesis", 50),
    ("Exodus", "exodus", 40),
    ("Leviticus", "leviticus", 27),
    ("Numbers", "numbers", 36),
    ("Deuteronomy", "deuteronomy", 34),
    ("Joshua", "joshua", 24),
    ("Judges", "judges", 21),
    ("Ruth", "ruth", 4),
    ("1 Samuel", "1samuel", 31),
    ("2 Samuel", "2samuel", 24),
    ("1 Kings", "1kings", 22),
    ("2 Kings", "2kings", 25),
    ("1 Chronicles", "1chronicles", 29),
    ("2 Chronicles", "2chronicles", 36),
    ("Ezra", "ezra", 10),
    ("Nehemiah", "nehemiah", 13),
    ("Esther", "esther", 10),
    ("Job", "job", 42),
    ("Psalms", "psalms", 150),
    ("Proverbs", "proverbs", 31),
    ("Ecclesiastes", "ecclesiastes", 12),
    ("Song of Solomon", "songofsolomon", 8),
    ("Isaiah", "isaiah", 66),
    ("Jeremiah", "jeremiah", 52),
    ("Lamentations", "lamentations", 5),
    ("Ezekiel", "ezekiel", 48),
    ("Daniel", "daniel", 12),
    ("Hosea", "hosea", 14),
    ("Joel", "joel", 3),
    ("Amos", "amos", 9),
    ("Obadiah", "obadiah", 1),
    ("Jonah", "jonah", 4),
    ("Micah", "micah", 7),
    ("Nahum", "nahum", 3),
    ("Habakkuk", "habakkuk", 3),
    ("Zephaniah", "zephaniah", 3),
    ("Haggai", "haggai", 2),
    ("Zechariah", "zechariah", 14),
    ("Malachi", "malachi", 4),
    # New Testament (27 books)
    ("Matthew", "matthew", 28),
    ("Mark", "mark", 16),
    ("Luke", "luke", 24),
    ("John", "john", 21),
    ("Acts", "acts", 28),
    ("Romans", "romans", 16),
    ("1 Corinthians", "1corinthians", 16),
    ("2 Corinthians", "2corinthians", 13),
    ("Galatians", "galatians", 6),
    ("Ephesians", "ephesians", 6),
    ("Philippians", "philippians", 4),
    ("Colossians", "colossians", 4),
    ("1 Thessalonians", "1thessalonians", 5),
    ("2 Thessalonians", "2thessalonians", 3),
    ("1 Timothy", "1timothy", 6),
    ("2 Timothy", "2timothy", 4),
    ("Titus", "titus", 3),
    ("Philemon", "philemon", 1),
    ("Hebrews", "hebrews", 13),
    ("James", "james", 5),
    ("1 Peter", "1peter", 5),
    ("2 Peter", "2peter", 3),
    ("1 John", "1john", 5),
    ("2 John", "2john", 1),
    ("3 John", "3john", 1),
    ("Jude", "jude", 1),
    ("Revelation", "revelation", 22),
]

def fetch_chapter(book_api, chapter_num):
    """Fetch a single chapter from bible-api.com."""
    url = f"{API_BASE}/{book_api}{chapter_num}?translation=kjv"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Parallels/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
            return data
    except Exception as e:
        return None

def parse_verses(api_data):
    """Parse verses from bible-api.com response."""
    verses = []
    if not api_data or "verses" not in api_data:
        return verses

    for v in api_data["verses"]:
        text = v.get("text", "").strip()
        if text:
            verses.append({
                "number": v.get("verse", 0),
                "text": text,
                "translation": text,
                "source": {
                    "translator": "King James Version",
                    "year": 1611,
                    "license": "Public Domain"
                }
            })
    return verses

def main():
    # Start fresh or load existing
    bible_path = f'{BOOKS_DIR}/bible.json'

    # Build the Bible structure
    bible = {
        "id": "bible",
        "title": "The Bible",
        "subtitle": "King James Version",
        "religion": "Christianity",
        "slug": "bible",
        "description": "The Holy Bible, consisting of the Old and New Testaments. This is the King James Version (1611), a public domain translation.",
        "summary": "The Bible is the sacred scripture of Christianity, consisting of the Old Testament (Hebrew Bible) and New Testament. It spans thousands of years of religious history and encompasses law, history, poetry, prophecy, and gospel.",
        "originDate": "c. 1200 BCE - 100 CE",
        "originalLanguage": "Hebrew, Aramaic, Greek",
        "era": "Ancient Near East to 1st Century CE",
        "centralThemes": [
            "Covenant between God and humanity",
            "Redemption and salvation",
            "Love and justice",
            "Faith and obedience",
            "The Kingdom of God"
        ],
        "structure": "66 books, 1,189 chapters, 31,102 verses",
        "quickFacts": [
            {"label": "Language", "value": "Hebrew, Aramaic, Greek"},
            {"label": "Old Testament", "value": "39 books"},
            {"label": "New Testament", "value": "27 books"},
            {"label": "Chapters", "value": "1,189"},
            {"label": "Verses", "value": "31,102"},
            {"label": "Translation", "value": "King James Version (1611)"}
        ],
        "chapters": []
    }

    total_verses = 0
    chapter_num_global = 0

    print("Fetching complete Bible (KJV) from bible-api.com...")
    print("This will take a while — 1,189 chapters across 66 books.\n")

    for book_idx, (book_name, book_api, num_chapters) in enumerate(BIBLE_BOOKS):
        print(f"  {book_idx+1:2d}. {book_name:20s}", end="", flush=True)

        book_verses = 0
        for ch in range(1, num_chapters + 1):
            chapter_num_global += 1
            data = fetch_chapter(book_api, ch)
            verses = parse_verses(data)

            if verses:
                bible['chapters'].append({
                    "id": f"bible-{book_api}-{ch}",
                    "number": chapter_num_global,
                    "title": f"{book_name} {ch}",
                    "verses": verses
                })
                book_verses += len(verses)

            time.sleep(0.15)  # Rate limit

        total_verses += book_verses
        print(f" {book_verses:5d} verses ({num_chapters} chapters)")

    # Save
    with open(bible_path, 'w') as f:
        json.dump(bible, f, indent=2, ensure_ascii=False)
        f.write('\n')

    print(f"\nBible complete: {len(bible['chapters'])} chapters, {total_verses} total verses")

if __name__ == '__main__':
    main()

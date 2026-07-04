#!/usr/bin/env python3
"""
Fetch complete Bible KJV using bolls.life API (fast, supports chapter fetching).
Book IDs for KJV: https://bolls.life/bible/ 
"""

import json
import urllib.request
import time
import re

BOOKS_DIR = "/Users/vikasyadav/interfaith-holy-books/src/data/books"

# bolls.life book IDs for KJV (1-indexed)
BIBLE_BOOKS = [
    # Old Testament
    (1, "Genesis", 50), (2, "Exodus", 40), (3, "Leviticus", 27),
    (4, "Numbers", 36), (5, "Deuteronomy", 34), (6, "Joshua", 24),
    (7, "Judges", 21), (8, "Ruth", 4), (9, "1 Samuel", 31),
    (10, "2 Samuel", 24), (11, "1 Kings", 22), (12, "2 Kings", 25),
    (13, "1 Chronicles", 29), (14, "2 Chronicles", 36), (15, "Ezra", 10),
    (16, "Nehemiah", 13), (17, "Esther", 10), (18, "Job", 42),
    (19, "Psalms", 150), (20, "Proverbs", 31), (21, "Ecclesiastes", 12),
    (22, "Song of Solomon", 8), (23, "Isaiah", 66), (24, "Jeremiah", 52),
    (25, "Lamentations", 5), (26, "Ezekiel", 48), (27, "Daniel", 12),
    (28, "Hosea", 14), (29, "Joel", 3), (30, "Amos", 9),
    (31, "Obadiah", 1), (32, "Jonah", 4), (33, "Micah", 7),
    (34, "Nahum", 3), (35, "Habakkuk", 3), (36, "Zephaniah", 3),
    (37, "Haggai", 2), (38, "Zechariah", 14), (39, "Malachi", 4),
    # New Testament
    (40, "Matthew", 28), (41, "Mark", 16), (42, "Luke", 24),
    (43, "John", 21), (44, "Acts", 28), (45, "Romans", 16),
    (46, "1 Corinthians", 16), (47, "2 Corinthians", 13), (48, "Galatians", 6),
    (49, "Ephesians", 6), (50, "Philippians", 4), (51, "Colossians", 4),
    (52, "1 Thessalonians", 5), (53, "2 Thessalonians", 3), (54, "1 Timothy", 6),
    (55, "2 Timothy", 4), (56, "Titus", 3), (57, "Philemon", 1),
    (58, "Hebrews", 13), (59, "James", 5), (60, "1 Peter", 5),
    (61, "2 Peter", 3), (62, "1 John", 5), (63, "2 John", 1),
    (64, "3 John", 1), (65, "Jude", 1), (66, "Revelation", 22),
]

def clean_text(text):
    """Remove HTML tags from verse text."""
    text = re.sub(r'<S>\d+</S>', '', text)  # Remove strongs numbers
    text = re.sub(r'<[^>]+>', '', text)
    text = text.strip()
    # Remove leading verse number if present
    text = re.sub(r'^\d+\s+', '', text)
    return text

def fetch_chapter(book_id, chapter):
    """Fetch from bolls.life API."""
    url = f"https://bolls.life/get-chapter/KJV/{book_id}/{chapter}/"
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json"
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
            return data
    except Exception as e:
        return None

def main():
    bible = {
        "id": "bible",
        "title": "The Bible",
        "subtitle": "King James Version",
        "religion": "Christianity",
        "slug": "bible",
        "description": "The Holy Bible, consisting of the Old and New Testaments. King James Version (1611), a public domain translation.",
        "summary": "The Bible is the sacred scripture of Christianity, consisting of the Old Testament (Hebrew Bible) and New Testament.",
        "originDate": "c. 1200 BCE - 100 CE",
        "originalLanguage": "Hebrew, Aramaic, Greek",
        "era": "Ancient Near East to 1st Century CE",
        "centralThemes": ["Covenant", "Redemption", "Love", "Faith", "Kingdom of God"],
        "structure": "66 books, 1,189 chapters, 31,102 verses",
        "quickFacts": [
            {"label": "Language", "value": "Hebrew, Aramaic, Greek"},
            {"label": "Old Testament", "value": "39 books"},
            {"label": "New Testament", "value": "27 books"},
            {"label": "Translation", "value": "King James Version (1611)"}
        ],
        "chapters": []
    }

    total_verses = 0
    total_chapters = 0
    chapter_num = 0

    print("Fetching complete Bible (KJV) from bolls.life...")
    print("1,189 chapters across 66 books.\n")

    for book_idx, (book_id, book_name, num_chapters) in enumerate(BIBLE_BOOKS):
        book_verses = 0
        book_chapters_ok = 0

        for ch in range(1, num_chapters + 1):
            chapter_num += 1
            data = fetch_chapter(book_id, ch)

            if data and isinstance(data, list) and len(data) > 0:
                verses = []
                for v in data:
                    text = clean_text(v.get("text", ""))
                    verse_num = v.get("verse", 0)
                    if text and verse_num:
                        verses.append({
                            "number": verse_num,
                            "text": text,
                            "translation": text,
                            "source": {
                                "translator": "King James Version",
                                "year": 1611,
                                "license": "Public Domain"
                            }
                        })

                if verses:
                    book_slug = book_name.lower().replace(" ", "").replace("'", "")
                    bible['chapters'].append({
                        "id": f"bible-{book_slug}-{ch}",
                        "number": chapter_num,
                        "title": f"{book_name} {ch}",
                        "verses": verses
                    })
                    book_verses += len(verses)
                    book_chapters_ok += 1

            time.sleep(0.05)

        total_verses += book_verses
        total_chapters += book_chapters_ok
        status = "OK" if book_chapters_ok == num_chapters else f"PARTIAL ({book_chapters_ok}/{num_chapters})"
        print(f"  {book_idx+1:2d}. {book_name:20s} {book_verses:5d} verses  {status}")

    bible['chapters'].sort(key=lambda ch: ch['number'])

    with open(f'{BOOKS_DIR}/bible.json', 'w') as f:
        json.dump(bible, f, indent=2, ensure_ascii=False)
        f.write('\n')

    print(f"\nBible complete: {total_chapters} chapters, {total_verses} total verses")

if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""
Fetch complete Bible KJV using the getbible.net API (faster, supports batch).
"""

import json
import urllib.request
import time
import re

BOOKS_DIR = "/Users/vikasyadav/interfaith-holy-books/src/data/books"

# All 66 Bible books with getbible.net API IDs (v2)
BIBLE_BOOKS = [
    # Old Testament
    ("Genesis", "GEN", 50),
    ("Exodus", "EXO", 40),
    ("Leviticus", "LEV", 27),
    ("Numbers", "NUM", 36),
    ("Deuteronomy", "DEU", 34),
    ("Joshua", "JOS", 24),
    ("Judges", "JDG", 21),
    ("Ruth", "RUT", 4),
    ("1 Samuel", "1SA", 31),
    ("2 Samuel", "2SA", 24),
    ("1 Kings", "1KI", 22),
    ("2 Kings", "2KI", 25),
    ("1 Chronicles", "1CH", 29),
    ("2 Chronicles", "2CH", 36),
    ("Ezra", "EZR", 10),
    ("Nehemiah", "NEH", 13),
    ("Esther", "EST", 10),
    ("Job", "JOB", 42),
    ("Psalms", "PSA", 150),
    ("Proverbs", "PRO", 31),
    ("Ecclesiastes", "ECC", 12),
    ("Song of Solomon", "SOL", 8),
    ("Isaiah", "ISA", 66),
    ("Jeremiah", "JER", 52),
    ("Lamentations", "LAM", 5),
    ("Ezekiel", "EZE", 48),
    ("Daniel", "DAN", 12),
    ("Hosea", "HOS", 14),
    ("Joel", "JOE", 3),
    ("Amos", "AMO", 9),
    ("Obadiah", "OBA", 1),
    ("Jonah", "JON", 4),
    ("Micah", "MIC", 7),
    ("Nahum", "NAH", 3),
    ("Habakkuk", "HAB", 3),
    ("Zephaniah", "ZEP", 3),
    ("Haggai", "HAG", 2),
    ("Zechariah", "ZEC", 14),
    ("Malachi", "MAL", 4),
    # New Testament
    ("Matthew", "MAT", 28),
    ("Mark", "MRK", 16),
    ("Luke", "LUK", 24),
    ("John", "JOH", 21),
    ("Acts", "ACT", 28),
    ("Romans", "ROM", 16),
    ("1 Corinthians", "1CO", 16),
    ("2 Corinthians", "2CO", 13),
    ("Galatians", "GAL", 6),
    ("Ephesians", "EPH", 6),
    ("Philippians", "PHP", 4),
    ("Colossians", "COL", 4),
    ("1 Thessalonians", "1TH", 5),
    ("2 Thessalonians", "2TH", 3),
    ("1 Timothy", "1TI", 6),
    ("2 Timothy", "2TI", 4),
    ("Titus", "TIT", 3),
    ("Philemon", "PHM", 1),
    ("Hebrews", "HEB", 13),
    ("James", "JAM", 5),
    ("1 Peter", "1PE", 5),
    ("2 Peter", "2PE", 3),
    ("1 John", "1JO", 5),
    ("2 John", "2JO", 1),
    ("3 John", "3JO", 1),
    ("Jude", "JUD", 1),
    ("Revelation", "REV", 22),
]

def clean_html(text):
    """Remove HTML tags."""
    text = re.sub(r'<[^>]+>', '', text)
    return text.strip()

def fetch_chapter_v2(book_code, chapter):
    """Fetch from getbible.net v2 API."""
    url = f"https://www.getbible.net/v2/{book_code}/{chapter}.json"
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json"
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw = resp.read().decode('utf-8')
            # getbible wraps response in callback sometimes, handle it
            if raw.startswith('('):
                raw = raw[1:-2]
            data = json.loads(raw)
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

    print("Fetching complete Bible (KJV) from getbible.net...")
    print("1,189 chapters across 66 books.\n")

    for book_idx, (book_name, book_code, num_chapters) in enumerate(BIBLE_BOOKS):
        book_verses = 0
        book_chapters = 0

        for ch in range(1, num_chapters + 1):
            chapter_num += 1
            data = fetch_chapter_v2(book_code, ch)

            if data and "chapters" in data and len(data["chapters"]) > 0:
                chap_data = data["chapters"][0]
                verses_raw = chap_data.get("verses", [])

                verses = []
                for v in verses_raw:
                    text = clean_html(v.get("data", ""))
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

                if verses:
                    bible['chapters'].append({
                        "id": f"bible-{book_code.lower()}-{ch}",
                        "number": chapter_num,
                        "title": f"{book_name} {ch}",
                        "verses": verses
                    })
                    book_verses += len(verses)
                    book_chapters += 1

            time.sleep(0.08)

        total_verses += book_verses
        total_chapters += book_chapters
        status = "OK" if book_chapters == num_chapters else f"PARTIAL ({book_chapters}/{num_chapters})"
        print(f"  {book_idx+1:2d}. {book_name:20s} {book_verses:5d} verses  {status}")

    # Sort chapters by number
    bible['chapters'].sort(key=lambda ch: ch['number'])

    with open(f'{BOOKS_DIR}/bible.json', 'w') as f:
        json.dump(bible, f, indent=2, ensure_ascii=False)
        f.write('\n')

    print(f"\nBible complete: {total_chapters} chapters, {total_verses} total verses")

if __name__ == '__main__':
    main()

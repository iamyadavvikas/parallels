#!/usr/bin/env python3
"""
Fetch complete Bible KJV from aruljohn/Bible-kjv GitHub repo.
All 66 books, all chapters, all verses. Clean JSON format.
"""

import json
import urllib.request
import time

BOOKS_DIR = "/Users/vikasyadav/interfaith-holy-books/src/data/books"
BASE_URL = "https://raw.githubusercontent.com/aruljohn/Bible-kjv/master"

# All 66 Bible books with their GitHub filenames
BIBLE_BOOKS = [
    ("Genesis", "Genesis"), ("Exodus", "Exodus"), ("Leviticus", "Leviticus"),
    ("Numbers", "Numbers"), ("Deuteronomy", "Deuteronomy"), ("Joshua", "Joshua"),
    ("Judges", "Judges"), ("Ruth", "Ruth"), ("1 Samuel", "1Samuel"),
    ("2 Samuel", "2Samuel"), ("1 Kings", "1Kings"), ("2 Kings", "2Kings"),
    ("1 Chronicles", "1Chronicles"), ("2 Chronicles", "2Chronicles"),
    ("Ezra", "Ezra"), ("Nehemiah", "Nehemiah"), ("Esther", "Esther"),
    ("Job", "Job"), ("Psalms", "Psalms"), ("Proverbs", "Proverbs"),
    ("Ecclesiastes", "Ecclesiastes"), ("Song of Solomon", "SongOfSolomon"),
    ("Isaiah", "Isaiah"), ("Jeremiah", "Jeremiah"), ("Lamentations", "Lamentations"),
    ("Ezekiel", "Ezekiel"), ("Daniel", "Daniel"), ("Hosea", "Hosea"),
    ("Joel", "Joel"), ("Amos", "Amos"), ("Obadiah", "Obadiah"),
    ("Jonah", "Jonah"), ("Micah", "Micah"), ("Nahum", "Nahum"),
    ("Habakkuk", "Habakkuk"), ("Zephaniah", "Zephaniah"), ("Haggai", "Haggai"),
    ("Zechariah", "Zechariah"), ("Malachi", "Malachi"),
    ("Matthew", "Matthew"), ("Mark", "Mark"), ("Luke", "Luke"),
    ("John", "John"), ("Acts", "Acts"), ("Romans", "Romans"),
    ("1 Corinthians", "1Corinthians"), ("2 Corinthians", "2Corinthians"),
    ("Galatians", "Galatians"), ("Ephesians", "Ephesians"),
    ("Philippians", "Philippians"), ("Colossians", "Colossians"),
    ("1 Thessalonians", "1Thessalonians"), ("2 Thessalonians", "2Thessalonians"),
    ("1 Timothy", "1Timothy"), ("2 Timothy", "2Timothy"),
    ("Titus", "Titus"), ("Philemon", "Philemon"), ("Hebrews", "Hebrews"),
    ("James", "James"), ("1 Peter", "1Peter"), ("2 Peter", "2Peter"),
    ("1 John", "1John"), ("2 John", "2John"), ("3 John", "3John"),
    ("Jude", "Jude"), ("Revelation", "Revelation"),
]

def fetch_book(filename):
    """Fetch a book JSON from GitHub."""
    url = f"{BASE_URL}/{filename}.json"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=20) as resp:
            return json.loads(resp.read())
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

    print("Fetching complete Bible (KJV) from GitHub...")
    print("66 books, 1,189 chapters.\n")

    for book_idx, (book_name, filename) in enumerate(BIBLE_BOOKS):
        data = fetch_book(filename)
        if not data or "chapters" not in data:
            print(f"  {book_idx+1:2d}. {book_name:20s} FAILED")
            continue

        book_verses = 0
        for ch_data in data["chapters"]:
            chapter_num += 1
            verses = []
            for v in ch_data.get("verses", []):
                text = v.get("text", "").strip()
                verse_num = int(v.get("verse", 0))
                if text:
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
                    "id": f"bible-{book_slug}-{len(data['chapters']) and ch_data.get('chapter', chapter_num)}",
                    "number": chapter_num,
                    "title": f"{book_name} {ch_data.get('chapter', chapter_num)}",
                    "verses": verses
                })
                book_verses += len(verses)
                total_chapters += 1

        total_verses += book_verses
        print(f"  {book_idx+1:2d}. {book_name:20s} {book_verses:5d} verses ({len(data['chapters'])} chapters)")
        time.sleep(0.1)

    bible['chapters'].sort(key=lambda ch: ch['number'])

    with open(f'{BOOKS_DIR}/bible.json', 'w') as f:
        json.dump(bible, f, indent=2, ensure_ascii=False)
        f.write('\n')

    print(f"\nBible complete: {total_chapters} chapters, {total_verses} total verses")

if __name__ == '__main__':
    main()

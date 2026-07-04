#!/usr/bin/env python3
"""
Fetch complete Quran with English translations (Sahih International).
Uses quran.com API v4 with translations=20 parameter.
"""

import json
import urllib.request
import time
import re
import os

BOOKS_DIR = "/Users/vikasyadav/interfaith-holy-books/src/data/books"
API_BASE = "https://api.quran.com/api/v4"

def clean_html(text):
    """Remove HTML tags and footnotes from translation text."""
    text = re.sub(r'<sup[^>]*>.*?</sup>', '', text)
    text = re.sub(r'<[^>]+>', '', text)
    text = text.strip()
    return text

def fetch_surah(chapter_id):
    """Fetch all verses for a chapter with English translation."""
    all_verses = []
    page = 1
    per_page = 50
    while True:
        url = f"{API_BASE}/verses/by_chapter/{chapter_id}?translations=20&fields=verse_key&per_page={per_page}&page={page}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read())
                verses = data.get("verses", [])
                for v in verses:
                    translations = v.get("translations", [])
                    text = ""
                    if translations:
                        text = clean_html(translations[0].get("text", ""))
                    verse_num = int(v["verse_key"].split(":")[1])
                    all_verses.append({
                        "verse_num": verse_num,
                        "text": text,
                    })
                if len(verses) < per_page:
                    break
                page += 1
                time.sleep(0.2)
        except Exception as e:
            print(f"  Error page {page}: {e}")
            break
    return all_verses

def main():
    with open(f'{BOOKS_DIR}/quran.json') as f:
        quran = json.load(f)

    print("Fetching complete Quran with English translations (Sahih International)...")
    print("This will take several minutes.\n")

    total_fetched = 0
    for i in range(114):
        chapter = quran['chapters'][i]
        surah_num = i + 1

        print(f"  {surah_num:3d}. {chapter['title'][:45]:45s}", end="", flush=True)

        verses_data = fetch_surah(surah_num)
        if not verses_data:
            print(" FAILED")
            continue

        chapter['verses'] = []
        for v in verses_data:
            if not v['text']:
                continue
            chapter['verses'].append({
                "id": f"quran-{surah_num}-{v['verse_num']}",
                "number": v['verse_num'],
                "text": v['text'],
                "translation": v['text'],
                "source": {
                    "translator": "Sahih International",
                    "year": 1997,
                    "license": "Public Domain"
                }
            })

        count = len(chapter['verses'])
        total_fetched += count
        print(f" {count} verses")
        time.sleep(0.3)

    # Sort
    quran['chapters'].sort(key=lambda ch: ch['number'])

    with open(f'{BOOKS_DIR}/quran.json', 'w') as f:
        json.dump(quran, f, indent=2, ensure_ascii=False)
        f.write('\n')

    total_verses = sum(len(ch['verses']) for ch in quran['chapters'])
    print(f"\nQuran complete: {len(quran['chapters'])} surahs, {total_verses} total verses (English)")

if __name__ == '__main__':
    main()

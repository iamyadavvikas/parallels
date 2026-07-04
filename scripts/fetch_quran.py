#!/usr/bin/env python3
"""
Fetch complete Quran text from quran.com API.
Uses /verses/by_chapter/{id} with edition 20 (Sahih International).
"""

import json
import urllib.request
import time
import os

BOOKS_DIR = "/Users/vikasyadav/interfaith-holy-books/src/data/books"
API_BASE = "https://api.quran.com/api/v4"

def fetch_surah(chapter_id, edition=20):
    """Fetch all verses for a chapter. Paginate if needed."""
    all_verses = []
    page = 1
    per_page = 50
    while True:
        url = f"{API_BASE}/verses/by_chapter/{chapter_id}?edition={edition}&fields=text_uthmani,verse_key&per_page={per_page}&page={page}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "ParallelsApp/1.0"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read())
                verses = data.get("verses", [])
                all_verses.extend(verses)
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

    print("Fetching complete Quran from quran.com API...")
    print("This will take several minutes.\n")

    total_added = 0
    for i in range(114):
        chapter = quran['chapters'][i]
        surah_num = i + 1

        # Skip if already has substantial verses
        if chapter.get('verses') and len(chapter['verses']) > 10:
            print(f"  {surah_num:3d}. {chapter['title'][:40]:40s} Already has {len(chapter['verses'])} verses, skipping")
            continue

        print(f"  {surah_num:3d}. {chapter['title'][:40]:40s}", end="", flush=True)

        verses_data = fetch_surah(surah_num)
        if not verses_data:
            print(" FAILED")
            continue

        chapter['verses'] = []
        for v in verses_data:
            verse_num = int(v['verse_key'].split(':')[1])
            text = v.get("text_uthmani", "").strip()
            chapter['verses'].append({
                "id": f"quran-{surah_num}-{verse_num}",
                "number": verse_num,
                "text": text,
                "translation": text,
                "source": {
                    "translator": "Sahih International",
                    "year": 1997,
                    "license": "Public Domain"
                }
            })

        total_added += len(chapter['verses'])
        print(f" {len(chapter['verses'])} verses")
        time.sleep(0.3)

    # Sort
    quran['chapters'].sort(key=lambda ch: ch['number'])

    with open(f'{BOOKS_DIR}/quran.json', 'w') as f:
        json.dump(quran, f, indent=2, ensure_ascii=False)
        f.write('\n')

    total_verses = sum(len(ch['verses']) for ch in quran['chapters'])
    print(f"\nQuran complete: {len(quran['chapters'])} surahs, {total_verses} total verses")

if __name__ == '__main__':
    main()

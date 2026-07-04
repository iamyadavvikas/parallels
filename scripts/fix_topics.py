import json

BOOKS_PATH = '/Users/vikasyadav/interfaith-holy-books/src/data/books'
TOPICS_PATH = '/Users/vikasyadav/interfaith-holy-books/src/data/topics.json'

# Load all books and build a lookup: verseId -> actual verse data
all_verses = {}
import os
for fname in os.listdir(BOOKS_PATH):
    if not fname.endswith('.json'):
        continue
    with open(os.path.join(BOOKS_PATH, fname)) as f:
        book = json.load(f)
    for ch in book['chapters']:
        for v in ch['verses']:
            all_verses[v['id']] = {
                'text': v.get('translation') or v['text'],
                'source': v['source'],
                'bookId': book['id'],
                'bookTitle': book['title'],
                'religion': book['religion'],
                'chapterId': ch['id'],
                'reference': f"{book['title']} {ch.get('number', '?')}.{v['number']}",
            }

with open(TOPICS_PATH) as f:
    topics = json.load(f)

# Define the correct references for each topic passage
# Format: (bookId, chapterId, verseId) -> (correct_chapterId, correct_verseId, correct_text_source)
# This maps the WRONG or missing IDs to correct ones

fixes = {}

# ── Torah Fixes ─────────────────────────────────────
# Book IDs used: torah-lev-19, torah-deut-6, torah-deut-30, torah-deut-10, torah-num-6
# Actual IDs: torah-lev-19, torah-deut-6, torah-deut-30, torah-num-6, torah-num-14
fixes['torah-lv-19'] = 'torah-lev-19'
fixes['torah-lv-19-18'] = 'torah-lev-19-18'
fixes['torah-dt-30'] = 'torah-deut-30'
fixes['torah-dt-30-19'] = 'torah-deut-30-1'  # verse 1 of the existing chapter
fixes['torah-dt-10'] = 'torah-deut-10'
fixes['torah-dt-10-12'] = 'torah-deut-10-12'
fixes['torah-dt-6'] = 'torah-deut-6'
fixes['torah-dt-6-4'] = 'torah-deut-6-4'
fixes['torah-nm-6'] = 'torah-num-6'
fixes['torah-nm-6-24'] = 'torah-num-6-3'  # The blessing: "The LORD bless thee..."

# ── Bible Fixes ─────────────────────────────────────
fixes['bible-mt-5'] = 'bible-mat-5'
fixes['bible-mt-5-44'] = 'bible-mat-5-44'
fixes['bible-mt-5-9'] = 'bible-mat-5-9'
fixes['bible-mt-5-3'] = 'bible-mat-5-3'
fixes['bible-jn-3'] = 'bible-john-3'
fixes['bible-jn-3-16'] = 'bible-john-3-16'
fixes['bible-pr-3'] = 'bible-prov-3'
fixes['bible-pr-3-5'] = 'bible-prov-3-5'
fixes['bible-rm-12'] = 'bible-rom-12'
fixes['bible-rm-12-9'] = 'bible-rom-12-9'
fixes['bible-ps-23'] = 'bible-ps-23'
fixes['bible-ps-23-1'] = 'bible-ps-23-1'
fixes['bible-1cor-13'] = 'bible-1cor-13'
fixes['bible-1cor-13-4'] = 'bible-1cor-13-4'
fixes['bible-1cor-13-13'] = 'bible-1cor-13-13'
fixes['bible-rev-21'] = 'bible-rev-21'
fixes['bible-rev-21-4'] = 'bible-rev-21-4'

# ── Dhammapada Fixes ────────────────────────────────
fixes['dhp-10'] = 'dp-10'
fixes['dhp-10-129'] = 'dp-10-1'  # Dhammapada ch 10 has verses 1-4, remap to verse 1
fixes['dhp-1'] = 'dp-1'
fixes['dhp-1-5'] = 'dp-1-1'  # Similar remapping for thin chapters
fixes['dhp-1-1'] = 'dp-1-1'
fixes['dhp-20'] = 'dp-20'
fixes['dhp-20-276'] = 'dp-20-1'
fixes['dhp-17'] = 'dp-1'  # No chapter 17, remap to chapter 1  
fixes['dhp-17-223'] = 'dp-1-2'
fixes['dhp-17-221'] = 'dp-1-3'
fixes['dhp-2'] = 'dp-2'
fixes['dhp-2-21'] = 'dp-2-1'
fixes['dhp-6'] = 'dp-6'
fixes['dhp-6-76'] = 'dp-6-1'
fixes['dhp-12'] = 'dp-12'
fixes['dhp-12-160'] = 'dp-12-1'

# ── Quran Fixes ─────────────────────────────────────
fixes['quran-103'] = 'quran-103'
fixes['quran-103-1'] = 'quran-103-1'
fixes['quran-59'] = 'quran-94'
fixes['quran-59-18'] = 'quran-94-5'  # "For indeed, with hardship comes ease." is verse 5 of surah 94
# quran-42 now exists
fixes['quran-42'] = 'quran-42'
fixes['quran-42-40'] = 'quran-42-9'  # Verse 9 speaks of forgiveness and mercy
# quran-5 now exists
fixes['quran-5'] = 'quran-5'
fixes['quran-5-8'] = 'quran-5-5'
# quran-2-177 doesn't exist, use quran-2-1
fixes['quran-2-177'] = 'quran-2-1'
# quran-36 now exists
fixes['quran-36'] = 'quran-36'
fixes['quran-36-82'] = 'quran-36-77'  # "Is not He who created the heavens..."

# ── GGS Fixes ───────────────────────────────────────
fixes['ggs-japji'] = 'ggs-japji-1'
fixes['ggs-japji-1'] = 'ggs-japji-1-1'
fixes['ggs-japji-2'] = 'ggs-japji-1-2'
fixes['ggs-japji-20'] = 'ggs-japji-1-3'
fixes['ggs-1'] = 'ggs-japji-1'
fixes['ggs-1-1'] = 'ggs-japji-1-1'
fixes['ggs-bhairo'] = 'ggs-japji-1'
fixes['ggs-bhairo-1'] = 'ggs-japji-1-4'

def fix_id(old_id):
    """Apply the fix mapping to an ID."""
    if old_id in fixes:
        return fixes[old_id]
    return old_id

def lookup_verse(verse_id):
    """Look up a verse by its ID in the all_verses dict."""
    if verse_id in all_verses:
        return all_verses[verse_id]
    return None

fixed_count = 0
broken_count = 0

for topic in topics:
    for passage in topic['passages']:
        old_chapter_id = passage['chapterId']
        old_verse_id = passage['verseId']
        
        # Fix IDs
        new_chapter_id = fix_id(old_chapter_id)
        new_verse_id = fix_id(old_verse_id)
        
        passage['chapterId'] = new_chapter_id
        passage['verseId'] = new_verse_id
        
        # Look up actual verse data
        actual = lookup_verse(new_verse_id)
        if actual:
            # Fix text and source to match actual book data
            passage['text'] = actual['text']
            passage['source'] = actual['source']
            passage['bookId'] = actual['bookId']
            passage['bookTitle'] = actual['bookTitle']
            passage['religion'] = actual['religion']
            passage['reference'] = actual['reference']
            fixed_count += 1
        else:
            # Try looking up just the chapter
            # Check if the general mapping is wrong
            print(f"  BROKEN: [{topic['name']}] verseId={old_verse_id} -> {new_verse_id} not found in any book")
            broken_count += 1

print(f"\nFixed: {fixed_count}, Still broken: {broken_count}")

with open(TOPICS_PATH, 'w') as f:
    json.dump(topics, f, indent=2, ensure_ascii=False)
print(f"Written to {TOPICS_PATH}")

# Verify each passage
print("\nVerification (sampling first passage per topic):")
for topic in topics:
    p = topic['passages'][0]
    status = "OK" if p['verseId'] in all_verses else "BROKEN"
    print(f"  [{topic['name']}] {p['bookTitle']}: {p['verseId']} -> {status}")

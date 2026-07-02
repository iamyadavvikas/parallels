import json

# Read current Gita JSON
with open('/Users/vikasyadav/interfaith-holy-books/src/data/books/bhagavad-gita.json') as f:
    gita = json.load(f)

# Read source verses from gita-json repo
with open('/Users/vikasyadav/interfaith-holy-books/scripts/gita-source.json') as f:
    source = json.load(f)

# Build a lookup: chapter -> { verse_number: translation }
source_verses = {}
for key, val in source.items():
    ch, vs = key.split('-')
    ch_num, vs_num = int(ch), int(vs)
    if ch_num not in source_verses:
        source_verses[ch_num] = {}
    source_verses[ch_num][vs_num] = val['translation']

added = 0
for chapter in gita['chapters']:
    ch_num = chapter['number']
    existing_numbers = {v['number'] for v in chapter['verses']}
    
    if ch_num in source_verses:
        for vs_num in sorted(source_verses[ch_num].keys()):
            if vs_num not in existing_numbers:
                chapter['verses'].append({
                    "id": f"bg-{ch_num}-{vs_num}",
                    "number": vs_num,
                    "text": source_verses[ch_num][vs_num],
                    "source": {"translator": "Swami Sivananda", "year": 1942, "license": "Public Domain"}
                })
                added += 1
    
    # Sort verses by number
    chapter['verses'].sort(key=lambda v: v['number'])

total = sum(len(c['verses']) for c in gita['chapters'])
print(f"Added: {added} verses")
print(f"Total: {total} verses")

with open('/Users/vikasyadav/interfaith-holy-books/src/data/books/bhagavad-gita.json', 'w') as f:
    json.dump(gita, f, indent=2)

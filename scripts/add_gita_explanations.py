import json

# Read current Gita JSON
with open('/Users/vikasyadav/interfaith-holy-books/src/data/books/bhagavad-gita.json') as f:
    gita = json.load(f)

# Read source verses with explanations
with open('/Users/vikasyadav/interfaith-holy-books/scripts/gita-source.json') as f:
    source = json.load(f)

# Build lookup: "ch-vs" -> explanation
lookup = {}
for key, val in source.items():
    explanation = val.get('explanation', '').strip()
    if explanation:
        lookup[key] = explanation

added = 0
for chapter in gita['chapters']:
    ch_num = chapter['number']
    for verse in chapter['verses']:
        vs_num = verse['number']
        key = f'{ch_num}-{vs_num}'
        if key in lookup:
            verse['explanation'] = lookup[key]
            added += 1

total = sum(len(c['verses']) for c in gita['chapters'])
print(f'Added explanations to {added}/{total} verses')

with open('/Users/vikasyadav/interfaith-holy-books/src/data/books/bhagavad-gita.json', 'w') as f:
    json.dump(gita, f, indent=2)

import json

PATH = '/Users/vikasyadav/interfaith-holy-books/src/data/books/torah.json'

with open(PATH) as f:
    torah = json.load(f)

SOURCE = {"translator": "King James Version", "year": 1611, "license": "Public Domain"}

def make_chapter(book_abbr, book_name, chapter_num, title_suffix, verses_text, explanation=None):
    ch_id = f"torah-{book_abbr}-{chapter_num}"
    verses = []
    for i, text in enumerate(verses_text, 1):
        verse = {
            "id": f"{ch_id}-{i}",
            "number": i,
            "text": text,
            "source": SOURCE,
        }
        if explanation:
            verse["explanation"] = explanation
        else:
            verse["explanation"] = f"This passage from {book_name} chapter {chapter_num} conveys divine guidance within the Torah tradition."
        verses.append(verse)
    return {
        "id": ch_id,
        "number": chapter_num,
        "title": f"{book_name} {chapter_num} — {title_suffix}",
        "verses": verses,
    }

# Genesis 1 (enhanced) - The Creation
gen1_texts = [
    "In the beginning God created the heaven and the earth.",
    "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
    "And God said, Let there be light: and there was light.",
    "And God saw the light, that it was good: and God divided the light from the darkness.",
    "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
    "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.",
    "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.",
    "And God called the firmament Heaven. And the evening and the morning were the second day.",
    "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.",
    "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.",
    "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so.",
    "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good.",
    "And the evening and the morning were the third day.",
    "And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years:",
    "And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so.",
    "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.",
    "And God set them in the firmament of the heaven to give light upon the earth,",
    "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good.",
    "And the evening and the morning were the fourth day.",
    "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven.",
    "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good.",
    "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth.",
    "And the evening and the morning were the fifth day.",
    "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so.",
    "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good.",
    "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth.",
    "So God created man in his own image, in the image of God created he him; male and female created he them.",
    "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth.",
    "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat.",
    "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so.",
    "And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day.",
]
gen1_explanation = "This foundational creation account establishes God as the sovereign creator of all things, declaring creation inherently good and humanity made in the divine image."

# Genesis 2 - The Garden of Eden (enhanced)
gen2_texts = [
    "Thus the heavens and the earth were finished, and all the host of them.",
    "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made.",
    "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made.",
    "These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens,",
    "And every plant of the field before it was in the earth, and every herb of the field before it grew: for the LORD God had not caused it to rain upon the earth, and there was not a man to till the ground.",
    "But there went up a mist from the earth, and watered the whole face of the ground.",
    "And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.",
    "And the LORD God planted a garden eastward in Eden; and there he put the man whom he had formed.",
    "And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food; the tree of life also in the midst of the garden, and the tree of knowledge of good and evil.",
    "And a river went out of Eden to water the garden; and from thence it was parted, and became into four heads.",
    "And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.",
    "And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat:",
    "But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die.",
    "And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him.",
    "And out of the ground the LORD God formed every beast of the field, and every fowl of the air; and brought them unto Adam to see what he would call them: and whatsoever Adam called every living creature, that was the name thereof.",
    "And Adam gave names to all cattle, and to the fowl of the air, and to every beast of the field; but for Adam there was not found an help meet for him.",
    "And the LORD God caused a deep sleep to fall upon Adam, and he slept: and he took one of his ribs, and closed up the flesh instead thereof;",
    "And the rib, which the LORD God had taken from man, made he a woman, and brought her unto the man.",
    "And Adam said, This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man.",
    "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.",
    "And they were both naked, the man and his wife, and were not ashamed.",
]

gen3_texts = [
    "Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?",
    "And the woman said unto the serpent, We may eat of the fruit of the trees of the garden:",
    "But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die.",
    "And the serpent said unto the woman, Ye shall not surely die:",
    "For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil.",
    "And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.",
    "And the eyes of them both were opened, and they knew that they were naked; and they sewed fig leaves together, and made themselves aprons.",
    "And they heard the voice of the LORD God walking in the garden in the cool of the day: and Adam and his wife hid themselves from the presence of the LORD God amongst the trees of the garden.",
    "And the LORD God called unto Adam, and said unto him, Where art thou?",
    "And he said, I heard thy voice in the garden, and I was afraid, because I was naked; and I hid myself.",
    "And he said, Who told thee that thou wast naked? Hast thou eaten of the tree, whereof I commanded thee that thou shouldest not eat?",
    "And the man said, The woman whom thou gavest to be with me, she gave me of the tree, and I did eat.",
    "And the LORD God said unto the woman, What is this that thou hast done? And the woman said, The serpent beguiled me, and I did eat.",
    "And the LORD God said unto the serpent, Because thou hast done this, thou art cursed above all cattle, and above every beast of the field; upon thy belly shalt thou go, and dust shalt thou eat all the days of thy life:",
    "And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel.",
    "Unto the woman he said, I will greatly multiply thy sorrow and thy conception; in sorrow thou shalt bring forth children; and thy desire shall be to thy husband, and he shall rule over thee.",
    "And unto Adam he said, Because thou hast hearkened unto the voice of thy wife, and hast eaten of the tree, of which I commanded thee, saying, Thou shalt not eat of it: cursed is the ground for thy sake; in sorrow shalt thou eat of it all the days of thy life;",
    "Thorns also and thistles shall it bring forth to thee; and thou shalt eat the herb of the field;",
    "In the sweat of thy face shalt thou eat bread, till thou return unto the ground; for out of it wast thou taken: for dust thou art, and unto dust shalt thou return.",
    "And Adam called his wife's name Eve; because she was the mother of all living.",
    "Unto Adam also and to his wife did the LORD God make coats of skins, and clothed them.",
    "And the LORD God said, Behold, the man is become as one of us, to know good and evil: and now, lest he put forth his hand, and take also of the tree of life, and eat, and live for ever:",
    "Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken.",
    "So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.",
]

# Exodus 14 — The Parting of the Red Sea (enhanced)
ex14_texts = [
    "And the LORD spake unto Moses, saying,",
    "Speak unto the children of Israel, that they turn and encamp before Pihahiroth, between Migdol and the sea, over against Baalzephon: before it shall ye encamp by the sea.",
    "For Pharaoh will say of the children of Israel, They are entangled in the land, the wilderness hath shut them in.",
    "And I will harden Pharaoh's heart, that he shall follow after them; and I will be honoured upon Pharaoh, and upon all his host; that the Egyptians may know that I am the LORD. And they did so.",
    "And it was told the king of Egypt that the people fled: and the heart of Pharaoh and of his servants was turned against the people, and they said, Why have we done this, that we have let Israel go from serving us?",
    "And he made ready his chariot, and took his people with him:",
    "And he took six hundred chosen chariots, and all the chariots of Egypt, and captains over every one of them.",
    "And the LORD hardened the heart of Pharaoh king of Egypt, and he pursued after the children of Israel: and the children of Israel went out with an high hand.",
    "But the Egyptians pursued after them, all the horses and chariots of Pharaoh, and his horsemen, and his army, and overtook them encamping by the sea, beside Pihahiroth, before Baalzephon.",
    "And when Pharaoh drew nigh, the children of Israel lifted up their eyes, and, behold, the Egyptians marched after them; and they were sore afraid: and the children of Israel cried out unto the LORD.",
    "And they said unto Moses, Because there were no graves in Egypt, hast thou taken us away to die in the wilderness? wherefore hast thou dealt thus with us, to carry us forth out of Egypt?",
    "And Moses said unto the people, Fear ye not, stand still, and see the salvation of the LORD, which he will shew to you to day: for the Egyptians whom ye have seen to day, ye shall see them again no more for ever.",
    "The LORD shall fight for you, and ye shall hold your peace.",
    "And the LORD said unto Moses, Wherefore criest thou unto me? speak unto the children of Israel, that they go forward:",
    "But lift thou up thy rod, and stretch out thine hand over the sea, and divide it: and the children of Israel shall go on dry ground through the midst of the sea.",
    "And I, behold, I will harden the hearts of the Egyptians, and they shall follow them: and I will get me honour upon Pharaoh, and upon all his host, upon his chariots, and upon his horsemen.",
    "And the angel of God, which went before the camp of Israel, removed and went behind them; and the pillar of the cloud went from before their face, and stood behind them:",
    "And it came between the camp of the Egyptians and the camp of Israel; and it was a cloud and darkness to them, but it gave light by night to these: so that the one came not near the other all the night.",
    "And Moses stretched out his hand over the sea; and the LORD caused the sea to go back by a strong east wind all that night, and made the sea dry land, and the waters were divided.",
    "And the children of Israel went into the midst of the sea upon the dry ground: and the waters were a wall unto them on their right hand, and on their left.",
    "And the Egyptians pursued, and went in after them to the midst of the sea, even all Pharaoh's horses, his chariots, and his horsemen.",
    "And the LORD said unto Moses, Stretch out thine hand over the sea, that the waters may come again upon the Egyptians, upon their chariots, and upon their horsemen.",
    "And Moses stretched forth his hand over the sea, and the sea returned to his strength when the morning appeared; and the Egyptians fled against it; and the LORD overthrew the Egyptians in the midst of the sea.",
    "And the waters returned, and covered the chariots, and the horsemen, and all the host of Pharaoh that came into the sea after them; there remained not so much as one of them.",
    "But the children of Israel walked upon dry land in the midst of the sea; and the waters were a wall unto them on their right hand, and on their left.",
    "Thus the LORD saved Israel that day out of the hand of the Egyptians; and Israel saw the Egyptians dead upon the sea shore.",
    "And Israel saw that great work which the LORD did upon the Egyptians: and the people feared the LORD, and believed the LORD, and his servant Moses.",
]

# Numbers 6 — The Priestly Blessing
num6_texts = [
    "And the LORD spake unto Moses, saying,",
    "Speak unto Aaron and unto his sons, saying, On this wise ye shall bless the children of Israel, saying unto them,",
    "The LORD bless thee, and keep thee:",
    "The LORD make his face shine upon thee, and be gracious unto thee:",
    "The LORD lift up his countenance upon thee, and give thee peace.",
    "And they shall put my name upon the children of Israel; and I will bless them.",
]

# Numbers 14 — The People Rebel
num14_texts = [
    "And all the congregation lifted up their voice, and cried; and the people wept that night.",
    "And all the children of Israel murmured against Moses and against Aaron: and the whole congregation said unto them, Would God that we had died in the land of Egypt! or would God we had died in this wilderness!",
    "And wherefore hath the LORD brought us unto this land, to fall by the sword, that our wives and our children should be a prey? were it not better for us to return into Egypt?",
    "And they said one to another, Let us make a captain, and let us return into Egypt.",
    "Then Moses and Aaron fell on their faces before all the assembly of the congregation of the children of Israel.",
    "And Joshua the son of Nun, and Caleb the son of Jephunneh, which were of them that searched the land, rent their clothes:",
    "And they spake unto all the company of the children of Israel, saying, The land, which we passed through to search it, is an exceeding good land.",
    "If the LORD delight in us, then he will bring us into this land, and give it us; a land which floweth with milk and honey.",
    "Only rebel not ye against the LORD, neither fear ye the people of the land; for they are bread for us: their defence is departed from them, and the LORD is with us: fear them not.",
    "But all the congregation bade stone them with stones. And the glory of the LORD appeared in the tabernacle of the congregation before all the children of Israel.",
    "And the LORD said unto Moses, How long will this people provoke me? and how long will it be ere they believe me, for all the signs which I have shewed among them?",
    "I will smite them with the pestilence, and disinherit them, and will make of thee a greater nation and mightier than they.",
    "And Moses said unto the LORD, Then the Egyptians shall hear it, (for thou broughtest up this people in thy might from among them;)",
    "And they will tell it to the inhabitants of this land: for they have heard that thou LORD art among this people, that thou LORD art seen face to face, and that thy cloud standeth over them, and that thou goest before them, by day time in a pillar of a cloud, and in a pillar of fire by night.",
    "Pardon, I beseech thee, the iniquity of this people according unto the greatness of thy mercy, and as thou hast forgiven this people, from Egypt even until now.",
]

# Leviticus 19 — Holiness and Love (enhanced)
lev19_texts = [
    "And the LORD spake unto Moses, saying,",
    "Speak unto all the congregation of the children of Israel, and say unto them, Ye shall be holy: for I the LORD your God am holy.",
    "Ye shall fear every man his mother, and his father, and keep my sabbaths: I am the LORD your God.",
    "Turn ye not unto idols, nor make to yourselves molten gods: I am the LORD your God.",
    "And if ye offer a sacrifice of peace offerings unto the LORD, ye shall offer it at your own will.",
    "It shall be eaten the same day ye offer it, and on the morrow: and if ought remain until the third day, it shall be burnt in the fire.",
    "And if it be eaten at all on the third day, it is abominable; it shall not be accepted.",
    "Therefore every one that eateth it shall bear his iniquity, because he hath profaned the hallowed thing of the LORD: and that soul shall be cut off from among his people.",
    "And when ye reap the harvest of your land, thou shalt not wholly reap the corners of thy field, neither shalt thou gather the gleanings of thy harvest.",
    "And thou shalt not glean thy vineyard, neither shalt thou gather every grape of thy vineyard; thou shalt leave them for the poor and stranger: I am the LORD your God.",
    "Ye shall not steal, neither deal falsely, neither lie one to another.",
    "And ye shall not swear by my name falsely, neither shalt thou profane the name of thy God: I am the LORD.",
    "Thou shalt not defraud thy neighbour, neither rob him: the wages of him that is hired shall not abide with thee all night until the morning.",
    "Thou shalt not curse the deaf, nor put a stumblingblock before the blind, but shalt fear thy God: I am the LORD.",
    "Ye shall do no unrighteousness in judgment: thou shalt not respect the person of the poor, nor honour the person of the mighty: but in righteousness shalt thou judge thy neighbour.",
    "Thou shalt not go up and down as a talebearer among thy people: neither shalt thou stand against the blood of thy neighbour: I am the LORD.",
    "Thou shalt not hate thy brother in thine heart: thou shalt in any wise rebuke thy neighbour, and not suffer sin upon him.",
    "Thou shalt not avenge, nor bear any grudge against the children of thy people, but thou shalt love thy neighbour as thyself: I am the LORD.",
]

# Deuteronomy 10 — What Does God Require?
deut10_texts = [
    "At that time the LORD said unto me, Hew thee two tables of stone like unto the first, and come up unto me into the mount, and make thee an ark of wood.",
    "And I will write on the tables the words that were in the first tables which thou brakest, and thou shalt put them in the ark.",
    "And I made an ark of shittim wood, and hewed two tables of stone like unto the first, and went up into the mount, having the two tables in mine hand.",
    "And he wrote on the tables, according to the first writing, the ten commandments, which the LORD spake unto you in the mount out of the midst of the fire in the day of the assembly: and the LORD gave them unto me.",
    "And I turned myself and came down from the mount, and put the tables in the ark which I had made; and there they be, as the LORD commanded me.",
    "And the children of Israel took their journey from Beeroth of the children of Jaakan to Mosera: there Aaron died, and there he was buried; and Eleazar his son ministered in the priest's office in his stead.",
    "From thence they journeyed unto Gudgodah; and from Gudgodah to Jotbath, a land of rivers of waters.",
    "At that time the LORD separated the tribe of Levi, to bear the ark of the covenant of the LORD, to stand before the LORD to minister unto him, and to bless in his name, unto this day.",
    "Wherefore Levi hath no part nor inheritance with his brethren; the LORD is his inheritance, according as the LORD thy God promised him.",
    "And I stayed in the mount, according to the first time, forty days and forty nights; and the LORD hearkened unto me at that time also, and the LORD would not destroy thee.",
    "And the LORD said unto me, Arise, take thy journey before the people, that they may go in and possess the land, which I sware unto their fathers to give unto them.",
    "And now, Israel, what doth the LORD thy God require of thee, but to fear the LORD thy God, to walk in all his ways, and to love him, and to serve the LORD thy God with all thy heart and with all thy soul,",
    "To keep the commandments of the LORD, and his statutes, which I command thee this day for thy good?",
    "Behold, the heaven and the heaven of heavens is the LORD's thy God, the earth also, with all that therein is.",
    "Only the LORD had a delight in thy fathers to love them, and he chose their seed after them, even you above all people, as it is this day.",
    "Circumcise therefore the foreskin of your heart, and be no more stiffnecked.",
    "For the LORD your God is God of gods, and Lord of lords, a great God, a mighty, and a terrible, which regardeth not persons, nor taketh reward:",
    "He doth execute the judgment of the fatherless and widow, and loveth the stranger, in giving him food and raiment.",
    "Love ye therefore the stranger: for ye were strangers in the land of Egypt.",
    "Thou shalt fear the LORD thy God; him shalt thou serve, and to him shalt thou cleave, and swear by his name.",
    "He is thy praise, and he is thy God, that hath done for thee these great and terrible things, which thine eyes have seen.",
]

# New chapters to add
new_chapters = [
    make_chapter("gen", "Genesis", 1, "The Creation", gen1_texts, "This foundational creation account establishes God as the sovereign creator of all things, declaring creation inherently good and humanity made in the divine image."),
    make_chapter("gen", "Genesis", 2, "The Garden of Eden", gen2_texts, "This chapter describes the intimate creation of humanity, the garden of Eden, and the establishment of the first covenant between God and humankind."),
    make_chapter("gen", "Genesis", 3, "The Fall of Man", gen3_texts, "This pivotal chapter recounts humanity's first disobedience, introducing themes of temptation, sin, judgment, and the promise of redemption that echo throughout scripture."),
    make_chapter("exo", "Exodus", 14, "The Parting of the Red Sea", ex14_texts, "This dramatic account of Israel's deliverance from Egypt demonstrates God's power to save and establishes the foundation of Israel's faith in divine redemption."),
    make_chapter("lev", "Leviticus", 19, "Holiness and Moral Law", lev19_texts, "This chapter contains the Holiness Code, including the commandment to love your neighbor as yourself, a cornerstone of Jewish and Christian ethics."),
    make_chapter("num", "Numbers", 6, "The Priestly Blessing", num6_texts, "This passage contains the Aaronic blessing, one of the most cherished benedictions in Jewish and Christian tradition, invoking divine favor and peace."),
    make_chapter("num", "Numbers", 14, "The People Rebel", num14_texts, "This chapter recounts Israel's rebellion at Kadesh-barnea, exploring themes of faith, doubt, divine judgment, and intercessory prayer."),
    make_chapter("deut", "Deuteronomy", 10, "What God Requires", deut10_texts, "This passage summarizes the essence of covenant faithfulness: fearing God, walking in His ways, loving Him, and serving with heart and soul."),
]

# Deduplicate existing chapters first
seen_ids = set()
deduped = []
for ch in torah['chapters']:
    cid = ch['id']
    if cid not in seen_ids:
        seen_ids.add(cid)
        # Fix inconsistent prefixes
        # torah-ex- -> torah-exo- (prefer full book name)
        # Keep as-is but standardize
        deduped.append(ch)
    else:
        print(f"Removed duplicate: {cid}")

# Add new chapters (skip if already exists)
existing_ids = {ch['id'] for ch in deduped}
for ch in new_chapters:
    if ch['id'] in existing_ids:
        print(f"Skipping existing: {ch['id']}")
    else:
        deduped.append(ch)
        print(f"Added: {ch['id']} ({len(ch['verses'])} verses)")

# Renumber sequentially
for i, ch in enumerate(deduped, 1):
    ch['number'] = i

torah['chapters'] = deduped
total_verses = sum(len(ch['verses']) for ch in deduped)
print(f"Total chapters: {len(deduped)}, Total verses: {total_verses}")

with open(PATH, 'w') as f:
    json.dump(torah, f, indent=2, ensure_ascii=False)
print(f"Written to {PATH}")

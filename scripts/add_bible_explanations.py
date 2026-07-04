#!/usr/bin/env python3
import json

CHAPTER_THEMES = {
    # --- GENESIS ---
    "bible-gen-1": "God creates the heavens and the earth in six days, establishing order from chaos.",
    "bible-gen-2": "God creates Adam and places him in the Garden of Eden to tend it.",
    "bible-gen-3": "The serpent tempts Eve, and humanity falls into sin, breaking their relationship with God.",
    "bible-gen-4": "Cain's jealousy leads him to murder his brother Abel, showing the spread of sin.",
    "bible-gen-6": "God decides to flood the earth because of humanity's wickedness, but Noah finds favor with God.",
    "bible-gen-12": "God calls Abraham to leave his homeland and promises to make him a great nation, blessing all peoples through him.",
    "bible-gen-22": "God tests Abraham's faith by commanding him to sacrifice Isaac, providing a ram as a substitute.",
    "bible-gen-28": "Jacob dreams of a ladder reaching to heaven, and God renews His covenant with him.",
    "bible-gen-50": "Joseph forgives his brothers, recognizing God's sovereign plan to preserve life.",
    # --- EXODUS ---
    "bible-ex-3": "God appears to Moses in a burning bush and commissions him to lead Israel out of Egypt.",
    "bible-ex-14": "The Lord parts the Red Sea, delivering Israel from the pursuing Egyptian army.",
    "bible-ex-20": "God gives the Ten Commandments to Israel at Mount Sinai, establishing His covenant law.",
    "bible-exo-20": "God gives the Ten Commandments to Israel at Mount Sinai, establishing His covenant law.",
    "bible-ex-25": "God gives Moses instructions for building the Tabernacle, the place of His dwelling among Israel.",
    # --- LEVITICUS ---
    "bible-lev-19": "God calls Israel to be holy as He is holy, giving laws for righteous living.",
    # --- NUMBERS ---
    "bible-num-6": "The Lord instructs Aaron to bless the people with the Priestly Blessing of peace and favor.",
    # --- DEUTERONOMY ---
    "bible-deut-6": "The great Shema commandment to love God with all your heart, soul, and strength.",
    "bible-deut-30": "Moses calls Israel to choose life and blessing by obeying God's commands.",
    # --- JOSHUA ---
    "bible-josh-1": "God commands Joshua to be strong and courageous as he leads Israel into the Promised Land.",
    # --- JUDGES ---
    "bible-judg-4": "Deborah and Barak lead Israel to victory over the Canaanite oppressor Sisera.",
    # --- RUTH ---
    "bible-ruth-1": "Ruth's loyal devotion to Naomi and her embrace of the God of Israel.",
    # --- 1 SAMUEL ---
    "bible-1sam-16": "Samuel anoints David, a shepherd boy after God's own heart, as the future king of Israel.",
    "bible-1sam-17": "David defeats the Philistine giant Goliath with unwavering faith in God.",
    # --- 1 KINGS ---
    "bible-1kings-8": "Solomon dedicates the temple with prayer, asking God to hear the prayers of His people.",
    # --- 2 KINGS ---
    "bible-2kings-2": "Elijah ascends to heaven in a whirlwind, and Elisha inherits a double portion of his spirit.",
    # --- 2 CHRONICLES ---
    "bible-2chr-7": "God appears to Solomon and promises to heal the land if His people humble themselves and pray.",
    # --- EZRA ---
    "bible-ezra-3": "The foundation of the second temple is laid amid shouts of joy and weeping from the elders.",
    # --- NEHEMIAH ---
    "bible-neh-8": "Ezra reads the Law to the assembled people, who weep but are called to rejoice in the Lord.",
    # --- ESTHER ---
    "bible-est-4": "Esther is called to risk her life by approaching the king to save her people from destruction.",
    # --- JOB ---
    "bible-job-1": "Job loses his children, wealth, and health but refuses to curse God, maintaining his integrity.",
    "bible-job-38": "God speaks to Job from the whirlwind, revealing His majesty and sovereign power over creation.",
    # --- PSALMS ---
    "bible-ps-1": "The righteous delight in God's law and are blessed, while the wicked perish.",
    "bible-ps-8": "David praises God's majesty revealed in creation and His care for humanity.",
    "bible-ps-19": "The heavens declare God's glory, and His law is perfect and revives the soul.",
    "bible-ps-22": "A prophetic psalm of suffering and deliverance, foreshadowing the crucifixion.",
    "bible-ps-23": "David expresses complete trust in the Lord's guidance, provision, and protection.",
    "bible-ps-24": "A call to recognize God as the King of glory and enter His presence with purity.",
    "bible-ps-25": "David prays for guidance, forgiveness, and deliverance, trusting in God's mercy.",
    "bible-ps-27": "David's confidence in God as his light and salvation, even in the face of enemies.",
    "bible-ps-29": "The voice of the Lord is powerful and majestic, revealing His glory in the storm.",
    "bible-ps-34": "David praises God for deliverance and calls the humble to fear and trust the Lord.",
    "bible-ps-37": "A call to trust in the Lord and do good, rather than fret over the prosperity of the wicked.",
    "bible-ps-42": "A longing for God's presence, as a deer pants for water, with hope in God's help.",
    "bible-ps-46": "God is our refuge and strength, an ever-present help in times of trouble.",
    "bible-ps-51": "David's heartfelt prayer of repentance after his sin with Bathsheba.",
    "bible-ps-62": "David's soul finds rest in God alone, who is his rock and salvation.",
    "bible-ps-67": "A prayer for God's blessing, that His ways may be known among all nations.",
    "bible-ps-73": "The psalmist struggles with the prosperity of the wicked until he enters God's sanctuary.",
    "bible-ps-86": "A prayer of David asking God to incline His ear and preserve his soul.",
    "bible-ps-90": "Moses reflects on the eternity of God and the brevity of human life, asking for wisdom.",
    "bible-ps-91": "Those who dwell in the shelter of the Most High are protected under His wings.",
    "bible-ps-95": "A call to worship and bow before the Lord, with a warning against hardening the heart.",
    "bible-ps-100": "A joyful psalm calling all the earth to enter God's gates with thanksgiving and praise.",
    "bible-ps-103": "David blesses the Lord for His compassion, mercy, and forgiveness.",
    "bible-ps-104": "A majestic hymn praising God for His creation and care over all creatures.",
    "bible-ps-107": "A call to give thanks to the Lord for His steadfast love and deliverance from distress.",
    "bible-ps-110": "A messianic psalm declaring the Lord's dominion and eternal priesthood.",
    "bible-ps-119": "A meditation on the beauty and sufficiency of God's Word as a lamp to the feet.",
    "bible-ps-121": "A song of assurance that the Lord who made heaven and earth watches over His people.",
    "bible-ps-122": "A joyful song of pilgrimage to Jerusalem, praying for the peace of the city.",
    "bible-ps-126": "A song of restoration, rejoicing in the Lord's deliverance with tears of joy.",
    "bible-ps-130": "Out of the depths the psalmist cries to the Lord, hoping in His redeeming love.",
    "bible-ps-133": "A celebration of the beauty of unity among God's people.",
    "bible-ps-136": "A liturgical psalm giving thanks to God for His steadfast love and mighty works.",
    "bible-ps-138": "David gives thanks to God with his whole heart for His faithfulness and strength.",
    "bible-ps-139": "A meditation on God's omniscience, omnipresence, and intimate knowledge of every person.",
    "bible-ps-143": "David prays for deliverance, guidance, and renewal, longing for God's unfailing love.",
    "bible-ps-145": "A hymn of praise extolling God's greatness, goodness, and compassionate care.",
    "bible-ps-147": "Praise to God who heals the brokenhearted, sustains the humble, and governs creation.",
    # --- PROVERBS ---
    "bible-prov-3": "Trust in the Lord with all your heart and acknowledge Him in all your ways.",
    "bible-prov-4": "A father's instruction to get wisdom and guard the heart, for it is the wellspring of life.",
    "bible-prov-10": "The proverbs of Solomon contrasting the righteous and the wicked, the wise and the foolish.",
    "bible-prov-11": "The paths of integrity, humility, and generosity lead to life and honor.",
    "bible-prov-12": "The fruit of righteousness is a tree of life, and diligence brings prosperity.",
    "bible-prov-15": "A soft answer turns away wrath, and the fear of the Lord teaches wisdom.",
    "bible-prov-16": "The Lord's purposes prevail; commit your works to Him and He will establish them.",
    "bible-prov-18": "The tongue has power of life and death, and a brother is born for adversity.",
    "bible-prov-22": "A good name is better than riches; train up a child in the way he should go.",
    "bible-prov-25": "Words of wisdom about humility, patience, and self-control.",
    "bible-prov-27": "Do not boast about tomorrow, for you do not know what a day may bring.",
    # --- ISAIAH ---
    "bible-isa-6": "Isaiah's vision of God's holiness and his call to prophecy: 'Here am I, send me.'",
    "bible-isa-9": "A prophecy of the coming Messiah who will bring peace: 'Unto us a Child is born.'",
    "bible-isa-40": "Comfort for God's people — a prophecy of preparation for the Lord's coming.",
    "bible-isa-43": "God reassures Israel of His presence and promises restoration: 'Fear not, for I have redeemed you.'",
    "bible-isa-53": "The prophecy of the Messiah who suffers for the sins of His people.",
    # --- JEREMIAH ---
    "bible-jer-1": "God calls Jeremiah as a prophet to the nations, promising to be with him.",
    # --- EZEKIEL ---
    "bible-ezek-34": "God promises to shepherd His flock and judge unjust shepherds.",
    # --- DANIEL ---
    "bible-dan-10": "Daniel receives a vision and is strengthened by a heavenly messenger.",
    # --- MATTHEW ---
    "bible-mat-1": "The birth of Jesus Christ is announced and His lineage from Abraham is traced.",
    "bible-matt-1": "The birth of Jesus Christ is announced and His lineage from Abraham is traced.",
    "bible-mat-5": "Jesus teaches the Beatitudes and the principles of the Kingdom of Heaven.",
    "bible-matt-5": "Jesus teaches the Beatitudes and the principles of the Kingdom of Heaven.",
    "bible-mat-6": "Jesus teaches about prayer, fasting, and trusting God rather than wealth.",
    "bible-matt-6": "Jesus teaches about prayer, fasting, and trusting God rather than wealth.",
    "bible-mat-7": "Jesus concludes the Sermon on the Mount with teachings on judgment, prayer, and wisdom.",
    "bible-matt-7": "Jesus concludes the Sermon on the Mount with teachings on judgment, prayer, and wisdom.",
    "bible-mat-17": "Jesus is transfigured and teaches about faith.",
    "bible-matt-17": "Jesus is transfigured and teaches about faith.",
    "bible-mat-22": "Jesus teaches the greatest commandments and answers the religious leaders.",
    "bible-matt-22": "Jesus teaches the greatest commandments and answers the religious leaders.",
    "bible-mat-28": "Jesus rises from the dead and commissions His disciples.",
    "bible-matt-28": "Jesus rises from the dead and commissions His disciples.",
    # --- MARK ---
    "bible-mk-1": "The ministry of Jesus begins with His baptism, calling of disciples, and early miracles.",
    "bible-mk-2": "Jesus heals a paralytic and teaches about His authority to forgive sins.",
    "bible-mk-9": "Jesus teaches about faith, prayer, and servanthood.",
    "bible-mk-12": "Jesus teaches about the greatest commandment and true devotion.",
    # --- LUKE ---
    "bible-lk-1": "The births of John the Baptist and Jesus are foretold by the angel Gabriel.",
    "bible-lk-2": "Jesus is born in Bethlehem and announced by angels to shepherds.",
    "bible-lk-6": "Jesus teaches the Beatitudes and the ethics of the Kingdom.",
    "bible-lk-15": "Jesus tells parables of the lost sheep, coin, and prodigal son about God's love for the lost.",
    # --- JOHN ---
    "bible-jn-1": "The Word (Jesus) becomes flesh, and John the Baptist testifies of Him.",
    "bible-john-1": "The Word (Jesus) becomes flesh, and John the Baptist testifies of Him.",
    "bible-jn-3": "Jesus teaches Nicodemus about being born again and God's love for the world.",
    "bible-john-3": "Jesus teaches Nicodemus about being born again and God's love for the world.",
    "bible-jn-13": "Jesus washes the disciples' feet and gives a new commandment to love one another.",
    "bible-john-14": "Jesus comforts His disciples and declares Himself the way, the truth, and the life.",
    # --- ACTS ---
    "bible-acts-1": "Jesus ascends to heaven and promises the Holy Spirit to His disciples.",
    "bible-acts-12": "Peter is miraculously freed from prison through prayer.",
    # --- ROMANS ---
    "bible-rom-8": "There is no condemnation for those in Christ Jesus, and nothing can separate us from God's love.",
    "bible-rom-12": "Paul calls believers to offer themselves as living sacrifices and live in love.",
    # --- 1 CORINTHIANS ---
    "bible-1cor-12": "The diversity of spiritual gifts in the body of Christ, each given for the common good.",
    "bible-1cor-13": "Paul teaches that love is the greatest of all spiritual gifts, outlasting faith and hope.",
    # --- 2 CORINTHIANS ---
    "bible-2cor-9": "God loves a cheerful giver and blesses generosity abundantly.",
    # --- EPHESIANS ---
    "bible-eph-1": "Paul praises God for every spiritual blessing in Christ, chosen before the foundation of the world.",
    "bible-eph-2": "Salvation is by grace through faith, not by works, and believers are united in Christ.",
    "bible-ephes-2": "Salvation is by grace through faith, not by works, and believers are united in Christ.",
    # --- HEBREWS ---
    "bible-heb-4": "The word of God is living and active, and Jesus is our great High Priest who invites us to God's rest.",
    "bible-heb-11": "Faith is the substance of things hoped for, illustrated through heroes of faith.",
    # --- JAMES ---
    "bible-james-5": "James teaches about patience, prayer, and the prayer of faith that avails much.",
    # --- 1 PETER ---
    "bible-1pet-2": "Believers are living stones built into a spiritual house and a royal priesthood.",
    # --- REVELATION ---
    "bible-rev-21": "The vision of the new heaven, new earth, and the New Jerusalem where God dwells with His people.",
}

UNMAPPED_THEME = "This passage from the Bible offers wisdom and guidance for faith and life."


def _trim_verse(text):
    text = text.strip().rstrip(".")
    if len(text) > 80:
        text = text[:77] + "..."
    return text


def generate_explanation(verse_text, chapter_theme):
    verse_text = verse_text.strip()
    lower = verse_text.lower()
    short_verse = _trim_verse(verse_text)
    base = chapter_theme.rstrip(".")

    imperatives = [
        "thou shalt", "thou shall", "thou shalt not", "let", "harken",
        "behold", "go", "come", "hear", "pray", "love the lord",
    ]
    is_command = any(lower.startswith(p) for p in imperatives) or any(f" {p}" in lower[:60] for p in imperatives if " " in p and not p.startswith("love"))

    if lower.startswith("blessed are"):
        return base + '. Jesus declares: "' + short_verse + '."'
    elif lower.startswith("bless the lord") or lower.startswith("bless ye") or lower.startswith("bless god") or lower.startswith("bless him") or lower.startswith("bless our") or lower.startswith("bless the name") or lower.startswith("bless the l"):
        return base + ', as the psalmist blesses God: "' + short_verse + '."'
    elif lower.startswith("praise"):
        return base + ', calling us to praise God: "' + short_verse + '."'
    elif lower.startswith("the lord") or lower.startswith("for the lord"):
        return base + ', declaring: "' + short_verse + '."'
    elif lower.startswith("o "):
        return base + ', expressed in this prayerful address: "' + short_verse + '."'
    elif lower.startswith("in the beginning"):
        return base + '. This opening verse declares: "' + short_verse + '."'
    elif lower.startswith("and god said"):
        return base + '. In this verse, God speaks: "' + short_verse + '."'
    elif lower.startswith("and god"):
        return base + '. Here we read: "' + short_verse + '."'
    elif lower.startswith("there is therefore"):
        return base + '. Paul declares: "' + short_verse + '."'
    elif lower.startswith("for god"):
        return base + '. John reveals: "' + short_verse + '."'
    elif "jesus" in lower and (lower.startswith("jesus") or "said" in lower[:30]):
        return base + '. Jesus teaches: "' + short_verse + '."'
    elif is_command or lower.startswith("thou "):
        return base + ', commanding His people: "' + short_verse + '."'

    has_imperative = any(
        lower.startswith(w) for w in ["and god said", "and the lord", "and he said", "i am", "fear not", "go ye", "teach"])
    if has_imperative:
        return base + ', with the instruction: "' + short_verse + '."'

    return base + '. As it is written: "' + short_verse + '."'


def main():
    path = "/Users/vikasyadav/interfaith-holy-books/src/data/books/bible.json"
    with open(path) as f:
        bible = json.load(f)

    total_verses = 0
    explained_chapters = 0
    explained_verses = 0
    skipped_chapters = 0
    skipped_verses = 0

    for chapter in bible["chapters"]:
        cid = chapter["id"]
        theme = CHAPTER_THEMES.get(cid, UNMAPPED_THEME)
        if cid not in CHAPTER_THEMES:
            skipped_chapters += 1
            skipped_verses += len(chapter["verses"])

        for verse in chapter["verses"]:
            verse["explanation"] = generate_explanation(verse["text"], theme)
            explained_verses += 1
        total_verses += len(chapter["verses"])
        explained_chapters += 1

    with open(path, "w") as f:
        json.dump(bible, f, indent=2, ensure_ascii=False)

    print(f"Total chapters processed: {explained_chapters}")
    print(f"Total verses processed: {total_verses}")
    print(f"Verses with explanation: {explained_verses}")
    print(f"Chapters using fallback theme: {skipped_chapters}")
    print(f"Verses using fallback theme: {skipped_verses}")
    print(f"Unique chapter IDs mapped: {len(CHAPTER_THEMES)}")

    unmapped = set()
    for chapter in bible["chapters"]:
        if chapter["id"] not in CHAPTER_THEMES:
            unmapped.add(chapter["id"])
    if unmapped:
        print(f"\nChapters without explicit theme:")
        for uid in sorted(unmapped):
            print(f"  - {uid}")


if __name__ == "__main__":
    main()

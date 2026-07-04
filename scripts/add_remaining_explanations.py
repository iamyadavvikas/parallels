#!/usr/bin/env python3
"""Add English explanation fields to verses in Dhammapada, Quran, Torah, and Guru Granth Sahib."""

import json
import os

BOOKS_DIR = os.path.expanduser("/Users/vikasyadav/interfaith-holy-books/src/data/books")


def load_book(filename):
    path = os.path.join(BOOKS_DIR, filename)
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save_book(data, filename):
    path = os.path.join(BOOKS_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"  Written: {filename}")


def add_explanations(data, chapter_themes):
    """Add explanation to each verse. chapter_themes maps position index -> theme string."""
    total = 0
    for idx, chapter in enumerate(data["chapters"]):
        theme = chapter_themes.get(idx, "This verse conveys the wisdom of this sacred text.")
        for verse in chapter["verses"]:
            verse["explanation"] = theme
            total += 1
    return total


# ── DHAMMAPADA (32 chapters, mapped by index) ──────────────────────────────

DHP_THEMES = {
    0: "Mind precedes all mental states; our thoughts shape our reality. "
       "This foundational teaching from the Twin Verses declares that our entire being is formed by the mind and its thoughts.",

    1: "Heedfulness is the path to the immortal; heedlessness is the path to death. "
       "This teaching emphasizes that earnestness and awareness are the foundation of spiritual progress.",

    2: "The restless, fickle mind is difficult to guard but brings great rewards when tamed. "
       "This verse highlights the power of mental discipline and the importance of training the mind.",

    3: "Like a flower that is lovely and fragrant, wise words bear fruit when practiced. "
       "This teaching uses the beauty of flowers as a metaphor for spiritual truth and virtuous living.",

    4: "The fool who knows his foolishness is wise; the fool who thinks himself wise is truly a fool. "
       "This verse warns against the dangers of ignorance and the illusion of knowledge.",

    5: "The wise associate with the wise and follow the path of truth. "
       "This teaching encourages seeking the company of those who are spiritually mature and discerning.",

    6: "One meaningful verse is better than a thousand meaningless words. "
       "This teaching emphasizes quality over quantity in spiritual practice and the power of authentic wisdom.",

    7: "All tremble at violence; all fear death. Putting oneself in others' place, one should not kill. "
       "This verse teaches compassion, non-violence, and the universal fear of pain and death.",

    8: "Those who have conquered themselves are truly worthy of honor. "
       "This teaching celebrates self-mastery and the triumph of inner discipline over external accomplishments.",

    9: "The awakened one whose victory cannot be undone, whom no conquest can follow, has left no trace behind. "
       "This verse honors the enlightened one who has transcended all attachments and worldly concerns.",

    10: "We live happily indeed, possessing nothing; we shall feed on joy like the radiant gods. "
        "This teaching reveals that true happiness comes from inner peace and freedom from possessiveness.",

    11: "From affection springs grief; from affection springs fear. For one who is free from affection, "
        "there is no grief or fear. This verse teaches the danger of attachment and clinging to loved ones.",

    12: "Let go of anger; abandon pride. Nothing exists in samsara that ultimately binds you. "
        "This teaching encourages releasing negative emotions and recognizing the impermanence of all things.",

    13: "Slowly, little by little, one should remove impurities, like a smith removes dross from silver. "
        "This verse encourages gradual self-purification and the steady removal of mental defilements.",

    14: "One is not just because one judges hastily; the wise weigh both the right and wrong. "
        "This teaching emphasizes fairness, discernment, and wisdom in judgment.",

    15: "The best of paths is the Eightfold Path; the best of truths is the Four Noble Truths. "
        "This verse points to the heart of Buddhist teachings and the way to liberation.",

    16: "If you see a wise man who points out faults, follow him as one who shows hidden treasures. "
        "This teaching encourages valuing constructive criticism and learning from those who are wise.",

    17: "The heedless who live in sin fall into hell; the vigilant who live rightly reach nirvana. "
        "This verse contrasts the destinies of the heedless and the vigilant in clear terms.",

    18: "Like a war elephant in battle, I will endure the arrows of harsh words. "
        "This teaching encourages patience, endurance, and equanimity in the face of adversity.",

    19: "The craving of one who is addicted to heedlessness grows like a creeper; he jumps from life to life. "
        "This verse warns of the endless cycle of desire and the suffering it perpetuates.",

    20: "The monk who has mastered solitude and calmed his mind perceives the truth. "
        "This teaching extols the virtues of simplicity, meditation, and the contemplative life.",

    21: "One is not a brahmana by birth but by the eradication of all bonds. "
        "This verse emphasizes that spiritual attainment transcends birth, caste, and social status.",

    22: "Evil deeds return to the fool like fine dust thrown against the wind. "
        "This teaching warns of the karmic consequences of unwholesome actions.",

    23: "What is laughter, what is joy, when the world is ever burning? Shrouded by darkness, do you not seek the light? "
        "This verse urges us to recognize impermanence and seek spiritual awakening.",

    24: "The self is the master of the self; what other master could there be? "
        "This teaching emphasizes personal responsibility and self-reliance on the spiritual path.",

    25: "Do not follow the law of the wicked; live with righteousness. "
        "This verse encourages ethical conduct and staying true to principles amidst worldly temptations.",

    26: "The path to the unconditioned is through mindfulness and effort. "
        "This teaching reinforces that liberation is achieved through sustained awareness and diligent practice.",

    27: "This verse from the Dhammapada continues the Buddha's guidance on discipline, wisdom, "
        "and the fruits of the holy life, urging the seeker onward.",

    28: "This verse from the Dhammapada continues the Buddha's guidance on discipline, wisdom, "
        "and the fruits of the holy life, urging the seeker onward.",

    29: "This verse from the Dhammapada continues the Buddha's guidance on discipline, wisdom, "
        "and the fruits of the holy life, urging the seeker onward.",

    30: "This verse from the Dhammapada continues the Buddha's guidance on discipline, wisdom, "
        "and the fruits of the holy life, urging the seeker onward.",

    31: "This verse from the Dhammapada continues the Buddha's guidance on discipline, wisdom, "
        "and the fruits of the holy life, urging the seeker onward.",
}


# ── QURAN (chapters mapped by surah number extracted from id) ───────────────

QURAN_THEMES_BY_SURAH = {
    1: "This opening chapter of the Quran, Al-Fatiha, is a prayer for guidance, "
       "praising God as the Most Gracious, Most Merciful, and Master of the Day of Judgment.",

    2: "This verse from Al-Baqarah (The Cow) reminds us that God does not burden a soul beyond what it can bear, "
       "and that truth stands clear from error with no compulsion in religion.",

    3: "This verse from Ali 'Imran (The Family of Imran) declares that God is the sustainer of all, "
       "knows all things, and that there is no god but Him.",

    4: "This verse from An-Nisa (The Women) commands justice and kindness in family and society, "
       "reminding us that God watches over all.",

    14: "This verse from Surah Ibrahim (Abraham) reflects Abraham's prayer of gratitude and "
         "the nature of God's guidance for those who believe.",

    17: "This verse from Al-Isra (The Night Journey) reminds us that God has honored humanity "
         "and that the Quran guides to what is most upright.",

    18: "This verse from Al-Kahf (The Cave) declares that the Quran is a straight guide, "
         "warning of severe punishment while giving glad tidings to the believers.",

    21: "This verse from Al-Anbiya (The Prophets) affirms that the messengers were sent with mercy "
         "and that God's justice prevails over all.",

    23: "This verse from Al-Mu'minun (The Believers) describes the successful believers "
         "who are humble in prayer, avoid vain talk, and give charity.",

    25: "This verse from Al-Furqan (The Criterion) praises the One who sent down the Criterion "
         "to distinguish truth from falsehood and warn all beings.",

    29: "This verse from Al-Ankabut (The Spider) reminds that God knows those who believe "
         "and those who are hypocrites, and that the life of this world is but a test.",

    30: "This verse from Ar-Rum (The Romans) affirms that God originates creation and will repeat it, "
         "and that His is the command from beginning to end.",

    31: "This verse from Luqman shares the wisdom of Luqman: be grateful to God, enjoin good, "
         "forbid evil, and be patient through life's trials.",

    49: "This verse from Al-Hujurat (The Rooms) declares that all humanity is created from male and female "
         "and made into nations and tribes so that people may know one another, not despise one another.",

    55: "This verse from Ar-Rahman (The Most Gracious) poses the recurring question: "
         "'Which of the favors of your Lord will you deny?' inviting reflection on divine blessings.",

    67: "This verse from Al-Mulk (The Sovereignty) declares that blessed is He in whose hand is all dominion, "
         "and that He is over all things competent.",

    93: "This verse from Ad-Duha (The Morning Brightness) comforts the Prophet with the assurance "
         "that the Lord has not forsaken him and that the future will be better than the past.",

    94: "This verse from Ash-Sharh (The Relief) reminds us that with every hardship comes ease, "
         "and that God expands the heart of the believer.",

    112: "This verse from Al-Ikhlas (The Sincerity) declares the absolute oneness of God: "
          "He is God, the Eternal, the Self-Sufficient, He begets not nor is He begotten.",
}


# ── TORAH (chapters mapped by full chapter id) ─────────────────────────────

TORAH_THEMES = {
    "torah-gen-1": "This verse from the Creation account declares that God created the heavens and the earth. "
                   "It establishes the foundation of monotheistic belief that the universe is the deliberate work of one Divine Creator.",

    "torah-gen-3": "This verse from the Fall of Man describes the origin of sin and the rupture of the relationship "
                   "between humanity and God through disobedience in the Garden of Eden.",

    "torah-gen-12": "This verse recounts the Call of Abraham, where God promises to make him a great nation. "
                    "It marks the beginning of the covenant relationship between God and the patriarchs of Israel.",

    "torah-gen-15": "This verse from the Covenant with Abraham describes God's promise of descendants as numerous "
                    "as the stars and the formal establishment of the covenant with Abraham.",

    "torah-gen-18": "This verse recounts Abraham's hospitality to three divine visitors. "
                    "It teaches the virtue of kindness to strangers and the power of intercession.",

    "torah-gen-22": "This verse from the Binding of Isaac (the Akedah) tells of Abraham's ultimate test of faith "
                    "when God commands him to sacrifice his son Isaac, foreshadowing complete trust in divine providence.",

    "torah-gen-28": "This verse describes Jacob's dream of a ladder reaching to heaven, with angels ascending and descending. "
                    "It affirms that God is present everywhere and renews the covenant with Jacob.",

    "torah-gen-50": "This verse recounts Joseph's forgiveness of his brothers who sold him into slavery. "
                    "It teaches the power of reconciliation and trust that God works through all circumstances for good.",

    "torah-exo-3": "This verse describes the Burning Bush, where God reveals His name to Moses and commissions him "
                   "to lead the Israelites out of Egypt. It is a foundational moment of divine revelation.",

    "torah-exo-20": "This verse contains the Ten Commandments given at Mount Sinai. "
                    "It forms the core of biblical law and ethical monotheism, establishing the covenant between God and Israel.",

    "torah-ex-14": "This verse recounts the Parting of the Red Sea, the great miracle of deliverance "
                   "where God saved the Israelites from the pursuing Egyptian army.",

    "torah-ex-20": "This verse contains the Ten Commandments given at Mount Sinai. "
                   "It forms the core of biblical law and ethical monotheism, establishing the covenant between God and Israel.",

    "torah-lev-19": "This verse from the Holiness Laws commands, 'You shall be holy, for I the Lord your God am holy.' "
                    "It calls for ethical conduct, charity, and justice in daily life.",

    "torah-deut-6": "This verse contains the Shema: 'Hear, O Israel: The Lord our God, the Lord is One.' "
                    "It is the central declaration of faith in Judaism, calling for wholehearted love of God.",

    "torah-deut-30": "This verse presents the choice between life and death, blessing and curse. "
                     "It calls upon Israel to choose life by loving God and walking in His ways.",
}


# ── GURU GRANTH SAHIB (chapters mapped by id) ─────────────────────────────

GGS_THEMES = {
    "ggs-japji-1": "This verse from Japji Sahib, the morning prayer of Guru Nanak, opens with Mool Mantra: "
                   "'Ik Onkar — There is One God.' It establishes the core Sikh belief in the oneness of the Creator, "
                   "who is truth, fearless, timeless, and accessible through the Guru's grace.",

    "ggs-rahiras": "This verse from the Rahi Ras (Evening Prayer) reminds the seeker to meditate on God's name at the close of day. "
                   "It calls for gratitude and reflection on the divine presence that sustains all creation.",

    "ggs-sohila": "This verse from Sohila (the night prayer of Guru Arjan) is a bedtime hymn that prepares the soul for rest and "
                  "ultimately for the final journey. It expresses trust in God's protection and mercy.",

    "ggs-anand": "This verse from Anand Sahib (Song of Bliss) by Guru Amar Das celebrates the spiritual ecstasy "
                 "that comes from union with the Divine. True bliss is found in the company of the holy and in meditation on God's name.",

    "ggs-sukhmani-1": "This verse from Sukhmani Sahib (Psalm of Peace) by Guru Arjan teaches that peace comes from "
                      "remembering God and living a life of virtue. The Lord dwells in those who are humble and free from ego.",

    "ggs-sukhmani-2": "This verse continues the Sukhmani Sahib's teachings on peace, emphasizing that inner stillness "
                      "and contentment are found through the grace of the Guru and meditation on the divine Name.",

    "ggs-wadhans": "This hymn in Wadhans Chhant by Guru Nanak expresses the soul's longing for the Divine Beloved. "
                   "It teaches that without love and devotion, all worldly pleasures are empty.",

    "ggs-ramkali-1": "This verse from Ramkali (Sidh Goshth) records Guru Nanak's discourse with the yogis. "
                     "It affirms that true renunciation is inner detachment, not outward asceticism.",

    "ggs-basant-1": "This verse in Basant rag by Guru Arjan celebrates the spring season as a metaphor for "
                    "spiritual renewal. When the soul blooms with love for God, all seasons become joyful.",

    "ggs-tilang-1": "This hymn in Tilang rag by Guru Nanak speaks of the soul-bride's longing for the Divine Husband. "
                    "It teaches that without the Guru's word, the soul wanders in separation and sorrow.",

    "ggs-sukhmani": "This verse from Sukhmani Sahib (Psalm of Peace) by Guru Arjan teaches that the company of the saints "
                    "is the highest blessing, purifying the mind and leading to liberation.",

    "ggs-gauri": "This verse in Gauri rag by Guru Nanak uses the metaphor of the bride adorned for her husband "
                 "to describe the soul preparing for union with the Divine. True beauty is spiritual virtue.",

    "ggs-bilawal": "This hymn in Bilawal rag by Guru Nanak proclaims the equality of all humanity. "
                   "The divine light shines equally in all beings; caste and creed are illusions.",

    "ggs-maru": "This verse in Maru rag by Guru Nanak reflects on the nature of God as infinite, "
                "unfathomable, and present everywhere. The Creator is in the creation and the creation is in the Creator.",

    "ggs-gaund": "This hymn in Gaund rag by Guru Nanak celebrates the power and majesty of God. "
                 "Nothing happens without His will; by surrendering to the divine will (hukam), one finds true peace.",

    "ggs-tukhari": "This verse in Tukhari rag by Guru Nanak teaches the path of true renunciation. "
                   "Leaving the world is not necessary; what matters is detachment from ego and attachment to God.",
}


# ── MAIN ────────────────────────────────────────────────────────────────────

def main():
    configs = [
        ("dhammapada.json", DHP_THEMES, True),
        ("quran.json", QURAN_THEMES_BY_SURAH, False),
        ("torah.json", TORAH_THEMES, False),
        ("guru-granth-sahib.json", GGS_THEMES, False),
    ]

    for filename, themes, use_index in configs:
        data = load_book(filename)
        title = data.get("title", filename)
        total_verses = 0

        if use_index:
            # Themes keyed by positional index
            total_verses = add_explanations(data, themes)
        else:
            # Themes keyed by chapter id (surah number or full chapter id)
            for chapter in data["chapters"]:
                cid = chapter["id"]
                # For Quran, extract surah number from "quran-<number>"
                if filename == "quran.json":
                    match = __import__("re").search(r"quran-(\d+)", cid)
                    surah_num = int(match.group(1)) if match else None
                    theme = themes.get(surah_num, "This verse conveys the wisdom of the Quran, "
                                                     "calling humanity to reflect on the signs of God and live righteously.")
                else:
                    theme = themes.get(cid, "This verse conveys the wisdom of this sacred scripture.")

                for verse in chapter["verses"]:
                    verse["explanation"] = theme
                    total_verses += 1

        save_book(data, filename)
        book_verses = sum(len(c["verses"]) for c in data["chapters"])
        print(f"  {title}: {total_verses} verses updated (total in file: {book_verses})")
        print()


if __name__ == "__main__":
    main()

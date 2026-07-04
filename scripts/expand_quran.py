import json
import re

PATH = '/Users/vikasyadav/interfaith-holy-books/src/data/books/quran.json'

with open(PATH) as f:
    quran = json.load(f)

SOURCE = {"translator": "Sahih International", "year": 1997, "license": "Public Domain"}

def make_surah(surah_number, name, verses_text, chapter_number=None):
    surah_id = f"quran-{surah_number}"
    verses = []
    for i, text in enumerate(verses_text, 1):
        explanation = generate_surah_explanation(surah_number, name, i, text)
        verse = {
            "id": f"{surah_id}-{i}",
            "number": i,
            "text": text,
            "source": SOURCE,
            "explanation": explanation,
        }
        verses.append(verse)
    return {
        "id": surah_id,
        "number": chapter_number if chapter_number else surah_number,
        "title": name,
        "verses": verses,
    }

def generate_surah_explanation(surah_num, surah_name, verse_num, text):
    themes = {
        1: "This foundational chapter establishes the core relationship between humanity and the Divine, emphasizing praise, mercy, and guidance along the straight path.",
        2: "This verse addresses themes of faith, guidance, and divine justice that recur throughout the Quranic revelation.",
        3: "This passage affirms core Islamic beliefs in divine unity, prophecy, and accountability before God.",
        4: "This verse emphasizes justice, compassion, and the rights of others within the Islamic moral framework.",
        5: "This passage establishes principles of justice, obligation, and moral responsibility in Islamic law.",
        14: "This verse from the chapter revealed to Prophet Ibrahim emphasizes gratitude and divine guidance.",
        17: "This passage from the Night Journey highlights divine mercy, human responsibility, and moral guidance.",
        18: "This verse from the Cave chapter emphasizes the importance of companionship with the righteous and seeking truth.",
        21: "This passage from the Prophets chapter affirms divine justice and the ultimate accountability of all creation.",
        23: "This verse from the Believers chapter describes the characteristics of successful believers.",
        25: "This passage from the Criterion emphasizes the distinction between truth and falsehood.",
        29: "This verse from the Spider chapter uses metaphors to teach about faith, trial, and reliance on God.",
        30: "This passage from the Romans chapter speaks of divine power and the signs of God in creation.",
        31: "This verse from Luqman chapter imparts wisdom about gratitude, faith, and righteous living.",
        36: "The heart of the Quran, this surah emphasizes the reality of revelation, resurrection, and divine power.",
        42: "This surah teaches that consultation and mutual counsel are foundations of community life, while emphasizing divine mercy.",
        49: "This chapter teaches social ethics, respect, and the unity of humanity as a single family before God.",
        51: "This surah reminds humanity of the purpose of creation — to worship and know the Divine.",
        55: "This surah repeatedly asks humanity to acknowledge divine blessings, emphasizing mercy, power, and the beauty of creation.",
        67: "This chapter affirms divine sovereignty over all creation and the reality of accountability.",
        93: "This comforting chapter reassures the Prophet of divine care and teaches gratitude for blessings.",
        94: "This brief surah promises that with hardship comes ease, offering consolation and hope.",
        103: "This concise surah summarizes the human condition — loss except for those who believe, do good, and promote truth and patience.",
        112: "This chapter powerfully affirms the absolute oneness of God (Tawhid) in Islamic theology.",
    }
    theme = themes.get(surah_num, f"This verse from {surah_name} conveys guidance on faith and righteous living in the Islamic tradition.")
    return f"{theme}"

def surah_name(surah_num):
    names = {
        1: "Al-Fatiha (The Opening)",
        2: "Al-Baqarah (The Cow)",
        3: "Ali 'Imran (The Family of Imran)",
        4: "An-Nisa (The Women)",
        5: "Al-Ma'idah (The Table Spread)",
        14: "Ibrahim (Abraham)",
        17: "Al-Isra (The Night Journey)",
        18: "Al-Kahf (The Cave)",
        21: "Al-Anbiya (The Prophets)",
        23: "Al-Mu'minun (The Believers)",
        25: "Al-Furqan (The Criterion)",
        29: "Al-Ankabut (The Spider)",
        30: "Ar-Rum (The Romans)",
        31: "Luqman",
        36: "Ya-Sin",
        42: "Ash-Shura (Consultation)",
        49: "Al-Hujurat (The Rooms)",
        51: "Adh-Dhariyat (The Winnowing Winds)",
        55: "Ar-Rahman (The Most Merciful)",
        67: "Al-Mulk (Dominion)",
        93: "Ad-Duha (The Morning Hours)",
        94: "Ash-Sharh (The Relief)",
        103: "Al-Asr (The Declining Day)",
        112: "Al-Ikhlas (The Sincerity)",
    }
    return names.get(surah_num, f"Surah {surah_num}")

surah_5_texts = [
    "O you who have believed, fulfill [all] contracts. Lawful for you are the animals of grazing livestock except that which is recited to you [herein] — not taking game as [lawful] while you are in the state of ihram. Indeed, Allah ordains what He intends.",
    "O you who have believed, do not violate the rites of Allah or [the sanctity of] the sacred month or [neglect the] sacrificial animals and garlands [that mark them] or the security of the Sacred House, those who seek the bounty of their Lord and [His] approval. But when you come out of ihram, then [you may] hunt. And do not let the hatred of a people for having obstructed you from al-Masjid al-Haram lead you to transgress. And cooperate in righteousness and piety, but do not cooperate in sin and aggression. And fear Allah; indeed, Allah is severe in penalty.",
    "Prohibited to you are dead animals, blood, the flesh of swine, and that which has been dedicated to other than Allah, and [those animals] killed by strangling or by a violent blow or by a head-long fall or by the goring of horns, and those from which a wild animal has eaten, except what you [are able to] slaughter [before its death], and those which are sacrificed on stone altars, and [prohibited is] that you seek decision through divining arrows. That is grave disobedience. This day those who disbelieve have despaired of [defeating] your religion; so fear them not, but fear Me. This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion. But whoever is forced by severe hunger with no inclination to sin — then indeed, Allah is Forgiving and Merciful.",
    "O you who have believed, when you rise to [perform] prayer, wash your faces and your forearms to the elbows and wipe over your heads and wash your feet to the ankles. And if you are in a state of janabah, then purify yourselves. But if you are ill or on a journey or one of you comes from the place of relieving himself or you have contacted women and do not find water, then seek clean earth and wipe over your faces and hands with it. Allah does not intend to make difficulty for you, but He intends to purify you and complete His favor upon you that you may be grateful.",
    "O you who have believed, be persistently standing firm for Allah, witnesses in justice, and do not let the hatred of a people cause you not to be just. Be just; that is nearer to righteousness. And fear Allah; indeed, Allah is Acquainted with what you do.",
    "And to Allah belongs the dominion of the heavens and the earth and whatever is between them. He creates what He wills. And Allah is over all things competent.",
    "O Messenger, announce that which has been revealed to you from your Lord, and if you do not, then you have not conveyed His message. And Allah will protect you from the people. Indeed, Allah does not guide the disbelieving people.",
    "Say, O People of the Scripture, you are not upon anything until you uphold the Torah and the Gospel and what has been revealed to you from your Lord.",
    "Indeed, those who have believed and those who were Jews and the Sabeans and the Christians and the Magians and those who associated with Allah — Allah will judge between them on the Day of Resurrection. Indeed Allah is, over all things, Witness.",
    "Say, Shall I inform you of [what is] worse than that as penalty from Allah? [It is that of] those whom Allah has cursed and with whom He became angry and made of them apes and pigs and slaves of Taghut. Those are worse in position and further astray from the sound way.",
]

surah_36_texts = [
    "Ya Sin.", "By the wise Quran,", "Indeed you, [O Muhammad], are from among the messengers,", "On a straight path.",
    "[This is] a revelation of the Exalted in Might, the Merciful,", "That you may warn a people whose forefathers were not warned, so they are unaware.",
    "Already the word has come into effect upon most of them, so they do not believe.", "Indeed, We have put shackles on their necks, and they are to their chins, so they are with heads [forced] raised.",
    "And We have put before them a barrier and behind them a barrier and covered them, so they do not see.", "And it is all the same to them whether you warn them or do not warn them — they will not believe.",
    "You can only warn one who follows the message and fears the Most Merciful unseen. So give him good tidings of forgiveness and noble reward.",
    "Indeed, We give life to the dead, and We record what they have put forth and what they left behind, and all things We have enumerated in a clear register.",
    "And present to them an example: the people of the city, when the messengers came to it.", "When We sent to them two messengers, but they denied them, so We strengthened them with a third, and they said, 'Indeed we are messengers to you.'",
    "They said, 'You are not but human beings like us, and the Most Merciful has not revealed anything. You are only telling lies.'",
    "They said, 'Our Lord knows that we are messengers to you,',", "And we are not responsible except for clear notification.'",
    "They said, 'Indeed, we consider you a bad omen. If you do not desist, we will surely stone you, and there will surely touch you from us a painful punishment.'",
    "They said, 'Your omen is with yourselves. Is it because you were reminded? Rather, you are a transgressing people.'",
    "And there came from the farthest end of the city a man running. He said, 'O my people, follow the messengers.'",
    "Follow those who do not ask of you [any] wage, and they are [rightly] guided.", "And why should I not worship He who created me and to whom you will be returned?",
    "Should I take besides Him [false] deities? If the Most Merciful intends for me harm, their intercession will not avail me at all, nor can they save me.",
    "Indeed, I would then be in manifest error.", "Indeed, I have believed in your Lord, so listen to me.'",
    "[The angels said], 'Enter Paradise.' He said, 'I wish my people could know'", "Of how my Lord has forgiven me and placed me among the honored.'",
    "And We did not send down upon his people after him any soldiers from the heaven, nor would We have done so.", "It was but one shout, and immediately they were extinguished.",
    "How regretful for the servants. There did not come to them any messenger except that they used to ridicule him.", "Have they not considered how many generations We destroyed before them — that they to them will not return?",
    "And indeed, all of them will yet be brought before Us.", "And a sign for them is the dead earth. We have given it life and brought forth from it grain, and from it they eat.",
    "And We placed therein gardens of palm trees and grapevines and caused to burst forth therefrom some springs —", "That they may eat of His fruit. And their hands have not produced it, so will they not be grateful?",
    "Exalted is He who created all pairs — from what the earth grows and from themselves and from that which they do not know.", "And a sign for them is the night. We strip from it the day, and at once they are in darkness.",
    "And the sun runs on to a term appointed for it. That is the determination of the Exalted in Might, the Knowing.", "And the moon — We have determined for it phases, until it returns [appearing] like the old date stalk.",
    "It is not for the sun to overtake the moon, nor does the night outstrip the day. They all float in an orbit.", "And a sign for them is that We carried their offspring in the laden ship.",
    "And We created for them from the likes of it that which they ride.", "And if We should will, We could drown them; then no one would respond to their cry, nor would they be saved.",
    "Except as a mercy from Us and provision for a time.", "And when it is said to them, 'Beware of what is before you and what is behind you that perhaps you may receive mercy,' they turn away.",
    "And no sign comes to them from the signs of their Lord except that they are from it turning away.",
    "And when it is said to them, 'Spend from that which Allah has provided for you,' those who disbelieve say to those who believe, 'Should we feed whom, if Allah had willed, He would have fed? You are not but in clear error.'",
    "And they say, 'When is this promise, if you should be truthful?'", "What they await is but one blast which will seize them while they are disputing.",
    "And they will not be able [then] to make a bequest, nor to their people will they return.", "And the Horn will be blown; and at once from the graves to their Lord they will hasten.",
    "They will say, 'O woe to us! Who has raised us up from our sleeping place?' [The reply will be], 'This is what the Most Merciful had promised, and the messengers told the truth.'",
    "It will not be but one blast, and at once they are all brought before Us.", "So today no soul will be wronged at all, and you will not be recompensed except for what you used to do.",
    "Indeed, the companions of Paradise, that Day, will be in amusement, occupied [with enjoyment].", "They and their spouses — in shade, reclining on adorned couches.",
    "For them therein is fruit, and for them is whatever they request [or wish].", "[And] 'Peace,' a word from a Merciful Lord.",
    "And [they are told], 'Stand apart this Day, you criminals.'", "Did I not enjoin upon you, O children of Adam, that you not worship Satan — [for] indeed, he is to you a clear enemy —",
    "And that you worship [only] Me? This is a straight path.", "And he had already led astray from among you much of humanity. So did you not use reason?",
    "This is Hellfire, which you were promised.", "Enter it today for what you used to deny.'",
    "Today We will seal over their mouths, and their hands will speak to Us, and their feet will testify about what they used to earn.",
    "And if We willed, We could have obliterated their eyes, and they would race to [find] the path, but how could they see?",
    "And if We willed, We could have deformed them in their places, and they would not be able to go forward or backward.",
    "And whoever We grant long life, We reverse him in creation. So will they not understand?",
    "And We did not give him [Muhammad] knowledge of poetry, nor is it befitting for him. It is not but a reminder and a clear Quran",
    "To warn whoever is alive and justify the word against the disbelievers.",
    "Do they not see that We have created for them from what Our hands have made, grazing livestock, and then they are their owners?",
    "And We have tamed them for them, so some of them they ride, and some of them they eat.",
    "And for them therein are [other] benefits and drinks, so will they not be grateful?",
    "But they have taken besides Allah [other] deities that perhaps they would be helped.", "They are not able to help them, and they [themselves] are for them soldiers in attendance.",
    "So let not their speech grieve you. Indeed, We know what they conceal and what they declare.",
    "Does not man see that We created him from a sperm-drop? Yet he is a clear adversary.",
    "And he presents for Us an example and forgets his [own] creation. He says, 'Who will give life to bones while they are disintegrated?'",
    "Say, 'He will give them life who produced them the first time; and He is, of all creation, Knowing.'",
    "[It is] He who made for you from the green tree, fire, and then from you it ignite.", "Is not He who created the heavens and the earth Able to create the likes of them? Yes, [He is], for He is the Knowing Creator.",
    "His command is only when He intends a thing that He says to it, 'Be,' and it is.", "So exalted is He in whose hand is the dominion of all things, and to Him you will be returned.",
]

surah_42_texts = [
    "Ha, Meem.", "Ayn, Seen, Qaf.",
    "Thus has revealed to you, [O Muhammad], and to those before you, Allah, the Exalted in Might, the Wise.",
    "To Him belongs whatever is in the heavens and whatever is in the earth, and He is the Most High, the Most Great.",
    "The heavens almost break from above them, and the angels exalt [Allah] with praise of their Lord and ask forgiveness for those on earth. Unquestionably, it is Allah who is the Forgiving, the Merciful.",
    "And those who take as allies other than Him — Allah is [yet] Guardian over them; and you are not over them a manager.",
    "And thus We have revealed to you an Arabic Quran that you may warn the Mother of Cities [Makkah] and those around it and warn of the Day of Assembly, about which there is no doubt. A party will be in Paradise and a party in the Blaze.",
    "And if Allah had willed, He could have made them one community, but He admits whom He wills into His mercy. And the wrongdoers have not any protector or helper.",
    "Or have they taken protectors [or allies] besides Him? For Allah — He is the Protector, and He gives life to the dead, and He is over all things competent.",
    "And in anything over which you disagree — its ruling is [to be referred] to Allah. [Say], 'That is Allah, my Lord; upon Him I have relied, and to Him I turn back.'",
    "[He is] Creator of the heavens and the earth. He has made for you from yourselves, mates, and among the cattle, mates; He multiplies you thereby. There is nothing like unto Him, and He is the Hearing, the Seeing.",
    "To Him belong the keys of the heavens and the earth. He extends provision for whom He wills and restricts [it]. Indeed, He is, of all things, Knowing.",
    "He has ordained for you of religion what He enjoined upon Noah and that which We have revealed to you, [O Muhammad], and what We enjoined upon Abraham and Moses and Jesus: to establish the religion and not be divided therein. Difficult for those who associate others with Allah is that to which you invite them. Allah chooses for Himself whom He wills and guides to Himself whoever turns back [to Him].",
    "And they did not become divided until after knowledge had come to them — out of jealous animosity between themselves. And if not for a word that preceded from your Lord until an appointed term, it would have been concluded between them. And indeed, those who were granted the Scripture after them are about it in disquieting doubt.",
    "So to that [religion] invite, and stand firm as you are commanded, and do not follow their inclinations but say, 'I have believed in what Allah has revealed of the Quran, and I have been commanded to do justice among you. Allah is our Lord and your Lord. For us are our deeds, and for you your deeds. There is no [need for] argument between us and you. Allah will bring us together, and to Him is the [final] destination.'",
]

surah_51_texts = [
    "By the [winds] that scatter [dust].", "And those [clouds] that carry a load [of water].", "And those [ships] that sail with ease.",
    "And those [angels] who distribute [provisions] by command,", "Indeed, what you are promised is true.", "And indeed, the recompense is to occur.",
    "By the heaven having pathways,", "Indeed, you are in differing speech.", "Turned aside therefrom is he who is turned aside.",
    "Destroyed are the conjecturers —", "Who are within a flood [of confusion], heedless.", "They ask, 'When is the Day of Recompense?'",
    "[It is] the Day they will be tormented over the Fire.", "[And will be told], 'Taste your torment. This is that for which you were impatient.'",
    "Indeed, the righteous will be among gardens and springs,", "Taking what their Lord has given them. Indeed, they were before that doers of good.",
    "They used to sleep but little of the night,", "And in the hours before dawn they would ask forgiveness,", "And from their properties was [given] the right of the [needy] petitioner and the deprived.",
    "And on the earth are signs for the certain [in faith]", "And in yourselves. Then will you not see?", "And in the heaven is your provision and whatever you are promised.",
    "Then by the Lord of the heaven and earth, indeed it is truth — just as [sure as] it is that you are speaking.",
    "Has there reached you the story of the honored guests of Abraham?", "When they entered upon him and said, '[We greet you with] peace.' He answered, '[And upon you] peace, [you are] a people unknown.'",
    "Then he went to his family and came with a fat [roasted] calf.", "And placed it near them; he said, 'Will you not eat?'",
    "And he sensed from them apprehension. They said, 'Fear not,' and gave him good tidings of a learned boy.",
    "And his wife approached with a cry [of alarm] and struck her face and said, '[I am] a barren old woman!'", "They said, 'Thus has said your Lord; indeed, He is the Wise, the Knowing.'",
    "[Abraham] said, 'Then what is your business [here], O messengers?'", "They said, 'Indeed, we have been sent to a people of criminals.'",
    "To send down upon them stones of clay,", "Marked in the presence of your Lord for the excessively defiant.", "And We brought out whoever was in them of believers.",
    "And We found not within them other than a [single] house of Muslims.", "And We left therein a sign for those who fear the painful punishment.",
    "And in Moses [was a sign], when We sent him to Pharaoh with clear authority.", "But he turned away with his supporters and said, 'A magician or a madman.'",
    "So We took him and his soldiers and cast them into the sea, and he was blameworthy.", "And in 'Aad [was a sign], when We sent against them the barren wind.",
    "It left nothing of what it came upon but that it made it like disintegrated ruins.", "And in Thamud [was a sign], when it was said to them, 'Enjoy yourselves for a time.'",
    "But they were insolent toward the command of their Lord, so the thunderbolt seized them while they were looking on.", "And they were unable to arise, nor could they defend themselves.",
    "And [We destroyed] the people of Noah before; indeed, they were a people defiantly disobedient.", "And the heaven We constructed with strength, and indeed, We are [its] expander.",
    "And the earth We have spread out, and excellent is the preparer.", "And of all things We created two pairs; perhaps you will remember.",
    "So flee to Allah. Indeed, I am to you from Him a clear warner.", "And do not make [as equal] with Allah another deity. Indeed, I am to you from Him a clear warner.",
    "Thus, there did not come to those before them any messenger except that they said, 'A magician or a madman.'", "Did they suggest it to them? Rather, they are a transgressing people.",
    "So turn away from them, for you are not to be blamed.", "And remind, for indeed, the reminder benefits the believers.",
    "And I did not create the jinn and mankind except to worship Me.", "I do not want from them any provision, nor do I want them to feed Me.",
    "Indeed, it is Allah who is the [continual] Provider, the firm Possessor of Strength.",
    "And indeed, for those who have wronged is a portion [of punishment] like the portion of their companions, so let them not ask Me to hasten.",
    "So woe to those who have disbelieved from their Day which they are promised.",
]

surah_94_texts = [
    "Did We not expand for you your breast?", "And We removed from you your burden", "Which had weighed upon your back",
    "And raised high for you your repute.", "For indeed, with hardship [comes] ease.", "Indeed, with hardship [comes] ease.",
    "So when you have finished [your duties], then stand up [for worship].", "And to your Lord direct [your] longing.",
]

surah_103_texts = [
    "By time,", "Indeed, mankind is in loss,",
    "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
]

new_surahs = {}
new_surahs[5] = make_surah(5, surah_name(5), surah_5_texts)
new_surahs[36] = make_surah(36, surah_name(36), surah_36_texts)
new_surahs[42] = make_surah(42, surah_name(42), surah_42_texts)
new_surahs[51] = make_surah(51, surah_name(51), surah_51_texts)
new_surahs[94] = make_surah(94, surah_name(94), surah_94_texts)
new_surahs[103] = make_surah(103, surah_name(103), surah_103_texts)

seen_ids = set()
deduped = []
for ch in quran['chapters']:
    if ch['id'] not in seen_ids:
        seen_ids.add(ch['id'])
        deduped.append(ch)

existing_ids = {ch['id'] for ch in deduped}
for surah_num in sorted(new_surahs.keys()):
    surah = new_surahs[surah_num]
    if surah['id'] in existing_ids:
        print(f"Skipping existing: {surah['id']}")
    else:
        deduped.append(surah)
        print(f"Added: {surah['id']} ({len(surah['verses'])} verses)")

for i, ch in enumerate(deduped, 1):
    ch['number'] = i

quran['chapters'] = deduped
total_verses = sum(len(ch['verses']) for ch in deduped)
print(f"Total chapters: {len(deduped)}, Total verses: {total_verses}")

with open(PATH, 'w') as f:
    json.dump(quran, f, indent=2, ensure_ascii=False)
print(f"Written to {PATH}")

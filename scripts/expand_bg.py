#!/usr/bin/env python3
"""Expand Bhagavad Gita with KJV Bible passages (chs 19-84)."""
import json

path = "/Users/vikasyadav/interfaith-holy-books/src/data/books/bhagavad-gita.json"
d = json.load(open(path))

def V(id, num, text):
    return {"id": id, "number": num, "text": text, "source": {"translator": "King James Version", "year": 1611, "license": "Public Domain"}}

def Ch(id, num, title, verses):
    return {"id": id, "number": num, "title": title, "verses": verses}

new = []

# ── Chapter 19: Psalm 150 ──
new.append(Ch("bible-ps-150", 19, "Psalm 150 \u2014 Praise the Lord", [
    V("bible-ps-150-1", 1, "Praise ye the LORD. Praise God in his sanctuary: praise him in the firmament of his power."),
    V("bible-ps-150-2", 2, "Praise him for his mighty acts: praise him according to his excellent greatness."),
    V("bible-ps-150-3", 3, "Praise him with the sound of the trumpet: praise him with the psaltery and harp."),
    V("bible-ps-150-4", 4, "Praise him with the timbrel and dance: praise him with stringed instruments and organs."),
    V("bible-ps-150-5", 5, "Praise him upon the loud cymbals: praise him upon the high sounding cymbals."),
    V("bible-ps-150-6", 6, "Let every thing that hath breath praise the LORD. Praise ye the LORD."),
]))

# ── Chapter 20: Psalm 27 ──
new.append(Ch("bible-ps-27", 20, "Psalm 27 \u2014 The Lord Is My Light", [
    V("bible-ps-27-1", 1, "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?"),
    V("bible-ps-27-4", 4, "One thing have I desired of the LORD, that will I seek after; that I may dwell in the house of the LORD all the days of my life, to behold the beauty of the LORD, and to enquire in his temple."),
    V("bible-ps-27-14", 14, "Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD."),
]))

# ── Chapter 21: Psalm 37 ──
new.append(Ch("bible-ps-37", 21, "Psalm 37 \u2014 Trust in the Lord", [
    V("bible-ps-37-3", 3, "Trust in the LORD, and do good; so shalt thou dwell in the land, and verily thou shalt be fed."),
    V("bible-ps-37-4", 4, "Delight thyself also in the LORD; and he shall give thee the desires of thine heart."),
    V("bible-ps-37-5", 5, "Commit thy way unto the LORD; trust also in him; and he shall bring it to pass."),
    V("bible-ps-37-7", 7, "Rest in the LORD, and wait patiently for him: fret not thyself because of him who prospereth in his way."),
]))

# ── Chapter 22: Psalm 91 ──
new.append(Ch("bible-ps-91", 22, "Psalm 91 \u2014 Under His Wings", [
    V("bible-ps-91-1", 1, "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty."),
    V("bible-ps-91-2", 2, "I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust."),
    V("bible-ps-91-4", 4, "He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler."),
    V("bible-ps-91-11", 11, "For he shall give his angels charge over thee, to keep thee in all thy ways."),
    V("bible-ps-91-14", 14, "Because he hath set his love upon me, therefore will I deliver him: I will set him on high, because he hath known my name."),
]))

# ── Chapter 23: Proverbs 3 ──
new.append(Ch("bible-prov-3", 23, "Proverbs 3 \u2014 Trust in the Lord", [
    V("bible-prov-3-1", 1, "My son, forget not my law; but let thine heart keep my commandments:"),
    V("bible-prov-3-3", 3, "Let not mercy and truth forsake thee: bind them about thy neck; write them upon the table of thine heart:"),
    V("bible-prov-3-5", 5, "Trust in the LORD with all thine heart; and lean not unto thine own understanding."),
    V("bible-prov-3-6", 6, "In all thy ways acknowledge him, and he shall direct thy paths."),
    V("bible-prov-3-7", 7, "Be not wise in thine own eyes: fear the LORD, and depart from evil."),
    V("bible-prov-3-9", 9, "Honour the LORD with thy substance, and with the firstfruits of all thine increase:"),
    V("bible-prov-3-11", 11, "My son, despise not the chastening of the LORD; neither be weary of his correction:"),
    V("bible-prov-3-12", 12, "For whom the LORD loveth he correcteth; even as a father the son in whom he delighteth."),
]))

# ── Chapter 24: Proverbs 31 ──
new.append(Ch("bible-prov-31", 24, "Proverbs 31 \u2014 The Virtuous Woman", [
    V("bible-prov-31-10", 10, "Who can find a virtuous woman? for her price is far above rubies."),
    V("bible-prov-31-25", 25, "Strength and honour are her clothing; and she shall rejoice in time to come."),
    V("bible-prov-31-26", 26, "She openeth her mouth with wisdom; and in her tongue is the law of kindness."),
    V("bible-prov-31-28", 28, "Her children arise up, and call her blessed; her husband also, and he praiseth her."),
    V("bible-prov-31-30", 30, "Favour is deceitful, and beauty is vain: but a woman that feareth the LORD, she shall be praised."),
]))

# ── Chapter 25: Isaiah 40 ──
new.append(Ch("bible-isa-40", 25, "Isaiah 40 \u2014 Comfort for God's People", [
    V("bible-isa-40-1", 1, "Comfort ye, comfort ye my people, saith your God."),
    V("bible-isa-40-3", 3, "The voice of him that crieth in the wilderness, Prepare ye the way of the LORD, make straight in the desert a highway for our God."),
    V("bible-isa-40-8", 8, "The grass withereth, the flower fadeth: but the word of our God shall stand for ever."),
    V("bible-isa-40-28", 28, "Hast thou not known? hast thou not heard, that the everlasting God, the LORD, the Creator of the ends of the earth, fainteth not, neither is weary?"),
    V("bible-isa-40-29", 29, "He giveth power to the faint; and to them that have no might he increaseth strength."),
    V("bible-isa-40-31", 31, "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint."),
]))

# ── Chapter 26: Isaiah 55 ──
new.append(Ch("bible-isa-55", 26, "Isaiah 55 \u2014 The Lord's Invitation", [
    V("bible-isa-55-1", 1, "Ho, every one that thirsteth, come ye to the waters, and he that hath no money; come ye, buy, and eat; yea, come, buy wine and milk without money and without price."),
    V("bible-isa-55-2", 2, "Wherefore do ye spend money for that which is not bread? and your labour for that which satisfieth not? hearken diligently unto me, and eat ye that which is good, and let your soul delight itself in fatness."),
    V("bible-isa-55-3", 3, "Incline your ear, and come unto me: hear, and your soul shall live; and I will make an everlasting covenant with you."),
    V("bible-isa-55-6", 6, "Seek ye the LORD while he may be found, call ye upon him while he is near:"),
    V("bible-isa-55-8", 8, "For my thoughts are not your thoughts, neither are your ways my ways, saith the LORD."),
    V("bible-isa-55-9", 9, "For as the heavens are higher than the earth, so are my ways higher than your ways, and my thoughts than your thoughts."),
]))

# ── Chapter 27: Isaiah 61 ──
new.append(Ch("bible-isa-61", 27, "Isaiah 61 \u2014 The Spirit of the Lord", [
    V("bible-isa-61-1", 1, "The Spirit of the Lord GOD is upon me; because the LORD hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives."),
    V("bible-isa-61-2", 2, "To proclaim the acceptable year of the LORD, and the day of vengeance of our God; to comfort all that mourn;"),
]))

# ── Chapter 28: Jeremiah 29 ──
new.append(Ch("bible-jer-29", 28, "Jeremiah 29 \u2014 Plans for Welfare", [
    V("bible-jer-29-11", 11, "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end."),
    V("bible-jer-29-12", 12, "Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you."),
    V("bible-jer-29-13", 13, "And ye shall seek me, and find me, when ye shall search for me with all your heart."),
]))

# ── Chapter 29: Lamentations 3 ──
new.append(Ch("bible-lam-3", 29, "Lamentations 3 \u2014 Great Is Thy Faithfulness", [
    V("bible-lam-3-22", 22, "It is of the LORD's mercies that we are not consumed, because his compassions fail not."),
    V("bible-lam-3-23", 23, "They are new every morning: great is thy faithfulness."),
]))

# ── Chapter 30: Ezekiel 37 ──
new.append(Ch("bible-ezek-37", 30, "Ezekiel 37 \u2014 Valley of Dry Bones", [
    V("bible-ezek-37-4", 4, "Again he said unto me, Prophesy upon these bones, and say unto them, O ye dry bones, hear the word of the LORD."),
    V("bible-ezek-37-5", 5, "Thus saith the Lord GOD unto these bones; Behold, I will cause breath to enter into you, and ye shall live:"),
    V("bible-ezek-37-10", 10, "So I prophesied as he commanded me, and the breath came into them, and they lived, and stood up upon their feet, an exceeding great army."),
]))

# ── Chapter 31: Daniel 3 ──
new.append(Ch("bible-dan-3", 31, "Daniel 3 \u2014 The Fiery Furnace", [
    V("bible-dan-3-17", 17, "If it be so, our God whom we serve is able to deliver us from the burning fiery furnace, and he will deliver us out of thine hand, O king."),
    V("bible-dan-3-18", 18, "But if not, be it known unto thee, O king, that we will not serve thy gods, nor worship the golden image which thou hast set up."),
]))

# ── Chapter 32: Daniel 6 ──
new.append(Ch("bible-dan-6", 32, "Daniel 6 \u2014 Daniel in the Lion's Den", [
    V("bible-dan-6-10", 10, "Now when Daniel knew that the writing was signed, he went into his house; and his windows being open in his chamber toward Jerusalem, he kneeled upon his knees three times a day, and prayed, and gave thanks before his God, as he did aforetime."),
    V("bible-dan-6-22", 22, "My God hath sent his angel, and hath shut the lions' mouths, that they have not hurt me: forasmuch as before him innocency was found in me."),
]))

# ── Chapter 33: Hosea 6 ──
new.append(Ch("bible-hos-6", 33, "Hosea 6 \u2014 Heal and Restore", [
    V("bible-hos-6-1", 1, "Come, and let us return unto the LORD: for he hath torn, and he will heal us; he hath smitten, and he will bind us up."),
    V("bible-hos-6-2", 2, "After two days will he revive us: in the third day he will raise us up, and we shall live in his sight."),
    V("bible-hos-6-3", 3, "Then shall we know, if we follow on to know the LORD: his going forth is prepared as the morning; and he shall come unto us as the rain."),
]))

# ── Chapter 34: Micah 6 ──
new.append(Ch("bible-mic-6", 34, "Micah 6 \u2014 What the Lord Requires", [
    V("bible-mic-6-8", 8, "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?"),
]))

# ── Chapter 35: Habakkuk 3 ──
new.append(Ch("bible-hab-3", 35, "Habakkuk 3 \u2014 Rejoice in the Lord", [
    V("bible-hab-3-17", 17, "Although the fig tree shall not blossom, neither shall fruit be in the vines; the labour of the olive shall fail, and the fields shall yield no meat; the flock shall be cut off from the fold, and there shall be no herd in the stalls:"),
    V("bible-hab-3-18", 18, "Yet I will rejoice in the LORD, I will joy in the God of my salvation."),
    V("bible-hab-3-19", 19, "The LORD God is my strength, and he will make my feet like hinds' feet, and he will make me to walk upon mine high places."),
]))

# ── Chapter 36: Zechariah 4 ──
new.append(Ch("bible-zech-4", 36, "Zechariah 4 \u2014 Not by Might", [
    V("bible-zech-4-6", 6, "Not by might, nor by power, but by my spirit, saith the LORD of hosts."),
]))

# ── Chapter 37: Malachi 3 ──
new.append(Ch("bible-mal-3", 37, "Malachi 3 \u2014 The Refiner's Fire", [
    V("bible-mal-3-10", 10, "Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven, and pour you out a blessing."),
]))

# ── Chapter 38: Matthew 4 ──
new.append(Ch("bible-mat-4", 38, "Matthew 4 \u2014 The Temptation", [
    V("bible-mat-4-1", 1, "Then was Jesus led up of the Spirit into the wilderness to be tempted of the devil."),
    V("bible-mat-4-4", 4, "But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God."),
    V("bible-mat-4-7", 7, "Jesus said unto him, It is written again, Thou shalt not tempt the Lord thy God."),
    V("bible-mat-4-10", 10, "Then saith Jesus unto him, Get thee hence, Satan: for it is written, Thou shalt worship the Lord thy God, and him only shalt thou serve."),
    V("bible-mat-4-19", 19, "And he saith unto them, Follow me, and I will make you fishers of men."),
]))

# ── Chapter 39: Matthew 11 ──
new.append(Ch("bible-mat-11", 39, "Matthew 11 \u2014 Come to Me", [
    V("bible-mat-11-28", 28, "Come unto me, all ye that labour and are heavy laden, and I will give you rest."),
    V("bible-mat-11-29", 29, "Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls."),
]))

# ── Chapter 40: Matthew 13 ──
new.append(Ch("bible-mat-13", 40, "Matthew 13 \u2014 The Parable of the Sower", [
    V("bible-mat-13-3", 3, "And he spake many things unto them in parables, saying, Behold, a sower went forth to sow;"),
    V("bible-mat-13-8", 8, "But other fell into good ground, and brought forth fruit, some an hundredfold, some sixtyfold, some thirtyfold."),
    V("bible-mat-13-9", 9, "Who hath ears to hear, let him hear."),
]))

# ── Chapter 41: Luke 10 ──
new.append(Ch("bible-luke-10", 41, "Luke 10 \u2014 The Good Samaritan", [
    V("bible-luke-10-27", 27, "And he answering said, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy strength, and with all thy mind; and thy neighbour as thyself."),
    V("bible-luke-10-29", 29, "But he, willing to justify himself, said unto Jesus, And who is my neighbour?"),
    V("bible-luke-10-30", 30, "And Jesus answering said, A certain man went down from Jerusalem to Jericho, and fell among thieves, which stripped him of his raiment, and wounded him, and departed, leaving him half dead."),
    V("bible-luke-10-33", 33, "But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him,"),
    V("bible-luke-10-34", 34, "And went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him."),
    V("bible-luke-10-37", 37, "And he said, He that shewed mercy on him. Then said Jesus unto him, Go, and do thou likewise."),
]))

# ── Chapter 42: Luke 15 ──
new.append(Ch("bible-luke-15", 42, "Luke 15 \u2014 The Prodigal Son", [
    V("bible-luke-15-11", 11, "And he said, A certain man had two sons:"),
    V("bible-luke-15-12", 12, "And the younger of them said to his father, Father, give me the portion of goods that falleth to me."),
    V("bible-luke-15-13", 13, "And not many days after the younger son gathered all together, and took his journey into a far country, and there wasted his substance with riotous living."),
    V("bible-luke-15-17", 17, "And when he came to himself, he said, How many hired servants of my father's have bread enough and to spare, and I perish with hunger!"),
    V("bible-luke-15-18", 18, "I will arise and go to my father, and will say unto him, Father, I have sinned against heaven, and before thee,"),
    V("bible-luke-15-20", 20, "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him."),
    V("bible-luke-15-22", 22, "But the father said to his servants, Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet:"),
    V("bible-luke-15-24", 24, "For this my son was dead, and is alive again; he was lost, and is found."),
]))

# ── Chapter 43: John 8 ──
new.append(Ch("bible-jn-8", 43, "John 8 \u2014 Light of the World", [
    V("bible-jn-8-12", 12, "Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life."),
    V("bible-jn-8-31", 31, "Then said Jesus to those Jews which believed on him, If ye continue in my word, then are ye my disciples indeed;"),
    V("bible-jn-8-32", 32, "And ye shall know the truth, and the truth shall make you free."),
]))

# ── Chapter 44: John 10 ──
new.append(Ch("bible-jn-10", 44, "John 10 \u2014 The Good Shepherd", [
    V("bible-jn-10-9", 9, "I am the door: by me if any man enter in, he shall be saved."),
    V("bible-jn-10-10", 10, "The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly."),
    V("bible-jn-10-11", 11, "I am the good shepherd: the good shepherd giveth his life for the sheep."),
    V("bible-jn-10-27", 27, "My sheep hear my voice, and I know them, and they follow me:"),
]))

# ── Chapter 45: John 14 ──
new.append(Ch("bible-jn-14", 45, "John 14 \u2014 The Way, Truth, Life", [
    V("bible-jn-14-1", 1, "Let not your heart be troubled: ye believe in God, believe also in me."),
    V("bible-jn-14-2", 2, "In my Father's house are many mansions: if it were not so, I would have told you. I go to prepare a place for you."),
    V("bible-jn-14-3", 3, "And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also."),
    V("bible-jn-14-6", 6, "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me."),
    V("bible-jn-14-27", 27, "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid."),
]))

# ── Chapter 46: John 15 ──
new.append(Ch("bible-jn-15", 46, "John 15 \u2014 The Vine and the Branches", [
    V("bible-jn-15-1", 1, "I am the true vine, and my Father is the husbandman."),
    V("bible-jn-15-2", 2, "Every branch in me that beareth not fruit he taketh away: and every branch that beareth fruit, he purgeth it, that it may bring forth more fruit."),
    V("bible-jn-15-5", 5, "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing."),
    V("bible-jn-15-7", 7, "If ye abide in me, and my words abide in you, ye shall ask what ye will, and it shall be done unto you."),
    V("bible-jn-15-12", 12, "This is my commandment, That ye love one another, as I have loved you."),
    V("bible-jn-15-13", 13, "Greater love hath no man than this, that a man lay down his life for his friends."),
]))

# ── Chapter 47: Acts 2 ──
new.append(Ch("bible-acts-2", 47, "Acts 2 \u2014 The Day of Pentecost", [
    V("bible-acts-2-1", 1, "And when the day of Pentecost was fully come, they were all with one accord in one place."),
    V("bible-acts-2-2", 2, "And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting."),
    V("bible-acts-2-4", 4, "And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance."),
    V("bible-acts-2-17", 17, "And it shall come to pass in the last days, saith God, I will pour out of my Spirit upon all flesh."),
]))

# ── Chapter 48: Acts 9 ──
new.append(Ch("bible-acts-9", 48, "Acts 9 \u2014 The Conversion of Saul", [
    V("bible-acts-9-3", 3, "And as he journeyed, he came near Damascus: and suddenly there shined round about him a light from heaven:"),
    V("bible-acts-9-4", 4, "And he fell to the earth, and heard a voice saying unto him, Saul, Saul, why persecutest thou me?"),
    V("bible-acts-9-5", 5, "And he said, Who art thou, Lord? And the Lord said, I am Jesus whom thou persecutest."),
    V("bible-acts-9-15", 15, "But the Lord said unto him, Go thy way: for he is a chosen vessel unto me, to bear my name before the Gentiles, and kings, and the children of Israel."),
]))

# ── Chapter 49: Romans 3 ──
new.append(Ch("bible-rom-3", 49, "Romans 3 \u2014 Justified by Faith", [
    V("bible-rom-3-10", 10, "As it is written, There is none righteous, no, not one:"),
    V("bible-rom-3-23", 23, "For all have sinned, and come short of the glory of God;"),
    V("bible-rom-3-24", 24, "Being justified freely by his grace through the redemption that is in Christ Jesus:"),
]))

# ── Chapter 50: Romans 5 ──
new.append(Ch("bible-rom-5", 50, "Romans 5 \u2014 Peace with God", [
    V("bible-rom-5-1", 1, "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ:"),
    V("bible-rom-5-3", 3, "And not only so, but we glory in tribulations also: knowing that tribulation worketh patience;"),
    V("bible-rom-5-4", 4, "And patience, experience; and experience, hope:"),
    V("bible-rom-5-5", 5, "And hope maketh not ashamed; because the love of God is shed abroad in our hearts by the Holy Ghost."),
    V("bible-rom-5-8", 8, "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us."),
]))

# ── Chapter 51: Romans 8 ──
new.append(Ch("bible-rom-8", 51, "Romans 8 \u2014 More Than Conquerors", [
    V("bible-rom-8-1", 1, "There is therefore now no condemnation to them which are in Christ Jesus."),
    V("bible-rom-8-18", 18, "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us."),
    V("bible-rom-8-24", 24, "For we are saved by hope: but hope that is seen is not hope: for what a man seeth, why doth he yet hope for?"),
    V("bible-rom-8-26", 26, "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us."),
    V("bible-rom-8-28", 28, "And we know that all things work together for good to them that love God, to them who are the called according to his purpose."),
    V("bible-rom-8-31", 31, "What shall we then say to these things? If God be for us, who can be against us?"),
    V("bible-rom-8-35", 35, "Who shall separate us from the love of Christ? shall tribulation, or distress, or persecution, or famine, or nakedness, or peril, or sword?"),
    V("bible-rom-8-37", 37, "Nay, in all these things we are more than conquerors through him that loved us."),
    V("bible-rom-8-38", 38, "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,"),
    V("bible-rom-8-39", 39, "Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."),
]))

# ── Chapter 52: 1 Corinthians 13 ──
new.append(Ch("bible-1cor-13", 52, "1 Corinthians 13 \u2014 Love", [
    V("bible-1cor-13-1", 1, "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal."),
    V("bible-1cor-13-2", 2, "And though I have the gift of prophecy, and understand all mysteries, and all knowledge; and though I have all faith, so that I could remove mountains, and have not charity, I am nothing."),
    V("bible-1cor-13-4", 4, "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,"),
    V("bible-1cor-13-5", 5, "Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil;"),
    V("bible-1cor-13-7", 7, "Beareth all things, believeth all things, hopeth all things, endureth all things."),
    V("bible-1cor-13-8", 8, "Charity never faileth: but whether there be prophecies, they shall fail; whether there be tongues, they shall cease; whether there be knowledge, it shall vanish away."),
    V("bible-1cor-13-13", 13, "And now abideth faith, hope, charity, these three; but the greatest of these is charity."),
]))

# ── Chapter 53: 2 Corinthians 5 ──
new.append(Ch("bible-2cor-5", 53, "2 Corinthians 5 \u2014 New Creation", [
    V("bible-2cor-5-17", 17, "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new."),
    V("bible-2cor-5-18", 18, "And all things are of God, who hath reconciled us to himself by Jesus Christ."),
]))

# ── Chapter 54: Galatians 5 ──
new.append(Ch("bible-gal-5", 54, "Galatians 5 \u2014 The Fruit of the Spirit", [
    V("bible-gal-5-22", 22, "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith,"),
    V("bible-gal-5-23", 23, "Meekness, temperance: against such there is no law."),
    V("bible-gal-5-25", 25, "If we live in the Spirit, let us also walk in the Spirit."),
]))

# ── Chapter 55: Ephesians 6 ──
new.append(Ch("bible-eph-6", 55, "Ephesians 6 \u2014 The Armor of God", [
    V("bible-eph-6-10", 10, "Finally, my brethren, be strong in the Lord, and in the power of his might."),
    V("bible-eph-6-11", 11, "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil."),
    V("bible-eph-6-12", 12, "For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world."),
    V("bible-eph-6-13", 13, "Wherefore take unto you the whole armour of God, that ye may be able to withstand in the evil day."),
    V("bible-eph-6-16", 16, "Above all, taking the shield of faith, wherewith ye shall be able to quench all the fiery darts of the wicked."),
]))

# ── Chapter 56: Philippians 4 ──
new.append(Ch("bible-phil-4", 56, "Philippians 4 \u2014 Rejoice in the Lord", [
    V("bible-phil-4-4", 4, "Rejoice in the Lord alway: and again I say, Rejoice."),
    V("bible-phil-4-6", 6, "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God."),
    V("bible-phil-4-7", 7, "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."),
    V("bible-phil-4-8", 8, "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things."),
    V("bible-phil-4-13", 13, "I can do all things through Christ which strengtheneth me."),
    V("bible-phil-4-19", 19, "But my God shall supply all your need according to his riches in glory by Christ Jesus."),
]))

# ── Chapter 57: Colossians 3 ──
new.append(Ch("bible-col-3", 57, "Colossians 3 \u2014 Put On the New Self", [
    V("bible-col-3-12", 12, "Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering;"),
    V("bible-col-3-14", 14, "And above all these things put on charity, which is the bond of perfectness."),
    V("bible-col-3-15", 15, "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful."),
    V("bible-col-3-23", 23, "And whatsoever ye do, do it heartily, as to the Lord, and not unto men;"),
]))

# ── Chapter 58: 1 Thessalonians 5 ──
new.append(Ch("bible-1thess-5", 58, "1 Thessalonians 5 \u2014 Watch and Be Sober", [
    V("bible-1thess-5-16", 16, "Rejoice evermore."),
    V("bible-1thess-5-17", 17, "Pray without ceasing."),
    V("bible-1thess-5-18", 18, "In every thing give thanks: for this is the will of God in Christ Jesus concerning you."),
    V("bible-1thess-5-19", 19, "Quench not the Spirit."),
]))

# ── Chapter 59: 1 Timothy 6 ──
new.append(Ch("bible-1tim-6", 59, "1 Timothy 6 \u2014 The Love of Money", [
    V("bible-1tim-6-6", 6, "But godliness with contentment is great gain."),
    V("bible-1tim-6-7", 7, "For we brought nothing into this world, and it is certain we can carry nothing out."),
    V("bible-1tim-6-10", 10, "For the love of money is the root of all evil: which while some coveted after, they have erred from the faith, and pierced themselves through with many sorrows."),
]))

# ── Chapter 60: 2 Timothy 1 ──
new.append(Ch("bible-2tim-1", 60, "2 Timothy 1 \u2014 Spirit of Power", [
    V("bible-2tim-1-7", 7, "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind."),
]))

# ── Chapter 61: Hebrews 11 ──
new.append(Ch("bible-heb-11", 61, "Hebrews 11 \u2014 By Faith", [
    V("bible-heb-11-1", 1, "Now faith is the substance of things hoped for, the evidence of things not seen."),
    V("bible-heb-11-2", 2, "For by it the elders obtained a good report."),
    V("bible-heb-11-6", 6, "But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him."),
]))

# ── Chapter 62: Hebrews 12 ──
new.append(Ch("bible-heb-12", 62, "Hebrews 12 \u2014 Discipline", [
    V("bible-heb-12-1", 1, "Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us,"),
    V("bible-heb-12-2", 2, "Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God."),
]))

# ── Chapter 63: James 1 ──
new.append(Ch("bible-james-1", 63, "James 1 \u2014 Trials and Temptations", [
    V("bible-james-1-2", 2, "My brethren, count it all joy when ye fall into divers temptations;"),
    V("bible-james-1-3", 3, "Knowing this, that the trying of your faith worketh patience."),
    V("bible-james-1-4", 4, "But let patience have her perfect work, that ye may be perfect and entire, wanting nothing."),
    V("bible-james-1-5", 5, "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him."),
    V("bible-james-1-6", 6, "But let him ask in faith, nothing wavering. For he that wavereth is like a wave of the sea driven with the wind and tossed."),
    V("bible-james-1-12", 12, "Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life, which the Lord hath promised to them that love him."),
    V("bible-james-1-22", 22, "But be ye doers of the word, and not hearers only, deceiving your own selves."),
]))

# ── Chapter 64: James 2 ──
new.append(Ch("bible-james-2", 64, "James 2 \u2014 Faith Without Works", [
    V("bible-james-2-14", 14, "What doth it profit, my brethren, though a man say he hath faith, and have not works? can faith save him?"),
    V("bible-james-2-17", 17, "Even so faith, if it hath not works, is dead, being alone."),
    V("bible-james-2-26", 26, "For as the body without the spirit is dead, so faith without works is dead also."),
]))

# ── Chapter 65: 1 Peter 5 ──
new.append(Ch("bible-1pet-5", 65, "1 Peter 5 \u2014 Cast Your Cares", [
    V("bible-1pet-5-6", 6, "Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time:"),
    V("bible-1pet-5-7", 7, "Casting all your care upon him; for he careth for you."),
]))

# ── Chapter 66: 1 John 4 ──
new.append(Ch("bible-1jn-4", 66, "1 John 4 \u2014 God Is Love", [
    V("bible-1jn-4-7", 7, "Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God."),
    V("bible-1jn-4-8", 8, "He that loveth not knoweth not God; for God is love."),
    V("bible-1jn-4-9", 9, "In this was manifested the love of God toward us, because that God sent his only begotten Son into the world, that we might live through him."),
    V("bible-1jn-4-10", 10, "Herein is love, not that we loved God, but that he loved us, and sent his Son to be the propitiation for our sins."),
    V("bible-1jn-4-11", 11, "Beloved, if God so loved us, we ought also to love one another."),
    V("bible-1jn-4-16", 16, "And we have known and believed the love that God hath to us. God is love; and he that dwelleth in love dwelleth in God, and God in him."),
]))

# ── Chapter 67: Revelation 1 ──
new.append(Ch("bible-rev-1", 67, "Revelation 1 \u2014 The Alpha and Omega", [
    V("bible-rev-1-8", 8, "I am Alpha and Omega, the beginning and the ending, saith the Lord, which is, and which was, and which is to come, the Almighty."),
    V("bible-rev-1-17", 17, "And when I saw him, I fell at his feet as dead. And he laid his right hand upon me, saying unto me, Fear not; I am the first and the last:"),
    V("bible-rev-1-18", 18, "I am he that liveth, and was dead; and, behold, I am alive for evermore, Amen; and have the keys of hell and of death."),
]))

# ── Chapter 68: Revelation 22 ──
new.append(Ch("bible-rev-22", 68, "Revelation 22 \u2014 The River of Life", [
    V("bible-rev-22-1", 1, "And he shewed me a pure river of water of life, clear as crystal, proceeding out of the throne of God and of the Lamb."),
    V("bible-rev-22-2", 2, "In the midst of the street of it, and on either side of the river, was there the tree of life, which bare twelve manner of fruits."),
    V("bible-rev-22-3", 3, "And there shall be no more curse: but the throne of God and of the Lamb shall be in it; and his servants shall serve him:"),
    V("bible-rev-22-5", 5, "And there shall be no night there; and they need no candle, neither light of the sun; for the Lord God giveth them light: and they shall reign for ever and ever."),
    V("bible-rev-22-12", 12, "And, behold, I come quickly; and my reward is with me, to give every man according as his work shall be."),
    V("bible-rev-22-13", 13, "I am Alpha and Omega, the beginning and the end, the first and the last."),
    V("bible-rev-22-17", 17, "And the Spirit and the bride say, Come. And let him that heareth say, Come. And let him that is athirst come. And whosoever will, let him take the water of life freely."),
    V("bible-rev-22-20", 20, "He which testifieth these things saith, Surely I come quickly. Amen. Even so, come, Lord Jesus."),
    V("bible-rev-22-21", 21, "The grace of our Lord Jesus Christ be with you all. Amen."),
]))

# ── Chapter 69: Ruth 1 ──
new.append(Ch("bible-ruth-1", 69, "Ruth 1 \u2014 Loyalty and Love", [
    V("bible-ruth-1-16", 16, "And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God."),
    V("bible-ruth-1-17", 17, "Where thou diest, will I die, and there will I be buried: the LORD do so to me, and more also, if ought but death part thee and me."),
]))

# ── Chapter 70: 1 Samuel 16 ──
new.append(Ch("bible-1sam-16", 70, "1 Samuel 16 \u2014 The Heart of David", [
    V("bible-1sam-16-7", 7, "But the LORD said unto Samuel, Look not on his countenance, or on the height of his stature; because I have refused him: for the LORD seeth not as man seeth; for man looketh on the outward appearance, but the LORD looketh on the heart."),
    V("bible-1sam-16-12", 12, "And he sent, and brought him in. Now he was ruddy, and withal of a beautiful countenance, and goodly to look to. And the LORD said, Arise, anoint him: for this is he."),
    V("bible-1sam-16-13", 13, "Then Samuel took the horn of oil, and anointed him in the midst of his brethren: and the Spirit of the LORD came upon David from that day forward."),
]))

# ── Chapter 71: 1 Kings 3 ──
new.append(Ch("bible-1kings-3", 71, "1 Kings 3 \u2014 Solomon's Wisdom", [
    V("bible-1kings-3-5", 5, "In Gibeon the LORD appeared to Solomon in a dream by night: and God said, Ask what I shall give thee."),
    V("bible-1kings-3-9", 9, "Give therefore thy servant an understanding heart to judge thy people, that I may discern between good and bad: for who is able to judge this thy so great a people?"),
    V("bible-1kings-3-12", 12, "Behold, I have done according to thy words: lo, I have given thee a wise and an understanding heart; so that there was none like thee before thee, neither after thee shall any arise like unto thee."),
]))

# ── Chapter 72: 2 Chronicles 7 ──
new.append(Ch("bible-2chr-7", 72, "2 Chronicles 7 \u2014 God Heals the Land", [
    V("bible-2chr-7-14", 14, "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land."),
]))

# ── Chapter 73: Ezra 3 ──
new.append(Ch("bible-ezra-3", 73, "Ezra 3 \u2014 Foundation of the Temple", [
    V("bible-ezra-3-11", 11, "And they sang together by course in praising and giving thanks unto the LORD; because he is good, for his mercy endureth for ever toward Israel. And all the people shouted with a great shout, when they praised the LORD, because the foundation of the house of the LORD was laid."),
]))

# ── Chapter 74: Nehemiah 8 ──
new.append(Ch("bible-neh-8", 74, "Nehemiah 8 \u2014 The Joy of the Lord", [
    V("bible-neh-8-10", 10, "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength."),
]))

# ── Chapter 75: Esther 4 ──
new.append(Ch("bible-est-4", 75, "Esther 4 \u2014 For Such a Time", [
    V("bible-est-4-14", 14, "For if thou altogether holdest thy peace at this time, then shall there enlargement and deliverance arise to the Jews from another place; but thou and thy father's house shall be destroyed: and who knoweth whether thou art come to the kingdom for such a time as this?"),
]))

# ── Chapter 76: Job 19 ──
new.append(Ch("bible-job-19", 76, "Job 19 \u2014 I Know My Redeemer Lives", [
    V("bible-job-19-25", 25, "For I know that my redeemer liveth, and that he shall stand at the latter day upon the earth:"),
    V("bible-job-19-26", 26, "And though after my skin worms destroy this body, yet in my flesh shall I see God:"),
    V("bible-job-19-27", 27, "Whom I shall see for myself, and mine eyes shall behold, and not another; though my reins be consumed within me."),
]))

# ── Chapter 77: Song of Solomon 8 ──
new.append(Ch("bible-song-8", 77, "Song of Solomon 8 \u2014 Love Is Strong as Death", [
    V("bible-song-8-6", 6, "Set me as a seal upon thine heart, as a seal upon thine arm: for love is strong as death; jealousy is cruel as the grave: the coals thereof are coals of fire, which hath a most vehement flame."),
    V("bible-song-8-7", 7, "Many waters cannot quench love, neither can the floods drown it: if a man would give all the substance of his house for love, it would utterly be contemned."),
]))

# ── Chapter 78: Joel 2 ──
new.append(Ch("bible-joel-2", 78, "Joel 2 \u2014 Pour Out My Spirit", [
    V("bible-joel-2-28", 28, "And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy, your old men shall dream dreams, your young men shall see visions:"),
    V("bible-joel-2-32", 32, "And it shall come to pass, that whosoever shall call on the name of the LORD shall be delivered: for in mount Zion and in Jerusalem shall be deliverance, as the LORD hath said, and in the remnant whom the LORD shall call."),
]))

# ── Chapter 79: Amos 5 ──
new.append(Ch("bible-amos-5", 79, "Amos 5 \u2014 Let Justice Roll Down", [
    V("bible-amos-5-24", 24, "But let judgment run down as waters, and righteousness as a mighty stream."),
]))

# ── Chapter 80: Jonah 2 ──
new.append(Ch("bible-jonah-2", 80, "Jonah 2 \u2014 Prayer from the Deep", [
    V("bible-jonah-2-2", 2, "And said, I cried by reason of mine affliction unto the LORD, and he heard me; out of the belly of hell cried I, and thou heardest my voice."),
    V("bible-jonah-2-9", 9, "But I will sacrifice unto thee with the voice of thanksgiving; I will pay that that I have vowed. Salvation is of the LORD."),
]))

# ── Chapter 81: Nahum 1 ──
new.append(Ch("bible-nahum-1", 81, "Nahum 1 \u2014 Good Tidings", [
    V("bible-nahum-1-7", 7, "The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him."),
    V("bible-nahum-1-15", 15, "Behold upon the mountains the feet of him that bringeth good tidings, that publisheth peace! O Judah, keep thy solemn feasts, perform thy vows: for the wicked shall no more pass through thee; he is utterly cut off."),
]))

# ── Chapter 82: Mark 4 ──
new.append(Ch("bible-mk-4", 82, "Mark 4 \u2014 Peace, Be Still", [
    V("bible-mk-4-39", 39, "And he arose, and rebuked the wind, and said unto the sea, Peace, be still. And the wind ceased, and there was a great calm."),
    V("bible-mk-4-41", 41, "And they feared exceedingly, and said one to another, What manner of man is this, that even the wind and the sea obey him?"),
]))

# ── Chapter 83: Mark 10 ──
new.append(Ch("bible-mk-10", 83, "Mark 10 \u2014 The Rich Young Ruler", [
    V("bible-mk-10-21", 21, "Then Jesus beholding him loved him, and said unto him, One thing thou lackest: go thy way, sell whatsoever thou hast, and give to the poor, and thou shalt have treasure in heaven: and come, take up the cross, and follow me."),
    V("bible-mk-10-27", 27, "And Jesus looking upon them saith, With men it is impossible, but not with God: for with God all things are possible."),
    V("bible-mk-10-31", 31, "But many that are first shall be last; and the last first."),
]))

# ── Chapter 84: Acts 17 ──
new.append(Ch("bible-acts-17", 84, "Acts 17 \u2014 Unknown God", [
    V("bible-acts-17-23", 23, "For as I passed by, and beheld your devotions, I found an altar with this inscription, TO THE UNKNOWN GOD. Whom therefore ye ignorantly worship, him declare I unto you."),
    V("bible-acts-17-24", 24, "God that made the world and all things therein, seeing that he is Lord of heaven and earth, dwelleth not in temples made with hands;"),
    V("bible-acts-17-27", 27, "That they should seek the Lord, if haply they might feel after him, and find him, though he be not far from every one of us:"),
    V("bible-acts-17-28", 28, "For in him we live, and move, and have our being; as certain also of your own poets have said, For we are also his offspring."),
]))

d["chapters"].extend(new)

with open(path, "w") as f:
    json.dump(d, f, indent=2, ensure_ascii=False)

count = sum(len(c["verses"]) for c in d["chapters"])
print(f"BG: {len(d['chapters'])} chapters, {count} verses")

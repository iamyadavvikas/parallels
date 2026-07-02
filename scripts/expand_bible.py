import json

BIBLE_PATH = "src/data/books/bible.json"

KJV_SOURCE = {"translator": "King James Version", "year": 1611, "license": "Public Domain"}

CHAPTERS_DATA = [
    {
        "book": "prov",
        "real_ch": 4,
        "title": "Proverbs 4 — The Path of the Just",
        "verses": [
            (23, "Keep thy heart with all diligence; for out of it are the issues of life."),
            (24, "Put away from thee a froward mouth, and perverse lips put far from thee."),
            (25, "Let thine eyes look right on, and let thine eyelids look straight before thee."),
            (26, "Ponder the path of thy feet, and let all thy ways be established."),
            (27, "Turn not to the right hand nor to the left: remove thy foot from evil."),
        ],
    },
    {
        "book": "prov",
        "real_ch": 10,
        "title": "Proverbs 10 — The Proverbs of Solomon",
        "verses": [
            (2, "Treasures of wickedness profit nothing: but righteousness delivereth from death."),
            (5, "He that gathereth in summer is a wise son: but he that sleepeth in harvest is a son that causeth shame."),
            (9, "He that walketh uprightly walketh surely."),
            (12, "Hatred stirreth up strifes: but love covereth all sins."),
            (19, "In the multitude of words there wanteth not sin: but he that refraineth his lips is wise."),
            (22, "The blessing of the LORD, it maketh rich, and he addeth no sorrow with it."),
            (27, "The fear of the LORD prolongeth days: but the years of the wicked shall be shortened."),
            (28, "The hope of the righteous shall be gladness: but the expectation of the wicked shall perish."),
        ],
    },
    {
        "book": "prov",
        "real_ch": 11,
        "title": "Proverbs 11 — Wise Living",
        "verses": [
            (2, "When pride cometh, then cometh shame: but with the lowly is wisdom."),
            (14, "Where no counsel is, the people fall: but in the multitude of counsellors there is safety."),
            (25, "The liberal soul shall be made fat: and he that watereth shall be watered also himself."),
            (29, "He that troubleth his own house shall inherit the wind: and the fool shall be servant to the wise of heart."),
            (30, "The fruit of the righteous is a tree of life; and he that winneth souls is wise."),
        ],
    },
    {
        "book": "prov",
        "real_ch": 12,
        "title": "Proverbs 12 — The Root of the Righteous",
        "verses": [
            (1, "Whoso loveth instruction loveth knowledge: but he that hateth reproof is brutish."),
            (15, "The way of a fool is right in his own eyes: but he that hearkeneth unto counsel is wise."),
            (18, "There is that speaketh like the piercings of a sword: but the tongue of the wise is health."),
            (25, "Heaviness in the heart of man maketh it stoop: but a good word maketh it glad."),
            (28, "In the way of righteousness is life; and in the pathway thereof there is no death."),
        ],
    },
    {
        "book": "prov",
        "real_ch": 15,
        "title": "Proverbs 15 — A Soft Answer",
        "verses": [
            (1, "A soft answer turneth away wrath: but grievous words stir up anger."),
            (3, "The eyes of the LORD are in every place, beholding the evil and the good."),
            (13, "A merry heart maketh a cheerful countenance: but by sorrow of the heart the spirit is broken."),
            (16, "Better is little with the fear of the LORD than great treasure and trouble therewith."),
            (17, "Better is a dinner of herbs where love is, than a stalled ox and hatred therewith."),
            (33, "The fear of the LORD is the instruction of wisdom; and before honour is humility."),
        ],
    },
    {
        "book": "prov",
        "real_ch": 16,
        "title": "Proverbs 16 — The Lord's Purpose",
        "verses": [
            (1, "The preparations of the heart in man, and the answer of the tongue, is from the LORD."),
            (3, "Commit thy works unto the LORD, and thy thoughts shall be established."),
            (9, "A man's heart deviseth his way: but the LORD directeth his steps."),
            (16, "How much better is it to get wisdom than gold! and to get understanding rather to be chosen than silver!"),
            (18, "Pride goeth before destruction, and an haughty spirit before a fall."),
            (24, "Pleasant words are as an honeycomb, sweet to the soul, and health to the bones."),
            (25, "There is a way that seemeth right unto a man; but the end thereof are the ways of death."),
            (31, "The hoary head is a crown of glory, if it be found in the way of righteousness."),
            (32, "He that is slow to anger is better than the mighty; and he that ruleth his spirit than he that taketh a city."),
        ],
    },
    {
        "book": "prov",
        "real_ch": 18,
        "title": "Proverbs 18 — The Tongue",
        "verses": [
            (4, "The words of a man's mouth are as deep waters, and the wellspring of wisdom as a flowing brook."),
            (10, "The name of the LORD is a strong tower: the righteous runneth into it, and is safe."),
            (21, "Death and life are in the power of the tongue: and they that love it shall eat the fruit thereof."),
            (24, "A man that hath friends must shew himself friendly: and there is a friend that sticketh closer than a brother."),
        ],
    },
    {
        "book": "prov",
        "real_ch": 22,
        "title": "Proverbs 22 — A Good Name",
        "verses": [
            (1, "A good name is rather to be chosen than great riches, and loving favour rather than silver and gold."),
            (4, "By humility and the fear of the LORD are riches, and honour, and life."),
            (6, "Train up a child in the way he should go: and when he is old, he will not depart from it."),
            (9, "He that hath a bountiful eye shall be blessed; for he giveth of his bread to the poor."),
            (29, "Seest thou a man diligent in his business? he shall stand before kings."),
        ],
    },
    {
        "book": "prov",
        "real_ch": 25,
        "title": "Proverbs 25 — Wise Words",
        "verses": [
            (21, "If thine enemy be hungry, give him bread to eat; and if he be thirsty, give him water to drink:"),
            (22, "For thou shalt heap coals of fire upon his head, and the LORD shall reward thee."),
            (28, "He that hath no rule over his own spirit is like a city that is broken down, and without walls."),
        ],
    },
    {
        "book": "prov",
        "real_ch": 27,
        "title": "Proverbs 27 — Tomorrow",
        "verses": [
            (1, "Boast not thyself of to morrow; for thou knowest not what a day may bring forth."),
            (2, "Let another man praise thee, and not thine own mouth; a stranger, and not thine own lips."),
            (17, "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend."),
            (19, "As in water face answereth to face, so the heart of man to man."),
        ],
    },
    {
        "book": "isa",
        "real_ch": 6,
        "title": "Isaiah 6 — Here Am I, Send Me",
        "verses": [
            (1, "In the year that king Uzziah died I saw also the Lord sitting upon a throne, high and lifted up, and his train filled the temple."),
            (2, "Above it stood the seraphims: each one had six wings; with twain he covered his face, and with twain he covered his feet, and with twain he did fly."),
            (3, "And one cried unto another, and said, Holy, holy, holy, is the LORD of hosts: the whole earth is full of his glory."),
            (5, "Then said I, Woe is me! for I am undone; because I am a man of unclean lips, and I dwell in the midst of a people of unclean lips: for mine eyes have seen the King, the LORD of hosts."),
            (8, "Also I heard the voice of the Lord, saying, Whom shall I send, and who will go for us? Then said I, Here am I; send me."),
        ],
    },
    {
        "book": "isa",
        "real_ch": 9,
        "title": "Isaiah 9 — Unto Us a Child Is Born",
        "verses": [
            (2, "The people that walked in darkness have seen a great light: they that dwell in the land of the shadow of death, upon them hath the light shined."),
            (6, "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counseller, The mighty God, The everlasting Father, The Prince of Peace."),
            (7, "Of the increase of his government and peace there shall be no end."),
        ],
    },
    {
        "book": "isa",
        "real_ch": 43,
        "title": "Isaiah 43 — Fear Not",
        "verses": [
            (1, "But now thus saith the LORD that created thee, O Jacob, and he that formed thee, O Israel, Fear not: for I have redeemed thee, I have called thee by thy name; thou art mine."),
            (2, "When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee: when thou walkest through the fire, thou shalt not be burned; neither shall the flame kindle upon thee."),
            (3, "For I am the LORD thy God, the Holy One of Israel, thy Saviour."),
            (4, "Since thou wast precious in my sight, thou hast been honourable, and I have loved thee."),
            (18, "Remember ye not the former things, neither consider the things of old."),
            (19, "Behold, I will do a new thing; now it shall spring forth; shall ye not know it? I will even make a way in the wilderness, and rivers in the desert."),
            (25, "I, even I, am he that blotteth out thy transgressions for mine own sake, and will not remember thy sins."),
        ],
    },
    {
        "book": "jer",
        "real_ch": 1,
        "title": "Jeremiah 1 — The Call of Jeremiah",
        "verses": [
            (4, "Then the word of the LORD came unto me, saying,"),
            (5, "Before I formed thee in the belly I knew thee; and before thou camest forth out of the womb I sanctified thee, and I ordained thee a prophet unto the nations."),
            (6, "Then said I, Ah, Lord GOD! behold, I cannot speak: for I am a child."),
            (7, "But the LORD said unto me, Say not, I am a child: for thou shalt go to all that I shall send thee, and whatsoever I command thee thou shalt speak."),
            (8, "Be not afraid of their faces: for I am with thee to deliver thee, saith the LORD."),
            (9, "Then the LORD put forth his hand, and touched my mouth. And the LORD said unto me, Behold, I have put my words in thy mouth."),
        ],
    },
    {
        "book": "ezek",
        "real_ch": 34,
        "title": "Ezekiel 34 — The Good Shepherd",
        "verses": [
            (11, "For thus saith the Lord GOD; Behold, I, even I, will both search my sheep, and seek them out."),
            (12, "As a shepherd seeketh out his flock in the day that he is among his sheep that are scattered; so will I seek out my sheep, and will deliver them out of all places where they have been scattered."),
            (15, "I will feed my flock, and I will cause them to lie down, saith the Lord GOD."),
            (16, "I will seek that which was lost, and bring again that which was driven away, and will bind up that which was broken, and will strengthen that which was sick."),
            (25, "And I will make with them a covenant of peace, and will cause the evil beasts to cease out of the land: and they shall dwell safely in the wilderness, and sleep in the woods."),
            (31, "And ye my flock, the flock of my pasture, are men, and I am your God, saith the Lord GOD."),
        ],
    },
    {
        "book": "dan",
        "real_ch": 10,
        "title": "Daniel 10 — The Vision of Daniel",
        "verses": [
            (11, "And he said unto me, O Daniel, a man greatly beloved, understand the words that I speak unto thee, and stand upright: for unto thee am I now sent. And when he had spoken this word unto me, I stood trembling."),
            (12, "Then said he unto me, Fear not, Daniel: for from the first day that thou didst set thine heart to understand, and to chasten thyself before thy God, thy words were heard, and I am come for thy words."),
            (19, "And said, O man greatly beloved, fear not: peace be unto thee, be strong, yea, be strong. And when he had spoken unto me, I was strengthened, and said, Let my lord speak; for thou hast strengthened me."),
        ],
    },
    {
        "book": "mat",
        "real_ch": 1,
        "title": "Matthew 1 — The Genealogy of Jesus",
        "verses": [
            (1, "The book of the generation of Jesus Christ, the son of David, the son of Abraham."),
            (18, "Now the birth of Jesus Christ was on this wise: When as his mother Mary was espoused to Joseph, before they came together, she was found with child of the Holy Ghost."),
            (19, "Then Joseph her husband, being a just man, and not willing to make her a publick example, was minded to put her away privily."),
            (20, "But while he thought on these things, behold, the angel of the Lord appeared unto him in a dream, saying, Joseph, thou son of David, fear not to take unto thee Mary thy wife: for that which is conceived in her is of the Holy Ghost."),
            (21, "And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins."),
            (23, "Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us."),
            (24, "Then Joseph being raised from sleep did as the angel of the Lord had bidden him, and took unto him his wife:"),
            (25, "And knew her not till she had brought forth her firstborn son: and he called his name JESUS."),
        ],
    },
    {
        "book": "mat",
        "real_ch": 7,
        "title": "Matthew 7 — Sermon on the Mount",
        "verses": [
            (1, "Judge not, that ye be not judged."),
            (2, "For with what judgment ye judge, ye shall be judged: and with what measure ye mete, it shall be measured to you again."),
            (3, "And why beholdest thou the mote that is in thy brother's eye, but considerest not the beam that is in thine own eye?"),
            (4, "Or how wilt thou say to thy brother, Let me pull out the mote out of thine eye; and, behold, a beam is in thine own eye?"),
            (5, "Thou hypocrite, first cast out the beam out of thine own eye; and then shalt thou see clearly to cast out the mote out of thy brother's eye."),
            (7, "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you:"),
            (8, "For every one that asketh receiveth; and he that seeketh findeth; and to him that knocketh it shall be opened."),
            (9, "Or what man is there of you, whom if his son ask bread, will he give him a stone?"),
            (10, "Or if he ask a fish, will he give him a serpent?"),
            (11, "If ye then, being evil, know how to give good gifts unto your children, how much more shall your Father which is in heaven give good things to them that ask him?"),
            (12, "Therefore all things whatsoever ye would that men should do to you, do ye even so to them: for this is the law and the prophets."),
            (13, "Enter ye in at the strait gate: for wide is the gate, and broad is the way, that leadeth to destruction, and many there be which go in thereat:"),
            (14, "Because strait is the gate, and narrow is the way, which leadeth unto life, and few there be that find it."),
            (15, "Beware of false prophets, which come to you in sheep's clothing, but inwardly they are ravening wolves."),
            (16, "Ye shall know them by their fruits. Do men gather grapes of thorns, or figs of thistles?"),
            (17, "Even so every good tree bringeth forth good fruit; but a corrupt tree bringeth forth evil fruit."),
            (20, "Wherefore by their fruits ye shall know them."),
            (21, "Not every one that saith unto me, Lord, Lord, shall enter into the kingdom of heaven; but he that doeth the will of my Father which is in heaven."),
            (24, "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock:"),
            (25, "And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock."),
            (26, "And every one that heareth these sayings of mine, and doeth them not, shall be likened unto a foolish man, which built his house upon the sand:"),
            (27, "And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell: and great was the fall of it."),
        ],
    },
    {
        "book": "mat",
        "real_ch": 17,
        "title": "Matthew 17 — The Transfiguration",
        "verses": [
            (1, "And after six days Jesus taketh Peter, James, and John his brother, and bringeth them up into an high mountain apart,"),
            (2, "And was transfigured before them: and his face did shine as the sun, and his raiment was white as the light."),
            (5, "While he yet spake, behold, a bright cloud overshadowed them: and behold a voice out of the cloud, which said, This is my beloved Son, in whom I am well pleased; hear ye him."),
            (20, "And Jesus said unto them, Because of your unbelief: for verily I say unto you, If ye have faith as a grain of mustard seed, ye shall say unto this mountain, Remove hence to yonder place; and it shall remove; and nothing shall be impossible unto you."),
        ],
    },
    {
        "book": "mk",
        "real_ch": 1,
        "title": "Mark 1 — The Beginning of the Gospel",
        "verses": [
            (1, "The beginning of the gospel of Jesus Christ, the Son of God;"),
            (9, "And it came to pass in those days, that Jesus came from Nazareth of Galilee, and was baptized of John in Jordan."),
            (10, "And straightway coming up out of the water, he saw the heavens opened, and the Spirit like a dove descending upon him:"),
            (11, "And there came a voice from heaven, saying, Thou art my beloved Son, in whom I am well pleased."),
            (14, "Now after that John was put in prison, Jesus came into Galilee, preaching the gospel of the kingdom of God,"),
            (15, "And saying, The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel."),
            (17, "And Jesus said unto them, Come ye after me, and I will make you to become fishers of men."),
            (35, "And in the morning, rising up a great while before day, he went out, and departed into a solitary place, and there prayed."),
            (41, "And Jesus, moved with compassion, put forth his hand, and touched him, and saith unto him, I will; be thou clean."),
        ],
    },
    {
        "book": "mk",
        "real_ch": 2,
        "title": "Mark 2 — Jesus Heals the Paralytic",
        "verses": [
            (1, "And again he entered into Capernaum after some days; and it was noised that he was in the house."),
            (3, "And they come unto him, bringing one sick of the palsy, which was borne of four."),
            (4, "And when they could not come nigh unto him for the press, they uncovered the roof where he was: and when they had broken it up, they let down the bed wherein the sick of the palsy lay."),
            (5, "When Jesus saw their faith, he said unto the sick of the palsy, Son, thy sins be forgiven thee."),
            (9, "Whether is it easier to say to the sick of the palsy, Thy sins be forgiven thee; or to say, Arise, and take up thy bed, and walk?"),
            (11, "I say unto thee, Arise, and take up thy bed, and go thy way into thine house."),
            (12, "And immediately he arose, took up the bed, and went forth before them all; insomuch that they were all amazed, and glorified God, saying, We never saw it on this fashion."),
            (17, "When Jesus heard it, he saith unto them, They that are whole have no need of the physician, but they that are sick: I came not to call the righteous, but sinners to repentance."),
            (27, "And he said unto them, The sabbath was made for man, and not man for the sabbath:"),
            (28, "Therefore the Son of man is Lord also of the sabbath."),
        ],
    },
    {
        "book": "mk",
        "real_ch": 9,
        "title": "Mark 9 — Faith and Prayer",
        "verses": [
            (23, "Jesus said unto him, If thou canst believe, all things are possible to him that believeth."),
            (24, "And straightway the father of the child cried out, and said with tears, Lord, I believe; help thou mine unbelief."),
            (35, "And he sat down, and called the twelve, and saith unto them, If any man desire to be first, the same shall be last of all, and servant of all."),
            (37, "Whosoever shall receive one of such children in my name, receiveth me: and whosoever shall receive me, receiveth not me, but him that sent me."),
            (50, "Salt is good: but if the salt have lost his saltness, wherewith will ye season it? Have salt in yourselves, and have peace one with another."),
        ],
    },
    {
        "book": "lk",
        "real_ch": 1,
        "title": "Luke 1 — The Birth of John and Jesus Foretold",
        "verses": [
            (5, "There was in the days of Herod, the king of Judaea, a certain priest named Zacharias, of the course of Abia: and his wife was of the daughters of Aaron, and her name was Elisabeth."),
            (6, "And they were both righteous before God, walking in all the commandments and ordinances of the Lord blameless."),
            (7, "And they had no child, because that Elisabeth was barren, and they both were now well stricken in years."),
            (13, "But the angel said unto him, Fear not, Zacharias: for thy prayer is heard; and thy wife Elisabeth shall bear thee a son, and thou shalt call his name John."),
            (26, "And in the sixth month the angel Gabriel was sent from God unto a city of Galilee, named Nazareth,"),
            (27, "To a virgin espoused to a man whose name was Joseph, of the house of David; and the virgin's name was Mary."),
            (28, "And the angel came in unto her, and said, Hail, thou that art highly favoured, the Lord is with thee: blessed art thou among women."),
            (30, "And the angel said unto her, Fear not, Mary: for thou hast found favour with God."),
            (31, "And, behold, thou shalt conceive in thy womb, and bring forth a son, and shalt call his name JESUS."),
            (35, "And the angel answered and said unto her, The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God."),
            (37, "For with God nothing shall be impossible."),
            (38, "And Mary said, Behold the handmaid of the Lord; be it unto me according to thy word. And the angel departed from her."),
            (46, "And Mary said, My soul doth magnify the Lord,"),
            (47, "And my spirit hath rejoiced in God my Saviour."),
            (68, "Blessed be the Lord God of Israel; for he hath visited and redeemed his people,"),
            (78, "Through the tender mercy of our God; whereby the dayspring from on high hath visited us,"),
            (79, "To give light to them that sit in darkness and in the shadow of death, to guide our feet into the way of peace."),
        ],
    },
    {
        "book": "lk",
        "real_ch": 2,
        "title": "Luke 2 — The Birth of Jesus",
        "verses": [
            (1, "And it came to pass in those days, that there went out a decree from Caesar Augustus that all the world should be taxed."),
            (4, "And Joseph also went up from Galilee, out of the city of Nazareth, into Judaea, unto the city of David, which is called Bethlehem; (because he was of the house and lineage of David:)"),
            (6, "And so it was, that, while they were there, the days were accomplished that she should be delivered."),
            (7, "And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn."),
            (8, "And there were in the same country shepherds abiding in the field, keeping watch over their flock by night."),
            (9, "And, lo, the angel of the Lord came upon them, and the glory of the Lord shone round about them: and they were sore afraid."),
            (10, "And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people."),
            (11, "For unto you is born this day in the city of David a Saviour, which is Christ the Lord."),
            (12, "And this shall be a sign unto you; Ye shall find the babe wrapped in swaddling clothes, lying in a manger."),
            (13, "And suddenly there was with the angel a multitude of the heavenly host praising God, and saying,"),
            (14, "Glory to God in the highest, and on earth peace, good will toward men."),
            (15, "And it came to pass, as the angels were gone away from them into heaven, the shepherds said one to another, Let us now go even unto Bethlehem, and see this thing which is come to pass, which the Lord hath made known unto us."),
            (16, "And they came with haste, and found Mary, and Joseph, and the babe lying in a manger."),
            (19, "But Mary kept all these things, and pondered them in her heart."),
            (20, "And the shepherds returned, glorifying and praising God for all the things that they had heard and seen, as it was told unto them."),
            (28, "Then took he him up in his arms, and blessed God, and said,"),
            (29, "Lord, now lettest thou thy servant depart in peace, according to thy word:"),
            (30, "For mine eyes have seen thy salvation,"),
            (31, "Which thou hast prepared before the face of all people;"),
            (32, "A light to lighten the Gentiles, and the glory of thy people Israel."),
            (40, "And the child grew, and waxed strong in spirit, filled with wisdom: and the grace of God was upon him."),
            (52, "And Jesus increased in wisdom and stature, and in favour with God and man."),
        ],
    },
    {
        "book": "lk",
        "real_ch": 6,
        "title": "Luke 6 — The Beatitudes",
        "verses": [
            (20, "And he lifted up his eyes on his disciples, and said, Blessed be ye poor: for yours is the kingdom of God."),
            (21, "Blessed are ye that hunger now: for ye shall be filled. Blessed are ye that weep now: for ye shall laugh."),
            (22, "Blessed are ye, when men shall hate you, and when they shall separate you from their company, and shall reproach you, and cast out your name as evil, for the Son of man's sake."),
            (27, "But I say unto you which hear, Love your enemies, do good to them which hate you,"),
            (28, "Bless them that curse you, and pray for them which despitefully use you."),
            (29, "And unto him that smiteth thee on the one cheek offer also the other; and him that taketh away thy cloak forbid not to take thy coat also."),
            (30, "Give to every man that asketh of thee; and of him that taketh away thy goods ask them not again."),
            (31, "And as ye would that men should do to you, do ye also to them likewise."),
            (35, "But love ye your enemies, and do good, and lend, hoping for nothing again; and your reward shall be great, and ye shall be the children of the Highest: for he is kind unto the unthankful and to the evil."),
            (36, "Be ye therefore merciful, as your Father also is merciful."),
            (37, "Judge not, and ye shall not be judged: condemn not, and ye shall not be condemned: forgive, and ye shall be forgiven:"),
            (38, "Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over, shall men give into your bosom. For with the same measure that ye mete withal it shall be measured to you again."),
            (41, "And why beholdest thou the mote that is in thy brother's eye, but perceivest not the beam that is in thine own eye?"),
            (42, "Either how canst thou say to thy brother, Brother, let me pull out the mote that is in thine eye, when thou thyself beholdest not the beam that is in thine own eye? Thou hypocrite, cast out first the beam out of thine own eye, and then shalt thou see clearly to pull out the mote that is out of thy brother's eye."),
            (43, "For a good tree bringeth not forth corrupt fruit; neither doth a corrupt tree bring forth good fruit."),
            (44, "For every tree is known by his own fruit. For of thorns men do not gather figs, nor of a bramble bush gather they grapes."),
            (45, "A good man out of the good treasure of his heart bringeth forth that which is good; and an evil man out of the evil treasure of his heart bringeth forth that which is evil: for of the abundance of the heart his mouth speaketh."),
            (46, "And why call ye me, Lord, Lord, and do not the things which I say?"),
            (47, "Whosoever cometh to me, and heareth my sayings, and doeth them, I will shew you to whom he is like:"),
            (48, "He is like a man which built an house, and digged deep, and laid the foundation on a rock: and when the flood arose, the stream beat vehemently upon that house, and could not shake it: for it was founded upon a rock."),
            (49, "But he that heareth, and doeth not, is like a man that without a foundation built an house upon the earth; against which the stream did beat vehemently, and immediately it fell; and the ruin of that house was great."),
        ],
    },
    {
        "book": "acts",
        "real_ch": 1,
        "title": "Acts 1 — The Ascension",
        "verses": [
            (8, "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth."),
            (9, "And when he had spoken these things, while they beheld, he was taken up; and a cloud received him out of their sight."),
            (10, "And while they looked stedfastly toward heaven as he went up, behold, two men stood by them in white apparel;"),
            (11, "Which also said, Ye men of Galilee, why stand ye gazing up into heaven? this same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven."),
        ],
    },
    {
        "book": "acts",
        "real_ch": 12,
        "title": "Acts 12 — Peter's Miraculous Escape",
        "verses": [
            (5, "Peter therefore was kept in prison: but prayer was made without ceasing of the church unto God for him."),
            (6, "And when Herod would have brought him forth, the same night Peter was sleeping between two soldiers, bound with two chains: and the keepers before the door kept the prison."),
            (7, "And, behold, the angel of the Lord came upon him, and a light shined in the prison: and he smote Peter on the side, and raised him up, saying, Arise up quickly. And his chains fell off from his hands."),
            (8, "And the angel said unto him, Gird thyself, and bind on thy sandals. And so he did. And he saith unto him, Cast thy garment about thee, and follow me."),
            (9, "And he went out, and followed him; and wist not that it was true which was done by the angel; but thought he saw a vision."),
            (10, "When they were past the first and the second ward, they came unto the iron gate that leadeth unto the city; which opened to them of his own accord: and they went out, and passed on through one street; and forthwith the angel departed from him."),
            (11, "And when Peter was come to himself, he said, Now I know of a surety, that the Lord hath sent his angel, and hath delivered me out of the hand of Herod."),
        ],
    },
    {
        "book": "rom",
        "real_ch": 12,
        "title": "Romans 12 — Living Sacrifice",
        "verses": [
            (1, "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service."),
            (2, "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God."),
            (3, "For I say, through the grace given unto me, to every man that is among you, not to think of himself more highly than he ought to think; but to think soberly, according as God hath dealt to every man the measure of faith."),
            (9, "Let love be without dissimulation. Abhor that which is evil; cleave to that which is good."),
            (10, "Be kindly affectioned one to another with brotherly love; in honour preferring one another;"),
            (11, "Not slothful in business; fervent in spirit; serving the Lord;"),
            (12, "Rejoicing in hope; patient in tribulation; continuing instant in prayer;"),
            (13, "Distributing to the necessity of saints; given to hospitality."),
            (14, "Bless them which persecute you: bless, and curse not."),
            (15, "Rejoice with them that do rejoice, and weep with them that weep."),
            (16, "Be of the same mind one toward another. Mind not high things, but condescend to men of low estate. Be not wise in your own conceits."),
            (17, "Recompense to no man evil for evil. Provide things honest in the sight of all men."),
            (18, "If it be possible, as much as lieth in you, live peaceably with all men."),
            (19, "Dearly beloved, avenge not yourselves, but rather give place unto wrath: for it is written, Vengeance is mine; I will repay, saith the Lord."),
            (20, "Therefore if thine enemy hunger, feed him; if he thirst, give him drink: for in so doing thou shalt heap coals of fire on his head."),
            (21, "Be not overcome of evil, but overcome evil with good."),
        ],
    },
    {
        "book": "1cor",
        "real_ch": 12,
        "title": "1 Corinthians 12 — Spiritual Gifts",
        "verses": [
            (4, "Now there are diversities of gifts, but the same Spirit."),
            (5, "And there are differences of administrations, but the same Lord."),
            (6, "And there are diversities of operations, but it is the same God which worketh all in all."),
            (7, "But the manifestation of the Spirit is given to every man to profit withal."),
            (8, "For to one is given by the Spirit the word of wisdom; to another the word of knowledge by the same Spirit;"),
            (9, "To another faith by the same Spirit; to another the gifts of healing by the same Spirit;"),
            (10, "To another the working of miracles; to another prophecy; to another discerning of spirits; to another divers kinds of tongues; to another the interpretation of tongues:"),
            (11, "But all these worketh that one and the selfsame Spirit, dividing to every man severally as he will."),
            (12, "For as the body is one, and hath many members, and all the members of that one body, being many, are one body: so also is Christ."),
            (13, "For by one Spirit are we all baptized into one body, whether we be Jews or Gentiles, whether we be bond or free; and have been all made to drink into one Spirit."),
            (14, "For the body is not one member, but many."),
            (18, "But now hath God set the members every one of them in the body, as it hath pleased him."),
            (26, "And whether one member suffer, all the members suffer with it; or one member be honoured, all the members rejoice with it."),
            (27, "Now ye are the body of Christ, and members in particular."),
            (31, "But covet earnestly the best gifts: and yet shew I unto you a more excellent way."),
        ],
    },
    {
        "book": "2cor",
        "real_ch": 9,
        "title": "2 Corinthians 9 — Cheerful Giving",
        "verses": [
            (6, "But this I say, He which soweth sparingly shall reap also sparingly; and he which soweth bountifully shall reap also bountifully."),
            (7, "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver."),
            (8, "And God is able to make all grace abound toward you; that ye, always having all sufficiency in all things, may abound to every good work:"),
            (9, "(As it is written, He hath dispersed abroad; he hath given to the poor: his righteousness remaineth for ever.)"),
            (10, "Now he that ministereth seed to the sower both minister bread for your food, and multiply your seed sown, and increase the fruits of your righteousness;"),
            (11, "Being enriched in every thing to all bountifulness, which causeth through us thanksgiving to God."),
            (12, "For the administration of this service not only supplieth the want of the saints, but is abundant also by many thanksgivings unto God;"),
            (13, "Whiles by the experiment of this ministration they glorify God for your professed subjection unto the gospel of Christ, and for your liberal distribution unto them, and unto all men;"),
            (14, "And by their prayer for you, which long after you for the exceeding grace of God in you."),
            (15, "Thanks be unto God for his unspeakable gift."),
        ],
    },
    {
        "book": "eph",
        "real_ch": 1,
        "title": "Ephesians 1 — Spiritual Blessings in Christ",
        "verses": [
            (3, "Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual blessings in heavenly places in Christ:"),
            (4, "According as he hath chosen us in him before the foundation of the world, that we should be holy and without blame before him in love:"),
            (5, "Having predestinated us unto the adoption of children by Jesus Christ to himself, according to the good pleasure of his will,"),
            (7, "In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace;"),
            (8, "Wherein he hath abounded toward us in all wisdom and prudence;"),
            (9, "Having made known unto us the mystery of his will, according to his good pleasure which he hath purposed in himself:"),
            (13, "In whom ye also trusted, after that ye heard the word of truth, the gospel of your salvation: in whom also after that ye believed, ye were sealed with that holy Spirit of promise,"),
            (14, "Which is the earnest of our inheritance until the redemption of the purchased possession, unto the praise of his glory."),
            (18, "The eyes of your understanding being enlightened; that ye may know what is the hope of his calling, and what the riches of the glory of his inheritance in the saints,"),
            (19, "And what is the exceeding greatness of his power to us-ward who believe, according to the working of his mighty power,"),
            (20, "Which he wrought in Christ, when he raised him from the dead, and set him at his own right hand in the heavenly places,"),
            (21, "Far above all principality, and power, and might, and dominion, and every name that is named, not only in this world, but also in that which is to come:"),
            (22, "And hath put all things under his feet, and gave him to be the head over all things to the church,"),
            (23, "Which is his body, the fulness of him that filleth all in all."),
        ],
    },
    {
        "book": "heb",
        "real_ch": 4,
        "title": "Hebrews 4 — The Rest of God",
        "verses": [
            (12, "For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart."),
            (13, "Neither is there any creature that is not manifest in his sight: but all things are naked and opened unto the eyes of him with whom we have to do."),
            (14, "Seeing then that we have a great high priest, that is passed into the heavens, Jesus the Son of God, let us hold fast our profession."),
            (15, "For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin."),
            (16, "Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need."),
        ],
    },
    {
        "book": "heb",
        "real_ch": 11,
        "title": "Hebrews 11 — By Faith (more)",
        "verses": [
            (1, "Now faith is the substance of things hoped for, the evidence of things not seen."),
            (3, "Through faith we understand that the worlds were framed by the word of God, so that things which are seen were not made of things which do appear."),
            (4, "By faith Abel offered unto God a more excellent sacrifice than Cain, by which he obtained witness that he was righteous, God testifying of his gifts: and by it he being dead yet speaketh."),
            (5, "By faith Enoch was translated that he should not see death; and was not found, because God had translated him: for before his translation he had this testimony, that he pleased God."),
            (7, "By faith Noah, being warned of God of things not seen as yet, moved with fear, prepared an ark to the saving of his house; by the which he condemned the world, and became heir of the righteousness which is by faith."),
            (8, "By faith Abraham, when he was called to go out into a place which he should after receive for an inheritance, obeyed; and he went out, not knowing whither he went."),
            (11, "Through faith also Sara herself received strength to conceive seed, and was delivered of a child when she was past age, because she judged him faithful who had promised."),
            (17, "By faith Abraham, when he was tried, offered up Isaac: and he that had received the promises offered up his only begotten son,"),
            (23, "By faith Moses, when he was born, was hid three months of his parents, because they saw he was a proper child; and they were not afraid of the king's commandment."),
            (24, "By faith Moses, when he was come to years, refused to be called the son of Pharaoh's daughter;"),
            (25, "Choosing rather to suffer affliction with the people of God, than to enjoy the pleasures of sin for a season;"),
            (26, "Esteeming the reproach of Christ greater riches than the treasures in Egypt: for he had respect unto the recompence of the reward."),
            (29, "By faith they passed through the Red sea as by dry land: which the Egyptians assaying to do were drowned."),
            (32, "And what shall I more say? for the time would fail me to tell of Gedeon, and of Barak, and of Samson, and of Jephthae; of David also, and Samuel, and of the prophets:"),
            (33, "Who through faith subdued kingdoms, wrought righteousness, obtained promises, stopped the mouths of lions,"),
            (34, "Quenched the violence of fire, escaped the edge of the sword, out of weakness were made strong, waxed valiant in fight, turned to flight the armies of the aliens."),
            (35, "Women received their dead raised to life again: and others were tortured, not accepting deliverance; that they might obtain a better resurrection:"),
            (39, "And these all, having obtained a good report through faith, received not the promise:"),
            (40, "God having provided some better thing for us, that they without us should not be made perfect."),
        ],
    },
    {
        "book": "james",
        "real_ch": 5,
        "title": "James 5 — Prayer of Faith",
        "verses": [
            (7, "Be patient therefore, brethren, unto the coming of the Lord. Behold, the husbandman waiteth for the precious fruit of the earth, and hath long patience for it, until he receive the early and latter rain."),
            (8, "Be ye also patient; stablish your hearts: for the coming of the Lord draweth nigh."),
            (9, "Grudge not one against another, brethren, lest ye be condemned: behold, the judge standeth before the door."),
            (13, "Is any among you afflicted? let him pray. Is any merry? let him sing psalms."),
            (14, "Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord:"),
            (15, "And the prayer of faith shall save the sick, and the Lord shall raise him up; and if he have committed sins, they shall be forgiven him."),
            (16, "Confess your faults one to another, and pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much."),
            (17, "Elias was a man subject to like passions as we are, and he prayed earnestly that it might not rain: and it rained not on the earth by the space of three years and six months."),
            (18, "And he prayed again, and the heaven gave rain, and the earth brought forth her fruit."),
            (19, "Brethren, if any of you do err from the truth, and one convert him;"),
            (20, "Let him know, that he which converteth the sinner from the error of his way shall save a soul from death, and shall hide a multitude of sins."),
        ],
    },
    {
        "book": "1pet",
        "real_ch": 2,
        "title": "1 Peter 2 — Living Stones",
        "verses": [
            (1, "Wherefore laying aside all malice, and all guile, and hypocrisies, and envies, and all evil speakings,"),
            (2, "As newborn babes, desire the sincere milk of the word, that ye may grow thereby:"),
            (3, "If so be ye have tasted that the Lord is gracious."),
            (4, "To whom coming, as unto a living stone, disallowed indeed of men, but chosen of God, and precious,"),
            (5, "Ye also, as lively stones, are built up a spiritual house, an holy priesthood, to offer up spiritual sacrifices, acceptable to God by Jesus Christ."),
            (9, "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light:"),
            (10, "Which in time past were not a people, but are now the people of God: which had not obtained mercy, but now have obtained mercy."),
            (11, "Dearly beloved, I beseech you as strangers and pilgrims, abstain from fleshly lusts, which war against the soul;"),
            (12, "Having your conversation honest among the Gentiles: that, whereas they speak against you as evildoers, they may by your good works, which they shall behold, glorify God in the day of visitation."),
            (13, "Submit yourselves to every ordinance of man for the Lord's sake: whether it be to the king, as supreme;"),
            (14, "Or unto governors, as unto them that are sent by him for the punishment of evildoers, and for the praise of them that do well."),
            (15, "For so is the will of God, that with well doing ye may put to silence the ignorance of foolish men:"),
            (16, "As free, and not using your liberty for a cloke of maliciousness, but as the servants of God."),
            (17, "Honour all men. Love the brotherhood. Fear God. Honour the king."),
            (21, "For even hereunto were ye called: because Christ also suffered for us, leaving us an example, that ye should follow his steps:"),
            (22, "Who did no sin, neither was guile found in his mouth:"),
            (23, "Who, when he was reviled, reviled not again; when he suffered, he threatened not; but committed himself to him that judgeth righteously:"),
            (24, "Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness: by whose stripes ye were healed."),
            (25, "For ye were as sheep going astray; but are now returned unto the Shepherd and Bishop of your souls."),
        ],
    },
]


def main():
    with open(BIBLE_PATH) as f:
        bible = json.load(f)

    existing_chapter_ids = {c["id"] for c in bible["chapters"]}
    max_chapter_number = max(c["number"] for c in bible["chapters"])

    total_new_verses = 0
    chapters_added = 0
    chapters_skipped = 0

    for entry in CHAPTERS_DATA:
        book = entry["book"]
        real_ch = entry["real_ch"]
        chapter_id = f"bible-{book}-{real_ch}"

        if chapter_id in existing_chapter_ids:
            chapters_skipped += 1
            continue

        max_chapter_number += 1
        verses = []
        for verse_num, verse_text in entry["verses"]:
            verse_id = f"bible-{book}-{real_ch}-{verse_num}"
            verses.append({
                "id": verse_id,
                "number": verse_num,
                "text": verse_text,
                "source": dict(KJV_SOURCE),
            })

        chapter = {
            "id": chapter_id,
            "number": max_chapter_number,
            "title": entry["title"],
            "verses": verses,
        }

        bible["chapters"].append(chapter)
        existing_chapter_ids.add(chapter_id)
        total_new_verses += len(verses)
        chapters_added += 1

    with open(BIBLE_PATH, "w") as f:
        json.dump(bible, f, indent=2, ensure_ascii=False)
        f.write("\n")

    total_verses = sum(len(c["verses"]) for c in bible["chapters"])
    print(f"Chapters added: {chapters_added}")
    print(f"Chapters skipped (already exist): {chapters_skipped}")
    print(f"New verses added: {total_new_verses}")
    print(f"Total verses now: {total_verses}")
    print(f"Total chapters now: {len(bible['chapters'])}")


if __name__ == "__main__":
    main()

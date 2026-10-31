export interface SynthesizedQuote {
  text: string;
  category: string;
  inspirationNote: string;
}

// Master philosophical corpus for all 31 iconic thinkers
export const PHILOSOPHICAL_CORPUS: Record<string, { quotes: { text: string; category: string }[]; dialecticStyle: string }> = {
  // ANCIENT PHILOSOPHERS (1-9)
  'Socrates': {
    dialecticStyle: 'Classical Socratic dialectic, interrogating certainty and exposing ignorance.',
    quotes: [
      { text: "The unexamined life is a counterfeit of living, where certainty is the greatest sickness of the soul.", category: "Wisdom" },
      { text: "He is richest who is content with the least, for contentment is the wealth of nature, while pride is perpetual famine.", category: "Wealth" },
      { text: "To fear death is to think oneself wise when one is not, for it is to believe we know what we do not.", category: "Death" },
      { text: "True knowledge begins when you dissect your own assumptions and discover the void beneath your pride.", category: "Knowledge" },
      { text: "No man errs willingly; evil is the offspring of an intellect that cannot distinguish shadows from the sun.", category: "Human Nature" },
      { text: "Be slow to fall into friendship, but once committed, let no tempest shake your fidelity.", category: "Relationships" },
    ]
  },
  'Plato': {
    dialecticStyle: 'Idealist allegory, distinguishing transient sensory shadows from eternal archetypal Forms.',
    quotes: [
      { text: "The cave of appearances blinds those who love its shadows; the truth is only for those willing to bear the blinding sun.", category: "Reality" },
      { text: "Love is the longing of the mortal soul for immortality, reaching toward the eternal form of Beauty.", category: "Love" },
      { text: "Wise men speak because they have something to say; fools speak because they have to say something.", category: "Wisdom" },
      { text: "Justice is harmony in the soul, where reason commands, courage defends, and desire yields.", category: "Truth" },
      { text: "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when adults are afraid of the light.", category: "Fear" },
    ]
  },
  'Aristotle': {
    dialecticStyle: 'Empirical teleology and the Golden Mean, anchoring human flourishing in virtuous habit.',
    quotes: [
      { text: "We are what we repeatedly do. Excellence, then, is not an isolated act, but an unbroken habit.", category: "Discipline" },
      { text: "Knowing yourself is the beginning of all genuine wisdom and the only cure for intellectual vanity.", category: "Wisdom" },
      { text: "Happiness is an activity of the soul in accordance with complete and deliberate virtue.", category: "Happiness" },
      { text: "The roots of education are bitter, but the fruit it bears in the crucible of adversity is sweet.", category: "Success" },
      { text: "Courage is the first of human virtues because it makes all others possible under pressure.", category: "Courage" },
    ]
  },
  'Epicurus': {
    dialecticStyle: 'Ataraxic lucidity, banishing superstitious terror and cultivating peaceful friendship.',
    quotes: [
      { text: "Death does not concern us: when we exist, death is not here; and when death exists, we are not.", category: "Death" },
      { text: "Do not spoil what you have by desiring what you have not; remember that what you have now was once among the things you only hoped for.", category: "Happiness" },
      { text: "Of all the means to ensure happiness throughout the whole of life, by far the most important is the acquisition of friends.", category: "Relationships" },
      { text: "Nothing is enough for the man to whom enough is too little.", category: "Wealth" },
    ]
  },
  'Heraclitus': {
    dialecticStyle: 'Aphoristic cosmology of flux, viewing tension and fire as the generative principle.',
    quotes: [
      { text: "No man ever steps in the same river twice, for it is not the same river and he is not the same man.", category: "Time" },
      { text: "Day and night are one; opposition creates concord, and from difference comes the fairest harmony.", category: "Reality" },
      { text: "The waking have one world in common, but of the sleeping each turns aside into a world of his own.", category: "Truth" },
      { text: "Character is destiny; the hidden fire within sculpts every road you shall ever walk.", category: "Human Nature" },
    ]
  },
  'Diogenes': {
    dialecticStyle: 'Radical Cynic critique, shattering social hypocrisy and commercial luxury.',
    quotes: [
      { text: "I threw away my cup when I saw a child drinking from his hands at the well. Why multiply your masters?", category: "Freedom" },
      { text: "Humans live artificially; they fawn over jewels while stepping carelessly upon virtue.", category: "Society" },
      { text: "Blushing is the color of virtue; shame is the only mirror honest men need.", category: "Human Nature" },
      { text: "The foundation of every state is the education of its youth, yet society teaches obedience rather than truth.", category: "Power" },
    ]
  },
  'Marcus Aurelius': {
    dialecticStyle: 'Late Roman Stoicism, inner sovereignty, and radical acceptance of cosmic duty.',
    quotes: [
      { text: "The impediment to action advances action. What stands in the way becomes the way.", category: "Strength" },
      { text: "You have power over your mind, not outside events. Realize this, and you will find invincible fortitude.", category: "Discipline" },
      { text: "The soul becomes dyed with the color of its thoughts; examine the loom before you weave another hour.", category: "Wisdom" },
      { text: "Waste no more time arguing about what a good man should be. Be one in each unobserved hour.", category: "Purpose" },
      { text: "Dwell on the beauty of life. Watch the stars, and see yourself running with them.", category: "Life" },
    ]
  },
  'Seneca': {
    dialecticStyle: 'Epigrammatic moral urgency, conquering anxiety and mastering finite time.',
    quotes: [
      { text: "We suffer more often in imagination than in reality. Anticipation is the thief of tranquility.", category: "Fear" },
      { text: "It is not that we have a short time to live, but that we waste much of it on trifles that leave no legacy.", category: "Time" },
      { text: "A gem cannot be polished without friction, nor a man perfected without trials.", category: "Suffering" },
      { text: "He who fears death will never do anything worthy of a man who is alive.", category: "Courage" },
    ]
  },
  'Epictetus': {
    dialecticStyle: 'Dichotomy of control, demanding radical self-responsibility and unbending dignity.',
    quotes: [
      { text: "Men are disturbed not by things, but by the view which they take of them.", category: "Human Psychology" },
      { text: "No man is free who is not master of himself; the iron chain and the golden chain bind the slave equally.", category: "Freedom" },
      { text: "Don't explain your philosophy. Embody it in silence through every gesture of your day.", category: "Self-Respect" },
      { text: "First say to yourself what you would be; and then do what you have to do without seeking applause.", category: "Ambition" },
    ]
  },

  // MODERN PHILOSOPHERS (10-19)
  'Friedrich Nietzsche': {
    dialecticStyle: 'Aphoristic psychology, will to power, and Amor Fati overcoming herd decadence.',
    quotes: [
      { text: "He who has a why to live can bear almost any how, yet modern man starves in spiritual luxury.", category: "Purpose" },
      { text: "Whoever fights monsters should see to it that in the process he does not become a monster.", category: "Power" },
      { text: "What does not kill me makes me stronger; suffering is the furnace where mediocrity is burned away.", category: "Strength" },
      { text: "Morality is often the herd instinct in the individual, dressed in the vestments of sacred duty.", category: "Human Nature" },
      { text: "You must have chaos within you to give birth to a dancing star.", category: "Success" },
    ]
  },
  'Arthur Schopenhauer': {
    dialecticStyle: 'Philosophical pessimism, unmasking the blind Will to Live and finding aesthetic solace.',
    quotes: [
      { text: "A man can be himself only so long as he is alone; if he does not love solitude, he will not love freedom.", category: "Loneliness" },
      { text: "Life swings like a pendulum backward and forward between pain and boredom, both fed by insatiable desire.", category: "Suffering" },
      { text: "Every man takes the limits of his own field of vision for the limits of the world.", category: "Knowledge" },
      { text: "Compassion is the root of all true morality, for it pierces the illusion of separation.", category: "Relationships" },
    ]
  },
  'Immanuel Kant': {
    dialecticStyle: 'Deontological rigor, categorical imperative, and rational autonomy.',
    quotes: [
      { text: "Act only according to that maxim whereby you can at the same time will that it should become a universal law.", category: "Discipline" },
      { text: "Two things awe me most: the starry sky above me and the moral law within me.", category: "Truth" },
      { text: "Dare to know! Have the courage to use your own understanding without the guidance of another.", category: "Knowledge" },
      { text: "Treat humanity, whether in your own person or in that of another, never merely as a means, but always as an end.", category: "Self-Respect" },
    ]
  },
  'René Descartes': {
    dialecticStyle: 'Methodological rationalism, foundational doubt, and conscious self-awareness.',
    quotes: [
      { text: "I think, therefore I am. In the silence of total doubt, conscious reflection is the only rock that cannot sink.", category: "Existence" },
      { text: "It is not enough to have a good mind; the main thing is to apply it well and guard against prejudice.", category: "Intelligence" },
      { text: "Divide each difficulty into as many parts as is feasible and necessary to resolve it.", category: "Wisdom" },
    ]
  },
  'John Locke': {
    dialecticStyle: 'British empiricism, natural liberty, and experiential tabula rasa.',
    quotes: [
      { text: "The mind is white paper void of all characters, until experience writes upon it the tapestry of reality.", category: "Knowledge" },
      { text: "Where there is no law, there is no freedom; for liberty is to be free from restraint and violence from others.", category: "Freedom" },
      { text: "New opinions are always suspected and usually opposed, without any other reason than that they are not common.", category: "Truth" },
    ]
  },
  'Jean-Jacques Rousseau': {
    dialecticStyle: 'Romantic naturalism, critiquing artificial social chains and praising conscience.',
    quotes: [
      { text: "Man was born free, and everywhere he is in chains of his own polite invention.", category: "Freedom" },
      { text: "To be sane in a world of madmen is in itself another form of madness.", category: "Society" },
      { text: "Patience is bitter, but its fruit is sweet; true strength is preserving nature in an artificial salon.", category: "Discipline" },
    ]
  },
  'David Hume': {
    dialecticStyle: 'Radical empirical skepticism, analyzing human sentiment and custom.',
    quotes: [
      { text: "Reason is, and ought only to be, the slave of the passions, guiding sails that wind alone can fill.", category: "Human Nature" },
      { text: "A wise man proportions his belief to the evidence, refusing comforting fairy tales of absolute certainty.", category: "Truth" },
      { text: "Custom is the great guide of human life, yet wise men examine the tracks before following the herd.", category: "Wisdom" },
    ]
  },
  'Søren Kierkegaard': {
    dialecticStyle: 'Christian existential anguish, subjective truth, and the dizzying leap of faith.',
    quotes: [
      { text: "Life can only be understood backwards; but it must be lived forwards through the fog of dread.", category: "Time" },
      { text: "Anxiety is the dizziness of freedom when consciousness gazes into the boundless abyss of possibility.", category: "Fear" },
      { text: "The most common form of despair is not being who you are, but putting on the mask society applauds.", category: "Existence" },
    ]
  },
  'Karl Marx': {
    dialecticStyle: 'Historical materialism, dialectical conflict, and the critique of structural alienation.',
    quotes: [
      { text: "Philosophers have only interpreted the world in various ways; the point, however, is to transform it.", category: "Power" },
      { text: "The production of too many useful things results in too many useless people bound to the machine.", category: "Society" },
      { text: "History repeats itself, first as tragedy, second as farce, until human agency seizes the wheel.", category: "Time" },
    ]
  },
  'John Stuart Mill': {
    dialecticStyle: 'Utilitarian humanism, liberty of conscience, and maximizing qualitative flourishing.',
    quotes: [
      { text: "It is better to be a human being dissatisfied than a pig satisfied; better to be Socrates dissatisfied than a fool satisfied.", category: "Wisdom" },
      { text: "Over his own body and mind, the individual is sovereign; conformity is the grave of human originality.", category: "Freedom" },
      { text: "He who knows only his own side of the case knows little of that; opposing ideas are the whetstone of truth.", category: "Truth" },
    ]
  },

  // EXISTENTIALIST AND CONTEMPORARY THINKERS (20-24)
  'Albert Camus': {
    dialecticStyle: 'Absurd revolt, lucid confrontation with silence, and invincible summer.',
    quotes: [
      { text: "In the depth of winter, I finally learned that within me there lay an invincible summer.", category: "Courage" },
      { text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.", category: "Freedom" },
      { text: "One must imagine Sisyphus happy as he pushes his boulder, for the struggle toward the summit is enough to fill a man's heart.", category: "Purpose" },
      { text: "Real generosity toward the future lies in giving all to the present moment without demands.", category: "Time" },
    ]
  },
  'Jean-Paul Sartre': {
    dialecticStyle: 'Phenomenological existentialism, condemnation to freedom, and refusing bad faith.',
    quotes: [
      { text: "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.", category: "Freedom" },
      { text: "Existence precedes essence: we first exist, encounter ourselves, surge up in the world—and only then define who we are.", category: "Existence" },
      { text: "Hell is other people when you surrender your mirror to their judgment and forget your own sovereignty.", category: "Relationships" },
    ]
  },
  'Simone de Beauvoir': {
    dialecticStyle: 'Ethics of ambiguity, interdependent liberation, and dismantling constructed myths.',
    quotes: [
      { text: "One is not born, but rather becomes, oneself; freedom must project itself into the world through meaningful action.", category: "Freedom" },
      { text: "To will oneself free is also to will others free; solitude without solidarity is only an elegant cage.", category: "Society" },
      { text: "Change your life today. Do not gamble on the future; act now, without delay, upon your convictions.", category: "Time" },
    ]
  },
  'Michel Foucault': {
    dialecticStyle: 'Genealogy of power, panoptic discipline, and unmasking discursive architectures.',
    quotes: [
      { text: "Where there is power, there is resistance; yet that resistance is never in a position of exteriority to power.", category: "Power" },
      { text: "Knowledge is not made for understanding; it is made for cutting and dominating the narratives of truth.", category: "Knowledge" },
      { text: "The soul is the prison of the body when discipline convinces the prisoner to build his own bars.", category: "Human Psychology" },
    ]
  },
  'Hannah Arendt': {
    dialecticStyle: 'Political phenomenology, vita activa, and vigilance against thoughtlessness.',
    quotes: [
      { text: "The sad truth is that most evil is done by people who never make up their minds to be good or evil.", category: "Human Nature" },
      { text: "To think and to be fully alive are the same thing; thoughtlessness is the quiet midwife of tyranny.", category: "Wisdom" },
      { text: "Forgiveness is the key to action and freedom; without it, we remain chained to the inexorable consequences of the past.", category: "Freedom" },
    ]
  },

  // OTHER GREAT THINKERS (25-31)
  'Confucius': {
    dialecticStyle: 'Confucian humanism, moral self-cultivation, and reciprocal ritual propriety.',
    quotes: [
      { text: "The superior man is modest in his speech, but exceeds in his actions.", category: "Self-Respect" },
      { text: "He who learns but does not think is lost; he who thinks but does not learn is in great danger.", category: "Knowledge" },
      { text: "Real knowledge is to know the extent of one's ignorance and to govern the household of the heart first.", category: "Wisdom" },
      { text: "When you see a worthy person, endeavor to emulate him; when you see an unworthy person, inspect your own soul.", category: "Discipline" },
    ]
  },
  'Lao Tzu': {
    dialecticStyle: 'Daoist paradox, wu wei (effortless action), and the quiet strength of water.',
    quotes: [
      { text: "Water is fluid, soft, and yielding. But water will wear away rock, which is rigid and cannot yield. What is soft is strong.", category: "Strength" },
      { text: "He who knows when he has enough is rich; he who conquers himself possesses genuine power.", category: "Power" },
      { text: "A journey of a thousand miles begins beneath one single footstep taken with stillness.", category: "Discipline" },
      { text: "Simplicity, patience, compassion. These three are your greatest treasures in the storm.", category: "Spirituality" },
    ]
  },
  'Sun Tzu': {
    dialecticStyle: 'Strategic realism, psychological foreknowledge, and conquering without conflict.',
    quotes: [
      { text: "The supreme art of war is to subdue the enemy without fighting, by mastering your own composure first.", category: "Power" },
      { text: "If you know the enemy and know yourself, you need not fear the result of a hundred battles.", category: "Intelligence" },
      { text: "In the midst of chaos, there is also opportunity for those who observe without emotion.", category: "Wisdom" },
      { text: "Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt.", category: "Success" },
    ]
  },
  'Rumi': {
    dialecticStyle: 'Sufi ecstasy, divine yearning, and turning spiritual wounds into doorways of light.',
    quotes: [
      { text: "The wound is the place where the Light enters you; do not bandage what God intends to awaken.", category: "Suffering" },
      { text: "Do not be satisfied with the stories that come before you. Unfold your own myth in incandescent love.", category: "Love" },
      { text: "Silence is the language of God; all else is poor translation.", category: "Spirituality" },
      { text: "You are not a drop in the ocean. You are the entire ocean in a drop.", category: "Existence" },
    ]
  },
  'Ibn Sina': {
    dialecticStyle: 'Islamic Peripatetic metaphysics, medical empiricism, and conscious self-intellection.',
    quotes: [
      { text: "The world is divided into men who have wit and no religion and men who have religion and no wit.", category: "Intelligence" },
      { text: "The soul is like a polished mirror: when dirtied by ignorance, it reflects only distorted shadows of truth.", category: "Truth" },
      { text: "Ignorance leads to fear, fear leads to hate, and hate leads to violence. This is the equation of tyranny.", category: "Human Psychology" },
    ]
  },
  'Al-Ghazali': {
    dialecticStyle: 'Illuminationist mysticism, clearing intellectual pride to awaken spiritual perception.',
    quotes: [
      { text: "To get what you love, you must first be patient with what you hate in the purification of the self.", category: "Discipline" },
      { text: "Knowledge without action is wastefulness, and action without knowledge is foolishness.", category: "Knowledge" },
      { text: "The happiness of the drop is to die in the river; the pride of the soul is to dissolve in divine light.", category: "Spirituality" },
    ]
  },
  'Ibn Khaldun': {
    dialecticStyle: 'Sociology of history, cyclical rise and fall of dynasties, and asabiyyah (solidarity).',
    quotes: [
      { text: "Hard times create strong men, strong men create good times, good times create weak men, and weak men create hard times.", category: "Time" },
      { text: "Throughout history many nations have suffered a physical defeat, but that has never marked the end of a nation. But when a nation becomes the victim of a psychological defeat, then that marks the end of a nation.", category: "Society" },
      { text: "Past and future resemble each other more than water resembles water.", category: "Human Nature" },
      { text: "Man is a child of custom, not of his ancestors; social cohesion is the hidden bedrock of all empire.", category: "Power" },
    ]
  }
};

export function synthesizeQuotesFromCorpus(
  philosopherName: string,
  category: string,
  tone: string,
  length: 'Short' | 'Medium' | 'Long',
  quantity: number
): SynthesizedQuote[] {
  const thinker = PHILOSOPHICAL_CORPUS[philosopherName] || PHILOSOPHICAL_CORPUS['Marcus Aurelius'];
  const pool = thinker.quotes;
  const results: SynthesizedQuote[] = [];

  // Find exact matches for category, or fallback to pool
  const matched = pool.filter(q => q.category.toLowerCase() === category.toLowerCase());
  const quoteCandidates = matched.length > 0 ? matched : pool;

  for (let i = 0; i < quantity; i++) {
    const candidate = quoteCandidates[i % quoteCandidates.length];
    results.push({
      text: candidate.text,
      category: candidate.category || category,
      inspirationNote: `Original maxim synthesized in ${philosopherName}'s philosophical tradition: ${thinker.dialecticStyle}`
    });
  }

  return results;
}

export function synthesizeExplanationFromCorpus(
  quoteText: string,
  philosopherName: string,
  category: string
) {
  const thinker = PHILOSOPHICAL_CORPUS[philosopherName] || PHILOSOPHICAL_CORPUS['Marcus Aurelius'];
  return {
    deeperMeaning: `This maxim probes into ${philosopherName}'s fundamental insights, challenging conventional assumptions and cutting through societal self-deception.`,
    philosophicalIdea: `Connects to the classical school of ${category} and inquiry (${thinker.dialecticStyle}), exploring how mental perspective shapes human resilience and perceived reality.`,
    humanExperience: `Addresses the common human struggle between external pressures, the anxiety of existence, and discovering authentic internal tranquility.`,
    practicalInterpretation: `Pause and observe your automatic judgments today. Choose deliberate awareness over instinctive reaction, maintaining your inner citadel regardless of external noise.`
  };
}

export interface TarotCard {
  id: number;
  name: string;
  suit?: string;
  number?: number;
  arcana: 'major' | 'minor';
  keywords: string[];
  meaning: string;
  reversed?: string;
  reversedKeywords?: string[];
  isReversed?: boolean;
  imageUrl?: string;
}

export const tarotCards: TarotCard[] = [
  // Major Arcana
  { id: 0, name: 'The Fool', arcana: 'major', keywords: ['beginnings', 'innocence', 'spontaneity'], reversedKeywords: ['recklessness', 'naivety', 'poor judgement'], meaning: 'New beginnings, innocence, spontaneity, a free spirit' },
  { id: 1, name: 'The Magician', arcana: 'major', keywords: ['manifestation', 'resourcefulness', 'power'], reversedKeywords: ['manipulation', 'poor planning', 'untapped talents'], meaning: 'Manifestation, resourcefulness, power, inspired action' },
  { id: 2, name: 'The High Priestess', arcana: 'major', keywords: ['intuition', 'unconscious', 'inner voice'], reversedKeywords: ['secrets', 'disconnection', 'repressed feelings'], meaning: 'Intuition, unconscious knowledge, inner voice' },
  { id: 3, name: 'The Empress', arcana: 'major', keywords: ['femininity', 'beauty', 'nature', 'nurturing'], reversedKeywords: ['dependence', 'smothering', 'infertility'], meaning: 'Femininity, beauty, nature, nurturing, abundance' },
  { id: 4, name: 'The Emperor', arcana: 'major', keywords: ['authority', 'establishment', 'structure'], reversedKeywords: ['tyranny', 'rigidity', 'poor leadership'], meaning: 'Authority, establishment, structure, a father figure' },
  { id: 5, name: 'The Hierophant', arcana: 'major', keywords: ['spiritual wisdom', 'religious beliefs', 'conformity'], reversedKeywords: ['rebellion', 'nonconformity', 'personal beliefs'], meaning: 'Spiritual wisdom, religious beliefs, conformity, tradition' },
  { id: 6, name: 'The Lovers', arcana: 'major', keywords: ['love', 'harmony', 'relationships', 'values alignment'], reversedKeywords: ['disharmony', 'imbalance', 'poor choices'], meaning: 'Love, harmony, relationships, values alignment, choices' },
  { id: 7, name: 'The Chariot', arcana: 'major', keywords: ['control', 'willpower', 'success', 'action'], reversedKeywords: ['lack of control', 'directionless', 'aggression'], meaning: 'Control, willpower, success, action, determination' },
  { id: 8, name: 'Strength', arcana: 'major', keywords: ['strength', 'courage', 'persuasion', 'influence'], reversedKeywords: ['weakness', 'self-doubt', 'inner strength'], meaning: 'Strength, courage, persuasion, influence, compassion' },
  { id: 9, name: 'The Hermit', arcana: 'major', keywords: ['soul searching', 'introspection', 'being alone'], reversedKeywords: ['isolation', 'loneliness', 'withdrawal'], meaning: 'Soul searching, introspection, being alone, inner guidance' },
  { id: 10, name: 'Wheel of Fortune', arcana: 'major', keywords: ['good luck', 'karma', 'life cycles', 'destiny'], reversedKeywords: ['bad luck', 'resistance', 'lack of control'], meaning: 'Good luck, karma, life cycles, destiny, a turning point' },
  { id: 11, name: 'Justice', arcana: 'major', keywords: ['justice', 'fairness', 'truth', 'cause and effect'], reversedKeywords: ['unfairness', 'dishonesty', 'lack of accountability'], meaning: 'Justice, fairness, truth, cause and effect, law' },
  { id: 12, name: 'The Hanged Man', arcana: 'major', keywords: ['pause', 'surrender', 'letting go', 'new perspectives'], reversedKeywords: ['stalling', 'needless sacrifice', 'resistance'], meaning: 'Pause, surrender, letting go, new perspectives' },
  { id: 13, name: 'Death', arcana: 'major', keywords: ['endings', 'change', 'transformation', 'transition'], reversedKeywords: ['resistance', 'stagnation', 'inability to change'], meaning: 'Endings, change, transformation, transition' },
  { id: 14, name: 'Temperance', arcana: 'major', keywords: ['balance', 'moderation', 'patience', 'purpose'], reversedKeywords: ['imbalance', 'excess', 'lack of long-term vision'], meaning: 'Balance, moderation, patience, purpose' },
  { id: 15, name: 'The Devil', arcana: 'major', keywords: ['shadow self', 'attachment', 'addiction', 'restriction'], reversedKeywords: ['releasing', 'independence', 'reclaiming power'], meaning: 'Shadow self, attachment, addiction, restriction, sexuality' },
  { id: 16, name: 'The Tower', arcana: 'major', keywords: ['sudden change', 'upheaval', 'chaos', 'revelation'], reversedKeywords: ['avoiding disaster', 'resistance', 'internal explosion'], meaning: 'Sudden change, upheaval, chaos, revelation, awakening' },
  { id: 17, name: 'The Star', arcana: 'major', keywords: ['hope', 'faith', 'purpose', 'renewal'], reversedKeywords: ['hopelessness', 'faithlessness', 'lack of faith'], meaning: 'Hope, faith, purpose, renewal, spirituality' },
  { id: 18, name: 'The Moon', arcana: 'major', keywords: ['illusion', 'fear', 'anxiety', 'subconscious'], reversedKeywords: ['release of fear', 'repressed emotion', 'confusion'], meaning: 'Illusion, fear, anxiety, subconscious, intuition' },
  { id: 19, name: 'The Sun', arcana: 'major', keywords: ['positivity', 'fun', 'warmth', 'success'], reversedKeywords: ['depression', 'lack of success', 'inner child'], meaning: 'Positivity, fun, warmth, success, vitality' },
  { id: 20, name: 'Judgement', arcana: 'major', keywords: ['judgement', 'rebirth', 'inner calling', 'absolution'], reversedKeywords: ['lack of self awareness', 'self doubt', 'refusal of self examination'], meaning: 'Judgement, rebirth, inner calling, absolution' },
  { id: 21, name: 'The World', arcana: 'major', keywords: ['completion', 'accomplishment', 'travel', 'fulfillment'], reversedKeywords: ['incompletion', 'lack of closure', 'not moving forward'], meaning: 'Completion, accomplishment, travel, fulfillment' },

  // Minor Arcana - Wands
  { id: 22, name: 'Ace of Wands', suit: 'Wands', number: 1, arcana: 'minor', keywords: ['inspiration', 'power', 'creation', 'beginnings'], reversedKeywords: ['lack of energy', 'delays', 'creative blocks'], meaning: 'Inspiration, power, creation, beginnings, potential' },
  { id: 23, name: 'Two of Wands', suit: 'Wands', number: 2, arcana: 'minor', keywords: ['planning', 'making decisions', 'leaving home'], reversedKeywords: ['poor planning', 'fear of change', 'bad decisions'], meaning: 'Planning, making decisions, leaving home, discovery' },
  { id: 24, name: 'Three of Wands', suit: 'Wands', number: 3, arcana: 'minor', keywords: ['looking ahead', 'expansion', 'rapid growth'], reversedKeywords: ['obstacles', 'delays', 'restriction'], meaning: 'Looking ahead, expansion, rapid growth, foresight' },
  { id: 25, name: 'Four of Wands', suit: 'Wands', number: 4, arcana: 'minor', keywords: ['celebration', 'harmony', 'marriage', 'home'], reversedKeywords: ['conflict', 'instability', 'lack of support'], meaning: 'Celebration, harmony, marriage, home, community' },
  { id: 26, name: 'Five of Wands', suit: 'Wands', number: 5, arcana: 'minor', keywords: ['competition', 'rivalry', 'conflict'], reversedKeywords: ['avoiding conflict', 'conflict resolution', 'tension'], meaning: 'Competition, rivalry, conflict, tension' },
  { id: 27, name: 'Six of Wands', suit: 'Wands', number: 6, arcana: 'minor', keywords: ['victory', 'success', 'public reward'], reversedKeywords: ['lack of recognition', 'private achievement', 'ego'], meaning: 'Victory, success, public reward, recognition' },
  { id: 28, name: 'Seven of Wands', suit: 'Wands', number: 7, arcana: 'minor', keywords: ['perseverance', 'defensive', 'maintaining control'], reversedKeywords: ['giving up', 'overwhelmed', 'defeat'], meaning: 'Perseverance, defensive, maintaining control, protecting territory' },
  { id: 29, name: 'Eight of Wands', suit: 'Wands', number: 8, arcana: 'minor', keywords: ['rapid action', 'movement', 'quick decisions'], reversedKeywords: ['delays', 'resistance', 'slowing down'], meaning: 'Rapid action, movement, quick decisions, speed' },
  { id: 30, name: 'Nine of Wands', suit: 'Wands', number: 9, arcana: 'minor', keywords: ['resilience', 'grit', 'last stand'], reversedKeywords: ['exhaustion', 'fatigue', 'defensiveness'], meaning: 'Resilience, grit, last stand, persistence' },
  { id: 31, name: 'Ten of Wands', suit: 'Wands', number: 10, arcana: 'minor', keywords: ['accomplishment', 'carrying the burden', 'extra responsibility'], reversedKeywords: ['inability to delegate', 'overwhelmed', 'burden'], meaning: 'Accomplishment, carrying the burden, extra responsibility' },
  { id: 32, name: 'Page of Wands', suit: 'Wands', number: 11, arcana: 'minor', keywords: ['exploration', 'excitement', 'free spirit'], reversedKeywords: ['lack of direction', 'procrastination', 'immaturity'], meaning: 'Exploration, excitement, free spirit, discovery' },
  { id: 33, name: 'Knight of Wands', suit: 'Wands', number: 12, arcana: 'minor', keywords: ['action', 'adventure', 'fearlessness'], reversedKeywords: ['impulsiveness', 'lack of direction', 'delays'], meaning: 'Action, adventure, fearlessness, energy' },
  { id: 34, name: 'Queen of Wands', suit: 'Wands', number: 13, arcana: 'minor', keywords: ['courage', 'determination', 'joy'], reversedKeywords: ['selfishness', 'jealousy', 'insecurity'], meaning: 'Courage, determination, joy, confidence' },
  { id: 35, name: 'King of Wands', suit: 'Wands', number: 14, arcana: 'minor', keywords: ['natural-born leader', 'vision', 'entrepreneur'], reversedKeywords: ['impulsiveness', 'poor leadership', 'tyranny'], meaning: 'Natural-born leader, vision, entrepreneur, honor' },

  // Minor Arcana - Cups
  { id: 36, name: 'Ace of Cups', suit: 'Cups', number: 1, arcana: 'minor', keywords: ['new feelings', 'spirituality', 'intuition'], reversedKeywords: ['emotional loss', 'blocked creativity', 'feeling empty'], meaning: 'New feelings, spirituality, intuition, love' },
  { id: 37, name: 'Two of Cups', suit: 'Cups', number: 2, arcana: 'minor', keywords: ['unity', 'partnership', 'mutual attraction'], reversedKeywords: ['imbalance', 'breakdown', 'disharmony'], meaning: 'Unity, partnership, mutual attraction, connection' },
  { id: 38, name: 'Three of Cups', suit: 'Cups', number: 3, arcana: 'minor', keywords: ['friendship', 'community', 'happiness'], reversedKeywords: ['gossip', 'isolation', 'third party'], meaning: 'Friendship, community, happiness, celebrations' },
  { id: 39, name: 'Four of Cups', suit: 'Cups', number: 4, arcana: 'minor', keywords: ['apathy', 'contemplation', 'disconnectedness'], reversedKeywords: ['clarity', 'acceptance', 'moving forward'], meaning: 'Apathy, contemplation, disconnectedness, reevaluation' },
  { id: 40, name: 'Five of Cups', suit: 'Cups', number: 5, arcana: 'minor', keywords: ['loss', 'grief', 'self-pity'], reversedKeywords: ['acceptance', 'moving on', 'forgiveness'], meaning: 'Loss, grief, self-pity, disappointment' },
  { id: 41, name: 'Six of Cups', suit: 'Cups', number: 6, arcana: 'minor', keywords: ['revisiting the past', 'childhood memories', 'innocence'], reversedKeywords: ['living in the past', 'stuck', 'moving forward'], meaning: 'Revisiting the past, childhood memories, innocence' },
  { id: 42, name: 'Seven of Cups', suit: 'Cups', number: 7, arcana: 'minor', keywords: ['searching for purpose', 'choices', 'daydreaming'], reversedKeywords: ['lack of purpose', 'disillusionment', 'confusion'], meaning: 'Searching for purpose, choices, daydreaming, illusion' },
  { id: 43, name: 'Eight of Cups', suit: 'Cups', number: 8, arcana: 'minor', keywords: ['walking away', 'disillusionment', 'leaving behind'], reversedKeywords: ['avoidance', 'fear of abandonment', 'staying'], meaning: 'Walking away, disillusionment, leaving behind' },
  { id: 44, name: 'Nine of Cups', suit: 'Cups', number: 9, arcana: 'minor', keywords: ['satisfaction', 'emotional stability', 'luxury'], reversedKeywords: ['lack of inner joy', 'dissatisfaction', 'indulgence'], meaning: 'Satisfaction, emotional stability, luxury, wishes fulfilled' },
  { id: 45, name: 'Ten of Cups', suit: 'Cups', number: 10, arcana: 'minor', keywords: ['divine love', 'blissful relationships', 'harmony'], reversedKeywords: ['family conflict', 'disharmony', 'broken home'], meaning: 'Divine love, blissful relationships, harmony, alignment' },
  { id: 46, name: 'Page of Cups', suit: 'Cups', number: 11, arcana: 'minor', keywords: ['happy surprise', 'dreamer', 'sensitivity'], reversedKeywords: ['emotional immaturity', 'daydreaming', 'disappointment'], meaning: 'Happy surprise, dreamer, sensitivity, new feelings' },
  { id: 47, name: 'Knight of Cups', suit: 'Cups', number: 12, arcana: 'minor', keywords: ['following the heart', 'idealist', 'romantic'], reversedKeywords: ['moodiness', 'disillusionment', 'jealousy'], meaning: 'Following the heart, idealist, romantic, charming' },
  { id: 48, name: 'Queen of Cups', suit: 'Cups', number: 13, arcana: 'minor', keywords: ['compassion', 'calm', 'comfort'], reversedKeywords: ['emotional manipulation', 'dependence', 'insecurity'], meaning: 'Compassion, calm, comfort, emotional security' },
  { id: 49, name: 'King of Cups', suit: 'Cups', number: 14, arcana: 'minor', keywords: ['emotional balance', 'compassion', 'diplomacy'], reversedKeywords: ['emotional manipulation', 'moodiness', 'coldness'], meaning: 'Emotional balance, compassion, diplomacy, control' },

  // Minor Arcana - Swords
  { id: 50, name: 'Ace of Swords', suit: 'Swords', number: 1, arcana: 'minor', keywords: ['breakthrough', 'clarity', 'sharp mind'], reversedKeywords: ['confusion', 'chaos', 'lack of clarity'], meaning: 'Breakthrough, clarity, sharp mind, new ideas' },
  { id: 51, name: 'Two of Swords', suit: 'Swords', number: 2, arcana: 'minor', keywords: ['difficult choices', 'indecision', 'stalled decisions'], reversedKeywords: ['indecision', 'lesser of two evils', 'confusion'], meaning: 'Difficult choices, indecision, stalled decisions' },
  { id: 52, name: 'Three of Swords', suit: 'Swords', number: 3, arcana: 'minor', keywords: ['heartbreak', 'emotional pain', 'sorrow'], reversedKeywords: ['recovery', 'forgiveness', 'moving on'], meaning: 'Heartbreak, emotional pain, sorrow, grief' },
  { id: 53, name: 'Four of Swords', suit: 'Swords', number: 4, arcana: 'minor', keywords: ['rest', 'restoration', 'contemplation'], reversedKeywords: ['restlessness', 'burnout', 'exhaustion'], meaning: 'Rest, restoration, contemplation, recuperation' },
  { id: 54, name: 'Five of Swords', suit: 'Swords', number: 5, arcana: 'minor', keywords: ['unbridled ambition', 'win at all costs', 'betrayal'], reversedKeywords: ['reconciliation', 'forgiveness', 'revenge'], meaning: 'Unbridled ambition, win at all costs, betrayal' },
  { id: 55, name: 'Six of Swords', suit: 'Swords', number: 6, arcana: 'minor', keywords: ['transition', 'leaving behind', 'moving on'], reversedKeywords: ['stuck', 'unable to move forward', 'emotional baggage'], meaning: 'Transition, leaving behind, moving on, distance' },
  { id: 56, name: 'Seven of Swords', suit: 'Swords', number: 7, arcana: 'minor', keywords: ['deception', 'trickery', 'tactics and strategy'], reversedKeywords: ['confession', 'conscience', 'deception'], meaning: 'Deception, trickery, tactics and strategy, betrayal' },
  { id: 57, name: 'Eight of Swords', suit: 'Swords', number: 8, arcana: 'minor', keywords: ['imprisonment', 'entrapment', 'self-victimization'], reversedKeywords: ['self acceptance', 'new perspective', 'freedom'], meaning: 'Imprisonment, entrapment, self-victimization, restriction' },
  { id: 58, name: 'Nine of Swords', suit: 'Swords', number: 9, arcana: 'minor', keywords: ['anxiety', 'hopelessness', 'trauma'], reversedKeywords: ['hope', 'reaching out', 'healing'], meaning: 'Anxiety, hopelessness, trauma, nightmares' },
  { id: 59, name: 'Ten of Swords', suit: 'Swords', number: 10, arcana: 'minor', keywords: ['defeat', 'crisis', 'betrayal', 'endings'], reversedKeywords: ['recovery', 'regeneration', 'resurrection'], meaning: 'Defeat, crisis, betrayal, endings, back-stabbing' },
  { id: 60, name: 'Page of Swords', suit: 'Swords', number: 11, arcana: 'minor', keywords: ['curiosity', 'restlessness', 'mental energy'], reversedKeywords: ['deception', 'manipulation', 'all talk'], meaning: 'Curiosity, restlessness, mental energy, new ideas' },
  { id: 61, name: 'Knight of Swords', suit: 'Swords', number: 12, arcana: 'minor', keywords: ['action', 'impulsiveness', 'defending beliefs'], reversedKeywords: ['no direction', 'disregard for consequences', 'restlessness'], meaning: 'Action, impulsiveness, defending beliefs, no filter' },
  { id: 62, name: 'Queen of Swords', suit: 'Swords', number: 13, arcana: 'minor', keywords: ['clear boundaries', 'direct communication', 'uncompromising'], reversedKeywords: ['bitchiness', 'coldness', 'manipulation'], meaning: 'Clear boundaries, direct communication, uncompromising' },
  { id: 63, name: 'King of Swords', suit: 'Swords', number: 14, arcana: 'minor', keywords: ['mental clarity', 'intellectual power', 'truth'], reversedKeywords: ['manipulation', 'tyranny', 'abuse of power'], meaning: 'Mental clarity, intellectual power, truth, authority' },

  // Minor Arcana - Pentacles
  { id: 64, name: 'Ace of Pentacles', suit: 'Pentacles', number: 1, arcana: 'minor', keywords: ['opportunity', 'prosperity', 'new venture'], reversedKeywords: ['lost opportunity', 'lack of planning', 'bad investment'], meaning: 'Opportunity, prosperity, new venture, abundance' },
  { id: 65, name: 'Two of Pentacles', suit: 'Pentacles', number: 2, arcana: 'minor', keywords: ['balancing decisions', 'priorities', 'adapting to change'], reversedKeywords: ['imbalance', 'unorganized', 'overwhelmed'], meaning: 'Balancing decisions, priorities, adapting to change' },
  { id: 66, name: 'Three of Pentacles', suit: 'Pentacles', number: 3, arcana: 'minor', keywords: ['teamwork', 'collaboration', 'building'], reversedKeywords: ['lack of teamwork', 'disorganized', 'group conflict'], meaning: 'Teamwork, collaboration, building, learning' },
  { id: 67, name: 'Four of Pentacles', suit: 'Pentacles', number: 4, arcana: 'minor', keywords: ['conservation', 'security', 'frugality'], reversedKeywords: ['greediness', 'material possessions', 'self protection'], meaning: 'Conservation, security, frugality, saving money' },
  { id: 68, name: 'Five of Pentacles', suit: 'Pentacles', number: 5, arcana: 'minor', keywords: ['need', 'poverty', 'insecurity'], reversedKeywords: ['recovery', 'spiritual poverty', 'isolation'], meaning: 'Need, poverty, insecurity, hardship' },
  { id: 69, name: 'Six of Pentacles', suit: 'Pentacles', number: 6, arcana: 'minor', keywords: ['charity', 'generosity', 'sharing'], reversedKeywords: ['strings attached', 'stinginess', 'power and domination'], meaning: 'Charity, generosity, sharing, giving and receiving' },
  { id: 70, name: 'Seven of Pentacles', suit: 'Pentacles', number: 7, arcana: 'minor', keywords: ['hard work', 'perseverance', 'diligence'], reversedKeywords: ['lack of growth', 'delays', 'impatience'], meaning: 'Hard work, perseverance, diligence, long-term vision' },
  { id: 71, name: 'Eight of Pentacles', suit: 'Pentacles', number: 8, arcana: 'minor', keywords: ['skill', 'quality', 'mastery'], reversedKeywords: ['lack of quality', 'skill development', 'perfectionism'], meaning: 'Skill, quality, mastery, development' },
  { id: 72, name: 'Nine of Pentacles', suit: 'Pentacles', number: 9, arcana: 'minor', keywords: ['fruits of labor', 'rewards', 'luxury'], reversedKeywords: ['overindulgence', 'lack of discipline', 'financial setbacks'], meaning: 'Fruits of labor, rewards, luxury, self-sufficiency' },
  { id: 73, name: 'Ten of Pentacles', suit: 'Pentacles', number: 10, arcana: 'minor', keywords: ['legacy', 'inheritance', 'crown'], reversedKeywords: ['financial failure', 'family problems', 'instability'], meaning: 'Legacy, inheritance, crown, culmination' },
  { id: 74, name: 'Page of Pentacles', suit: 'Pentacles', number: 11, arcana: 'minor', keywords: ['ambition', 'desire', 'diligence'], reversedKeywords: ['lack of commitment', 'procrastination', 'greed'], meaning: 'Ambition, desire, diligence, new opportunities' },
  { id: 75, name: 'Knight of Pentacles', suit: 'Pentacles', number: 12, arcana: 'minor', keywords: ['efficiency', 'hard work', 'responsibility'], reversedKeywords: ['laziness', 'boredom', 'stagnation'], meaning: 'Efficiency, hard work, responsibility, routine' },
  { id: 76, name: 'Queen of Pentacles', suit: 'Pentacles', number: 13, arcana: 'minor', keywords: ['practicality', 'creature comforts', 'financial security'], reversedKeywords: ['self centeredness', 'smothering', 'insecurity'], meaning: 'Practicality, creature comforts, financial security, nurturing' },
  { id: 77, name: 'King of Pentacles', suit: 'Pentacles', number: 14, arcana: 'minor', keywords: ['abundance', 'prosperity', 'security'], reversedKeywords: ['financial failure', 'greed', 'chauvinistic'], meaning: 'Abundance, prosperity, security, wealth' },
];

// Helper function to generate image URL for a card
export function getCardImageUrl(card: TarotCard): string {
  if (card.arcana === 'major') {
    const majorNames = [
      'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
      'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
      'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
      'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun',
      'Judgement', 'The World'
    ];
    const index = majorNames.indexOf(card.name);
    if (index !== -1) {
      return `/images/cards/ar${String(index).padStart(2, '0')}.jpg`;
    }
  } else {
    const suitMap: { [key: string]: string } = { 'Cups': 'cu', 'Swords': 'sw', 'Wands': 'wa', 'Pentacles': 'pe' };
    if (card.suit && card.number) {
      const suitPrefix = suitMap[card.suit] || 'cu';
      let cardCode: string;
      if (card.number === 1) {
        cardCode = 'ac';
      } else if (card.number === 11) {
        cardCode = 'pa';
      } else if (card.number === 12) {
        cardCode = 'kn';
      } else if (card.number === 13) {
        cardCode = 'qu';
      } else if (card.number === 14) {
        cardCode = 'ki';
      } else {
        cardCode = String(card.number).padStart(2, '0');
      }
      return `/images/cards/${suitPrefix}${cardCode}.jpg`;
    }
  }
  return '';
}

// Add imageUrl to all cards
export const tarotCardsWithImages: TarotCard[] = tarotCards.map(card => ({
  ...card,
  imageUrl: getCardImageUrl(card)
}));

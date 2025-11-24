export interface TarotCard {
  id: number;
  name: string;
  suit?: string;
  number?: number;
  arcana: 'major' | 'minor';
  keywords: string[];
  meaning: string;
  reversed?: string;
}

export const tarotCards: TarotCard[] = [
  // Major Arcana
  { id: 0, name: 'The Fool', arcana: 'major', keywords: ['beginnings', 'innocence', 'spontaneity'], meaning: 'New beginnings, innocence, spontaneity, a free spirit' },
  { id: 1, name: 'The Magician', arcana: 'major', keywords: ['manifestation', 'resourcefulness', 'power'], meaning: 'Manifestation, resourcefulness, power, inspired action' },
  { id: 2, name: 'The High Priestess', arcana: 'major', keywords: ['intuition', 'unconscious', 'inner voice'], meaning: 'Intuition, unconscious knowledge, inner voice' },
  { id: 3, name: 'The Empress', arcana: 'major', keywords: ['femininity', 'beauty', 'nature', 'nurturing'], meaning: 'Femininity, beauty, nature, nurturing, abundance' },
  { id: 4, name: 'The Emperor', arcana: 'major', keywords: ['authority', 'establishment', 'structure'], meaning: 'Authority, establishment, structure, a father figure' },
  { id: 5, name: 'The Hierophant', arcana: 'major', keywords: ['spiritual wisdom', 'religious beliefs', 'conformity'], meaning: 'Spiritual wisdom, religious beliefs, conformity, tradition' },
  { id: 6, name: 'The Lovers', arcana: 'major', keywords: ['love', 'harmony', 'relationships', 'values alignment'], meaning: 'Love, harmony, relationships, values alignment, choices' },
  { id: 7, name: 'The Chariot', arcana: 'major', keywords: ['control', 'willpower', 'success', 'action'], meaning: 'Control, willpower, success, action, determination' },
  { id: 8, name: 'Strength', arcana: 'major', keywords: ['strength', 'courage', 'persuasion', 'influence'], meaning: 'Strength, courage, persuasion, influence, compassion' },
  { id: 9, name: 'The Hermit', arcana: 'major', keywords: ['soul searching', 'introspection', 'being alone'], meaning: 'Soul searching, introspection, being alone, inner guidance' },
  { id: 10, name: 'Wheel of Fortune', arcana: 'major', keywords: ['good luck', 'karma', 'life cycles', 'destiny'], meaning: 'Good luck, karma, life cycles, destiny, a turning point' },
  { id: 11, name: 'Justice', arcana: 'major', keywords: ['justice', 'fairness', 'truth', 'cause and effect'], meaning: 'Justice, fairness, truth, cause and effect, law' },
  { id: 12, name: 'The Hanged Man', arcana: 'major', keywords: ['pause', 'surrender', 'letting go', 'new perspectives'], meaning: 'Pause, surrender, letting go, new perspectives' },
  { id: 13, name: 'Death', arcana: 'major', keywords: ['endings', 'change', 'transformation', 'transition'], meaning: 'Endings, change, transformation, transition' },
  { id: 14, name: 'Temperance', arcana: 'major', keywords: ['balance', 'moderation', 'patience', 'purpose'], meaning: 'Balance, moderation, patience, purpose' },
  { id: 15, name: 'The Devil', arcana: 'major', keywords: ['shadow self', 'attachment', 'addiction', 'restriction'], meaning: 'Shadow self, attachment, addiction, restriction, sexuality' },
  { id: 16, name: 'The Tower', arcana: 'major', keywords: ['sudden change', 'upheaval', 'chaos', 'revelation'], meaning: 'Sudden change, upheaval, chaos, revelation, awakening' },
  { id: 17, name: 'The Star', arcana: 'major', keywords: ['hope', 'faith', 'purpose', 'renewal'], meaning: 'Hope, faith, purpose, renewal, spirituality' },
  { id: 18, name: 'The Moon', arcana: 'major', keywords: ['illusion', 'fear', 'anxiety', 'subconscious'], meaning: 'Illusion, fear, anxiety, subconscious, intuition' },
  { id: 19, name: 'The Sun', arcana: 'major', keywords: ['positivity', 'fun', 'warmth', 'success'], meaning: 'Positivity, fun, warmth, success, vitality' },
  { id: 20, name: 'Judgement', arcana: 'major', keywords: ['judgement', 'rebirth', 'inner calling', 'absolution'], meaning: 'Judgement, rebirth, inner calling, absolution' },
  { id: 21, name: 'The World', arcana: 'major', keywords: ['completion', 'accomplishment', 'travel', 'fulfillment'], meaning: 'Completion, accomplishment, travel, fulfillment' },

  // Minor Arcana - Wands
  { id: 22, name: 'Ace of Wands', suit: 'Wands', number: 1, arcana: 'minor', keywords: ['inspiration', 'power', 'creation', 'beginnings'], meaning: 'Inspiration, power, creation, beginnings, potential' },
  { id: 23, name: 'Two of Wands', suit: 'Wands', number: 2, arcana: 'minor', keywords: ['planning', 'making decisions', 'leaving home'], meaning: 'Planning, making decisions, leaving home, discovery' },
  { id: 24, name: 'Three of Wands', suit: 'Wands', number: 3, arcana: 'minor', keywords: ['looking ahead', 'expansion', 'rapid growth'], meaning: 'Looking ahead, expansion, rapid growth, foresight' },
  { id: 25, name: 'Four of Wands', suit: 'Wands', number: 4, arcana: 'minor', keywords: ['celebration', 'harmony', 'marriage', 'home'], meaning: 'Celebration, harmony, marriage, home, community' },
  { id: 26, name: 'Five of Wands', suit: 'Wands', number: 5, arcana: 'minor', keywords: ['competition', 'rivalry', 'conflict'], meaning: 'Competition, rivalry, conflict, tension' },
  { id: 27, name: 'Six of Wands', suit: 'Wands', number: 6, arcana: 'minor', keywords: ['victory', 'success', 'public reward'], meaning: 'Victory, success, public reward, recognition' },
  { id: 28, name: 'Seven of Wands', suit: 'Wands', number: 7, arcana: 'minor', keywords: ['perseverance', 'defensive', 'maintaining control'], meaning: 'Perseverance, defensive, maintaining control, protecting territory' },
  { id: 29, name: 'Eight of Wands', suit: 'Wands', number: 8, arcana: 'minor', keywords: ['rapid action', 'movement', 'quick decisions'], meaning: 'Rapid action, movement, quick decisions, speed' },
  { id: 30, name: 'Nine of Wands', suit: 'Wands', number: 9, arcana: 'minor', keywords: ['resilience', 'grit', 'last stand'], meaning: 'Resilience, grit, last stand, persistence' },
  { id: 31, name: 'Ten of Wands', suit: 'Wands', number: 10, arcana: 'minor', keywords: ['accomplishment', 'carrying the burden', 'extra responsibility'], meaning: 'Accomplishment, carrying the burden, extra responsibility' },
  { id: 32, name: 'Page of Wands', suit: 'Wands', number: 11, arcana: 'minor', keywords: ['exploration', 'excitement', 'free spirit'], meaning: 'Exploration, excitement, free spirit, discovery' },
  { id: 33, name: 'Knight of Wands', suit: 'Wands', number: 12, arcana: 'minor', keywords: ['action', 'adventure', 'fearlessness'], meaning: 'Action, adventure, fearlessness, energy' },
  { id: 34, name: 'Queen of Wands', suit: 'Wands', number: 13, arcana: 'minor', keywords: ['courage', 'determination', 'joy'], meaning: 'Courage, determination, joy, confidence' },
  { id: 35, name: 'King of Wands', suit: 'Wands', number: 14, arcana: 'minor', keywords: ['natural-born leader', 'vision', 'entrepreneur'], meaning: 'Natural-born leader, vision, entrepreneur, honor' },

  // Minor Arcana - Cups
  { id: 36, name: 'Ace of Cups', suit: 'Cups', number: 1, arcana: 'minor', keywords: ['new feelings', 'spirituality', 'intuition'], meaning: 'New feelings, spirituality, intuition, love' },
  { id: 37, name: 'Two of Cups', suit: 'Cups', number: 2, arcana: 'minor', keywords: ['unity', 'partnership', 'mutual attraction'], meaning: 'Unity, partnership, mutual attraction, connection' },
  { id: 38, name: 'Three of Cups', suit: 'Cups', number: 3, arcana: 'minor', keywords: ['friendship', 'community', 'happiness'], meaning: 'Friendship, community, happiness, celebrations' },
  { id: 39, name: 'Four of Cups', suit: 'Cups', number: 4, arcana: 'minor', keywords: ['apathy', 'contemplation', 'disconnectedness'], meaning: 'Apathy, contemplation, disconnectedness, reevaluation' },
  { id: 40, name: 'Five of Cups', suit: 'Cups', number: 5, arcana: 'minor', keywords: ['loss', 'grief', 'self-pity'], meaning: 'Loss, grief, self-pity, disappointment' },
  { id: 41, name: 'Six of Cups', suit: 'Cups', number: 6, arcana: 'minor', keywords: ['revisiting the past', 'childhood memories', 'innocence'], meaning: 'Revisiting the past, childhood memories, innocence' },
  { id: 42, name: 'Seven of Cups', suit: 'Cups', number: 7, arcana: 'minor', keywords: ['searching for purpose', 'choices', 'daydreaming'], meaning: 'Searching for purpose, choices, daydreaming, illusion' },
  { id: 43, name: 'Eight of Cups', suit: 'Cups', number: 8, arcana: 'minor', keywords: ['walking away', 'disillusionment', 'leaving behind'], meaning: 'Walking away, disillusionment, leaving behind' },
  { id: 44, name: 'Nine of Cups', suit: 'Cups', number: 9, arcana: 'minor', keywords: ['satisfaction', 'emotional stability', 'luxury'], meaning: 'Satisfaction, emotional stability, luxury, wishes fulfilled' },
  { id: 45, name: 'Ten of Cups', suit: 'Cups', number: 10, arcana: 'minor', keywords: ['divine love', 'blissful relationships', 'harmony'], meaning: 'Divine love, blissful relationships, harmony, alignment' },
  { id: 46, name: 'Page of Cups', suit: 'Cups', number: 11, arcana: 'minor', keywords: ['happy surprise', 'dreamer', 'sensitivity'], meaning: 'Happy surprise, dreamer, sensitivity, new feelings' },
  { id: 47, name: 'Knight of Cups', suit: 'Cups', number: 12, arcana: 'minor', keywords: ['following the heart', 'idealist', 'romantic'], meaning: 'Following the heart, idealist, romantic, charming' },
  { id: 48, name: 'Queen of Cups', suit: 'Cups', number: 13, arcana: 'minor', keywords: ['compassion', 'calm', 'comfort'], meaning: 'Compassion, calm, comfort, emotional security' },
  { id: 49, name: 'King of Cups', suit: 'Cups', number: 14, arcana: 'minor', keywords: ['emotional balance', 'compassion', 'diplomacy'], meaning: 'Emotional balance, compassion, diplomacy, control' },

  // Minor Arcana - Swords
  { id: 50, name: 'Ace of Swords', suit: 'Swords', number: 1, arcana: 'minor', keywords: ['breakthrough', 'clarity', 'sharp mind'], meaning: 'Breakthrough, clarity, sharp mind, new ideas' },
  { id: 51, name: 'Two of Swords', suit: 'Swords', number: 2, arcana: 'minor', keywords: ['difficult choices', 'indecision', 'stalled decisions'], meaning: 'Difficult choices, indecision, stalled decisions' },
  { id: 52, name: 'Three of Swords', suit: 'Swords', number: 3, arcana: 'minor', keywords: ['heartbreak', 'emotional pain', 'sorrow'], meaning: 'Heartbreak, emotional pain, sorrow, grief' },
  { id: 53, name: 'Four of Swords', suit: 'Swords', number: 4, arcana: 'minor', keywords: ['rest', 'restoration', 'contemplation'], meaning: 'Rest, restoration, contemplation, recuperation' },
  { id: 54, name: 'Five of Swords', suit: 'Swords', number: 5, arcana: 'minor', keywords: ['unbridled ambition', 'win at all costs', 'betrayal'], meaning: 'Unbridled ambition, win at all costs, betrayal' },
  { id: 55, name: 'Six of Swords', suit: 'Swords', number: 6, arcana: 'minor', keywords: ['transition', 'leaving behind', 'moving on'], meaning: 'Transition, leaving behind, moving on, distance' },
  { id: 56, name: 'Seven of Swords', suit: 'Swords', number: 7, arcana: 'minor', keywords: ['deception', 'trickery', 'tactics and strategy'], meaning: 'Deception, trickery, tactics and strategy, betrayal' },
  { id: 57, name: 'Eight of Swords', suit: 'Swords', number: 8, arcana: 'minor', keywords: ['imprisonment', 'entrapment', 'self-victimization'], meaning: 'Imprisonment, entrapment, self-victimization, restriction' },
  { id: 58, name: 'Nine of Swords', suit: 'Swords', number: 9, arcana: 'minor', keywords: ['anxiety', 'hopelessness', 'trauma'], meaning: 'Anxiety, hopelessness, trauma, nightmares' },
  { id: 59, name: 'Ten of Swords', suit: 'Swords', number: 10, arcana: 'minor', keywords: ['defeat', 'crisis', 'betrayal', 'endings'], meaning: 'Defeat, crisis, betrayal, endings, back-stabbing' },
  { id: 60, name: 'Page of Swords', suit: 'Swords', number: 11, arcana: 'minor', keywords: ['curiosity', 'restlessness', 'mental energy'], meaning: 'Curiosity, restlessness, mental energy, new ideas' },
  { id: 61, name: 'Knight of Swords', suit: 'Swords', number: 12, arcana: 'minor', keywords: ['action', 'impulsiveness', 'defending beliefs'], meaning: 'Action, impulsiveness, defending beliefs, no filter' },
  { id: 62, name: 'Queen of Swords', suit: 'Swords', number: 13, arcana: 'minor', keywords: ['clear boundaries', 'direct communication', 'uncompromising'], meaning: 'Clear boundaries, direct communication, uncompromising' },
  { id: 63, name: 'King of Swords', suit: 'Swords', number: 14, arcana: 'minor', keywords: ['mental clarity', 'intellectual power', 'truth'], meaning: 'Mental clarity, intellectual power, truth, authority' },

  // Minor Arcana - Pentacles
  { id: 64, name: 'Ace of Pentacles', suit: 'Pentacles', number: 1, arcana: 'minor', keywords: ['opportunity', 'prosperity', 'new venture'], meaning: 'Opportunity, prosperity, new venture, abundance' },
  { id: 65, name: 'Two of Pentacles', suit: 'Pentacles', number: 2, arcana: 'minor', keywords: ['balancing decisions', 'priorities', 'adapting to change'], meaning: 'Balancing decisions, priorities, adapting to change' },
  { id: 66, name: 'Three of Pentacles', suit: 'Pentacles', number: 3, arcana: 'minor', keywords: ['teamwork', 'collaboration', 'building'], meaning: 'Teamwork, collaboration, building, learning' },
  { id: 67, name: 'Four of Pentacles', suit: 'Pentacles', number: 4, arcana: 'minor', keywords: ['conservation', 'security', 'frugality'], meaning: 'Conservation, security, frugality, saving money' },
  { id: 68, name: 'Five of Pentacles', suit: 'Pentacles', number: 5, arcana: 'minor', keywords: ['need', 'poverty', 'insecurity'], meaning: 'Need, poverty, insecurity, hardship' },
  { id: 69, name: 'Six of Pentacles', suit: 'Pentacles', number: 6, arcana: 'minor', keywords: ['charity', 'generosity', 'sharing'], meaning: 'Charity, generosity, sharing, giving and receiving' },
  { id: 70, name: 'Seven of Pentacles', suit: 'Pentacles', number: 7, arcana: 'minor', keywords: ['hard work', 'perseverance', 'diligence'], meaning: 'Hard work, perseverance, diligence, long-term vision' },
  { id: 71, name: 'Eight of Pentacles', suit: 'Pentacles', number: 8, arcana: 'minor', keywords: ['skill', 'quality', 'mastery'], meaning: 'Skill, quality, mastery, development' },
  { id: 72, name: 'Nine of Pentacles', suit: 'Pentacles', number: 9, arcana: 'minor', keywords: ['fruits of labor', 'rewards', 'luxury'], meaning: 'Fruits of labor, rewards, luxury, self-sufficiency' },
  { id: 73, name: 'Ten of Pentacles', suit: 'Pentacles', number: 10, arcana: 'minor', keywords: ['legacy', 'inheritance', 'crown'], meaning: 'Legacy, inheritance, crown, culmination' },
  { id: 74, name: 'Page of Pentacles', suit: 'Pentacles', number: 11, arcana: 'minor', keywords: ['ambition', 'desire', 'diligence'], meaning: 'Ambition, desire, diligence, new opportunities' },
  { id: 75, name: 'Knight of Pentacles', suit: 'Pentacles', number: 12, arcana: 'minor', keywords: ['efficiency', 'hard work', 'responsibility'], meaning: 'Efficiency, hard work, responsibility, routine' },
  { id: 76, name: 'Queen of Pentacles', suit: 'Pentacles', number: 13, arcana: 'minor', keywords: ['practicality', 'creature comforts', 'financial security'], meaning: 'Practicality, creature comforts, financial security, nurturing' },
  { id: 77, name: 'King of Pentacles', suit: 'Pentacles', number: 14, arcana: 'minor', keywords: ['abundance', 'prosperity', 'security'], meaning: 'Abundance, prosperity, security, wealth' },
];



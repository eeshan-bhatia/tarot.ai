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
  // Major Arcana (22 cards)
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

  // Minor Arcana - Selected 4 cards to make 26 total
  { id: 22, name: 'Ace of Cups', suit: 'Cups', number: 1, arcana: 'minor', keywords: ['new feelings', 'spirituality', 'intuition'], meaning: 'New feelings, spirituality, intuition, love' },
  { id: 23, name: 'Ace of Swords', suit: 'Swords', number: 1, arcana: 'minor', keywords: ['breakthrough', 'clarity', 'sharp mind'], meaning: 'Breakthrough, clarity, sharp mind, new ideas' },
  { id: 24, name: 'Ace of Wands', suit: 'Wands', number: 1, arcana: 'minor', keywords: ['inspiration', 'power', 'creation', 'beginnings'], meaning: 'Inspiration, power, creation, beginnings, potential' },
  { id: 25, name: 'Ace of Pentacles', suit: 'Pentacles', number: 1, arcana: 'minor', keywords: ['opportunity', 'prosperity', 'new venture'], meaning: 'Opportunity, prosperity, new venture, abundance' },
];



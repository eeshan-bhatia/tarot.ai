export interface TarotCard {
  id: number;
  name: string;
  suit?: string;
  number?: number;
  arcana: 'major' | 'minor';
  keywords: string[];
  meaning: string;
  reversed: string;
  reversedKeywords: string[];
  isReversed?: boolean; // This will be set when card is selected
}

export const tarotCards: TarotCard[] = [
  // Major Arcana (22 cards)
  { id: 0, name: 'The Fool', arcana: 'major', keywords: ['beginnings', 'innocence', 'spontaneity'], meaning: 'New beginnings, innocence, spontaneity, a free spirit', reversed: 'Recklessness, risk-taking, lack of direction, poor judgment', reversedKeywords: ['recklessness', 'naivety', 'foolishness', 'carelessness'] },
  { id: 1, name: 'The Magician', arcana: 'major', keywords: ['manifestation', 'resourcefulness', 'power'], meaning: 'Manifestation, resourcefulness, power, inspired action', reversed: 'Manipulation, untapped talents, poor planning, untrustworthy', reversedKeywords: ['manipulation', 'deception', 'lack of focus', 'wasted potential'] },
  { id: 2, name: 'The High Priestess', arcana: 'major', keywords: ['intuition', 'unconscious', 'inner voice'], meaning: 'Intuition, unconscious knowledge, inner voice', reversed: 'Secrets, disconnected from intuition, withdrawal, silence', reversedKeywords: ['secrets', 'repression', 'disconnection', 'lack of insight'] },
  { id: 3, name: 'The Empress', arcana: 'major', keywords: ['femininity', 'beauty', 'nature', 'nurturing'], meaning: 'Femininity, beauty, nature, nurturing, abundance', reversed: 'Dependence, smothering, emptiness, lack of growth', reversedKeywords: ['dependence', 'infertility', 'creative block', 'neglect'] },
  { id: 4, name: 'The Emperor', arcana: 'major', keywords: ['authority', 'establishment', 'structure'], meaning: 'Authority, establishment, structure, a father figure', reversed: 'Domination, excessive control, rigidity, inflexibility', reversedKeywords: ['tyranny', 'rigidity', 'stubbornness', 'coldness'] },
  { id: 5, name: 'The Hierophant', arcana: 'major', keywords: ['spiritual wisdom', 'religious beliefs', 'conformity'], meaning: 'Spiritual wisdom, religious beliefs, conformity, tradition', reversed: 'Rebellion, non-conformity, new methods, personal beliefs', reversedKeywords: ['rebellion', 'non-conformity', 'unconventional', 'challenging tradition'] },
  { id: 6, name: 'The Lovers', arcana: 'major', keywords: ['love', 'harmony', 'relationships', 'values alignment'], meaning: 'Love, harmony, relationships, values alignment, choices', reversed: 'Disharmony, imbalance, misalignment of values, poor choices', reversedKeywords: ['disharmony', 'imbalance', 'bad decisions', 'misalignment'] },
  { id: 7, name: 'The Chariot', arcana: 'major', keywords: ['control', 'willpower', 'success', 'action'], meaning: 'Control, willpower, success, action, determination', reversed: 'Lack of control, opposition, lack of direction, aggression', reversedKeywords: ['lack of control', 'opposition', 'no direction', 'aggression'] },
  { id: 8, name: 'Strength', arcana: 'major', keywords: ['strength', 'courage', 'persuasion', 'influence'], meaning: 'Strength, courage, persuasion, influence, compassion', reversed: 'Weakness, self-doubt, inner strength, raw emotion', reversedKeywords: ['weakness', 'self-doubt', 'insecurity', 'lack of discipline'] },
  { id: 9, name: 'The Hermit', arcana: 'major', keywords: ['soul searching', 'introspection', 'being alone'], meaning: 'Soul searching, introspection, being alone, inner guidance', reversed: 'Isolation, withdrawal, loneliness, lost your way', reversedKeywords: ['isolation', 'loneliness', 'withdrawal', 'lost direction'] },
  { id: 10, name: 'Wheel of Fortune', arcana: 'major', keywords: ['good luck', 'karma', 'life cycles', 'destiny'], meaning: 'Good luck, karma, life cycles, destiny, a turning point', reversed: 'Bad luck, resistance to change, breaking cycles, lack of control', reversedKeywords: ['bad luck', 'resistance', 'breaking cycles', 'lack of control'] },
  { id: 11, name: 'Justice', arcana: 'major', keywords: ['justice', 'fairness', 'truth', 'cause and effect'], meaning: 'Justice, fairness, truth, cause and effect, law', reversed: 'Injustice, lack of accountability, dishonesty, unfairness', reversedKeywords: ['injustice', 'unfairness', 'dishonesty', 'lack of accountability'] },
  { id: 12, name: 'The Hanged Man', arcana: 'major', keywords: ['pause', 'surrender', 'letting go', 'new perspectives'], meaning: 'Pause, surrender, letting go, new perspectives', reversed: 'Stalling, needless sacrifice, fear of sacrifice, resistance', reversedKeywords: ['stalling', 'resistance', 'wasted effort', 'unwillingness'] },
  { id: 13, name: 'Death', arcana: 'major', keywords: ['endings', 'change', 'transformation', 'transition'], meaning: 'Endings, change, transformation, transition', reversed: 'Resistance to change, inability to move on, stagnation, decay', reversedKeywords: ['resistance', 'stagnation', 'inability to move on', 'decay'] },
  { id: 14, name: 'Temperance', arcana: 'major', keywords: ['balance', 'moderation', 'patience', 'purpose'], meaning: 'Balance, moderation, patience, purpose', reversed: 'Imbalance, excess, lack of long-term vision, recklessness', reversedKeywords: ['imbalance', 'excess', 'lack of vision', 'recklessness'] },
  { id: 15, name: 'The Devil', arcana: 'major', keywords: ['shadow self', 'attachment', 'addiction', 'restriction'], meaning: 'Shadow self, attachment, addiction, restriction, sexuality', reversed: 'Releasing limiting beliefs, exploring dark thoughts, detachment', reversedKeywords: ['release', 'detachment', 'freedom', 'breaking free'] },
  { id: 16, name: 'The Tower', arcana: 'major', keywords: ['sudden change', 'upheaval', 'chaos', 'revelation'], meaning: 'Sudden change, upheaval, chaos, revelation, awakening', reversed: 'Avoiding disaster, fear of change, internal explosion, resistance', reversedKeywords: ['avoiding disaster', 'resistance', 'internal explosion', 'delaying change'] },
  { id: 17, name: 'The Star', arcana: 'major', keywords: ['hope', 'faith', 'purpose', 'renewal'], meaning: 'Hope, faith, purpose, renewal, spirituality', reversed: 'Lack of faith, despair, disconnection, faithlessness', reversedKeywords: ['despair', 'lack of faith', 'disconnection', 'hopelessness'] },
  { id: 18, name: 'The Moon', arcana: 'major', keywords: ['illusion', 'fear', 'anxiety', 'subconscious'], meaning: 'Illusion, fear, anxiety, subconscious, intuition', reversed: 'Releasing fear, repressed emotion, inner confusion, clarity', reversedKeywords: ['releasing fear', 'clarity', 'repressed emotion', 'inner confusion'] },
  { id: 19, name: 'The Sun', arcana: 'major', keywords: ['positivity', 'fun', 'warmth', 'success'], meaning: 'Positivity, fun, warmth, success, vitality', reversed: 'Negativity, depression, sadness, lack of success', reversedKeywords: ['negativity', 'depression', 'sadness', 'lack of success'] },
  { id: 20, name: 'Judgement', arcana: 'major', keywords: ['judgement', 'rebirth', 'inner calling', 'absolution'], meaning: 'Judgement, rebirth, inner calling, absolution', reversed: 'Self-doubt, lack of self-awareness, failure to learn lessons', reversedKeywords: ['self-doubt', 'lack of awareness', 'failure to learn', 'self-criticism'] },
  { id: 21, name: 'The World', arcana: 'major', keywords: ['completion', 'accomplishment', 'travel', 'fulfillment'], meaning: 'Completion, accomplishment, travel, fulfillment', reversed: 'Incompletion, lack of closure, lack of accomplishment, emptiness', reversedKeywords: ['incompletion', 'lack of closure', 'emptiness', 'unfulfilled'] },

  // Minor Arcana - Selected 4 cards to make 26 total
  { id: 22, name: 'Ace of Cups', suit: 'Cups', number: 1, arcana: 'minor', keywords: ['new feelings', 'spirituality', 'intuition'], meaning: 'New feelings, spirituality, intuition, love', reversed: 'Emotional loss, blocked creativity, emptiness, lack of connection', reversedKeywords: ['emotional loss', 'blocked creativity', 'emptiness', 'lack of connection'] },
  { id: 23, name: 'Ace of Swords', suit: 'Swords', number: 1, arcana: 'minor', keywords: ['breakthrough', 'clarity', 'sharp mind'], meaning: 'Breakthrough, clarity, sharp mind, new ideas', reversed: 'Confusion, chaos, lack of clarity, miscommunication', reversedKeywords: ['confusion', 'chaos', 'lack of clarity', 'miscommunication'] },
  { id: 24, name: 'Ace of Wands', suit: 'Wands', number: 1, arcana: 'minor', keywords: ['inspiration', 'power', 'creation', 'beginnings'], meaning: 'Inspiration, power, creation, beginnings, potential', reversed: 'Lack of energy, lack of passion, delays, creative blocks', reversedKeywords: ['lack of energy', 'lack of passion', 'delays', 'creative blocks'] },
  { id: 25, name: 'Ace of Pentacles', suit: 'Pentacles', number: 1, arcana: 'minor', keywords: ['opportunity', 'prosperity', 'new venture'], meaning: 'Opportunity, prosperity, new venture, abundance', reversed: 'Lost opportunity, lack of planning, bad investment, lack of resources', reversedKeywords: ['lost opportunity', 'lack of planning', 'bad investment', 'lack of resources'] },
];



export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type GameMode = 'Flashcards' | 'Quiz';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: 'Stats' | 'Planning' | 'Tools' | 'Pedagogy';
  options?: string[];
  correctOptionIndex?: number;
}

export interface GameState {
  mode: GameMode | null;
  difficulty: Difficulty | null;
  activeCards: Flashcard[];
  currentIndex: number;
  isFlipped: boolean;
  knownIds: string[];
  reviewIds: string[];
  isComplete: boolean;
  selectedOptionIndex: number | null;
  showFeedback: boolean;
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic2, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Trophy,
  BookOpen,
  Info,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { FLASHCARDS } from './constants';
import { GameState, Flashcard } from './types';

export default function App() {
  const [state, setState] = useState<GameState>({
    mode: null,
    difficulty: null,
    activeCards: [],
    currentIndex: 0,
    isFlipped: false,
    knownIds: [],
    reviewIds: [],
    isComplete: false,
    selectedOptionIndex: null,
    showFeedback: false,
  });

  const shuffle = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startSession = (mode: GameMode, difficulty: Difficulty) => {
    let cards: Flashcard[] = [];
    switch (difficulty) {
      case 'Easy':
        cards = FLASHCARDS.slice(0, 7);
        break;
      case 'Medium':
        cards = shuffle(FLASHCARDS).slice(0, 10);
        break;
      case 'Hard':
        cards = shuffle(FLASHCARDS);
        break;
    }

    setState({
      mode,
      difficulty,
      activeCards: cards,
      currentIndex: 0,
      isFlipped: false,
      knownIds: [],
      reviewIds: [],
      isComplete: false,
      selectedOptionIndex: null,
      showFeedback: false,
    });
  };

  const currentCard = state.activeCards[state.currentIndex];
  const progress = state.activeCards.length > 0 ? ((state.currentIndex + 1) / state.activeCards.length) * 100 : 0;

  const handleFlip = () => {
    if (state.mode === 'Flashcards') {
      setState(prev => ({ ...prev, isFlipped: !prev.isFlipped }));
    }
  };

  const handleOptionSelect = (index: number) => {
    if (state.showFeedback) return;
    
    setState(prev => ({
      ...prev,
      selectedOptionIndex: index,
      showFeedback: true
    }));

    // Auto-advance after a delay
    setTimeout(() => {
      const isCorrect = index === currentCard.correctOptionIndex;
      handleNext(isCorrect);
    }, 1500);
  };

  const handleNext = (known: boolean) => {
    const cardId = currentCard.id;
    const isLastCard = state.currentIndex === state.activeCards.length - 1;

    setState(prev => ({
      ...prev,
      isFlipped: false,
      selectedOptionIndex: null,
      showFeedback: false,
      knownIds: known ? [...prev.knownIds, cardId] : prev.knownIds,
      reviewIds: !known ? [...prev.reviewIds, cardId] : prev.reviewIds,
      currentIndex: isLastCard ? prev.currentIndex : prev.currentIndex + 1,
      isComplete: isLastCard,
    }));
  };

  const resetGame = () => {
    setState({
      mode: null,
      difficulty: null,
      activeCards: [],
      currentIndex: 0,
      isFlipped: false,
      knownIds: [],
      reviewIds: [],
      isComplete: false,
      selectedOptionIndex: null,
      showFeedback: false,
    });
  };

  const getCategoryColor = (category: Flashcard['category']) => {
    switch (category) {
      case 'Stats': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Planning': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Tools': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pedagogy': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!state.mode) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4 font-serif">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full border border-gray-100"
        >
          <div className="w-16 h-16 bg-[#5A5A40] rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
            <Mic2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Podcast Pro</h1>
          <p className="text-gray-500 text-center mb-8 font-sans text-sm uppercase tracking-widest">Choose Your Mode</p>

          <div className="space-y-4">
            <button 
              onClick={() => setState(prev => ({ ...prev, mode: 'Flashcards' }))}
              className="w-full group bg-white hover:bg-stone-50 border-2 border-stone-100 p-6 rounded-2xl transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600 group-hover:bg-[#5A5A40] group-hover:text-white transition-colors">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-lg">Flashcards</div>
                <div className="text-xs text-gray-500 font-sans font-semibold uppercase tracking-wider">Review & Flip</div>
              </div>
            </button>

            <button 
              onClick={() => setState(prev => ({ ...prev, mode: 'Quiz' }))}
              className="w-full group bg-white hover:bg-stone-50 border-2 border-stone-100 p-6 rounded-2xl transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600 group-hover:bg-[#5A5A40] group-hover:text-white transition-colors">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-lg">Quiz</div>
                <div className="text-xs text-gray-500 font-sans font-semibold uppercase tracking-wider">Multiple Choice</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!state.difficulty) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4 font-serif">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full border border-gray-100"
        >
          <button onClick={() => setState(prev => ({ ...prev, mode: null }))} className="mb-6 text-gray-400 hover:text-gray-600 flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold">
            <ChevronLeft className="w-4 h-4" /> Back to modes
          </button>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Select Difficulty</h1>
          <p className="text-gray-500 text-center mb-8 font-sans text-sm uppercase tracking-widest">{state.mode} Mode</p>

          <div className="space-y-4">
            <button 
              onClick={() => startSession(state.mode!, 'Easy')}
              className="w-full group bg-white hover:bg-blue-50 border-2 border-blue-100 p-4 rounded-2xl transition-all flex items-center justify-between"
            >
              <div className="text-left">
                <div className="font-bold text-blue-700 text-lg">Easy</div>
                <div className="text-xs text-blue-500 font-sans font-semibold uppercase tracking-wider">7 Questions</div>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-300 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => startSession(state.mode!, 'Medium')}
              className="w-full group bg-white hover:bg-emerald-50 border-2 border-emerald-100 p-4 rounded-2xl transition-all flex items-center justify-between"
            >
              <div className="text-left">
                <div className="font-bold text-emerald-700 text-lg">Medium</div>
                <div className="text-xs text-emerald-500 font-sans font-semibold uppercase tracking-wider">10 Questions</div>
              </div>
              <ChevronRight className="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => startSession(state.mode!, 'Hard')}
              className="w-full group bg-white hover:bg-orange-50 border-2 border-orange-100 p-4 rounded-2xl transition-all flex items-center justify-between"
            >
              <div className="text-left">
                <div className="font-bold text-orange-700 text-lg">Hard</div>
                <div className="text-xs text-orange-500 font-sans font-semibold uppercase tracking-wider">All 14 Questions</div>
              </div>
              <ChevronRight className="w-5 h-5 text-orange-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (state.isComplete) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4 font-serif">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {state.mode === 'Quiz' ? 'Quiz Finished!' : 'Workshop Mastered!'}
          </h1>
          <p className="text-gray-600 mb-8">
            You've completed the <strong>{state.difficulty}</strong> {state.mode.toLowerCase()} session.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-700">{state.knownIds.length}</div>
              <div className="text-xs uppercase tracking-wider text-emerald-600 font-sans font-semibold">
                {state.mode === 'Quiz' ? 'Correct' : 'Mastered'}
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <div className="text-2xl font-bold text-orange-700">{state.reviewIds.length}</div>
              <div className="text-xs uppercase tracking-wider text-orange-600 font-sans font-semibold">
                {state.mode === 'Quiz' ? 'Incorrect' : 'To Review'}
              </div>
            </div>
          </div>

          <button 
            onClick={resetGame}
            className="w-full bg-[#5A5A40] hover:bg-[#4A4A30] text-white py-4 rounded-full font-sans font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Main Menu
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center p-4 md:p-8 font-serif">
      {/* Header */}
      <header className="w-full max-w-2xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={resetGame} className="w-10 h-10 bg-[#5A5A40] rounded-xl flex items-center justify-center text-white hover:bg-[#4A4A30] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Podcast Pro</h1>
            <p className="text-xs text-gray-500 font-sans uppercase tracking-widest">{state.mode} • {state.difficulty}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-sans font-bold text-gray-400">
            {state.currentIndex + 1} / {state.activeCards.length}
          </div>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-[#5A5A40]"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-2xl flex-1 flex flex-col items-center justify-center gap-8">
        {state.mode === 'Flashcards' ? (
          <>
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] perspective-1000 cursor-pointer" onClick={handleFlip}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={state.currentIndex + (state.isFlipped ? '-back' : '-front')}
                  initial={{ rotateY: state.isFlipped ? -90 : 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: state.isFlipped ? 90 : -90, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className={`w-full h-full bg-white rounded-[32px] shadow-2xl p-8 md:p-12 flex flex-col border border-gray-100 relative overflow-hidden`}>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-gray-50 rounded-full opacity-50" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <span className={`px-4 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider border ${getCategoryColor(currentCard.category)}`}>
                          {currentCard.category}
                        </span>
                        <div className="text-gray-300">
                          {state.isFlipped ? <BookOpen className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
                        </div>
                      </div>
                      <div className="flex-1 flex items-center justify-center text-center">
                        <h2 className={`text-2xl md:text-3xl font-bold text-gray-800 leading-snug ${state.isFlipped ? 'italic font-medium' : ''}`}>
                          {state.isFlipped ? currentCard.answer : currentCard.question}
                        </h2>
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-400 font-sans uppercase tracking-widest font-semibold">
                          {state.isFlipped ? 'Click to see question' : 'Click to reveal answer'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="w-full max-w-md grid grid-cols-2 gap-4">
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                className="group bg-white hover:bg-orange-50 border-2 border-orange-100 text-orange-600 py-4 rounded-2xl font-sans font-bold transition-all flex flex-col items-center gap-1 shadow-sm hover:shadow-md"
              >
                <HelpCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Review Later
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                className="group bg-white hover:bg-emerald-50 border-2 border-emerald-100 text-emerald-600 py-4 rounded-2xl font-sans font-bold transition-all flex flex-col items-center gap-1 shadow-sm hover:shadow-md"
              >
                <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Got It!
              </button>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col gap-8">
            <div className="bg-white rounded-[32px] shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gray-50 rounded-full opacity-50" />
              <div className="relative z-10">
                <span className={`px-4 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider border mb-6 inline-block ${getCategoryColor(currentCard.category)}`}>
                  {currentCard.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
                  {currentCard.question}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCard.options?.map((option, index) => {
                const isSelected = state.selectedOptionIndex === index;
                const isCorrect = index === currentCard.correctOptionIndex;
                const showCorrect = state.showFeedback && isCorrect;
                const showWrong = state.showFeedback && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    disabled={state.showFeedback}
                    onClick={() => handleOptionSelect(index)}
                    className={`
                      p-6 rounded-2xl text-left font-sans font-semibold transition-all border-2
                      ${!state.showFeedback ? 'bg-white border-gray-100 hover:border-[#5A5A40] hover:bg-stone-50' : ''}
                      ${showCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : ''}
                      ${showWrong ? 'bg-orange-50 border-orange-500 text-orange-700' : ''}
                      ${state.showFeedback && !showCorrect && !showWrong ? 'bg-gray-50 border-gray-100 opacity-50' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {showWrong && <HelpCircle className="w-5 h-5 text-orange-500" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="mt-12 w-full max-w-2xl border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 font-sans text-xs uppercase tracking-widest font-semibold">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          <span>Based on "Podcasting in Education" Workshop</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{state.knownIds.length} Correct</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span>{state.reviewIds.length} Incorrect</span>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 {
          perspective: 1000px;
        }
      `}} />
    </div>
  );
}

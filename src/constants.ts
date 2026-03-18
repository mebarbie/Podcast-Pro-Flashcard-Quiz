import { Flashcard } from './types';

export const FLASHCARDS: Flashcard[] = [
  {
    id: '1',
    category: 'Stats',
    question: 'What percentage of the Belgian population listens to a podcast monthly?',
    answer: '29% (according to the 2024 Digimeter/IMEC research center).',
    options: ['15%', '29%', '42%', '55%'],
    correctOptionIndex: 1
  },
  {
    id: '2',
    category: 'Stats',
    question: 'What is the core age group for podcast listeners in Belgium?',
    answer: '18-55 years old, which aligns well with adult education students.',
    options: ['12-25', '18-55', '25-45', '45-65'],
    correctOptionIndex: 1
  },
  {
    id: '3',
    category: 'Planning',
    question: 'What are the four components of the "Skeleton" framework for planning a podcast?',
    answer: '1. For Whom? (Audience), 2. Learning Goal, 3. Format (Solo, Interview, etc.), 4. The Hook.',
    options: [
      'Intro, Body, Outro, Music',
      'Audience, Goal, Format, Hook',
      'Script, Recording, Editing, Publishing',
      'Title, Description, Cover Art, RSS'
    ],
    correctOptionIndex: 1
  },
  {
    id: '4',
    category: 'Pedagogy',
    question: 'How long should an instructional podcast episode typically be?',
    answer: 'Around 10 minutes. Long episodes lose engagement fast.',
    options: ['5 minutes', '10 minutes', '30 minutes', '60 minutes'],
    correctOptionIndex: 1
  },
  {
    id: '5',
    category: 'Tools',
    question: 'Which tool is recommended for simple recording without needing an account?',
    answer: 'Vocaroo.com. It allows up to 6 hours of recording in one session.',
    options: ['Audacity', 'Spotify for Podcasters', 'Vocaroo', 'Adobe Audition'],
    correctOptionIndex: 2
  },
  {
    id: '6',
    category: 'Tools',
    question: 'What is the primary function of Turboscribe.co?',
    answer: 'It converts audio files into word-for-word text transcripts (supports Dutch/Flemish).',
    options: ['Audio Editing', 'Podcast Hosting', 'Transcription', 'AI Voice Generation'],
    correctOptionIndex: 2
  },
  {
    id: '7',
    category: 'Tools',
    question: 'Which Google tool can generate a podcast-style "Audio Overview" from your lesson materials?',
    answer: 'NotebookLM. It uses two AI speakers to discuss your uploaded content.',
    options: ['Gemini', 'Google Podcasts', 'NotebookLM', 'YouTube Music'],
    correctOptionIndex: 2
  },
  {
    id: '8',
    category: 'Planning',
    question: 'What is "The Hook" in a podcast context?',
    answer: 'The first 30 seconds of the intro that grabs listeners every episode. It should be consistent.',
    options: [
      'The background music',
      'The call to action at the end',
      'The first 30 seconds that grabs listeners',
      'The podcast logo'
    ],
    correctOptionIndex: 2
  },
  {
    id: '9',
    category: 'Pedagogy',
    question: 'What are the four levels of podcast use in education mentioned in the workshop?',
    answer: '1. Passive (Full Recording), 2. Semi-Active (Audio Summary), 3. Active (Extra Content), 4. Fully Active (Students Create).',
    options: [
      'Listening, Reading, Writing, Speaking',
      'Passive, Semi-Active, Active, Fully Active',
      'Instruction, Reflection, Discussion, Flipped',
      'Creation, Editing, Sharing, Feedback'
    ],
    correctOptionIndex: 1
  },
  {
    id: '10',
    category: 'Pedagogy',
    question: 'True or False: You need expensive equipment (over €10,000) for classroom podcasting.',
    answer: 'False. A smartphone, computer, and a quiet room with a carpet are enough to start.',
    options: ['True', 'False'],
    correctOptionIndex: 1
  },
  {
    id: '11',
    category: 'Pedagogy',
    question: 'What is the "Flipped Learning" use case for podcasts?',
    answer: 'Assigning the podcast as pre-class homework. It instantly reveals who actually listened when they bring notes to class.',
    options: [
      'Recording lessons for absent students',
      'Assigning the podcast as pre-class homework',
      'Having students record their own reflections',
      'Using AI to summarize a live lecture'
    ],
    correctOptionIndex: 1
  },
  {
    id: '12',
    category: 'Tools',
    question: 'Which tool can auto-generate a visual presentation from a transcript or PDF?',
    answer: 'Gamma (sometimes referred to as Hamma in the slides).',
    options: ['Canva', 'Gamma', 'PowerPoint', 'Prezi'],
    correctOptionIndex: 1
  },
  {
    id: '13',
    category: 'Pedagogy',
    question: 'Why should you avoid "over-editing" your educational podcasts?',
    answer: 'It costs time and adds no learning value. Natural speech and filler words are part of the charm.',
    options: [
      'It makes the file size too large',
      'It costs time and adds no learning value',
      'Students prefer professional quality',
      'AI can do it better'
    ],
    correctOptionIndex: 1
  },
  {
    id: '14',
    category: 'Pedagogy',
    question: 'What is the "Shift in Mindset" recommended for AI in education?',
    answer: 'Moving from "whether to allow AI" to "how can AI be used here to deepen learning?"',
    options: [
      'Banning AI to prevent cheating',
      'Replacing teachers with AI',
      'How can AI be used here to deepen learning?',
      'Using AI only for administrative tasks'
    ],
    correctOptionIndex: 2
  }
];

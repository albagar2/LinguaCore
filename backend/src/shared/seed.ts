import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding 100% Complete English Master Book Curriculum...');

  const studentPassword = await argon2.hash('student123');
  const adminPassword = await argon2.hash('admin123');

  await prisma.user.upsert({
    where: { email: 'admin@linguacore.com' },
    update: { xp: 250 },
    create: {
      email: 'admin@linguacore.com', password: adminPassword, name: 'Jane Admin', role: 'ADMIN', level: 'ADVANCED', xp: 250
    },
  });

  const dummyUsers = [
    { email: 'alex@linguacore.com', name: 'Alex River', xp: 4250, level: 'ADVANCED' },
    { email: 'sarah@linguacore.com', name: 'Sarah Chen', xp: 3800, level: 'INTERMEDIATE' },
    { email: 'micky@linguacore.com', name: 'Micky Doe', xp: 1200, level: 'BEGINNER' },
  ];

  for (const u of dummyUsers) {
    await prisma.user.upsert({
        where: { email: u.email },
        update: { xp: u.xp },
        create: { ...u, password: studentPassword, role: 'STUDENT' }
    });
  }

  // Clear existing educational content
  await prisma.progress.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.vocabulary.deleteMany();

  // --- VOLUME I: A1-A2 FOUNDATIONS ---
  await prisma.lesson.create({
    data: {
      title: 'Identity & The Verb To Be',
      description: 'The foundation of English communication.',
      content: `The verb 'To Be' is the most important pillar. It describes states, professions, and origins.
      Pronouns: I am, You are, He/She/It is.`,
      level: 'BEGINNER', category: 'GRAMMAR',
      exercises: { create: [{ type: 'FILL_BLANKS', question: 'My sister __________ a talented musician.', correctAnswer: 'is', explanation: 'Use "is" for she.' }] }
    }
  });

  // --- VOLUME II: B1-B2 INTERMEDIATE ---
  await prisma.lesson.create({
    data: {
      title: 'The Passive Voice',
      description: 'Focus on the action, not the doer.',
      content: `Present: "Houses are built." Past: "A house was built."`,
      level: 'INTERMEDIATE', category: 'GRAMMAR',
      exercises: { create: [{ type: 'FILL_BLANKS', question: 'My bike _______ _______ stolen yesterday.', correctAnswer: 'was', explanation: 'Past passive needs "was/were".' }] }
    }
  });

  // --- VOLUME III: C1 ADVANCED ---
  await prisma.lesson.create({
    data: {
        title: 'Grammatical Inversion',
        description: 'Adding emphasis and formal tone.',
        content: `Never have I seen... / No sooner had he finished...`,
        level: 'ADVANCED', category: 'GRAMMAR',
        exercises: { create: [{ type: 'FILL_BLANKS', question: 'No _______ _______ I arrived than the train left.', correctAnswer: 'sooner had', explanation: 'No sooner had... than structure.' }] }
    }
  });

  // --- VOLUME IV: MASTERY SUPPLEMENT (Part 5) ---
  await prisma.lesson.create({
    data: {
      title: 'Hedging: Diplomatic English',
      description: 'How to sound polite and professional in C1/C2.',
      content: `Hedging is using words like "perhaps", "slightly", or "possibly" to avoid being too direct.
      Instead of "That is a bad idea", use "I have some slight reservations about that."`,
      level: 'ADVANCED', category: 'BUSINESS',
      exercises: {
        create: [
          {
            type: 'MULTIPLE_CHOICE',
            question: 'Which is a diplomatic way to say "Give me the report"?',
            options: JSON.stringify(['Give it now', 'I was wondering if you could possibly send me the report?', 'Send report', 'Report please']),
            correctAnswer: 'I was wondering if you could possibly send me the report?',
            explanation: '"I was wondering if..." is a classic hedging structure.'
          }
        ]
      }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Advanced Phonetics: Linking',
      description: 'Connect your words to sound like a native speaker.',
      content: `Linking happens when a word ending in a consonant connects to one starting with a vowel.
      Example: "An apple" sounds like /anapple/.
      The Schwa /ə/ is the most common sound (computEr, About).`,
      level: 'ADVANCED', category: 'SPEAKING',
      exercises: {
        create: [
          {
            type: 'SPEAKING',
            question: 'Read with linking: An apple a day.',
            correctAnswer: 'An apple a day',
            explanation: 'Focus on connecting the "n" of "an" to "apple".'
          }
        ]
      }
    }
  });

  // --- VOLUME V: ULTIMATE EXPANSION (Part 6) ---
  await prisma.lesson.create({
    data: {
      title: 'Power Collocations: Make vs Do',
      description: 'Stop guessing which verb to use.',
      content: `MAKE: A decision, a mistake, progress, an effort.
      DO: Business, homework, a favor, exercise.`,
      level: 'INTERMEDIATE', category: 'VOCABULARY',
      exercises: {
        create: [
          {
            type: 'FILL_BLANKS',
            question: 'I need to _______ a decision today.',
            correctAnswer: 'make',
            explanation: 'We always "make" decisions, never "do" them.'
          }
        ]
      }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'British vs American English',
      description: 'Understanding the differences across the Atlantic.',
      content: `Vocabulary:
      UK: Lift | US: Elevator
      UK: Flat | US: Apartment
      Spelling:
      UK: Colour | US: Color
      UK: Centre | US: Center`,
      level: 'INTERMEDIATE', category: 'VOCABULARY',
      exercises: {
        create: [
          {
            type: 'MULTIPLE_CHOICE',
            question: 'How do you say "Elevator" in British English?',
            options: JSON.stringify(['Lift', 'Ascending', 'Box', 'Hole']),
            correctAnswer: 'Lift',
            explanation: '"Lift" is the standard UK term.'
          }
        ]
      }
    }
  });

  // --- COMPREHENSIVE VOCABULARY ---
  const vocabulary = [
    { word: 'Hedging', meaning: 'Softening the language to be diplomatic.', translation: 'Suavizar el lenguaje', synonyms: 'Caution, diplomacy', example: 'Using hedging makes you sound more polite.', level: 'ADVANCED', category: 'NOUN' },
    { word: 'Under the pump', meaning: 'Being under a lot of pressure.', translation: 'Bajo mucha presión', synonyms: 'Stressed, busy', example: 'We are really under the pump this week.', level: 'ADVANCED', category: 'IDIOM' },
    { word: 'Pencil in', meaning: 'To schedule something provisionally.', translation: 'Agendar provisionalmente', synonyms: 'Draft, plan', example: 'Let\'s pencil in a meeting for Friday.', level: 'INTERMEDIATE', category: 'VERB' },
    { word: 'Ubiquitous', meaning: 'Found everywhere.', translation: 'Ubicuo', synonyms: 'Pervasive', example: 'Plastic is ubiquitous in the ocean.', level: 'ADVANCED', category: 'ADJECTIVE' },
    { word: 'Fathom', meaning: 'To understand something complex.', translation: 'Comprender profundamente', synonyms: 'Grasp', example: 'I can\'t fathom why she left.', level: 'ADVANCED', category: 'VERB' },
    { word: 'Lift', meaning: 'British for Elevator.', translation: 'Ascensor', synonyms: 'Elevator', example: 'The lift is out of order.', level: 'BEGINNER', category: 'NOUN' },
    { word: 'Flat', meaning: 'British for Apartment.', translation: 'Piso / Apartamento', synonyms: 'Apartment', example: 'They live in a small flat.', level: 'BEGINNER', category: 'NOUN' },
    { word: 'Ameliorate', meaning: 'To make something better.', translation: 'Mejorar', synonyms: 'Improve', example: 'We must ameliorate the situation.', level: 'ADVANCED', category: 'VERB' },
  ];

  for (const item of vocabulary) {
    await prisma.vocabulary.create({ data: item });
  }

  console.log('✅ 100% Curriculum Sync Complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

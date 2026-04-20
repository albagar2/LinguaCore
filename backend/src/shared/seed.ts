import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding rich educational content for LinguaCore...');

  const studentPassword = await argon2.hash('student123');
  const adminPassword = await argon2.hash('admin123');

  await prisma.user.upsert({
    where: { email: 'student@linguacore.com' },
    update: {},
    create: {
      email: 'student@linguacore.com', password: studentPassword, name: 'John Student', role: 'STUDENT', level: 'BEGINNER',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@linguacore.com' },
    update: {},
    create: {
      email: 'admin@linguacore.com', password: adminPassword, name: 'Jane Admin', role: 'ADMIN', level: 'ADVANCED',
    },
  });

  // --- LESSON 1: Phrasal Verbs ---
  await prisma.lesson.create({
    data: {
      title: 'Common Phrasal Verbs',
      description: 'The secret weapon of natural English speakers.',
      content: `Phrasal verbs are a combination of a verb and a particle (a preposition or adverb).
      When combined, they often have a completely different meaning than the original verb.
      
      Examples:
      - Call off: To cancel something. (e.g., "They called off the meeting.")
      - Pick up: To collect someone or something. (e.g., "I will pick you up at 8.")
      - Give up: To stop doing something. (e.g., "Don't give up on your dreams!")
      
      Mastering these will make you sound much more native and informal when needed.`,
      level: 'ADVANCED',
      category: 'VOCABULARY',
      exercises: {
        create: [
          {
            type: 'MULTIPLE_CHOICE',
            question: 'What does "Call off" mean?',
            options: JSON.stringify(['Cancel', 'Postpone', 'Continue', 'Start']),
            correctAnswer: 'Cancel',
            explanation: 'To "call off" means to decide that a planned event will not happen.'
          },
          {
            type: 'FILL_BLANKS',
            question: 'I will ______ you up at 8 PM.',
            correctAnswer: 'pick',
            explanation: 'To "pick up" someone is to collect them, usually in a vehicle.'
          }
        ]
      }
    }
  });

  // --- LESSON 2: Job Interviews ---
  await prisma.lesson.create({
    data: {
      title: 'The Professional Interview',
      description: 'Strategic language to land your dream job.',
      content: `Answering interview questions in English requires clarity and professional vocabulary.
      Focus on your achievements and use action verbs.
      
      Key Vocabulary:
      - Background: Your professional history and education.
      - Strengths: What you are naturally good at.
      - Weaknesses: Areas where you are improving.
      
      Strategic Tip: Always provide examples for your strengths using the STAR method (Situation, Task, Action, Result).`,
      level: 'ADVANCED',
      category: 'BUSINESS',
      exercises: {
        create: [
          {
            type: 'FILL_BLANKS',
            question: 'Tell me about your __________.',
            correctAnswer: 'background',
            explanation: 'This refers to your history and experience.'
          },
          {
            type: 'MULTIPLE_CHOICE',
            question: 'Which term refers to your professional skills?',
            options: JSON.stringify(['Strengths', 'Powers', 'Forces', 'Goods']),
            correctAnswer: 'Strengths',
            explanation: '"Strengths" is the professional way to describe yours positive attributes.'
          }
        ]
      }
    }
  });

  // --- LESSON 3: Past Simple ---
  await prisma.lesson.create({
    data: {
      title: 'The Past Simple Tense',
      description: 'Essential for storytelling and reporting facts.',
      content: `We use the Past Simple to talk about completed actions at a specific time in the past.
      
      Structure:
      - Regular verbs: Add -ed (e.g., Walk -> Walked, Cook -> Cooked).
      - Irregular verbs: Have a unique form (e.g., Go -> Went, Eat -> Ate).
      
      Negative Form: Use "did not" (didn't) + base form.
      Example: "I didn't see the movie."`,
      level: 'INTERMEDIATE',
      category: 'GRAMMAR',
      exercises: {
        create: [
          {
            type: 'MULTIPLE_CHOICE',
            question: 'What is the past form of "GO"?',
            options: JSON.stringify(['Goed', 'Went', 'Gone', 'Goes']),
            correctAnswer: 'Went',
            explanation: '"Go" is an irregular verb.'
          }
        ]
      }
    }
  });

  console.log('📖 Seeding Vocabulary Glossary...');

  const vocab = [
    { word: 'Call off', meaning: 'To cancel an event or activity.', example: 'The game was called off because of rain.', level: 'ADVANCED', category: 'PHRASAL_VERB' },
    { word: 'Pick up', meaning: 'To collect someone or something.', example: 'I will pick you up at the airport.', level: 'ADVANCED', category: 'PHRASAL_VERB' },
    { word: 'Background', meaning: 'A person\'s education and experience.', example: 'She has a background in psychology.', level: 'INTERMEDIATE', category: 'BUSINESS' },
    { word: 'Strengths', meaning: 'Positive qualities or skills.', example: 'What are your main strengths?', level: 'INTERMEDIATE', category: 'BUSINESS' },
    { word: 'Luggage', meaning: 'Bags and suitcases for travel.', example: 'I have too much luggage for this trip.', level: 'BEGINNER', category: 'VOCABULARY' },
    { word: 'Went', meaning: 'Past form of the verb "Go".', example: 'I went to London last summer.', level: 'BEGINNER', category: 'VERB' },
  ];

  for (const item of vocab) {
    await prisma.vocabulary.upsert({
      where: { word: item.word },
      update: {},
      create: item,
    });
  }

  console.log('✅ LinguaCore Theory, Practice & Glossary seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

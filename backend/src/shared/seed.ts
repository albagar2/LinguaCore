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

  // Clear existing educational content safely with correct FK order
  await prisma.flashcardProgress.deleteMany();
  await prisma.userAchievement.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.vocabulary.deleteMany();
  await prisma.achievement.deleteMany();

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

  // --- VOLUME VI: CONTEMPORARY TOPICS ---
  await prisma.lesson.create({
    data: {
      title: 'AI Ethics & Regulation',
      description: 'Navigating the complex moral landscape of artificial intelligence.',
      content: `As AI becomes ubiquitous, questions of bias, transparency, and accountability are paramount.
      Engineers and policymakers must collaborate to ensure safety.`,
      level: 'ADVANCED', category: 'BUSINESS',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'What is a primary concern in AI ethics?', options: JSON.stringify(['Speed', 'Algorithmic Bias', 'Cost', 'Logo design']), correctAnswer: 'Algorithmic Bias', explanation: 'Bias in training data can lead to unfair outcomes.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Sustainability in Modern Cities',
      description: 'Using conditionals to discuss environmental solutions.',
      content: `If we invest in public transport, carbon emissions will decrease.
      If a city is green, its citizens are happier.`,
      level: 'INTERMEDIATE', category: 'GRAMMAR',
      exercises: { create: [{ type: 'FILL_BLANKS', question: 'If we _______ (plant) more trees, the air quality will improve.', correctAnswer: 'plant', explanation: 'First conditional: If + present simple, will + verb.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Digital Nomad Lifestyle',
      description: 'Essential vocabulary for working from anywhere in the world.',
      content: `Remote work, coworking spaces, high-speed Wi-Fi, and digital visas are keywords for today's workers.`,
      level: 'BEGINNER', category: 'VOCABULARY',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'Where do digital nomads usually work?', options: JSON.stringify(['Underwater', 'Coworking spaces', 'Caves', 'Space stations']), correctAnswer: 'Coworking spaces', explanation: 'Coworking spaces provide the infrastructure nomads need.' }] }
    }
  });

  // --- VOLUME VII: LISTENING & SPEAKING ---
  await prisma.lesson.create({
    data: {
      title: 'Mastering Vowel Pronunciation',
      description: 'A deep dive into the 12 vowel sounds of English.',
      content: 'Watch the video to see the mouth movements for each sound.',
      level: 'BEGINNER', category: 'SPEAKING',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'How is the sound /i:/ in "sheep" different from /ɪ/ in "ship"?', options: JSON.stringify(['Longer', 'Shorter', 'Higher', 'Invisible']), correctAnswer: 'Longer', explanation: '/i:/ is a long vowel.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Business Negotiation Listening',
      description: 'Listen to a real-world negotiation and identify key points.',
      content: 'Pay attention to the persuasive language used by both parties.',
      level: 'ADVANCED', category: 'LISTENING',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'What was the main objection of the client?', options: JSON.stringify(['Price', 'Timeline', 'Quality', 'Logo']), correctAnswer: 'Price', explanation: 'The client specifically mentioned the budget constraints.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Common Phrasal Verbs in Conversation',
      description: 'Listening practice with everyday phrasal verbs.',
      content: 'Identify verbs like "get along", "look after", and "run into".',
      level: 'INTERMEDIATE', category: 'LISTENING',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'What does "get along" mean?', options: JSON.stringify(['To leave', 'To have a good relationship', 'To run fast', 'To sleep']), correctAnswer: 'To have a good relationship', explanation: 'To get along means to be friendly with someone.' }] }
    }
  });

  // --- VOLUME VIII: COMPREHENSIVE EXPANSION ---
  await prisma.lesson.create({
    data: {
      title: 'The Future of Urban Living',
      description: 'Reading comprehension about smart cities and sustainability.',
      content: 'In the next 50 years, cities will be denser, greener, and more interconnected. Vertical farming and zero-emission transport will be the norm.',
      level: 'INTERMEDIATE', category: 'READING',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'What is vertical farming?', options: JSON.stringify(['Farming in space', 'Growing crops in stacked layers', 'Farming underground', 'Invisible plants']), correctAnswer: 'Growing crops in stacked layers', explanation: 'Vertical farming optimizes space by stacking crops.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Tech Leadership Interview',
      description: 'Listen to a CEO discussing the impact of AI on the workforce.',
      content: 'Understand high-level business vocabulary and strategic thinking.',
      level: 'ADVANCED', category: 'LISTENING',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'What is the CEO concerned about?', options: JSON.stringify(['AI Ethics', 'Coffee prices', 'Office furniture', 'Cloud storage']), correctAnswer: 'AI Ethics', explanation: 'The CEO emphasized the importance of ethical AI deployment.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Culinary Arts & Vocabulary',
      description: 'Terms used in international kitchens and fine dining.',
      content: 'Learn verbs like "sauté", "blanch", "simmer", and "sear".',
      level: 'BEGINNER', category: 'VOCABULARY',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'What does "simmer" mean?', options: JSON.stringify(['To boil rapidly', 'To cook gently below boiling', 'To freeze', 'To cut into cubes']), correctAnswer: 'To cook gently below boiling', explanation: 'Simmering is a gentle cooking technique.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'The History of the Industrial Revolution',
      description: 'A reading journey through the changes of the 18th century.',
      content: 'Steam engines, textile mills, and the rise of urban centers transformed the world forever.',
      level: 'ADVANCED', category: 'READING',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'What was a key invention mentioned?', options: JSON.stringify(['Steam engine', 'Internet', 'Telephone', 'Airplane']), correctAnswer: 'Steam engine', explanation: 'The steam engine was the heart of the Industrial Revolution.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Arrival at London Heatrow',
      description: 'Practical English for navigating an international airport.',
      content: 'Listening practice for announcements and immigration questions.',
      level: 'BEGINNER', category: 'LISTENING',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'What should you have ready at immigration?', options: JSON.stringify(['Passport', 'A sandwich', 'A camera', 'A hat']), correctAnswer: 'Passport', explanation: 'Passports are required for legal entry.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Idioms for Daily Success',
      description: 'Master common metaphors used in English conversations.',
      content: 'Break the ice, piece of cake, under the weather, etc.',
      level: 'INTERMEDIATE', category: 'VOCABULARY',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'What does "break the ice" mean?', options: JSON.stringify(['To make someone feel relaxed', 'To smash frozen water', 'To be angry', 'To buy a drink']), correctAnswer: 'To make someone feel relaxed', explanation: 'It means to start a conversation in a stiff situation.' }] }
    }
  });

  // --- VOLUME IX: ELITE CURRICULUM EXPANSION ---
  await prisma.lesson.create({
    data: {
      title: 'Mastering the American R',
      description: 'The most distinct sound in General American English.',
      content: 'Learn how to pull the tongue back without touching the roof of the mouth. Practice with words like "River", "Car", and "Mirror".',
      level: 'INTERMEDIATE', category: 'SPEAKING',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'Where is the tongue position for the American /r/?', options: JSON.stringify(['Touching teeth', 'Pulled back/bunched', 'Flat on bottom', 'Touching lips']), correctAnswer: 'Pulled back/bunched', explanation: 'The tongue is retroflexed or bunched back.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Pitching Your Big Idea',
      description: 'Persuasive language for startups and innovators.',
      content: 'Focus on the "Hook", the "Problem", and the "Solution". Use strong verbs like "Revolutionize" and "Disrupt".',
      level: 'ADVANCED', category: 'BUSINESS',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'What is a "Hook" in a pitch?', options: JSON.stringify(['A physical tool', 'An attention-grabbing opening', 'A closing statement', 'A type of logo']), correctAnswer: 'An attention-grabbing opening', explanation: 'A hook catches the listener\'s interest immediately.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Shakespeare for Beginners',
      description: 'Understanding the roots of modern English idioms.',
      content: '"To be or not to be", "All that glitters is not gold". Many modern phrases come from the Bard.',
      level: 'INTERMEDIATE', category: 'READING',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'Who wrote "Romeo and Juliet"?', options: JSON.stringify(['William Shakespeare', 'Charles Dickens', 'J.K. Rowling', 'Mark Twain']), correctAnswer: 'William Shakespeare', explanation: 'Shakespeare is the most famous English playwright.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Email Etiquette & Professionalism',
      description: 'How to write emails that get results.',
      content: 'Difference between "Hi team" and "Dear colleagues". When to use "Best regards" vs "Sincerely".',
      level: 'BEGINNER', category: 'BUSINESS',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'Which is a formal closing?', options: JSON.stringify(['Cheers', 'Sincerely', 'See ya', 'Later']), correctAnswer: 'Sincerely', explanation: 'Sincerely is a standard formal closing.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'The Mystery of the Bermuda Triangle',
      description: 'A fascinating reading about history and myths.',
      content: 'Ships and planes have disappeared in this Atlantic region. Is it science or mystery?',
      level: 'INTERMEDIATE', category: 'READING',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'Where is the Bermuda Triangle located?', options: JSON.stringify(['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Moon']), correctAnswer: 'Atlantic Ocean', explanation: 'It is a region in the western part of the North Atlantic Ocean.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'A Day in New York City',
      description: 'Listening guide to the Big Apple\'s accents and landmarks.',
      content: 'From Times Square to Brooklyn, hear the diversity of the city.',
      level: 'INTERMEDIATE', category: 'LISTENING',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'What is a common nickname for New York City?', options: JSON.stringify(['The Big Apple', 'The Windy City', 'The City of Love', 'The Desert']), correctAnswer: 'The Big Apple', explanation: 'New York City is famously called The Big Apple.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Public Speaking Confidence',
      description: 'Overcoming anxiety and mastering body language.',
      content: 'Eye contact, vocal variety, and the power of the pause.',
      level: 'ADVANCED', category: 'SPEAKING',
      exercises: { create: [{ type: 'MULTIPLE_CHOICE', question: 'Why is eye contact important?', options: JSON.stringify(['To scare people', 'To build trust', 'To see if they are sleeping', 'To look for the exit']), correctAnswer: 'To build trust', explanation: 'Eye contact establishes a connection and trust with the audience.' }] }
    }
  });

  // --- MASSIVE SCALE EXPANSION: 20 LESSONS PER CATEGORY ---
  const categoriesToExpand = ['GRAMMAR', 'VOCABULARY', 'READING', 'LISTENING', 'SPEAKING', 'BUSINESS'];
  const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

  for (const cat of categoriesToExpand) {
    for (let i = 1; i <= 20; i++) {
      const level = levels[Math.floor(Math.random() * levels.length)];
      await prisma.lesson.create({
        data: {
          title: `${cat.charAt(0) + cat.slice(1).toLowerCase()} Mastery Vol. ${i}`,
          description: `Extensive session on ${cat.toLowerCase()} concepts, focus part ${i}.`,
          content: `This is an automated comprehensive lesson for ${cat} at ${level} level. Focus is on depth and practical application. Part ${i} of our specialization track.`,
          level: level,
          category: cat,
          videoUrl: cat === 'LISTENING' || cat === 'SPEAKING' ? 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' : null,
          exercises: {
            create: [
              {
                type: 'MULTIPLE_CHOICE',
                question: `What is the primary focus of ${cat} lesson ${i}?`,
                options: JSON.stringify(['Detail A', 'Detail B', 'Detail C', 'Detail D']),
                correctAnswer: 'Detail A',
                explanation: `Concept ${i} is fundamental to mastering ${cat}.`
              }
            ]
          }
        }
      });
    }
  }

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

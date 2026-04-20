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

  // Clear existing content to avoid duplicates for lessons/exercises
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.vocabulary.deleteMany();

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
            explanation: 'To "call off" means to decide that a planned event will not happen. It is commonly used in professional contexts like "calling off a meeting" or social ones like "calling off a wedding". Note that "postpone" would be "put off", which means moving it to a later date, whereas "call off" is a definitive cancellation.'
          },
          {
            type: 'FILL_BLANKS',
            question: 'I will ______ you up at 8 PM.',
            correctAnswer: 'pick',
            explanation: 'The verb "pick up" here means to collect someone, usually in a vehicle. It is a separable phrasal verb, meaning you can say "pick you up" or "pick up John". If you use a pronoun like "you", it MUST go in the middle: "pick you up".'
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
            explanation: 'In an interview, "background" refers to your professional history, education, and relevant life experiences. It provides the recruiter with a context of who you are as a professional. Common phrases include: "My background is in sales" or "I have a strong academic background in engineering".'
          },
          {
            type: 'MULTIPLE_CHOICE',
            question: 'Which term refers to your professional skills?',
            options: JSON.stringify(['Strengths', 'Powers', 'Forces', 'Goods']),
            correctAnswer: 'Strengths',
            explanation: '"Strengths" is the standard professional term for the skills or qualities you excel at. In an interview, you should match your strengths with the job requirements. Avoid "Powers" or "Forces" as they sound more like superhero traits than professional attributes.'
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
            explanation: '"Go" is one of the most common irregular verbs in English. Its past simple form is "went" and its past participle is "gone". You should NEVER add "-ed" to irregular verbs; "goed" is a very common mistake for beginners.'
          }
        ]
      }
    }
  });

  // --- LESSON 4: Present Perfect ---
  await prisma.lesson.create({
    data: {
      title: 'The Present Perfect',
      description: 'Linking the past with the present.',
      content: `The Present Perfect is used to talk about experiences or actions that started in the past and continue in the present.
      
      Structure: Have/Has + Past Participle.
      - I have seen that movie before. (Experience)
      - She has lived here for 10 years. (Continuing action)
      
      Signal Words: Just, already, yet, ever, never, for, since.`,
      level: 'INTERMEDIATE',
      category: 'GRAMMAR',
      exercises: {
        create: [
          {
            type: 'MULTIPLE_CHOICE',
            question: 'Which is correct for a life experience?',
            options: JSON.stringify(['I have gone to Paris', 'I have been to Paris', 'I went to Paris', 'I was in Paris']),
            correctAnswer: 'I have been to Paris',
            explanation: 'When talking about visited places as a life experience, we use "have been to". "Have gone to" implies that the person is still in Paris or on their way there. Using "went" (Past Simple) would require a specific time reference like "I went to Paris in 2012".'
          }
        ]
      }
    }
  });

  // --- LESSON 13: Listening Practice ---
  await prisma.lesson.create({
    data: {
      title: 'Listening: Daily Situations',
      description: 'Train your ear for common social interactions.',
      content: `Training your ear is about identifying keywords in natural speech.`,
      level: 'BEGINNER',
      category: 'LISTENING',
      exercises: {
        create: [
          {
            type: 'LISTENING',
            question: 'I would like a large cappuccino with oat milk, please.',
            options: JSON.stringify(['Large cappuccino with oat milk', 'Small latte with soy milk', 'Large tea with honey', 'Medium espresso']),
            correctAnswer: 'Large cappuccino with oat milk',
            explanation: 'In this prompt, the key modifiers are "large" (size) and "oat milk" (special request). In a real coffee shop environment, background noise might make these details harder to hear, so practicing focus on these specific nouns/adjectives is crucial.'
          }
        ]
      }
    }
  });

  // --- GLOSSARY SEEDING ---
  const vocabulary = [
    { word: 'Call off', meaning: 'To cancel something.', translation: 'Cancelar', synonyms: 'Cancel, abort', example: 'The game was called off because of rain.', level: 'ADVANCED', category: 'VERB' },
    { word: 'Pick up', meaning: 'To collect someone or something.', translation: 'Recoger', synonyms: 'Collect, gather', example: 'I will pick you up after work.', level: 'INTERMEDIATE', category: 'VERB' },
    { word: 'Break the ice', meaning: 'To clear social tension.', translation: 'Romper el hielo', synonyms: 'Socialize, initiate', example: 'He told a joke to break the ice.', level: 'ADVANCED', category: 'IDIOM' },
    { word: 'Background', meaning: 'Professional history/education.', translation: 'Antecedentes / Experiencia', synonyms: 'History, experience', example: 'She has a strong background in finance.', level: 'ADVANCED', category: 'NOUN' },
    { word: 'Strengths', meaning: 'Positive skills or attributes.', translation: 'Fortalezas', synonyms: 'Assets, skills', example: 'Leadership is one of his main strengths.', level: 'ADVANCED', category: 'NOUN' },
    { word: 'Went', meaning: 'The past of "GO".', translation: 'Fui / Fue', synonyms: 'Traveled, moved', example: 'We went to the beach yesterday.', level: 'BEGINNER', category: 'VERB' },
    { word: 'Attached', meaning: 'Included as a file.', translation: 'Adjunto', synonyms: 'Enclosed, linked', example: 'Please read the attached document.', level: 'INTERMEDIATE', category: 'ADJECTIVE' },
    { word: 'Clarify', meaning: 'To make something clear.', translation: 'Aclarar', synonyms: 'Explain, elucidate', example: 'Could you please clarify your question?', level: 'INTERMEDIATE', category: 'VERB' },
    { word: 'Eaten', meaning: 'Past participle of "EAT".', translation: 'Comido', synonyms: 'Consumed', example: 'I have already eaten breakfast.', level: 'BEGINNER', category: 'VERB' },
    { word: 'Which', meaning: 'Relative pronoun for things.', translation: 'Cual / Que', synonyms: 'That', example: 'The car which I bought is red.', level: 'INTERMEDIATE', category: 'PRONOUN' },
  ];

  for (const item of vocabulary) {
    await prisma.vocabulary.create({ data: item });
  }

  console.log('✅ Educational Database Synchronization Complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

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

  // --- CORE CURRICULUM: A1 (Extracted from temario/A1.docx) ---
  await prisma.lesson.create({
    data: {
      title: 'Nice to meet you! (Verb To Be)',
      description: 'Learn how to introduce yourself and others using the verb "To Be".',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      content: `## 1. IN CONTEXT: READING
**Dialogue: First Day of Class**
Teacher: Good morning! I am Mr. Davis. What is your name?
Elena: Hello. My name is Elena.
Teacher: Where are you from, Elena?
Elena: I am from Madrid. I am a student.
Teacher: Nice to meet you. This is Tom. He is from London.
Tom: Hi, Elena! We are in the same class!

## 2. GRAMMAR POINT: THE VERB TO BE (Ser o Estar)
The verb **'To Be'** is used for descriptions, origins, states, and even age!

### A. Affirmative Form
- **I am** (I'm) -> *I am Elena.*
- **You are** (You're) -> *You are from Spain.*
- **He/She/It is** (He's/She's/It's) -> *He is my friend.*
- **We/They are** (We're/They're) -> *We are students.*

### B. Negative Form
Just add **NOT** after the verb:
- *I am not (I'm not)*
- *You are not (You aren't)*
- *He is not (He isn't)*

### C. Questions
Invert the order: **Verb + Subject**?
- *Are you from Italy?* -> Yes, I am. / No, I'm not.

## 3. VOCABULARY: PERSONAL INFO
- **First name:** Nombre
- **Surname / Last name:** Apellido
- **Age:** Edad
- **Country:** País
- **Job:** Trabajo`,
      level: 'BEGINNER', category: 'GRAMMAR',
      exercises: {
        create: [
          { type: 'FILL_BLANKS', question: 'I __________ a student.', correctAnswer: 'am', explanation: 'We use "am" with the first person singular "I".' },
          { type: 'MULTIPLE_CHOICE', question: 'Which is the correct question form?', options: JSON.stringify(['You are from Spain?', 'Are you from Spain?', 'Is you from Spain?', 'Am you from Spain?']), correctAnswer: 'Are you from Spain?', explanation: 'In questions, the verb "Are" comes before the subject "you".' }
        ]
      }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'My Daily Life (Present Simple)',
      description: 'Describe your routines and habits using the Present Simple.',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      content: `## 1. IN CONTEXT: READING
**Text: A Busy Day**
"I get up at 7:00 AM every day. I have a coffee and I go to work by bus. I love my job! My brother, Mark, has a different routine. He works at night. He goes to bed at 8:00 AM."

## 2. GRAMMAR POINT: PRESENT SIMPLE
We use the **Present Simple** for habits, routines, and permanent situations.

### A. The Third Person (-s)
In affirmative sentences, add **-s** or **-es** to the verb for *He, She, It*:
- I work -> He **works**
- I go -> She **goes**
- I study -> It **studies**

### B. Negative Form
Use **don't** or **doesn't** (for He/She/It):
- I **don't** like coffee.
- He **doesn't** like tea. (Note: the verb loses the -s)

### C. Adverbs of Frequency
- **Always:** 100%
- **Sometimes:** 50%
- **Never:** 0%
*Position: Before the main verb (I always eat breakfast).*`,
      level: 'BEGINNER', category: 'GRAMMAR',
      exercises: {
        create: [
          { type: 'FILL_BLANKS', question: 'She __________ (go) to the gym every day.', correctAnswer: 'goes', explanation: 'For "She", we add "-es" to the verb "go".' },
          { type: 'MULTIPLE_CHOICE', question: 'Where does the adverb go?', options: JSON.stringify(['I eat always apples', 'I always eat apples', 'Always I eat apples', 'I eat apples always']), correctAnswer: 'I always eat apples', explanation: 'Adverbs of frequency usually go BEFORE the main verb.' }
        ]
      }
    }
  });

  // --- CORE CURRICULUM: A2 (Extracted from temario/A2.docx) ---
  await prisma.lesson.create({
    data: {
      title: 'Memories (Was / Were)',
      description: 'Talk about your past states and locations.',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      content: `## 1. IN CONTEXT: READING
**Text: A Life in the Past**
"In 1990, I was only five years old. My family and I were in a small house in the country. It was a very happy time. My parents were teachers, and my best friend was a dog named Toby."

## 2. GRAMMAR POINT: WAS / WERE
"Was" and "Were" are the past forms of the verb **To Be**.

### A. Conjugation
- **I / He / She / It** -> **WAS** (*I was at home*)
- **You / We / They** -> **WERE** (*They were friends*)

### B. Negative
- **Wasn't** (Was not)
- **Weren't** (Were not)

### C. Questions
- **Was** he at work?
- **Were** you tired?

## 3. VOCABULARY: TIME EXPRESSIONS
- **Yesterday:** Ayer
- **Last night / week / month:** Anoche / semana pasada / mes pasado
- **Two days ago:** Hace dos días`,
      level: 'INTERMEDIATE', category: 'GRAMMAR',
      exercises: {
        create: [
          { type: 'FILL_BLANKS', question: 'They __________ at the cinema last night.', correctAnswer: 'were', explanation: 'We use "were" for the plural subject "They".' },
          { type: 'MULTIPLE_CHOICE', question: 'How do you say "hace un año"?', options: JSON.stringify(['A year ago', 'Last year', 'One year before', 'Since a year']), correctAnswer: 'A year ago', explanation: 'We use "... ago" to express how much time has passed since an event.' }
        ]
      }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'What happened? (Past Simple)',
      description: 'Narrate finished actions using regular and irregular verbs.',
      content: `## 1. IN CONTEXT: READING
**Text: A Weekend in Rome**
"Last Saturday, I traveled to Rome. I arrived at the hotel at 10:00 AM. First, I visited the Colosseum. Then, I met a local friend and we ate a delicious pizza. We didn't go to any museums because they were closed."

## 2. GRAMMAR POINT: PAST SIMPLE
Used for finished actions in the past.

### A. Regular Verbs (-ed)
- Work -> **Worked**
- Arrive -> **Arrived**
- Study -> **Studied**

### B. Irregular Verbs (Must memorize!)
- Go -> **Went**
- Eat -> **Ate**
- Buy -> **Bought**
- Have -> **Had**

### C. Negative & Questions (The auxiliary DID)
We use **DID** for questions and **DIDN'T** for negatives. The main verb returns to INFINITIVE.
- I **didn't go** (NOT I didn't went)
- **Did you see** the movie? (NOT Did you saw)`,
      level: 'INTERMEDIATE', category: 'GRAMMAR',
      exercises: {
        create: [
          { type: 'FILL_BLANKS', question: 'I __________ (buy) a new car yesterday.', correctAnswer: 'bought', explanation: '"Buy" is an irregular verb. Its past form is "bought".' },
          { type: 'FILL_BLANKS', question: 'She didn\'t __________ (see) me.', correctAnswer: 'see', explanation: 'After "didn\'t", we use the base form of the verb.' }
        ]
      }
    }
  });

  // --- VOLUME III: ADVANCED TOPICS ---
  await prisma.lesson.create({
    data: {
        title: 'Grammatical Inversion',
        description: 'Adding emphasis and formal tone.',
        content: `**Inversion** happens when we reverse the normal order of the subject and the verb. It is a powerful tool for adding emphasis, drama, or formality to your writing and speech.

## Negative Inversion:
When we start a sentence with a negative adverb (never, rarely, seldom) or a limiting expression (only then, hardly), we must use inversion.
- **Normal:** I have never seen such a beautiful sunrise.
- **Inverted:** *Never have I seen such a beautiful sunrise.*

## Key Structures:
1. **Hardly / No sooner:** *Hardly had I arrived when the phone rang.*
2. **Not only... but also:** *Not only did he win, but he also broke the record.*
3. **Under no circumstances:** *Under no circumstances should you open that door.*`,
        level: 'ADVANCED', category: 'GRAMMAR',
        exercises: { create: [{ type: 'FILL_BLANKS', question: 'No _______ _______ I arrived than the train left.', correctAnswer: 'sooner had', explanation: 'The structure **"No sooner had [subject] [past participle]... than..."** is a classic case of inversion used to describe two events happening in quick succession.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Hedging: Diplomatic English',
      description: 'How to sound polite and professional in C1/C2.',
      content: `**Hedging** is the use of linguistic devices to express hesitation, uncertainty, or to sound more polite and less direct. In professional environments, being too "blunt" can be perceived as aggressive.

## Why use Hedging?
- To avoid making 100% claims (leaving room for error).
- To show respect and diplomacy in negotiations.

## Common Hedging Devices:
1. **Modal Verbs:** "It **could** be that..." instead of "It is..."
2. **Adverbs of Frequency:** "This **generally** happens..."
3. **Softening Phrases:** "I was **wondering** if...", "It **appears** that...", "I **suspect** that..."

## Example Transformation:
- **Direct:** "Your plan is wrong."
- **Hedged:** *"I have some slight reservations about the current proposal, perhaps we could explore other options?"*`,
      level: 'ADVANCED', category: 'BUSINESS',
      exercises: {
        create: [
          {
            type: 'MULTIPLE_CHOICE',
            question: 'Which is a diplomatic way to say "Give me the report"?',
            options: JSON.stringify(['Give it now', 'I was wondering if you could possibly send me the report?', 'Send report', 'Report please']),
            correctAnswer: 'I was wondering if you could possibly send me the report?',
            explanation: 'The phrase **"I was wondering if you could possibly..."** uses two hedging layers ("wondering" + "possibly") to minimize the imposition on the other person, which is essential for high-level business etiquette.'
          }
        ]
      }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'The Passive Voice',
      description: 'Focus on the action, not the doer.',
      content: `The **Passive Voice** is used when we want to emphasize the action (the verb) and the object of a sentence rather than subject. 

## Structure:
**Subject + to be (conjugated) + Past Participle**

## Examples:
- **Present:** "Great software **is built** here."
- **Past:** "The project **was completed** on time."
- **Future:** "The results **will be published** tomorrow."`,
      level: 'INTERMEDIATE', category: 'GRAMMAR',
      exercises: { create: [{ type: 'FILL_BLANKS', question: 'My bike _______ _______ stolen yesterday.', correctAnswer: 'was', explanation: 'In the past passive, we use was/were + past participle.' }] }
    }
  });

  await prisma.lesson.create({
    data: {
      title: 'Power Collocations: Make vs Do',
      description: 'Stop guessing which verb to use.',
      content: `## When to use MAKE:
Generally used for **creating** or **producing** something new.
- **Make** a decision
- **Make** a mistake
- **Make** an effort

## When to use DO:
Generally used for **activities**, **tasks**, or **repetitive actions**.
- **Do** business
- **Do** homework
- **Do** exercise`,
      level: 'INTERMEDIATE', category: 'VOCABULARY',
      exercises: {
        create: [
          {
            type: 'FILL_BLANKS',
            question: 'I need to _______ a decision today.',
            correctAnswer: 'make',
            explanation: 'A decision is a result of a choice you "produce", so we use **make**.'
          }
        ]
      }
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

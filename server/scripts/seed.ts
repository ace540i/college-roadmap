/**
 * Seed script — loads milestone/task catalog for grades 9-12 into Cosmos DB.
 *
 * Usage:
 *   npm run seed  (from server/)
 *
 * Requires DATABASE_URL to be set (loads from server/.env automatically).
 */

import 'dotenv/config';
import path from 'path';
import mongoose from 'mongoose';
import MilestoneCatalog from '../models/MilestoneCatalog';

// Load .env from server directory when run directly
import { config } from 'dotenv';
config({ path: path.join(__dirname, '..', '.env') });

// ---------------------------------------------------------------------------
// Catalog data — Grades 9–12
// ---------------------------------------------------------------------------
const catalog = [
  // =========================================================================
  // GRADE 9 — Foundations
  // =========================================================================
  {
    grade: 9,
    order: 1,
    title: 'Discover Yourself',
    description: 'Understand your interests, strengths, and learning style to set a direction for high school.',
    tasks: [
      {
        taskId: '9-1-1',
        order: 1,
        title: 'Complete a career interest assessment',
        description: 'Take a personality or career interest quiz to identify fields that match your strengths.',
        steps: [
          { order: 1, text: 'Visit BigFuture (bigfuture.collegeboard.org) and take the Career Quiz' },
          { order: 2, text: 'Record your top 3 career clusters from the results' },
          { order: 3, text: 'Research one job in each cluster to learn about daily responsibilities' },
        ],
      },
      {
        taskId: '9-1-2',
        order: 2,
        title: 'Meet with your school counselor',
        description: 'Introduce yourself to your counselor and discuss your goals for high school.',
        steps: [
          { order: 1, text: 'Schedule an appointment with your school counselor' },
          { order: 2, text: 'Bring your interest assessment results to the meeting' },
          { order: 3, text: 'Ask about graduation requirements and honors/AP options' },
        ],
      },
      {
        taskId: '9-1-3',
        order: 3,
        title: 'Identify your learning style',
        description: 'Know whether you learn best visually, auditorially, or kinesthetically to study smarter.',
        steps: [
          { order: 1, text: 'Take a free learning style quiz online (search "VARK learning style quiz")' },
          { order: 2, text: 'Try two study strategies that match your learning style for one week' },
          { order: 3, text: 'Note which strategy worked best in your planner or journal' },
        ],
      },
    ],
  },
  {
    grade: 9,
    order: 2,
    title: 'Build Your Academic Foundation',
    description: 'Set strong academic habits and plan a four-year course schedule.',
    tasks: [
      {
        taskId: '9-2-1',
        order: 1,
        title: 'Plan your 4-year course schedule',
        description: 'Map out which courses you will take each year to meet graduation and college admission requirements.',
        steps: [
          { order: 1, text: "Get a copy of your school's course catalog" },
          { order: 2, text: 'List required core courses (English, Math, Science, Social Studies, Foreign Language)' },
          { order: 3, text: 'Identify honors or AP courses available in grades 10–12 that interest you' },
          { order: 4, text: 'Review your draft plan with your counselor' },
        ],
      },
      {
        taskId: '9-2-2',
        order: 2,
        title: 'Understand how GPA is calculated',
        description: 'Learn the difference between weighted and unweighted GPA and set a target.',
        steps: [
          { order: 1, text: 'Ask your counselor whether your school uses weighted or unweighted GPA' },
          { order: 2, text: 'Calculate your GPA after first semester using your report card' },
          { order: 3, text: 'Set a realistic target GPA for the year' },
        ],
      },
      {
        taskId: '9-2-3',
        order: 3,
        title: 'Develop strong study habits',
        description: 'Consistent habits in 9th grade set the foundation for all of high school.',
        steps: [
          { order: 1, text: 'Create a weekly study schedule with dedicated homework time each day' },
          { order: 2, text: 'Organize a binder or digital folder for each class' },
          { order: 3, text: 'Attend teacher office hours or tutoring if you fall behind in any subject' },
        ],
      },
    ],
  },
  {
    grade: 9,
    order: 3,
    title: 'Get Involved',
    description: 'Begin building an extracurricular record that reflects your interests and leadership potential.',
    tasks: [
      {
        taskId: '9-3-1',
        order: 1,
        title: 'Join at least one extracurricular activity',
        description: 'Colleges value sustained commitment — pick something you genuinely enjoy.',
        steps: [
          { order: 1, text: "Attend your school's club fair or activity night" },
          { order: 2, text: 'Sign up for one club, sport, or arts program' },
          { order: 3, text: 'Attend at least 80% of meetings or practices through the school year' },
        ],
      },
      {
        taskId: '9-3-2',
        order: 2,
        title: 'Find a volunteer opportunity',
        description: 'Community service demonstrates character and provides great essay material later.',
        steps: [
          { order: 1, text: 'Search VolunteerMatch.org or your local library for opportunities' },
          { order: 2, text: 'Complete at least 10 volunteer hours this year' },
          { order: 3, text: 'Log your hours in a spreadsheet (organization, date, hours, contact)' },
        ],
      },
      {
        taskId: '9-3-3',
        order: 3,
        title: 'Explore a summer opportunity',
        description: 'Summer programs, jobs, and camps build skills and stand out on applications.',
        steps: [
          { order: 1, text: 'Research summer programs related to your career interests (many are free)' },
          { order: 2, text: 'Ask a parent or guardian to help you apply to one program or find a summer job' },
          { order: 3, text: 'If working or volunteering, document what you learned' },
        ],
      },
    ],
  },

  // =========================================================================
  // GRADE 10 — Exploration
  // =========================================================================
  {
    grade: 10,
    order: 1,
    title: 'Deepen Your Interests',
    description: 'Move from exploring to actively pursuing areas of genuine interest.',
    tasks: [
      {
        taskId: '10-1-1',
        order: 1,
        title: 'Take an advanced or honors course in your strongest subject',
        description: 'Challenge yourself academically to demonstrate college readiness.',
        steps: [
          { order: 1, text: 'Review your 9th grade grades and identify your strongest subject' },
          { order: 2, text: 'Enroll in the honors or AP section of that subject for 10th grade' },
          { order: 3, text: 'Connect with the teacher early and introduce yourself' },
        ],
      },
      {
        taskId: '10-1-2',
        order: 2,
        title: 'Complete a job shadow or informational interview',
        description: 'Spend a day observing a professional in a career you are considering.',
        steps: [
          { order: 1, text: 'Identify one career you want to explore from your 9th grade assessment' },
          { order: 2, text: 'Ask a parent, teacher, or counselor to help you find a professional contact' },
          { order: 3, text: 'Arrange a 1-hour informational interview or half-day job shadow' },
          { order: 4, text: 'Write a thank-you note and record key takeaways' },
        ],
      },
      {
        taskId: '10-1-3',
        order: 3,
        title: 'Take on a leadership role in an activity',
        description: 'Moving from member to leader strengthens your college application.',
        steps: [
          { order: 1, text: 'Identify a club or activity you have been involved in since 9th grade' },
          { order: 2, text: 'Run for an officer position or volunteer to lead a project or event' },
          { order: 3, text: 'Document your contribution and any outcomes (members added, money raised, etc.)' },
        ],
      },
    ],
  },
  {
    grade: 10,
    order: 2,
    title: 'Begin Test Preparation',
    description: 'Start familiarizing yourself with standardized tests to avoid surprises in junior year.',
    tasks: [
      {
        taskId: '10-2-1',
        order: 1,
        title: 'Take the PSAT 10',
        description: 'The PSAT 10 helps you practice for the SAT and identifies skill gaps early.',
        steps: [
          { order: 1, text: 'Confirm with your counselor that your school administers the PSAT 10 (usually in October or spring)' },
          { order: 2, text: 'Register through your school' },
          { order: 3, text: 'After receiving scores, review the Student Score Report with your counselor' },
        ],
      },
      {
        taskId: '10-2-2',
        order: 2,
        title: 'Set up Khan Academy SAT prep',
        description: "Khan Academy's free SAT prep is personalized and highly effective.",
        steps: [
          { order: 1, text: 'Create a free account at khanacademy.org' },
          { order: 2, text: 'Link your College Board account to get personalized practice from your PSAT scores' },
          { order: 3, text: 'Complete at least 30 minutes of SAT practice per week throughout 10th grade' },
        ],
      },
      {
        taskId: '10-2-3',
        order: 3,
        title: 'Research SAT vs ACT',
        description: 'Understand the differences and determine which test suits you better.',
        steps: [
          { order: 1, text: 'Take one free official SAT practice test (at College Board) and one free ACT practice test (at ACT.org)' },
          { order: 2, text: 'Compare your scores using concordance tables available on both websites' },
          { order: 3, text: 'Decide which test to focus on for junior year' },
        ],
      },
    ],
  },
  {
    grade: 10,
    order: 3,
    title: 'Start College Research',
    description: 'Build an initial list of schools and learn what the college search process looks like.',
    tasks: [
      {
        taskId: '10-3-1',
        order: 1,
        title: 'Create a college exploration list of 15–20 schools',
        description: 'Cast a wide net — you will narrow the list significantly in junior year.',
        steps: [
          { order: 1, text: 'Use BigFuture, Niche.com, or College Navigator to search colleges by size, location, and major' },
          { order: 2, text: 'Add at least 5 schools per category: small, medium, and large' },
          { order: 3, text: "Note the average GPA and test scores for each school's admitted class" },
        ],
      },
      {
        taskId: '10-3-2',
        order: 2,
        title: 'Attend a college fair',
        description: 'College fairs let you talk directly with admissions representatives.',
        steps: [
          { order: 1, text: 'Ask your counselor about upcoming local or virtual college fairs' },
          { order: 2, text: 'Prepare 2–3 questions to ask representatives (e.g., "What makes your school unique?")' },
          { order: 3, text: 'Collect brochures or scan QR codes and add interesting schools to your list' },
        ],
      },
      {
        taskId: '10-3-3',
        order: 3,
        title: 'Visit or take a virtual tour of a local college',
        description: "Seeing a campus in person changes your sense of what 'fit' means.",
        steps: [
          { order: 1, text: 'Choose one college within driving distance' },
          { order: 2, text: 'Sign up for an official campus tour through the admissions website' },
          { order: 3, text: 'Take notes on what you liked and disliked — use them to refine your search' },
        ],
      },
    ],
  },

  // =========================================================================
  // GRADE 11 — Preparation
  // =========================================================================
  {
    grade: 11,
    order: 1,
    title: 'Standardized Testing',
    description: 'Take your SAT or ACT and strengthen your score with targeted preparation.',
    tasks: [
      {
        taskId: '11-1-1',
        order: 1,
        title: 'Take the PSAT/NMSQT in October',
        description: 'The October PSAT qualifies you for National Merit Scholarship consideration.',
        steps: [
          { order: 1, text: 'Confirm your school administers the PSAT/NMSQT and register' },
          { order: 2, text: 'Review your 10th grade PSAT scores to focus your preparation' },
          { order: 3, text: 'Complete 2 full practice tests before October' },
        ],
      },
      {
        taskId: '11-1-2',
        order: 2,
        title: 'Register and take the SAT or ACT',
        description: 'Most students take the SAT/ACT in the spring of junior year for the first time.',
        steps: [
          { order: 1, text: 'Register at sat.collegeboard.org or act.org for a March, May, or June test date' },
          { order: 2, text: 'Study consistently using Khan Academy or an ACT prep book for 8–12 weeks before the test' },
          { order: 3, text: 'Review your score report and identify whether you should retake in the fall' },
        ],
      },
      {
        taskId: '11-1-3',
        order: 3,
        title: 'Research test-optional policies',
        description: 'Many colleges are test-optional — understand when submitting scores helps or hurts.',
        steps: [
          { order: 1, text: 'Look up the test policy for each school on your list (College Board BigFuture lists these)' },
          { order: 2, text: "For test-optional schools, compare your score to the school's 50th percentile range" },
          { order: 3, text: 'Decide for each school whether you plan to submit scores' },
        ],
      },
    ],
  },
  {
    grade: 11,
    order: 2,
    title: 'Build Your College List',
    description: 'Narrow your exploration list to a balanced list of 10–12 colleges.',
    tasks: [
      {
        taskId: '11-2-1',
        order: 1,
        title: 'Create a balanced reach / match / safety list',
        description: 'A strong list has schools at different selectivity levels so you have good options.',
        steps: [
          { order: 1, text: 'Categorize each school: Reach (your stats below median), Match (within median), Safety (your stats above median)' },
          { order: 2, text: 'Aim for 3–4 reaches, 4–5 matches, and 2–3 safeties' },
          { order: 3, text: 'Review the list with your counselor to confirm it is realistic' },
        ],
      },
      {
        taskId: '11-2-2',
        order: 2,
        title: 'Visit or tour top-choice campuses',
        description: 'Junior year is the ideal time to visit before you apply.',
        steps: [
          { order: 1, text: 'Schedule visits for your top 3–5 schools (in-person or virtual)' },
          { order: 2, text: 'Sign up for official information sessions and tours through admissions' },
          { order: 3, text: 'After each visit, write 3 specific reasons you liked or disliked the school' },
        ],
      },
      {
        taskId: '11-2-3',
        order: 3,
        title: 'Research financial aid and net cost at each school',
        description: 'Cost after aid often differs dramatically from the sticker price.',
        steps: [
          { order: 1, text: "Use the Net Price Calculator on each school's website (required by law)" },
          { order: 2, text: 'Research merit scholarship eligibility at each school' },
          { order: 3, text: "Discuss your family's estimated contribution with a parent or guardian" },
        ],
      },
    ],
  },
  {
    grade: 11,
    order: 3,
    title: 'Application Preparation',
    description: 'Lay the groundwork for strong applications before senior year begins.',
    tasks: [
      {
        taskId: '11-3-1',
        order: 1,
        title: 'Ask teachers for letters of recommendation',
        description: 'Ask by the end of junior year so teachers have the summer to write strong letters.',
        steps: [
          { order: 1, text: 'Identify 2–3 teachers who know you well and taught you in a core academic subject' },
          { order: 2, text: 'Ask each teacher in person before the end of the school year' },
          { order: 3, text: 'Provide each recommender with a one-page brag sheet listing your activities, goals, and why you chose them' },
        ],
      },
      {
        taskId: '11-3-2',
        order: 2,
        title: 'Brainstorm personal statement topics',
        description: 'Great essays are specific, personal, and reveal something not visible elsewhere in your application.',
        steps: [
          { order: 1, text: 'Read 3–5 sample college essays online (search "Common App essay examples")' },
          { order: 2, text: 'List 10 moments, experiences, or values that define you' },
          { order: 3, text: 'Draft 2 topic ideas and share them with an English teacher or counselor for feedback' },
        ],
      },
      {
        taskId: '11-3-3',
        order: 3,
        title: 'Build your activities and awards resume',
        description: 'Document everything now while it is fresh — you will use this for Common App.',
        steps: [
          { order: 1, text: 'List every extracurricular, job, volunteer role, and award from grades 9–11' },
          { order: 2, text: 'For each activity, note the grade levels, hours per week, weeks per year, and your role' },
          { order: 3, text: 'Ask your counselor to review and suggest anything you may have forgotten' },
        ],
      },
    ],
  },

  // =========================================================================
  // GRADE 12 — Application & Decision
  // =========================================================================
  {
    grade: 12,
    order: 1,
    title: 'Submit Applications',
    description: 'Complete and submit strong applications on time for every school on your list.',
    tasks: [
      {
        taskId: '12-1-1',
        order: 1,
        title: 'Create your Common App or Coalition App account',
        description: 'Most colleges use Common App — set it up before August and complete the profile section.',
        steps: [
          { order: 1, text: 'Go to commonapp.org and create an account on or after August 1' },
          { order: 2, text: 'Complete the Common App profile: personal information, family, education, activities, and writing' },
          { order: 3, text: 'Add all schools on your list to the "My Colleges" section' },
          { order: 4, text: 'Invite your recommenders and counselor through the platform' },
        ],
      },
      {
        taskId: '12-1-2',
        order: 2,
        title: 'Submit Early Decision or Early Action applications',
        description: 'ED/EA deadlines are typically November 1 or November 15 — submitting early can boost your chances.',
        steps: [
          { order: 1, text: 'Finalize your personal statement and have it reviewed by at least two people' },
          { order: 2, text: 'Complete all supplemental essays for ED/EA schools' },
          { order: 3, text: 'Request official SAT/ACT scores be sent to each school by the test company' },
          { order: 4, text: 'Submit each application at least 3 days before the deadline' },
        ],
      },
      {
        taskId: '12-1-3',
        order: 3,
        title: 'Submit Regular Decision applications',
        description: 'RD deadlines are typically January 1 or January 15.',
        steps: [
          { order: 1, text: 'Revise your personal statement if needed based on feedback from ED/EA cycle' },
          { order: 2, text: 'Complete all supplemental essays for RD schools' },
          { order: 3, text: 'Confirm your counselor has submitted your school transcript and recommendation' },
          { order: 4, text: 'Submit each application at least 3 days before the deadline and save confirmation emails' },
        ],
      },
    ],
  },
  {
    grade: 12,
    order: 2,
    title: 'Secure Financial Aid',
    description: 'Apply for all available financial aid as early as possible to maximize your award.',
    tasks: [
      {
        taskId: '12-2-1',
        order: 1,
        title: 'File the FAFSA',
        description: 'The FAFSA opens October 1 — filing early gives you access to more aid.',
        steps: [
          { order: 1, text: 'Create FSA IDs for yourself and a parent at studentaid.gov' },
          { order: 2, text: "Gather required tax documents (previous year's tax return and W-2s)" },
          { order: 3, text: 'Complete and submit the FAFSA at studentaid.gov by your earliest school deadline' },
          { order: 4, text: 'Review your Student Aid Report (SAR) for errors after submission' },
        ],
      },
      {
        taskId: '12-2-2',
        order: 2,
        title: 'Complete the CSS Profile if required',
        description: 'Many private colleges require the CSS Profile in addition to FAFSA.',
        steps: [
          { order: 1, text: "Check each school's financial aid page to see if CSS Profile is required" },
          { order: 2, text: 'Register at cssprofile.collegeboard.org' },
          { order: 3, text: 'Complete the profile and submit to each school that requires it — note separate deadlines' },
        ],
      },
      {
        taskId: '12-2-3',
        order: 3,
        title: 'Apply for scholarships',
        description: 'Private scholarships can reduce your out-of-pocket cost significantly.',
        steps: [
          { order: 1, text: 'Search for local scholarships through your counselor, community foundations, and employers' },
          { order: 2, text: 'Search national scholarships at Fastweb.com or Scholarships.com' },
          { order: 3, text: 'Apply for at least 5 scholarships before March 1' },
          { order: 4, text: 'Track deadlines and required documents in a spreadsheet' },
        ],
      },
    ],
  },
  {
    grade: 12,
    order: 3,
    title: 'Make Your College Decision',
    description: 'Evaluate your options and commit to the school that is the best fit — academically, financially, and personally.',
    tasks: [
      {
        taskId: '12-3-1',
        order: 1,
        title: 'Compare acceptance letters and financial aid packages',
        description: 'The best school is not always the one with the biggest name — compare true costs carefully.',
        steps: [
          { order: 1, text: 'Create a comparison spreadsheet: school name, grants, scholarships, loans, work-study, net cost' },
          { order: 2, text: 'Appeal financial aid at schools where the offer seems low (call the financial aid office)' },
          { order: 3, text: 'Factor in 4-year graduation rate and career outcomes, not just year-one cost' },
        ],
      },
      {
        taskId: '12-3-2',
        order: 2,
        title: 'Visit admitted student days',
        description: 'Admitted student events let you picture yourself on campus and meet future classmates.',
        steps: [
          { order: 1, text: 'Register for Accepted Students Days at your top 2–3 choices (usually April)' },
          { order: 2, text: 'Talk to current students honestly — ask what they wish they had known before enrolling' },
          { order: 3, text: 'After each visit, update your comparison spreadsheet with gut-feel notes' },
        ],
      },
      {
        taskId: '12-3-3',
        order: 3,
        title: 'Commit by May 1 — National Decision Day',
        description: 'Submit your enrollment deposit and notify schools you are declining.',
        steps: [
          { order: 1, text: 'Pay the enrollment deposit at your chosen school before May 1' },
          { order: 2, text: 'Decline admission (politely) at every other school so spots open for other students' },
          { order: 3, text: 'Request your final high school transcript be sent to your chosen school' },
          { order: 4, text: 'Complete any required housing, orientation, or placement test forms by their deadlines' },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Run seed
// ---------------------------------------------------------------------------
async function seed(): Promise<void> {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error('ERROR: DATABASE_URL is not set. Add it to server/.env and retry.');
    process.exit(1);
  }

  console.log('Connecting to Cosmos DB...');
  await mongoose.connect(uri);
  console.log('Connected.\n');

  const existing = await MilestoneCatalog.countDocuments();
  if (existing > 0) {
    console.log(`Catalog already contains ${existing} milestone documents.`);
    console.log('To re-seed, run: db.milestonecatalogs.deleteMany({}) in your Cosmos DB shell first.\n');
    await mongoose.disconnect();
    return;
  }

  console.log('Seeding milestone catalog...');
  await MilestoneCatalog.insertMany(catalog);

  const counts = await MilestoneCatalog.aggregate([
    { $group: { _id: '$grade', milestones: { $sum: 1 }, tasks: { $sum: { $size: '$tasks' } } } },
    { $sort: { _id: 1 } },
  ]);

  console.log('\nSeeded:');
  for (const row of counts) {
    console.log(`  Grade ${row._id}: ${row.milestones} milestones, ${row.tasks} tasks`);
  }

  await mongoose.disconnect();
  console.log('\nDone.');
}

seed().catch((err: Error) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});

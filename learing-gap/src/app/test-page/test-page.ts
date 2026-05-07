import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface QuizQuestion {
  id: string;
  text: string;
  options: { label: string; value: string }[];
  correctAnswer: string;
}

@Component({
  selector: 'app-test-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './test-page.html',
  styleUrl: './test-page.css',
})
export class TestPage implements OnInit {
  id: string | null = null;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  lastSubmittedAnswers: any = {};

  answers: any = {
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  };

  correctAnswers: any = {};

  questions: QuizQuestion[] = [];
  currentTitle: string = '';
  private quizDatabase: { [key: string]: { title: string; questions: QuizQuestion[] } } = {
    'asmt-001': {
      title: 'Wound Care Refresh Assessment',
      questions: [
        {
          id: 'q1',
          text: 'What is the MOST important purpose of a medication handover?',
          correctAnswer: 'B',
          options: [
            { label: 'To reduce paperwork', value: 'A' },
            { label: 'Ensure continuity and safety of care', value: 'B' },
            { label: 'Update administration', value: 'C' },
            { label: 'Track nurse performance', value: 'D' },
          ],
        },
        {
          id: 'q2',
          text: 'What should ALWAYS be included in a medication handover?',
          correctAnswer: 'B',
          options: [
            { label: 'Personal opinions', value: 'A' },
            { label: 'Medication schedule, changes, allergies', value: 'B' },
            { label: 'Only completed tasks', value: 'C' },
            { label: 'Staffing levels', value: 'D' },
          ],
        },
        {
          id: 'q3',
          text: 'What must you do before administering medication?',
          correctAnswer: 'B',
          options: [
            { label: 'Ask another nurse later', value: 'A' },
            { label: 'Check the 5 rights', value: 'B' },
            { label: 'Administer quickly', value: 'C' },
            { label: 'Trust previous notes', value: 'D' },
          ],
        },
        {
          id: 'q4',
          text: 'A patient refuses medication. What should you do FIRST?',
          correctAnswer: 'C',
          options: [
            { label: 'Force them', value: 'A' },
            { label: 'Ignore it', value: 'B' },
            { label: 'Document and inform staff', value: 'C' },
            { label: 'Hide medication', value: 'D' },
          ],
        },
        {
          id: 'q5',
          text: 'What is the BEST way to reduce handover errors?',
          correctAnswer: 'B',
          options: [
            { label: 'Keep it quick', value: 'A' },
            { label: 'Use structured tools (SBAR)', value: 'B' },
            { label: 'Only verbal communication', value: 'C' },
            { label: 'Avoid questions', value: 'D' },
          ],
        },
      ],
    },
    'asmt-002': {
      title: 'Vitals Validation Assessment',
      questions: [
        {
          id: 'q1',
          text: 'An adult patient with a respiratory rate of 28 breaths per minute is experiencing:',
          correctAnswer: 'A',
          options: [
            { label: 'Tachypnea', value: 'A' },
            { label: 'Bradypnea', value: 'B' },
            { label: 'Apnea', value: 'C' },
            { label: 'Eupnea', value: 'D' },
          ],
        },
        {
          id: 'q2',
          text: 'Which factor causes a falsely HIGH blood pressure reading?',
          correctAnswer: 'B',
          options: [
            { label: 'Cuff is too large', value: 'A' },
            { label: 'Cuff is too small', value: 'B' },
            { label: 'Arm positioned above heart level', value: 'C' },
            { label: 'Deflating the cuff too quickly', value: 'D' },
          ],
        },
      ],
    },
    'opt-101': {
      title: 'Wound Care Refresh Assessment',
      questions: [
        {
          id: 'q1',
          text: 'What is the primary goal of a "moist wound healing" environment?',
          correctAnswer: 'A',
          options: [
            { label: 'Faster cell migration and tissue repair', value: 'A' },
            { label: 'To keep the wound as dry as possible', value: 'B' },
            { label: 'To prevent any oxygen from reaching the wound', value: 'C' },
            { label: 'To reduce the need for dressing changes', value: 'D' },
          ],
        },
        {
          id: 'q2',
          text: 'Which sign indicates a wound might be infected?',
          correctAnswer: 'C',
          options: [
            { label: 'Slight itching', value: 'A' },
            { label: 'Granulation tissue appearing pink', value: 'B' },
            { label: 'Increased heat, swelling, and purulent exudate', value: 'C' },
            { label: 'Normal skin temperature', value: 'D' },
          ],
        },
      ],
    },

    'opt-102': {
      title: 'Wound Care Refresh Assessment',
      questions: [
        {
          id: 'q1',
          text: 'Which document is MOST critical for a patient during discharge?',
          correctAnswer: 'B',
          options: [
            { label: 'The original admission form', value: 'A' },
            { label: 'Medication summary and follow-up plan', value: 'B' },
            { label: 'The hospital cafeteria menu', value: 'C' },
            { label: 'Staff shift roster', value: 'D' },
          ],
        },
        {
          id: 'q2',
          text: 'Who must confirm the patient has safe transportation home?',
          correctAnswer: 'A',
          options: [
            { label: 'The discharging nurse', value: 'A' },
            { label: 'The hospital security', value: 'B' },
            { label: 'The pharmacy technician', value: 'C' },
            { label: 'The insurance provider', value: 'D' },
          ],
        },
      ],
    },
    'opt-103': {
      title: 'Patient Communication & Safety Assessment',
      questions: [
        {
          id: 'q1',
          text: 'What is the PRIMARY benefit of using the "SBAR" communication tool?',
          correctAnswer: 'A',
          options: [
            { label: 'Ensures clear, organized handoff of critical information', value: 'A' },
            { label: 'Reduces the time nurses spend talking', value: 'B' },
            { label: 'Eliminates the need for documentation', value: 'C' },
            { label: 'Allows informal communication', value: 'D' },
          ],
        },
        {
          id: 'q2',
          text: 'How should you respond when a patient expresses anxiety about their condition?',
          correctAnswer: 'C',
          options: [
            { label: 'Tell them not to worry', value: 'A' },
            { label: 'Ignore it and move on', value: 'B' },
            { label: 'Listen, validate their concerns, and provide information', value: 'C' },
            { label: 'Leave the room immediately', value: 'D' },
          ],
        },
        {
          id: 'q3',
          text: 'What is an essential part of informed consent?',
          correctAnswer: 'B',
          options: [
            { label: 'Verbal agreement only', value: 'A' },
            { label: 'Patient understands risks, benefits, and alternatives', value: 'B' },
            { label: 'Doctor decides without patient input', value: 'C' },
            { label: 'Only family members need to agree', value: 'D' },
          ],
        },
        {
          id: 'q4',
          text: 'A patient has difficulty understanding English. What should you do?',
          correctAnswer: 'A',
          options: [
            { label: 'Arrange for a professional interpreter', value: 'A' },
            { label: 'Ask a family member to translate', value: 'B' },
            { label: 'Speak louder and slower', value: 'C' },
            { label: 'Proceed without ensuring understanding', value: 'D' },
          ],
        },
        {
          id: 'q5',
          text: 'What should you do if you make a medication error?',
          correctAnswer: 'C',
          options: [
            { label: 'Hide it to avoid trouble', value: 'A' },
            { label: 'Tell only your supervisor weeks later', value: 'B' },
            { label: 'Report it immediately and document thoroughly', value: 'C' },
            { label: 'Blame someone else', value: 'D' },
          ],
        },
      ],
    },

    'opt-104': {
      title: 'Infection Control & Hygiene Assessment',
      questions: [
        {
          id: 'q1',
          text: 'When should hand hygiene be performed in patient care?',
          correctAnswer: 'D',
          options: [
            { label: 'Only before touching a patient', value: 'A' },
            { label: 'Only after exposure to bodily fluids', value: 'B' },
            { label: 'Before and after meals', value: 'C' },
            {
              label: 'Before and after patient contact, and when hands are visibly soiled',
              value: 'D',
            },
          ],
        },
        {
          id: 'q2',
          text: 'What is the correct duration for effective handwashing?',
          correctAnswer: 'B',
          options: [
            { label: '5-10 seconds', value: 'A' },
            { label: '20-30 seconds', value: 'B' },
            { label: '1 minute', value: 'C' },
            { label: 'As long as it feels right', value: 'D' },
          ],
        },
        {
          id: 'q3',
          text: 'Which is the MOST common route of healthcare-associated infections?',
          correctAnswer: 'A',
          options: [
            { label: 'Contaminated hands', value: 'A' },
            { label: 'Airborne particles only', value: 'B' },
            { label: 'Food contamination', value: 'C' },
            { label: 'Sunlight exposure', value: 'D' },
          ],
        },
        {
          id: 'q4',
          text: 'What is the proper technique for donning sterile gloves?',
          correctAnswer: 'B',
          options: [
            { label: 'Put them on quickly without checking', value: 'A' },
            {
              label: 'Ensure hands are clean, pick up glove at cuff, slide fingers in carefully',
              value: 'B',
            },
            { label: 'Touch the inside of the glove package', value: 'C' },
            { label: 'Reuse gloves from a previous patient', value: 'D' },
          ],
        },
        {
          id: 'q5',
          text: 'A patient is on contact precautions. Which PPE must you wear?',
          correctAnswer: 'C',
          options: [
            { label: 'Only a mask', value: 'A' },
            { label: 'Nothing special', value: 'B' },
            { label: 'Gloves and gown, plus hand hygiene', value: 'C' },
            { label: 'Only an apron', value: 'D' },
          ],
        },
      ],
    },
  };

  score: number | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id && this.quizDatabase[this.id]) {
      // Load the specific data for this ID
      const quizData = this.quizDatabase[this.id];
      this.currentTitle = quizData.title;
      this.questions = quizData.questions;

      // Map correct answers for your scoring logic
      this.questions.forEach((q) => {
        this.correctAnswers[q.id] = q.correctAnswer;
      });
    } else {
      // Handle "Not Found" case
      this.currentTitle = 'Assessment Not Found';
      console.error('No quiz found for ID:', this.id);
    }
  }

  submitQuiz() {
    this.submitted = true;
    let total = 0;

    this.lastSubmittedAnswers = { ...this.answers };

    for (let key in this.correctAnswers) {
      if (this.answers[key] === this.correctAnswers[key]) {
        total++;
      }
    }

    this.score = total;

    if (this.score === this.correctAnswers.length) {
      this.markModuleAsCompleted();
    }
  }

  markModuleAsCompleted() {
    console.log(`Module ${this.id} marked as completed!`);
  }

  goToDashboard() {
    this.router.navigate(['/'], {
      queryParams: { completed: this.id },
    });
  }

  getQuestionClass(qKey: string) {
    if (!this.submitted) return '';
    return this.answers[qKey] === this.correctAnswers[qKey] ? 'correct-q' : 'wrong-q';
  }

  get totalQuestions(): number {
    return this.questions.length;
  }
}

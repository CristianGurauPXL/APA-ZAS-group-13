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
    'mod-001': {
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

    'mod-002': {
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

    'mod-003': {
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

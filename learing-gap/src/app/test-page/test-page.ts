import { Component } from '@angular/core';
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
export class TestPage {
  id: string | null = null;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    // Automatically build the correctAnswers map from the array
    this.questions.forEach((q) => {
      this.correctAnswers[q.id] = q.correctAnswer;
    });
  }

  lastSubmittedAnswers: any = {};

  answers: any = {
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  };

  correctAnswers: any = {};

  questions: QuizQuestion[] = [
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
  ];

  score: number | null = null;

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

    if (this.score === 5) {
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
}

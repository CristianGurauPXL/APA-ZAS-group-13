import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  }

  lastSubmittedAnswers: any = {};

  answers: any = {
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  };

  correctAnswers: any = {
    q1: 'B',
    q2: 'B',
    q3: 'B',
    q4: 'C',
    q5: 'B',
  };

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

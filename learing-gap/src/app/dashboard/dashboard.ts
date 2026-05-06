import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FirebaseService } from '../services/firebaseService';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ScheduleItem {
  id?: string;
  time: string;
  room: string;
  task: string;
  active?: boolean;
}

interface LearningModule {
  id: string;
  title: string;
  type: 'mandatory' | 'assessment' | 'optional';
  duration: number;
  progress?: number;
  status?: string;
}

interface NurseProfile {
  name: string;
  title: string;
  ward: string;
  shift: string;
}

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  isAuthenticated = false;
  isSigningIn = false;
  loading = false;
  showLoginForm = false;
  loginEmail = '';
  loginPassword = '';
  loginError = '';

  nurseProfile: NurseProfile | null = null;
  scheduleItems: ScheduleItem[] = [];
  learningModules: LearningModule[] = [];
  alerts: any[] = [];
  completionPercentage = 0;
  completedModules = 0;

  quickActions = [
    {
      label: 'Ask Claude',
      bg: '#e8f5f3',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    },
    {
      label: 'Quick guide',
      bg: '#e8effe',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 004 22h16v-5H6.5M4 19.5V4a2 2 0 012-2h12v13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },
    {
      label: 'Tasks',
      bg: '#f0effe',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },
    {
      label: 'Alerts',
      bg: '#fff3e0',
      badge: 0,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    // Check authentication state
    this.firebaseService
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (user) => {
        if (user) {
          this.isAuthenticated = true;
          this.showLoginForm = false;
          await this.loadUserData(user.uid);
        } else {
          this.isAuthenticated = false;
          this.nurseProfile = null;
          this.scheduleItems = [];
          this.learningModules = [];
        }
      });
  }

  async signIn() {
    if (!this.loginEmail || !this.loginPassword) {
      this.loginError = 'Please enter email and password';
      return;
    }

    this.isSigningIn = true;
    this.loginError = '';

    try {
      await this.firebaseService.signIn(this.loginEmail, this.loginPassword);
      this.loginEmail = '';
      this.loginPassword = '';
    } catch (error: any) {
      this.loginError = error.message || 'Failed to sign in';
    } finally {
      this.isSigningIn = false;
    }
  }

  async signOut() {
    try {
      await this.firebaseService.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  private async loadUserData(userId: string) {
    this.loading = true;
    try {
      // Load nurse profile
      const profile = await this.firebaseService.getNurseProfile(userId);
      if (profile) {
        this.nurseProfile = profile;
      } else {
        // Fallback profile
        this.nurseProfile = {
          name: 'John Doe',
          title: 'RN',
          ward: 'Ward 3B',
          shift: 'Day shift 07:00–15:00',
        };
      }

      // Load schedule
      const schedule = await this.firebaseService.getSchedule(userId);
      if (schedule.length > 0) {
        this.scheduleItems = schedule;
      } else {
        // Fallback schedule
        this.scheduleItems = [
          { time: '08:30', room: 'Room 204B', task: 'Medication round', active: true },
          { time: '09:30', room: 'Room 208A', task: 'Wound care', active: false },
          { time: '10:15', room: 'Room 210', task: 'Discharge preparation', active: false },
          { time: '11:00', room: 'Room 212', task: 'Vitals check', active: false },
        ];
      }

      // Load learning modules
      const modules = await this.firebaseService.getLearningModules(userId);
      if (modules.length > 0) {
        this.learningModules = modules;
      } else {
        // Fallback modules
        this.learningModules = [
          {
            id: '1',
            title: 'Safe medication handover',
            type: 'mandatory',
            duration: 6,
            progress: 58,
          },
          {
            id: '2',
            title: 'Doctor-executed test',
            type: 'assessment',
            duration: 3,
            status: 'pending',
          },
          {
            id: '3',
            title: 'Wound dressing refresh',
            type: 'optional',
            duration: 4,
          },
        ];
      }

      // Load alerts
      const alertsData = await this.firebaseService.getAlerts(userId);
      this.alerts = alertsData;
      this.quickActions[3].badge = alertsData.length;

      // Calculate completion
      this.updateCompletion();
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      this.loading = false;
    }
  }

  private updateCompletion() {
    const completed = this.learningModules.filter((m) => (m.progress || 0) >= 100).length;
    this.completedModules = completed;
    this.completionPercentage = Math.round(
      (completed / Math.max(this.learningModules.length, 1)) * 100,
    );
  }

  setActive(selected: ScheduleItem) {
    this.scheduleItems.forEach((item) => (item.active = item === selected));
  }

  async continueModule(module: LearningModule) {
    try {
      await this.firebaseService.createLearningSession(
        this.firebaseService.getCurrentUserSync()?.uid || '',
        module.id,
      );
      alert(`Starting module: ${module.title}`);
    } catch (error) {
      console.error('Error starting module:', error);
    }
  }

  async startModule(module: LearningModule) {
    try {
      await this.firebaseService.createLearningSession(
        this.firebaseService.getCurrentUserSync()?.uid || '',
        module.id,
      );
      alert(`Starting module: ${module.title}`);
    } catch (error) {
      console.error('Error starting module:', error);
    }
  }

  handleQuickAction(action: any) {
    alert(`Clicked: ${action.label}`);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

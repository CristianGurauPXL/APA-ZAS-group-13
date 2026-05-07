import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// PrimeNG Modules (Only essentials)
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    CardModule,
    BadgeModule,
    TagModule,
    ToastModule,
    ChartModule,
    ProgressBarModule,
    TooltipModule,
    TableModule,
    CarouselModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [MessageService],
})
export class Dashboard implements OnInit {
  // ─────────────────────────────────────
  // HARDCODED SCHEDULE DATA
  // ─────────────────────────────────────
  scheduleItems = [
    {
      id: 1,
      time: '08:30',
      room: 'Room 204B',
      task: 'Medication round',
      active: true,
      priority: 'high',
      completed: false,
    },
    {
      id: 2,
      time: '09:30',
      room: 'Room 208A',
      task: 'Wound care',
      active: false,
      priority: 'medium',
      completed: false,
    },
    {
      id: 3,
      time: '10:15',
      room: 'Room 210',
      task: 'Discharge preparation',
      active: false,
      priority: 'low',
      completed: false,
    },
    {
      id: 4,
      time: '11:00',
      room: 'Room 212',
      task: 'Vitals check',
      active: false,
      priority: 'high',
      completed: false,
    },
    {
      id: 5,
      time: '14:00',
      room: 'Room 205',
      task: 'Patient interview',
      active: false,
      priority: 'medium',
      completed: false,
    },
  ];

  // ─────────────────────────────────────
  // HARDCODED LEARNING MODULES
  // ─────────────────────────────────────
  mandatoryModules = [
    {
      id: 'mod-001',
      title: 'Safe Medication Handover',
      description: 'Best practices for medication handover procedures.',
      duration: 6,
      progress: 0,
      type: 'mandatory',
      videoId: 'P5ZJui3aPoQ',
      thumbnail: 'https://img.youtube.com/vi/P5ZJui3aPoQ/hqdefault.jpg',
      completed: false,
      taskId: 1,
    },
    {
      id: 'mod-002',
      title: 'Aseptic Dressing Technique',
      description: 'Maintaining a sterile field during complex wound care.',
      duration: 7,
      progress: 0,
      type: 'mandatory',
      videoId: '1iyT_uS7n-0',
      thumbnail: 'https://img.youtube.com/vi/1iyT_uS7n-0/hqdefault.jpg',
      completed: false,
      taskId: 2,
    },
    {
      id: 'mod-003',
      title: 'Legal Discharge Standards',
      description: 'Mandatory documentation and legal requirements for patient discharge.',
      duration: 5,
      progress: 0,
      type: 'mandatory',
      videoId: 'ScMzIvxBSi4',
      thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg',
      completed: false,
      taskId: 3,
    },
    {
      id: 'mod-004',
      title: 'Accurate Vitals Recording',
      description: 'Standardizing the recording of vital signs in EMR systems.',
      duration: 4,
      progress: 0,
      type: 'mandatory',
      videoId: 'S-8_I8L8L3U',
      thumbnail: 'https://img.youtube.com/vi/S-8_I8L8L3U/hqdefault.jpg',
      completed: false,
      taskId: 4,
    },
    {
      id: 'mod-005',
      title: 'Comprehensive Head-to-Toe',
      description: 'Systematic approach to daily patient physical assessment.',
      duration: 8,
      progress: 0,
      type: 'mandatory',
      videoId: 'e2D69_S8m5Y',
      thumbnail: 'https://img.youtube.com/vi/e2D69_S8m5Y/hqdefault.jpg',
      completed: false,
      taskId: 5,
    },
    {
      id: 'mod-006',
      title: 'Hypertension Management',
      description: 'Recognizing critical blood pressure thresholds and protocols.',
      duration: 6,
      progress: 0,
      type: 'mandatory',
      videoId: 'X07pWTM-rXU',
      thumbnail: 'https://img.youtube.com/vi/X07pWTM-rXU/hqdefault.jpg',
      completed: false,
      taskId: 6,
    },
  ];

  assessmentModules = [
    {
      id: 'asmt-001',
      title: 'Medication Safety Quiz',
      description: 'Final check for medication round protocols.',
      duration: 3,
      progress: 0,
      type: 'assessment',
      completed: false,
      linkedTo: { moduleIds: ['mod-001'], requirement: 'all' },
    },
    {
      id: 'asmt-002',
      title: 'Wound Care Competency',
      description: 'Practical knowledge assessment for dressings.',
      duration: 5,
      progress: 0,
      type: 'assessment',
      completed: false,
      linkedTo: { moduleIds: ['mod-002'], requirement: 'all' },
    },
    {
      id: 'asmt-003',
      title: 'Discharge Protocol Test',
      description: 'Compliance check for patient discharge.',
      duration: 4,
      progress: 0,
      type: 'assessment',
      completed: false,
      linkedTo: { moduleIds: ['mod-003'], requirement: 'all' },
    },
    {
      id: 'asmt-004',
      title: 'Vitals Validation',
      description: 'Assessing accuracy in vital sign interpretation.',
      duration: 3,
      progress: 0,
      type: 'assessment',
      completed: false,
      linkedTo: { moduleIds: ['mod-004'], requirement: 'all' },
    },
    {
      id: 'asmt-005',
      title: 'Patient Assessment Check',
      description: 'Evaluating head-to-toe assessment skills.',
      duration: 5,
      progress: 0,
      type: 'assessment',
      completed: false,
      linkedTo: { moduleIds: ['mod-005'], requirement: 'all' },
    },
    {
      id: 'asmt-006',
      title: 'BP Monitoring Quiz',
      description: 'Testing knowledge on hypertensive crises.',
      duration: 4,
      progress: 0,
      type: 'assessment',
      completed: false,
      linkedTo: { moduleIds: ['mod-006'], requirement: 'all' },
    },
  ];

  optionalModules = [
    // Task 1: Medication Round
    {
      id: 'opt-101',
      title: 'Insulin Administration',
      description: 'Quick refresh on sliding scale insulin protocols.',
      duration: 3,
      progress: 0,
      type: 'optional',
      videoId: 'dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      completed: false,
      taskId: 1,
    },
    {
      id: 'opt-102',
      title: 'IV Drip Calculations',
      description: 'Fast math for manual IV flow rate settings.',
      duration: 4,
      progress: 0,
      type: 'optional',
      videoId: 'dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      completed: false,
      taskId: 1,
    },

    // Task 2: Wound Care
    {
      id: 'opt-201',
      title: 'Pressure Injury Staging',
      description: 'Visual guide to identifying Stage I-IV ulcers.',
      duration: 5,
      progress: 0,
      type: 'optional',
      videoId: 'ScMzIvxBSi4',
      thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg',
      completed: false,
      taskId: 2,
    },
    {
      id: 'opt-202',
      title: 'Negative Pressure Therapy',
      description: 'Introduction to Wound-Vac machine troubleshooting.',
      duration: 6,
      progress: 0,
      type: 'optional',
      videoId: 'ScMzIvxBSi4',
      thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg',
      completed: false,
      taskId: 2,
    },

    // Task 3: Discharge Prep
    {
      id: 'opt-301',
      title: 'Patient Transport Safety',
      description: 'Safe transfer techniques from bed to wheelchair.',
      duration: 3,
      progress: 0,
      type: 'optional',
      videoId: 'dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      completed: false,
      taskId: 3,
    },
    {
      id: 'opt-302',
      title: 'Medication Reconciliation',
      description: 'Ensuring home meds match hospital discharge orders.',
      duration: 5,
      progress: 0,
      type: 'optional',
      videoId: 'dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      completed: false,
      taskId: 3,
    },

    // Task 4: Vitals Check
    {
      id: 'opt-401',
      title: 'Pediatric Vital Ranges',
      description: 'Key differences in vitals for younger patients.',
      duration: 4,
      progress: 0,
      type: 'optional',
      videoId: 'ScMzIvxBSi4',
      thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg',
      completed: false,
      taskId: 4,
    },
    {
      id: 'opt-402',
      title: 'Recognizing Sepsis Signs',
      description: 'Early warning indicators during routine vital checks.',
      duration: 6,
      progress: 0,
      type: 'optional',
      videoId: 'ScMzIvxBSi4',
      thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg',
      completed: false,
      taskId: 4,
    },

    // Task 6: Blood Pressure
    {
      id: 'opt-601',
      title: 'Orthostatic Hypotension',
      description: 'How to perform a proper tilt test assessment.',
      duration: 4,
      progress: 0,
      type: 'optional',
      videoId: 'dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      completed: false,
      taskId: 6,
    },
    {
      id: 'opt-602',
      title: 'Cuff Sizing Impact',
      description: 'How incorrect cuff size leads to diagnostic errors.',
      duration: 3,
      progress: 0,
      type: 'optional',
      videoId: 'dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      completed: false,
      taskId: 6,
    },
  ];

  // ─────────────────────────────────────
  // HARDCODED TASKS DATA
  // ─────────────────────────────────────
  tasks = [
    {
      id: 1,
      title: 'Medication round',
      room: 'Room 204B',
      priority: 'High',
      status: 'In Progress',
      completed: false,
    },
    {
      id: 2,
      title: 'Wound care',
      room: 'Room 208A',
      priority: 'Medium',
      status: 'Pending',
      completed: false,
    },
    {
      id: 3,
      title: 'Discharge prep',
      room: 'Room 210',
      priority: 'Low',
      status: 'Pending',
      completed: false,
    },
    {
      id: 4,
      title: 'Vitals check',
      room: 'Room 212',
      priority: 'High',
      status: 'Pending',
      completed: false,
    },
    {
      id: 5,
      title: 'Patient assessment',
      room: 'Room 205',
      priority: 'Medium',
      status: 'Completed',
      completed: true,
    },
    {
      id: 6,
      title: 'Blood pressure monitoring',
      room: 'Room 215',
      priority: 'High',
      status: 'In Progress',
      completed: false,
    },
  ];

  // ─────────────────────────────────────
  // HARDCODED ALERTS
  // ─────────────────────────────────────
  alerts = [
    {
      id: 1,
      type: 'critical' as const,
      message: 'Room 204B - Patient vitals abnormal',
      room: 'Room 204B',
      time: '2 min ago',
      patient: 'John Doe',
    },
    {
      id: 2,
      type: 'warn' as const,
      message: 'Room 208A - Medication due in 30 minutes',
      room: 'Room 208A',
      time: '5 min ago',
      patient: 'Jane Smith',
    },
    {
      id: 3,
      type: 'info' as const,
      message: 'Room 210 - Discharge papers ready for review',
      room: 'Room 210',
      time: '10 min ago',
      patient: 'Robert Johnson',
    },
    {
      id: 4,
      type: 'warn' as const,
      message: 'Room 212 - IV fluid low',
      room: 'Room 212',
      time: '15 min ago',
      patient: 'Mary Williams',
    },
  ];

  // ─────────────────────────────────────
  // EARNED BADGES (DYNAMICALLY UPDATED)
  // ─────────────────────────────────────
  quickActions = [
    {
      id: 'mod-001-badge',
      label: 'Safe medication handover',
      icon: 'pi pi-graduation-cap',
      color: '#1a9e8f',
      bg: '#e8f5f3',
      completed: false,
      moduleId: 'mod-001',
      action: () => this.showBadgeInfo('mod-001'),
    },
    {
      id: 'mod-002-badge',
      label: 'Wound dressing refresh',
      icon: 'pi pi-heart',
      color: '#ef4444',
      bg: '#fef2f2',
      completed: false,
      moduleId: 'mod-002',
      action: () => this.showBadgeInfo('mod-002'),
    },
    {
      id: 'mod-003-badge',
      label: 'Discharge checklist',
      icon: 'pi pi-send',
      color: '#2b4ec7',
      bg: '#eff6ff',
      completed: false,
      moduleId: 'mod-003',
      action: () => this.showBadgeInfo('mod-003'),
    },
  ];

  // ─────────────────────────────────────
  // NURSE PROFILE DATA
  // ─────────────────────────────────────
  nurseProfile = {
    name: 'Tom Jacobs',
    rn: 'RN',
    ward: 'Ward 3B',
    shift: 'Day shift 07:00–15:00',
    status: 'available',
  };

  // ─────────────────────────────────────
  // UI STATE VARIABLES
  // ─────────────────────────────────────
  videoDialogVisible = false;
  selectedModule: any = null;
  videoUrl: SafeResourceUrl = '';
  alertsSidebarVisible = false;
  tasksSidebarVisible = false;

  // Chart Data
  chartData: any;
  chartOptions: any;

  selectedTaskId: number = 1;

  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.initializeCharts();
  }

  ngOnInit(): void {
    this.initializeCharts();
    const savedIds: string[] = JSON.parse(localStorage.getItem('wardwise_completed') || '[]');

    const syncModule = (mod: any) => {
      if (savedIds.includes(mod.id)) {
        mod.completed = true;
        mod.progress = 100;
      }
    };

    this.mandatoryModules.forEach(syncModule);
    this.optionalModules.forEach(syncModule);
    this.assessmentModules.forEach(syncModule);

    // Update badge completion status after loading modules
    this.updateBadgeStatus();

    this.route.queryParams.subscribe((params) => {
      const completedId = params['completed'];

      if (completedId) {
        this.markAsDone(completedId);
      }
    });
  }

  updateBadgeStatus(): void {
    this.quickActions.forEach((badge) => {
      const module = [...this.mandatoryModules, ...this.optionalModules].find(
        (m) => m.id === badge.moduleId,
      );
      if (module) {
        badge.completed = module.completed;
      }
    });
  }

  showBadgeInfo(moduleId: string): void {
    const module = [...this.mandatoryModules, ...this.optionalModules].find(
      (m) => m.id === moduleId,
    );
    if (module && module.completed) {
      this.showToast(
        'success',
        '🏆 Badge Earned!',
        `You've completed "${module.title}" and earned this badge!`,
      );
    } else if (module) {
      this.showToast('info', 'Badge Locked', `Complete "${module.title}" to earn this badge.`);
    }
  }

  markAsDone(assessmentId: string) {
    // 1. Find the assessment module in your list
    const assessment = this.assessmentModules.find((m) => m.id === assessmentId);

    if (assessment) {
      // Mark the assessment itself as done
      assessment.completed = true;
      assessment.progress = 100;

      // --- LOCAL STORAGE LOGIC ---
      // Get existing saved IDs from browser memory
      const savedIds: string[] = JSON.parse(localStorage.getItem('wardwise_completed') || '[]');

      // Add this assessment ID to the list if not already there
      if (!savedIds.includes(assessmentId)) {
        savedIds.push(assessmentId);
      }

      // 2. Check if this assessment is linked to other modules (like Mandatory or Optional)
      if (assessment.linkedTo && assessment.linkedTo.moduleIds) {
        const linkedIds = assessment.linkedTo.moduleIds;

        // 3. Update Mandatory Modules & Add to saved list
        this.mandatoryModules.forEach((mod) => {
          if (linkedIds.includes(mod.id)) {
            mod.completed = true;
            mod.progress = 100;
            if (!savedIds.includes(mod.id)) savedIds.push(mod.id);
          }
        });

        // 4. Update Optional Modules & Add to saved list
        this.optionalModules.forEach((mod) => {
          if (linkedIds.includes(mod.id)) {
            mod.completed = true;
            mod.progress = 100;
            if (!savedIds.includes(mod.id)) savedIds.push(mod.id);
          }
        });
      }

      // 5. Save the updated list back to LocalStorage
      localStorage.setItem('wardwise_completed', JSON.stringify(savedIds));

      // Update badge completion status
      this.updateBadgeStatus();
    } else {
      console.warn(`Could not find assessment with ID: ${assessmentId}`);
    }
  }

  // ─────────────────────────────────────
  // SCHEDULE METHODS
  // ─────────────────────────────────────

  setActive(selected: any): void {
    this.scheduleItems.forEach((item) => (item.active = item === selected));
  }

  completeScheduleItem(item: any): void {
    item.completed = !item.completed;
    const action = item.completed ? 'marked as complete' : 'marked as incomplete';
    this.showToast('success', 'Task Updated', `${item.task} ${action}`);
  }

  // ─────────────────────────────────────
  // VIDEO METHODS
  // ─────────────────────────────────────

  displayVideoPlayer: boolean = false;

  playVideo(module: any) {
    // Validate that the module has a videoId before attempting to play
    if (!module.videoId) {
      this.showToast('warn', 'Video Not Available', 'This module does not have a video');
      return;
    }

    this.selectedModule = module;
    // Construct the embed URL. YouTube requires /embed/ for iframe playback.
    const rawUrl = `https://www.youtube.com/embed/${module.videoId}?autoplay=1`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
    this.displayVideoPlayer = true;
  }

  closeVideo() {
    this.displayVideoPlayer = false;
  }

  onVideoDialogHide(): void {
    this.closeVideo();
  }

  completeModule(module: any): void {
    if (!module) return;
    module.completed = true;
    module.progress = 100;
    this.showToast('success', 'Module Completed', `${module.title} has been marked as complete!`);
  }

  // ─────────────────────────────────────
  // PROGRESS METHODS
  // ─────────────────────────────────────

  getProgressPercentage(): number {
    const allModules = [...this.mandatoryModules];
    const completed = allModules.filter((m) => m.completed).length;
    return allModules.length > 0 ? Math.round((completed / allModules.length) * 100) : 0;
  }

  getCompletedCount(): number {
    const allModules = [...this.mandatoryModules];
    return allModules.filter((m) => m.completed).length;
  }

  getTotalCount(): number {
    return [...this.mandatoryModules].length;
  }

  // ─────────────────────────────────────
  // UI INTERACTION METHODS
  // ─────────────────────────────────────

  toggleAlertsSidebar(): void {
    this.alertsSidebarVisible = !this.alertsSidebarVisible;
  }

  showTasksTable(): void {
    this.tasksSidebarVisible = true;
  }

  resolveAlert(alert: any): void {
    this.alerts = this.alerts.filter((a) => a.id !== alert.id);
    this.showToast('success', 'Alert Resolved', 'Alert has been marked as resolved');
  }

  toggleTaskComplete(task: any): void {
    task.completed = !task.completed;
    task.status = task.completed ? 'Completed' : 'Pending';
    this.showToast('success', 'Task Updated', `${task.title} status updated`);
  }

  closeSidebars(): void {
    this.alertsSidebarVisible = false;
    this.tasksSidebarVisible = false;
  }

  // ─────────────────────────────────────
  // TOAST NOTIFICATION METHOD
  // ─────────────────────────────────────

  showToast(
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail: string,
  ): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000,
    });
  }

  // ─────────────────────────────────────
  // CHART INITIALIZATION
  // ─────────────────────────────────────

  initializeCharts(): void {
    this.chartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Tasks Completed',
          backgroundColor: 'rgba(26, 158, 143, 0.2)',
          borderColor: '#1a9e8f',
          borderWidth: 2,
          data: [8, 7, 9, 12, 10, 6, 5],
          fill: true,
          tension: 0.4,
        },
      ],
    };

    this.chartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            usePointStyle: true,
            font: {
              family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 15,
          ticks: {
            stepSize: 5,
          },
        },
      },
    };
  }

  // ─────────────────────────────────────
  // UTILITY METHODS
  // ─────────────────────────────────────

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high':
      case 'High':
        return '#ef4444';
      case 'medium':
      case 'Medium':
        return '#f59e0b';
      case 'low':
      case 'Low':
        return '#10b981';
      default:
        return '#8a96ae';
    }
  }

  getSeverityByType(type: 'critical' | 'warn' | 'info'): 'danger' | 'warn' | 'info' {
    switch (type) {
      case 'critical':
        return 'danger';
      case 'warn':
        return 'warn';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'info';
      case 'Pending':
        return 'warn';
      default:
        return 'info';
    }
  }

  getPriorityTag(priority: string): 'danger' | 'warn' | 'success' {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warn';
      case 'Low':
        return 'success';
      default:
        return 'info' as any;
    }
  }

  getAlertBadgeCount(): number {
    return this.alerts.length;
  }

  getCompletedTasksCount(): number {
    return this.tasks.filter((t) => t.completed).length;
  }

  getPendingTasksCount(): number {
    return this.tasks.filter((t) => !t.completed && t.status === 'Pending').length;
  }

  getLinkedModule(assessment: any) {
    return this.mandatoryModules.find((m) => m.id === assessment.basedOnModuleId);
  }

  isAssessmentLocked(assessment: any) {
    const module = this.getLinkedModule(assessment);
    return !module?.completed;
  }

  isAssessmentUnlocked(assessment: any): boolean {
    if (!assessment.linkedTo) return true;

    const linkedModules = this.mandatoryModules.filter((m) =>
      assessment.linkedTo.moduleIds.includes(m.id),
    );

    if (assessment.linkedTo.requirement === 'all') {
      return linkedModules.every((m) => m.completed);
    }

    if (assessment.linkedTo.requirement === 'any') {
      return linkedModules.some((m) => m.completed);
    }

    return false;
  }

  getMandatoryProgressPercentage(): number {
    if (this.mandatoryModules.length === 0) return 0;

    const total = this.mandatoryModules.length;
    const completed = this.mandatoryModules.filter((m) => m.completed).length;

    return Math.round((completed / total) * 100);
  }

  goToTest(module: any) {
    this.router.navigate(['/assessment', module.id]);
  }

  resetAllProgress() {
    localStorage.removeItem('wardwise_completed');
    window.location.reload(); // Refresh to show everything as incomplete again
  }

  selectTask(task: any) {
    this.selectedTaskId = task.id;
  }

  get currentMandatory() {
    return this.mandatoryModules.filter((m) => m.taskId === this.selectedTaskId);
  }

  get currentOptional() {
    return this.optionalModules.filter((m) => m.taskId === this.selectedTaskId);
  }

  getActiveTaskTitle(): string {
    // 1. Find the task in your tasks array that matches the currently selected ID
    const activeTask = this.tasks.find((t) => t.id === this.selectedTaskId);

    // 2. Return the title if found, otherwise return a fallback string
    return activeTask ? activeTask.title : 'No Task Selected';
  }

  get currentAssessments() {
    return this.assessmentModules.filter((assessment) => {
      // 1. Get the IDs of modules this assessment is linked to
      const linkedIds = assessment.linkedTo?.moduleIds || [];

      // 2. Check if any of those linked modules belong to the selected task
      return linkedIds.some((moduleId) => {
        // Find the actual module object (in mandatory or optional)
        const allOtherModules = [...this.mandatoryModules];
        const linkedModule = allOtherModules.find((m) => m.id === moduleId);

        // If the linked module exists and matches our current task, keep this assessment
        return linkedModule && linkedModule.taskId === this.selectedTaskId;
      });
    });
  }
}

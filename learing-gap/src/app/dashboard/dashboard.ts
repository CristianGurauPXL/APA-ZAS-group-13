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
    CarouselModule
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
      title: 'Safe medication handover',
      description:
        'Learn best practices for medication handover procedures to ensure patient safety',
      duration: 6,
      progress: 58,
      type: 'mandatory',
      videoId: 'P5ZJui3aPoQ',
      thumbnail: 'https://img.youtube.com/vi/P5ZJui3aPoQ/hqdefault.jpg',
      completed: false,
      linkedTask: '08:30 medication round',
    },
  ];

  assessmentModules = [
    {
      id: 'mod-001',
      title: 'Doctor-executed test',
      description: 'Medication round check assessment - verify your understanding',
      duration: 3,
      progress: 0,
      type: 'assessment',
      completed: false,
      linkedTo: {
        moduleIds: ['mod-001'],
        requirement: 'all',
      },
    },
    {
      id: 'mod-002',
      title: 'Wound Care Assessment',
      description: 'Verify your knowledge on advanced dressing techniques.',
      duration: 5,
      progress: 0,
      type: 'assessment',
      completed: false,
      linkedTo: { moduleIds: ['mod-002'], requirement: 'all' },
    },
    {
      id: 'mod-003',
      title: 'Discharge Protocol Test',
      description: 'Ensure patient safety during the discharge transition.',
      duration: 4,
      progress: 0,
      type: 'assessment',
      completed: false,
      linkedTo: { moduleIds: ['mod-003'], requirement: 'all' },
    },
  ];

  optionalModules = [
    {
      id: 'mod-002',
      title: 'Wound dressing refresh',
      description: 'Advanced techniques for professional wound care management',
      duration: 4,
      progress: 0,
      type: 'optional',
      videoId: 'dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      completed: false,
    },
    {
      id: 'mod-003',
      title: 'Discharge checklist',
      description: 'Complete discharge procedures and patient follow-up protocols',
      duration: 5,
      progress: 0,
      type: 'optional',
      videoId: 'ScMzIvxBSi4',
      thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg',
      completed: false,
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
  // HARDCODED QUICK ACTIONS
  // ─────────────────────────────────────
  quickActions = [
    {
      label: 'Blood transfusion',
      icon: 'pi pi-comments',
      color: '#1a9e8f', // Teal
      bg: '#e8f5f3',
      action: () =>
        this.showToast('info', 'Blood Transfusion', 'Initiating blood transfusion protocol...'),
    },
    {
      label: 'Emergency Call',
      icon: 'pi pi-megaphone',
      color: '#ef4444', // Red for urgency
      bg: '#fef2f2',
      action: () => this.showToast('error', 'Emergency', 'Alerting ward supervisor...'),
    },
    {
      label: 'Handover Notes',
      icon: 'pi pi-file-edit',
      color: '#2b4ec7', // Primary Blue
      bg: '#eff6ff',
      badge: 'New',
      action: () => this.showToast('success', 'Handover', 'Loading patient handover summary...'),
    },
    {
      label: 'Enter Vitals',
      icon: 'pi pi-activity',
      color: '#8b5cf6', // Purple
      bg: '#f5f3ff',
      action: () => this.showToast('info', 'Vitals', 'Opening observation chart...'),
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

    this.route.queryParams.subscribe((params) => {
      const completedId = params['completed'];

      if (completedId) {
        this.markAsDone(completedId);
      }
    });
  }

  markAsDone(assessmentId: string) {
    // 1. Find the assessment module itself
    const assessment = this.assessmentModules.find((m) => m.id === assessmentId);

    if (assessment) {
      assessment.completed = true;
      assessment.progress = 100;

      // 2. Check if this assessment is linked to other modules
      if (assessment.linkedTo && assessment.linkedTo.moduleIds) {
        const linkedIds = assessment.linkedTo.moduleIds;

        // 3. Mark matching Mandatory modules as completed
        this.mandatoryModules.forEach((mod) => {
          if (linkedIds.includes(mod.id)) {
            mod.completed = true;
            mod.progress = 100;
          }
        });

        // 4. Mark matching Optional modules as completed
        this.optionalModules.forEach((mod) => {
          if (linkedIds.includes(mod.id)) {
            mod.completed = true;
            mod.progress = 100;
          }
        });
      }
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
}

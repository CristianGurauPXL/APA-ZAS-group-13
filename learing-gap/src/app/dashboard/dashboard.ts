import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  scheduleItems = [
    { time: '08:30', room: 'Room 204B', task: 'Medication round', active: true },
    { time: '09:30', room: 'Room 208A', task: 'Wound care', active: false },
    { time: '10:15', room: 'Room 210', task: 'Discharge preparation', active: false },
    { time: '11:00', room: 'Room 212', task: 'Vitals check', active: false },
  ];

  quickActions = [
    {
      label: 'Ask Claude',
      bg: '#e8f5f3',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#1a9e8f" stroke-width="2" stroke-linejoin="round"/></svg>`,
    },
    {
      label: 'Quick guide',
      bg: '#e8effe',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 004 22h16v-5H6.5M4 19.5V4a2 2 0 012-2h12v13" stroke="#2b4ec7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },
    {
      label: 'Tasks',
      bg: '#f0effe',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },
    {
      label: 'Alerts',
      bg: '#fff3e0',
      badge: 3,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/></svg>`,
    },
  ];

  setActive(selected: any) {
    this.scheduleItems.forEach((item) => (item.active = item === selected));
  }
}

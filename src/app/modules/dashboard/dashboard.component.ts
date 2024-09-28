import { Component, ElementRef, ViewChild } from '@angular/core';
import { IArea } from 'src/app/data/interfaces/IArea';
import { IUser } from 'src/app/data/interfaces/IUser';
import { AreaService } from 'src/app/data/services/area.service';
import { UserService } from 'src/app/data/services/user.service';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalActiveUsers: number = 0;
  totalInactiveUsers: number = 0;
  totalActiveAreas: number = 0;
  totalInactiveAreas: number = 0;
  areaUserCount: { nombre: string, count: number }[] = [];
  areaLeaders: { nombre: string }[] = [];
  leadersCount: { nombre: string, count: number }[] = [];

  @ViewChild('userBarChart') userBarChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('userLineChart') userLineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('areaChart') areaChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('userChart') userChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('leadersChart') leadersChartRef!: ElementRef<HTMLCanvasElement>;

  private userBarChart!: Chart<'bar'>;
  private userLineChart!: Chart<'line'>;
  private areaChart!: Chart<'pie'>;
  private userChart!: Chart<'pie'>;
  private leadersChart!: Chart<'bar'>;

  constructor(private userService: UserService, private areaService: AreaService) { 
    Chart.register(...registerables); // Register chart types
  }

  ngOnInit(): void {
    this.loadUserStats();
    this.loadAreaStats();
  }

  loadUserStats() {
    this.userService.getUsers().subscribe(users => {
      this.totalActiveUsers = users.filter(user => user.estado === 'Activo').length;
      this.totalInactiveUsers = users.filter(user => user.estado === 'Inactivo').length;
      this.calculateUsersByArea(users);
      this.createUserBarChart();
      this.createUserLineChart();
      this.createUserChart(); // Crea el gráfico de usuarios
    });
  }

  loadAreaStats() {
    this.areaService.getAreas().subscribe(areas => {
      this.totalActiveAreas = areas.filter(area => area.estado === 'Activo').length;
      this.totalInactiveAreas = areas.filter(area => area.estado === 'Inactivo').length;
      this.loadAreaLeaders(areas);
      this.createAreaChart();
      this.calculateLeadersByArea(areas); // Calcular líderes por área
      this.createLeadersChart(); // Crear gráfico de líderes
    });
  }

  calculateUsersByArea(users: IUser[]) {
    const areaCount: { [key: string]: number } = {};

    users.forEach(user => {
      areaCount[user.area] = (areaCount[user.area] || 0) + 1;
    });

    this.areaUserCount = Object.keys(areaCount).map(key => ({
      nombre: key,
      count: areaCount[key]
    }));
  }

  loadAreaLeaders(areas: IArea[]) {
    this.areaLeaders = areas.filter(area => area.lider).map(area => ({
      nombre: area.lider
    }));
  }

  calculateLeadersByArea(areas: IArea[]) {
    const leadersCount: { [key: string]: number } = {};

    areas.forEach(area => {
      if (area.lider) {
        leadersCount[area.lider] = (leadersCount[area.lider] || 0) + 1;
      }
    });

    this.leadersCount = Object.keys(leadersCount).map(key => ({
      nombre: key,
      count: leadersCount[key]
    }));
  }

  createUserBarChart() {
    const labels = this.areaUserCount.map(area => area.nombre);
    const data = this.areaUserCount.map(area => area.count);

    const ctx = this.userBarChartRef.nativeElement.getContext('2d');
    this.userBarChart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Usuarios por Área',
          data: data,
          backgroundColor: '#4CAF50',
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createUserLineChart() {
    const labels = this.areaUserCount.map(area => area.nombre);
    const data = this.areaUserCount.map(area => area.count);

    const ctx = this.userLineChartRef.nativeElement.getContext('2d');
    this.userLineChart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Usuarios por Área (Línea)',
          data: data,
          borderColor: '#FF5733',
          fill: false,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createAreaChart() {
    const areaLabels = ['Activas', 'Inactivas'];
    const areaData = [this.totalActiveAreas, this.totalInactiveAreas];

    const ctx = this.areaChartRef.nativeElement.getContext('2d');
    this.areaChart = new Chart(ctx!, {
      type: 'pie',
      data: {
        labels: areaLabels,
        datasets: [{
          data: areaData,
          backgroundColor: ['#2196F3', '#FFEB3B'],
        }]
      },
      options: {
        responsive: true,
      }
    });
  }

  createUserChart() {
    const userLabels = ['Activos', 'Inactivos'];
    const userData = [this.totalActiveUsers, this.totalInactiveUsers];

    const ctx = this.userChartRef.nativeElement.getContext('2d');
    this.userChart = new Chart(ctx!, {
      type: 'pie',
      data: {
        labels: userLabels,
        datasets: [{
          data: userData,
          backgroundColor: ['#FF5733', '#FFEB3B'],
        }]
      },
      options: {
        responsive: true,
      }
    });
  }

  createLeadersChart() {
    const labels = this.leadersCount.map(leader => leader.nombre);
    const data = this.leadersCount.map(leader => leader.count);

    const ctx = this.leadersChartRef.nativeElement.getContext('2d');
    this.leadersChart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Líderes por Área',
          data: data,
          backgroundColor: '#FFCA28',
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

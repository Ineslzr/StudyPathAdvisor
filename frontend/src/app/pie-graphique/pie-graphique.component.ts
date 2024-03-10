import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { Observable, of, map } from 'rxjs';

@Component({
  selector: 'app-pie-graphique',
  templateUrl: './pie-graphique.component.html',
  styleUrls: ['./pie-graphique.component.scss']
})
export class PieGraphiqueComponent implements OnInit {

  allData: any[] = [];
  majors : string[] = [];
  major : string = "Accounting";
  selectedMajorData: any[] = [];
  chartInstance: any = null;

  @ViewChild('pieCanvas') pieCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData('student_major_universities.json').subscribe(data => {
      this.allData = data;

      this.getAllMajorNames().subscribe(names => {
        this.majors = names;
      });
      this.renderPieChart();
    });
  }

  getAllMajorNames(): Observable<string[]> {
    return of(this.allData.map(entry => entry['Major'])).pipe(
      map((names:any) => Array.from(new Set(names)))
    );
  }

  onMajorChange(event: Event): void {
    const selectedMajor = (event.target as HTMLSelectElement).value;
    this.major = selectedMajor;
    

    // Destroy existing chart instance if it exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    // Render pie chart for selected major
    this.renderPieChart();
  }

  getMajorData(majorName: string): any[] {
    const major = this.allData.find(entry => entry['Major'] === majorName);
    return major ? major['Universités'] : [];
  }

  renderPieChart(): void {
    this.selectedMajorData = this.getMajorData(this.major);
    const universities = this.selectedMajorData.map(entry => entry['Université']);
    const studentCounts = this.selectedMajorData.map(entry => entry['NombreEtudiants']);

    const ctx = this.pieCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context is null.');
      return;
    }
    

    this.chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: universities,
        datasets: [{
          label: 'Student Counts',
          data: studentCounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display:false
          },
          title: {
            display: true,
            position: 'bottom',
            text: 'Nombre d\'étudiants d\'une formation par université'
          }
        },
        responsive: true
      }
    }as ChartConfiguration<'pie', number[],number>);
  }
  
}

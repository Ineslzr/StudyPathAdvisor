import { Component, AfterViewInit, ViewChild, ElementRef,Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-student-gpa',
  templateUrl: './student-gpa.component.html',
  styleUrls: ['./student-gpa.component.scss']
})
export class StudentGpaComponent {
}


/*import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-student-gpa',
  templateUrl: './student-gpa.component.html',
  styleUrls: ['./student-gpa.component.scss']
})
export class StudentGpaComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @Input() chartType: 'grouped' | 'modified' = 'grouped';

  currentPage = 0;
  pageSize = 10;
  dataChunks: any[] = [];
  chartInstance: Chart | null = null;

  constructor(private dataService: DataService) { }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    const fileName = this.chartType === 'grouped' ? 'student_profiles_grouped.json' : 'student_profiles_modified.json';
    this.dataService.getData(fileName).subscribe(data => {
      this.dataChunks = this.chunkArray(data, this.pageSize);
      this.renderChartPage(this.currentPage);
    });
  }

  renderChartPage(page: number): void {
    const currentData = this.dataChunks[page];
    // Adapter le traitement des données en fonction du type de graphique
    // Par exemple, pour 'grouped', vous pouvez extraire les majors, females et males
    const majors = currentData.map((item: any) => item.Major);
    const females = currentData.map((item: any) => item.Female);
    const males = currentData.map((item: any) => item.Male);

    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context is null.');
      return;
    }

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: majors,
        datasets: [
          {
            label: 'Female',
            data: females,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Male',
            data: males,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  onNextPage(): void {
    if (this.currentPage < this.dataChunks.length - 1) {
      this.currentPage++;
      this.renderChartPage(this.currentPage);
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.renderChartPage(this.currentPage);
    }
  }

  chunkArray(array: any[], size: number): any[] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }
}*/



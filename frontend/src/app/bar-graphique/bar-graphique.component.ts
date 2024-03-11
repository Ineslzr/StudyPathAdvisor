import { Component,ViewChild, ElementRef,Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-bar-graphique',
  templateUrl: './bar-graphique.component.html',
  styleUrls: ['./bar-graphique.component.scss']
})
export class BarGraphiqueComponent {
  @ViewChild('graph') grouped!: ElementRef<HTMLCanvasElement>;
  @Input() chartType: any = 'grouped';
  @Input() pagination : boolean = true;
  
  currentPage = 0;
  pageSize = 10; 
  groupedData: any[] = []; 
  chartInstance: Chart | null = null;


  universities : Set<string> = new Set<string>();
  majors : Set<string> = new Set<string>();
  uni : string = "";
  major : string = "";

  constructor(private dataService: DataService) { }

  ngAfterViewInit(): void {
    this.renderChart();
  }


  renderChart(): void {

    switch(this.chartType){
      case 'grouped':
        if (this.chartInstance) {
          this.chartInstance.destroy();
      }
        this.dataService.getData('student_profiles_grouped.json').subscribe(data => {
          this.groupedData = this.chunkArray(data, this.pageSize);
          this.renderChartGroupedPage(this.currentPage);
        });
        break;

      case 'modified':
        if (this.chartInstance) {
          this.chartInstance.destroy();
      }
        this.dataService.getData('student_profiles_modified.json').subscribe(data => {
          this.groupedData = this.chunkArray(data, this.pageSize);
          this.renderChartModifiedPage(this.currentPage);
        });
        break;

      case 'grade_stats':
        if (this.chartInstance) {
          this.chartInstance.destroy();
      }
        this.dataService.getData('university_grades_stats.json').subscribe(data => {
          this.groupedData = this.chunkArray(data, this.pageSize);
          this.renderChartUniversityGradesStats(this.currentPage);
        });
        break;

      case "taux":
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        this.dataService.getData('student_profiles_taux_abandon_engagement.json').subscribe(data => {
          this.groupedData = this.chunkArray(data, this.pageSize);
          this.renderChartStudentTaux(this.currentPage);
        });
        break;
      case "major_uni_grades":


        this.dataService.getData('universities_majors_grades.json').subscribe(data => {
          this.groupedData = data;
          this.universities = this.getAllUniversityNames();
          this.majors = this.getAllMajorsForUniversity("Alabama");
          this.renderChartUniFormationGrades("Alabama","Accounting");
        });
        break;
      default:
        break;
    }

  }

  onUniversityChange(event: Event): void {
    const selectedUniversity = (event.target as HTMLSelectElement).value;
    this.uni = selectedUniversity;
  }

  onMajorChange(event: Event): void {
    const selectedMajor = (event.target as HTMLSelectElement).value;
    this.major = selectedMajor;
  }

  onButtonClick(){
    this.renderChartUniFormationGrades(this.uni,this.major);
  }

  getAllUniversityNames(): Set<string> {
    const universityNames = new Set<string>();
    console.log(this.groupedData);
    this.groupedData.forEach(entry => {
      for (const university in entry) {
        universityNames.add(university);
      }
    });

    return universityNames;
  }

  getAllMajorsForUniversity(universityName: string): Set<string> {
    const majorsSet: Set<string> = new Set<string>();

    this.groupedData.forEach(entry => {
      
      if (entry.hasOwnProperty(universityName)) {
        const universityData = entry[universityName];
        for (const major in universityData) {
          majorsSet.add(major);
        }
      }
    });

    return majorsSet;
  }

  getMajorDataForUniversity(universityName: string, majorName: string): any {
    let majorData: any = null;

    this.groupedData.forEach(entry => {

      if (entry.hasOwnProperty(universityName)) {
        const universityData = entry[universityName];
        if (universityData.hasOwnProperty(majorName)) {
          majorData = universityData[majorName]; 
        }
      }
    });

    return majorData; // Retourne les données min, max et average pour la matière spécifiée
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderChartUniFormationGrades(universityName: string, majorName: string): void {
    const majorData = this.getMajorDataForUniversity(universityName, majorName);

    if (!majorData) {
      console.error('No data found for the specified university and major');
      return;
    }

    const ctx = this.grouped.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context is null.');
      return;
    }

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    const backgroundColors = Array(3).fill(null).map(() => this.getRandomColor());
    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Min', 'Max', 'Average'],
        datasets: [{
          label: majorName,
          data: [majorData.min, majorData.max, majorData.moyenne],
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            position: 'bottom',
            text: 'Statistiques des résultats des étudiants par université et formation'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderChartStudentTaux(page : number): void {
    const currentData = this.groupedData[page];
    const labels = currentData.map((item: any) => item.Major);
    const taux = currentData.map((item: any) => item.Taux);

    const ctx = this.grouped.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context is null.');
      return;
    }
    const backgroundColors = Array(1).fill(null).map(() => this.getRandomColor());
    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Taux(Abandon\/Engagement) (%)',
          data: taux,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            position: 'bottom',
            text: "Taux d\'engagement ou d'abandon"
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const item = currentData[context.dataIndex];
                return `Junior: ${item.Junior}, Senior: ${item.Senior}, Taux(Abandon\/Engagement) (%): ${item.Taux}`;
              }
            }
          }
        }
      }
    });
  }


  renderChartGroupedPage(page: number): void {
    const currentData = this.groupedData[page];
    const majors = currentData.map((item: any) => item.Major);
    const females = currentData.map((item: any) => item.Female);
    const males = currentData.map((item: any) => item.Male);

    const ctx = this.grouped.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context is null.');
      return;
    }

    const backgroundColorF = Array(1).fill(null).map(() => this.getRandomColor());
    const backgroundColorM = Array(1).fill(null).map(() => this.getRandomColor());

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: majors,
        datasets: [
          {
            label: 'Female',
            data: females,
            backgroundColor: backgroundColorF,
            borderColor: backgroundColorF,
            borderWidth: 1
          },
          {
            label: 'Male',
            data: males,
            backgroundColor: backgroundColorM,
            borderColor: backgroundColorM,
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            position: 'bottom',
            text: 'Répartition des étudiants par genre dans les formations'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderChartModifiedPage(page: number): void {
      const currentData = this.groupedData[page];
      const universities = currentData.map((item : any) => item.Université);
      const studentCounts = currentData.map((item : any) => item.NombreEtudiants);

      const ctx = this.grouped.nativeElement.getContext('2d');
      if (!ctx) {
        console.error('Canvas context is null.');
        return;
      }

      const backgroundColors = Array(1).fill(null).map(() => this.getRandomColor());
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: universities,
          datasets: [
            {
              label: 'Nombre d\'étudiants',
              data: studentCounts,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
              borderWidth: 1
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              position: 'bottom',
              text: 'Nombre d’étudiants par université'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  }

  renderChartUniversityGradesStats(page:number) : void {
    const currentData = this.groupedData[page];

    const universities = currentData.map((item:any) => item.university);
    const averages = currentData.map((item:any) => item.average);
    const mins = currentData.map((item:any) => item.min);
    const maxs = currentData.map((item:any) => item.max);

    const ctx = this.grouped.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context is null.');
      return;
    }
    const backgroundColors = Array(1).fill(null).map(() => this.getRandomColor());

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: universities,
        datasets: [{
          label: 'Average Grade',
          data: averages,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Grade Average'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            position: 'bottom',
            text: 'Statistiques des résultats des étudiants par université'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const min = mins[context.dataIndex];
                const max = maxs[context.dataIndex];
                return `Min: ${min}, Max: ${max}`;
              }
            }
          }
        }
      }
    });

  }

  onNextPage(): void {
    if (this.currentPage < this.groupedData.length - 1) {
      this.currentPage++;
      this.renderChart();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.renderChart();
    }
  }

  chunkArray(array: any[], size: number): any[] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }

}

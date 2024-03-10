import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { Observable, of, map } from 'rxjs';

@Component({
  selector: 'app-line-graphique',
  templateUrl: './line-graphique.component.html',
  styleUrls: ['./line-graphique.component.scss']
})
export class LineGraphiqueComponent implements OnInit {


  allData: any[] = [];
  universities: string[] = [];
  majors : string[] = [];
  chartInstance: Chart | null = null;
  university : string = "Alabama";
  major : string = "Accounting";

  @ViewChild('lineCanvas') lineCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.getData('maroua_graphe2.json').subscribe(data => {
      this.allData = data;
      this.getAllUniversityNames().subscribe(names => {
        this.universities = names;
      });
      this.getAllMajorNames().subscribe(names => {
        this.majors = names;
      });

      this.renderChart(this.university,this.major);
    });

    
    
  }

  getAllUniversityNames(): Observable<string[]> {
    return of(this.allData.map(entry => entry['State/Province'][0])).pipe(
      map((names:any) => Array.from(new Set(names)))
    );
  }

  getAllMajorNames(): Observable<string[]> {

    return of(this.allData.map(entry => entry['State/Province'][1])).pipe(
      map((names:any) => Array.from(new Set(names)))
    );
  }

  onUniversityChange(event: Event): void {
    const selectedUniversity = (event.target as HTMLSelectElement).value;
    this.university = selectedUniversity;
  }

  onMajorChange(event: Event): void {
    const selectedMajor = (event.target as HTMLSelectElement).value;
    this.major = selectedMajor;
  }
  
  getDataForUniversityAndMajor(university: string, major: string): any[] | undefined {
    // Recherche de l'entrée correspondant à l'université spécifiée
    const universityEntry = this.allData.find(entry => entry['State/Province'][0] === university);
    if (universityEntry) {
        return universityEntry['Majors'];
    }
    
    return undefined; // Renvoyer undefined si les données de l'université ne sont pas trouvées
  }

  onButtonClick(){
    this.renderChart(this.university,this.major);
  }

  renderChart(university: string, major: string): void {
    const data = this.getDataForUniversityAndMajor(university, major);
    console.log(this.major);
    if (data) {
      const labels: string[] = ['Freshman', 'Junior', 'Senior', 'Sophomore'];
      const values = data.map(entry => Object.values(entry)[0]);

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const ctx = this.lineCanvas.nativeElement.getContext('2d');
      if (!ctx) {
        console.error('Canvas context is null.');
        return;
      }

      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: `${university} - ${major}`,
            data: values,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1 
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
              text: 'Variation du nombre des étudiants en fonction de l’année académique'
            }
          },
          scales: {
            y: {
              beginAtZero: true 
            }
          }
        }
      }as ChartConfiguration<'line', number[]>);
    }
  }


}

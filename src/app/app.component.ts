import { Component, OnInit } from '@angular/core';
import { SummaryData, CountryData } from './app.model';
import { DataService } from './data.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit {
  title = 'covid19-tracker';
  summaryData: SummaryData;
  indiaData: CountryData;
  selectedCountryData: CountryData;
  highlyConfirmedData: Array<CountryData>;
  highlyDeathData: Array<CountryData>;
  highlyRecoveredData: Array<CountryData>;
  currentDate: string;

  constructor(private service: DataService, private datePipe: DatePipe) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    const date = new Date();
    this.currentDate = this.datePipe.transform(date, 'dd-MMM-yyyy');
    this.getAllData();
  }

  // tslint:disable-next-line: typedef
  getAllData() {
    this.service.getData().subscribe(
      response => {
        this.summaryData = response;
        this.getIndiaData();
        this.getSortedData();
      }
    );
  }

  // tslint:disable-next-line: typedef
  getIndiaData() {

    this.indiaData = this.summaryData.Countries.find(x => x.Slug === 'india');
  }

  // tslint:disable-next-line: typedef
  getSortedData() {
    const data = JSON.parse(JSON.stringify(this.summaryData.Countries));
    this.highlyConfirmedData = data.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 10);
    this.highlyDeathData = data.sort((a, b) => b.TotalDeaths - a.TotalDeaths).slice(0, 10);
    this.highlyRecoveredData = data.sort((a, b) => b.TotalRecovered - a.TotalRecovered).slice(0, 10);

  }
}

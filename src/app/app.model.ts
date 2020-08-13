export class SummaryData {
    Global: GlobalData;
    Countries: Array<CountryData>;
    Date: Date;
}


type NewType = number;

export class GlobalData {
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
}

export class CountryData extends GlobalData {
    Country: string;
    CountryCode: string;
    Date: Date;
    Slug: string;
}

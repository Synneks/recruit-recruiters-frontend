import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JobOffersService } from '../job-offers.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  locations: string[] = [
    'Sibiu',
    'Bucuresti',
    'Cluj-Napoca',
    'Timisoara',
    'Iasi',
    'Constanta',
    'Craiova',
    'Brasov',
    'Abrud',
    'Adjud',
    'Afumati',
    'Aiud',
    'Alba Iulia',
    'Alesd',
    'Alexandria',
    'Arad',
    'Bacau',
    'Baia Mare',
    'Baia Sprie',
    'Baicoi',
    'Bailesti',
    'Bals',
    'Barlad',
    'Beclean',
    'Beius',
    'Bistrita',
    'Blaj',
    'Boldesti Scaieni',
    'Bolintin Deal',
    'Borsa',
    'Botosani',
    'Brad',
    'Bragadiru',
    'Braila',
    'Breaza',
    'Buftea',
    'Buzau',
    'Buzias',
    'Calafat',
    'Calarasi',
    'Campia Turzii',
    'Campina',
    'Campulung Moldovenesc',
    'Campulung Muscel',
    'Caracal',
    'Caransebes',
    'Carei',
    'Cavnic',
    'Cehu Silvaniei',
    'Cernavoda',
    'Chisineu Cris',
    'Chitila',
    'Ciorogarla',
    'Cisnadie',
    'Codlea',
    'Comanesti',
    'Corabia',
    'Covasna',
    'Cugir',
    'Cumpana',
    'Curtea de Arges',
    'Curtici',
    'Darabani',
    'Dej',
    'Deva',
    'Dorohoi',
    'Dragasani',
    'Drobeta-Turnu-Severin',
    'Fagaras',
    'Falticeni',
    'Fetesti',
    'Filiasi',
    'Floresti',
    'Focsani',
    'Gaesti',
    'Galati',
    'Gheorgheni',
    'Gherla',
    'Ghimbav',
    'Ghiroda',
    'Giurgiu',
    'Glina',
    'Gura Humorului',
    'Hateg',
    'Huedin',
    'Hunedoara',
    'Husi',
    'Iernut',
    'Ilfov',
    'Ineu',
    'Jibou',
    'Jimbolia',
    'Joita',
    'Lehliu Gara',
    'Ludus',
    'Lugoj',
    'Mangalia',
    'Marghita',
    'Medgidia',
    'Medias',
    'Miercurea-Ciuc',
    'Mioveni',
    'Mizil',
    'Mogosoaia',
    'Moinesti',
    'Moreni',
    'Motru',
    'Nadlac',
    'Navodari',
    'Odorheiu Secuiesc',
    'Oltenita',
    'Onesti',
    'Oradea',
    'Orastie',
    'Oravita',
    'Orsova',
    'Otelu Rosu',
    'Otopeni',
    'Pascani',
    'Petrosani',
    'Piatra Neamt',
    'Pitesti',
    'Ploiesti',
    'Popesti-Leordeni',
    'Predeal',
    'Radauti',
    'Ramnicu-Valcea',
    'Recas',
    'Reghin',
    'Resita',
    'Rimnicu-Sarat',
    'Roman',
    'Rosiorii de Vede',
    'Rovinari',
    'Sacele',
    'Salonta',
    'Sannicolau Mare',
    'Satu-Mare',
    'Sebes',
    'Secuieni',
    'Sfantu Gheorghe',
    'Sighetu Marmatiei',
    'Sighisoara',
    'Simeria',
    'Simleu Silvaniei',
    'Sinaia',
    'Slanic Moldova',
    'Slatina',
    'Slobozia',
    'Stefanestii de Jos',
    'Suceava',
    'Sulina',
    'Talmaciu',
    'Targoviste',
    'Targu Frumos',
    'Targu Jiu',
    'Targu Lapus',
    'Targu Neamt',
    'Targu Ocna',
    'Targu Secuiesc',
    'Tarnaveni',
    'Tecuci',
    'Tirgu-Mures',
    'Titu',
    'Tulcea',
    'Turceni',
    'Turda',
    'Turnu Magurele',
    'Urlati',
    'Urziceni',
    'Valenii de Munte',
    'Vama Veche',
    'Vaslui',
    'Vatra Dornei',
    'Videle',
    'Viseul de Jos',
    'Viseul de Sus',
    'Voluntari',
    'Zalau',
    'Zarnesti',
    'Zimnicea',
    'Zlatna',
  ];
  selectedLocation: string;

  constructor(private jobOffersService: JobOffersService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.jobOffersService
      .scrapeOffers({title: form.value['job-title'], location: this.selectedLocation})
      .subscribe();
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  data : any = [
    {"id":1,"category":"Prefabricated Aluminum Metal Canopies","title":"Product Engineer","date":"11/01/2024","picture":"Tin","created_by":"Adiana Cotes"},
    {"id":2,"category":"Rebar & Wire Mesh Install","title":"Speech Pathologist","date":"05/01/2024","picture":"It","created_by":"Giselle Matuszak"},
    {"id":3,"category":"Fire Sprinkler System","title":"Teacher","date":"25/10/2023","picture":"Sonair","created_by":"Danna Lamprecht"},
    {"id":4,"category":"RF Shielding","title":"Quality Engineer","date":"20/10/2023","picture":"Aerified","created_by":"Berty Leicester"},
    {"id":5,"category":"Prefabricated Aluminum Metal Canopies","title":"Assistant Media Planner","date":"01/08/2023","picture":"Opela","created_by":"Kylila Steart"},
    {"id":6,"category":"Site Furnishings","title":"Staff Scientist","date":"18/06/2023","picture":"Flowdesk","created_by":"Demetri McCaughey"},
    {"id":7,"category":"HVAC","title":"GIS Technical Architect","date":"12/03/2024","picture":"Zaam-Dox","created_by":"Rhoda Borth"},
    {"id":8,"category":"Waterproofing & Caulking","title":"Environmental Specialist","date":"26/10/2023","picture":"Ventosanzap","created_by":"Eden Sitwell"},
    {"id":9,"category":"Doors, Frames & Hardware","title":"Web Developer IV","date":"14/02/2024","picture":"Holdlamis","created_by":"Reade Christauffour"},
    {"id":10,"category":"Construction Clean and Final Clean","title":"Budget/Accounting Analyst III","date":"09/12/2023","picture":"Veribet","created_by":"Atlante Powney"},
    {"id":11,"category":"Fire Protection","title":"Marketing Manager","date":"15/09/2023","picture":"Opela","created_by":"Garey Camois"},
    {"id":12,"category":"Doors, Frames & Hardware","title":"Social Worker","date":"26/09/2023","picture":"Viva","created_by":"Franky Winter"},
    {"id":13,"category":"Fire Sprinkler System","title":"Director of Sales","date":"03/12/2023","picture":"Tin","created_by":"Antonia Gatteridge"},
    {"id":14,"category":"Masonry & Precast","title":"Executive Secretary","date":"16/01/2024","picture":"Solarbreeze","created_by":"Kirk Grolle"},
    {"id":15,"category":"Hard Tile & Stone","title":"Social Worker","date":"10/02/2024","picture":"Bitwolf","created_by":"Tab Meaney"},
    {"id":16,"category":"Waterproofing & Caulking","title":"Research Associate","date":"10/07/2023","picture":"Redhold","created_by":"Tamas Pepys"},
    {"id":17,"category":"Rebar & Wire Mesh Install","title":"Structural Engineer","date":"29/11/2023","picture":"Job","created_by":"Boyd Sandell"},
    {"id":18,"category":"Casework","title":"Staff Scientist","date":"27/12/2023","picture":"Mat Lam Tam","created_by":"Keelia Broe"},
    {"id":19,"category":"Asphalt Paving","title":"Sales Representative","date":"30/07/2023","picture":"Gembucket","created_by":"Odille Casetta"},
    {"id":20,"category":"Roofing (Asphalt)","title":"Recruiter","date":"22/06/2023","picture":"Bytecard","created_by":"Violante Weippert"},
    {"id":21,"category":"Soft Flooring and Base","title":"Senior Sales Associate","date":"19/01/2024","picture":"Y-Solowarm","created_by":"Ravi Koppke"},
    {"id":22,"category":"Hard Tile & Stone","title":"Programmer IV","date":"24/09/2023","picture":"Y-find","created_by":"Pepita Biford"},
    {"id":23,"category":"Exterior Signage","title":"Staff Scientist","date":"25/03/2023","picture":"Veribet","created_by":"Valli Huckle"},
    {"id":24,"category":"Electrical","title":"Teacher","date":"22/01/2024","picture":"Gembucket","created_by":"Augustus Minthorpe"},
    {"id":25,"category":"Asphalt Paving","title":"Food Chemist","date":"25/11/2023","picture":"Solarbreeze","created_by":"Datha Clampton"},
    {"id":26,"category":"Waterproofing & Caulking","title":"Food Chemist","date":"10/03/2024","picture":"Daltfresh","created_by":"Ashley Dowzell"},
    {"id":27,"category":"Framing (Wood)","title":"Social Worker","date":"08/03/2024","picture":"Namfix","created_by":"Jessika Belton"},
    {"id":28,"category":"Site Furnishings","title":"Engineer I","date":"28/09/2023","picture":"Konklux","created_by":"Tana Rivaland"},
    {"id":29,"category":"Exterior Signage","title":"Geological Engineer","date":"17/11/2023","picture":"Otcom","created_by":"Linell Duignan"},
    {"id":30,"category":"Ornamental Railings","title":"Financial Analyst","date":"09/08/2023","picture":"Aerified","created_by":"Miller Dongall"},
  ];
  listNews: any;

  constructor(){

  }

  ngOnInit(): void {
    this.getData();

  }

  getData(){
    this.listNews = this.data;
  }
}

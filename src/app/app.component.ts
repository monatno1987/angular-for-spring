import { Component, OnInit, Input  } from '@angular/core';
import { ApiService } from './api/api.service';
import {createElementCssSelector} from "@angular/compiler";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'wordscount';
  // @Input() employeeDetails = { sentence: '', email: '', phone: 0 };
    @Input() SentenceDetails = { sentence: ''};
    dicc: object[];
    sent:string;
    constructor(
      public restApi: ApiService

    ) {
      this.dicc = [];
    }
  ngOnInit() { }

    addSentence(dataSentence) {
    this.sent = this.SentenceDetails.sentence;
    this.restApi.createSentence(this.SentenceDetails).subscribe((data: any) => {
        var a = JSON.parse(data.replace(/=/g, ':').replace(/(\w+)/g, '"$1"'));
        var sum = Object.values(a).reduce((a: number, v: number) => a + +v, 0);
        //console.log(sum);
        // console.log(a = a.replace(/\D/g,''));
        console.log(sum);
     if (data===null)
          this.dicc.push({sent: '', result: '{}', total: 0});
      else {
            this.SentenceDetails.sentence = '';
            this.dicc.push({sent: this.sent, result: JSON.stringify(data), total: sum});
        }

    });
  }


}

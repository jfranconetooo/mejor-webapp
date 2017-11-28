import { Component, OnInit, enableProdMode } from '@angular/core';

import * as moment from 'moment'
import * as $ from 'jquery'
import { ConsultingService } from './consulting.service';
import { min } from 'moment';
import { Consulting } from '../domain/consulting';
import { error } from 'selenium-webdriver';

import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-consulting',
  templateUrl: './consulting.component.html',
  styleUrls: ['./consulting.component.css']
})
export class ConsultingComponent implements OnInit {

  date: moment.Moment;
  a2eOptions: any;
  myConsultings: Consulting[]=[];
  consulting: Consulting = new Consulting();

  isSaving: boolean = false;

  constructor(private consultingService:ConsultingService, private modal: Modal) {
    this.date = null;
    this.a2eOptions = {format: 'L HH:00', 
                        sideBySide: true, 
                        ignoreReadonly: true, 
                        locale: moment.locale(),
                        allowInputToggle: true,
                        enabledDates: ['2017-12-02', '2017-12-09', '2017-12-16','2017-12-23', '2017-12-30'],
                        minDate: '2017-12-02T11:00:00.000Z'
                      };
   }
   
   onSubmit(form){
    if(form.valid){
      this.isSaving = true;
      this.consulting.date = moment(this.date).toDate();
      this.consultingService.save(this.consulting).subscribe(data => {
        this.loadMyConsultings();
        this.isSaving=false;
      }, error => this.isSaving=false, ()=> {
        this.isSaving=false;
      });
    }
   }

   delete(consulting:Consulting){
    const dialogRef = this.modal.confirm()
    .title('Uncheck Consulting?')
    .body(`
        <h4>The consulting will be cleared</h4>
        `)
    .open();



    dialogRef.result
    .then( (result) => {
      this.consultingService.delete(consulting._id).subscribe(data =>  this.loadMyConsultings());
    });     
   }

  dateChange(date) {
    this.date = date;
  }
  ngOnInit() {
    this.loadMyConsultings();
    this.consultingService.getEnabledDates().
    subscribe(data => 
      {
        //Set dates when started because of version of component is whit bug
        //$('#scheduleDate').data("DateTimePicker").enabledDates(data.dates_enableds);
        $('#scheduleDate').data("DateTimePicker").enabledHours(data.hours_enableds);
      });
  }

  loadMyConsultings(){
    this.consultingService.getMyConsultings().subscribe(consultings => {
    this.myConsultings = consultings;
   });
  }
}

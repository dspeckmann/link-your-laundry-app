import { Component, Input } from '@angular/core';
import { ActiveLaundry } from '../../interfaces/active-laundry';
import { LaundryStatus } from '../../interfaces/laundry-status';
import * as moment from 'moment';

/**
 * Generated class for the LaundryCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'laundry-card',
  templateUrl: 'laundry-card.html'
})
export class LaundryCardComponent {
  LaundryStatus = LaundryStatus;
  @Input() laundry: ActiveLaundry;

  constructor() {
  }

  ngOnInit() {
    this.updateLaundryStatus();
  }

  updateLaundryStatus() {
    let start: moment.Moment;
    let end: moment.Moment;
    if(this.laundry.dryStartTime) {
      start = moment(this.laundry.dryStartTime);
      end = start.add(moment.duration(this.laundry.laundryTemplate.dryDuration));
      if(end > moment()) {
        this.laundry.status = LaundryStatus.Drying;
      } else {
        this.laundry.status = LaundryStatus.Finished;
      }
    } else {
      start = moment(this.laundry.washStartTime);
      end = start.add(moment.duration(this.laundry.laundryTemplate.washDuration));
      if(end > moment()) {
        this.laundry.status = LaundryStatus.Washing;
      } else {
        this.laundry.status = LaundryStatus.ReadyToDry;
      }
    }

    const left = end.diff(moment());
    this.laundry.timeLeft = moment(left).toDate();
    setTimeout(() => this.updateLaundryStatus(), 1000);
  }
}

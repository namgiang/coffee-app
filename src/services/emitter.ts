import 'rxjs/Rx';
import {Subject, Subscription} from 'rxjs/Rx';

export class EmitterService {
  private events = new Subject();
  subscribe (next) {
    return this.events.subscribe(next);
  }

  next(event) {
    this.events.next(event);
  }

}

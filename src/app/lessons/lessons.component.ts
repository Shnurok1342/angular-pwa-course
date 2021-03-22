import {Component, OnInit} from '@angular/core';
import {LessonsService} from '../services/lessons.service';
import {Observable, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import {SwPush} from '@angular/service-worker';
import {NewsletterService} from '../services/newsletter.service';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  lessons$: Observable<Lesson[]>;
  isLoggedIn$: Observable<boolean>;

  readonly VAPID_PUBLIC_KEY = 'BHeD-NBOy8n7QXqjp2p2yCZSGje7bj4vLDDZQaWo3mn2LGW0g7VeAprcBuJInQdu8IetufgIcCywlt73OnnJEwg';

  constructor(
    private lessonsService: LessonsService,
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.lessons$ = this.lessonsService.loadAllLessons().pipe(catchError(err => of([])));
  }

  subscribeToNotifications() {
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(sub => {
          console.log('Notification Subscription: ', sub);
          this.newsletterService.addPushSubscriber(sub).subscribe(
            () => console.log('Sent push subscription object to server.'),
            err => console.log('Could not send subscription object to server, reason:', err)
          );
        })
        .catch(err => console.log('Could not subscribe to notifications', err));
    }
  }

  sendNewsletter() {
  }
}

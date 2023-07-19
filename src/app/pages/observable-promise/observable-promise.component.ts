import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, from } from 'rxjs';

@Component({
  selector: 'app-observable-promise',
  templateUrl: './observable-promise.component.html',
  styleUrls: ['./observable-promise.component.css'],
})
export class ObservablePromiseComponent implements OnInit, OnDestroy {
  subscribe!: Subscription;
  ngOnInit(): void {
    // promise Syntax :
    const promise = new Promise((resolve) => {
      console.log('I am promise calling....');
      setTimeout(() => {
        resolve('I am promise');
        resolve('I am promise 1');
        resolve('I am promise 2');
      }, 2000);
    });

    // promise.then((res) => console.log(res));

    // observable sytax :

    // const arr = [1, 3, 1, 2, 64, 32, 15];
    // const observable = new Observable<unknown>((sub) => {
    //   console.log('I am observable calling....');
    //   setTimeout(() => {
    //     sub.next('I am observable');
    //     sub.next('I am observable 1');
    //     from(arr).subscribe((value) => {
    //       sub.next(value);
    //     });
    //     sub.complete();
    //   }, 2000);
    // });
    // observable
    //   .pipe(filter((val: any) => val % 2 === 0))
    //   .subscribe((res) => console.log(res));

    const observable = new Observable((sub) => {
      let count = 0;
      setInterval(() => {
        count += 1;
        sub.next(count);
      }, 1000);
    });
    this.subscribe = observable.subscribe((res) => console.log(res));
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}

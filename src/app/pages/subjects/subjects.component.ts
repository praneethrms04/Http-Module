import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  ngOnInit(): void {
    //observable are unicast :

    // const observable = new Observable((sub) => {
    //   sub.next(Math.floor(Math.random() * 100));
    // });
    // // subsrciber 1
    // observable.subscribe((res) => console.log(res));
    // // subscriber 2
    // observable.subscribe((res) => console.log(res));
    // // subjects are multicast :
    // const subject = new Subject();
    // // subscriber 1
    // subject.subscribe((res) => console.log(res));
    // // subscriber 2
    // subject.subscribe((res) => console.log(res));
    // subject.next(Math.floor(Math.random() * 100));

    const data = ajax('https://fakestoreapi.com/products');
    const subject = new Subject();
    data.subscribe(subject);

    // data.subscribe(res=>console.log(res))
    // data.subscribe(res=>console.log(res))

    subject.subscribe((res: any) => console.log(res.response));
    subject.subscribe((res) => console.log(res));
  }
}

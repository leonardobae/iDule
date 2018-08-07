import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase, { database } from 'firebase';

import { HomePage } from '../home/home';
import 'firebase/firestore';
import { Subject } from 'rxjs';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,  
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';


/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  viewDate: Date = new Date();

  view = 'week';
  locale = 'ko';
  isDragging = false;

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 7),
      end: addHours(startOfDay(new Date()), 9),
      title: '디자인',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: addHours(startOfDay(new Date()), 10),
      end: addHours(startOfDay(new Date()), 12),
      title: '괜찮음?',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];


  db;

  userRef;

  user;

  u_name: String;
  u_email: String;

  excludeDays: number[] = [0];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.user = firebase.auth().currentUser;
    this.db = firebase.firestore();
    this.getUserInfo();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  getUserInfo(){
    console.log(this.user);

    let u_name2;
    let u_email2;

    this.userRef = this.db.collection("users").doc(this.user.uid);

    this.userRef.get().then(function(doc){
      if(doc.exists){
        console.log("THE DOCCCCCCC");
        console.log(doc.data());
        console.log(doc.data().name);
        u_name2 = doc.data().name;
        u_email2 = doc.data().email;

        console.log("여기까지 오나?");
        console.log(u_name2);
      }
      else{
        console.log("No information to display");
      }

    }).catch(function(err){
      console.log("Error getting document:", err);
    }).then(success=>{
      this.u_name = u_name2;
      this.u_email = u_email2;
      console.log("제발");
      console.log("This is : " + this.u_name);
    }).catch(err=>{
      console.log(err);
    })
  
  }

  handleEvent(event: CalendarEvent): void {
    console.log("클릭됨!!");
    console.log(event.title);
    let name;
    this.presentAlert_change(event)
    .then(_=>{
      name=_;
      console.log("asdoifjaosij" + name)
      event.title = name;

      console.log("changed: " + name);
    })

  }

  eventTimesChanged({event, newStart, newEnd} : CalendarEventTimesChangedEvent): void {
    if (this.isDragging) {
      return;
    }
    this.isDragging = true;
 
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
 
    setTimeout(() => {
      this.isDragging = false;
    },1000);
  }

  hourSegmentClicked(event): void {
    let newEvent: CalendarEvent = {
      start: event.date,
      end: addHours(event.date, 1),
      title: 'TEST EVENT',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
 
    this.events.push(newEvent);
    this.refresh.next();
    }

    presentAlert_change(event){
      return new Promise((resolve,reject)=>{
        let name;
        let alert = this.alertCtrl.create({
          title: "이름 변경",
          inputs: [
            {
              name: 'Name',
              placeholder: event.title,
            },
          ],
          buttons: [
            {
              text: '저장',
              handler: data =>{
                console.log(data.Name);
                resolve(data.Name);
              }
            },
            {
              text: '취소',
              handler: data=>{
                console.log(data);
                reject();
              }
            }
          ]
        });
        alert.present();
        
      })
      
    }

    presentAlert_add(){
      let alert = this.alertCtrl.create({
        title: "추가",
        inputs: [
          {
            name: 'Name',
            placeholder: '',
          },
        ],
        buttons: [
          {
            text: '저장',
            handler: data =>{
              console.log(data.name);
            }
          },
          {
            text: '취소',
            handler: data=>{
              console.log(data);
            }
          }
        ]
      });
      alert.present();
    }
}

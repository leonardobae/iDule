import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

import { Storage } from '@ionic/storage';
import { IntroPage } from '../intro/intro';
import { MainPage } from '../main/main';

import firebase from 'firebase';
import 'firebase/firestore';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  db;

  user_name;
  user_id;
  user_email;
 
  user;
  
  constructor(public navCtrl: NavController, public googleplus: GooglePlus, public storage: Storage) {
    this.db = firebase.firestore();
    
  }

  ionViewDidLoad(){
    this.storage.get('intro-done').then(done=>{
      if(!done){
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage);
      }
    })
  }

  login(){
    this.googleplus.login({
      'webClientId':'780605404174-a158vbmajkab9d3e291m89d5d837vvdg.apps.googleusercontent.com'
    }).then(res=>{
      console.log(res);

      


      this.user_name = res.familyName;    // 사람 이름명
      this.user_email = res.email;      //사람 이메일

      

      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(suc=>{
        this.user = firebase.auth().currentUser;
        console.log(this.user);

        this.db.collection("users").doc(this.user.uid).set({
          email: this.user_email,
          name: this.user_name
        }).then(_=>{
          console.log(_);
        }).catch((error)=>{
          console.log(error);
        })



        alert("LOGIN SUCCESS");        
        this.navCtrl.setRoot(MainPage);
      }).catch(ns=>{
        alert("NOT SUCCESS")
      })
    })


  }


}

import { Component } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private chanled1: any; 
  private chanled2: any;
  private chanled3: any; 
  estadoLed1: boolean = false; 
  estadoLed2: boolean = false;
  estadoLed3: boolean = false;

  constructor(private db: Firestore) {
    this.saveStateData();
  }
  async apagar(led: string) {
    let tableled: any;
    let estadoLed: boolean;

    switch (led) {
      case 'LED1':
        tableled = this.chanled1;
        estadoLed = this.estadoLed1;
        break;
      case 'LED2':
        tableled = this.chanled2; 
        estadoLed = this.estadoLed2;
        break;
      case 'LED3':
        tableled = this.chanled3; 
        estadoLed = this.estadoLed3;
        break;
      default:
        break;
    }    

    tableled = doc(this.db, 'controlLED/' + led);
    estadoLed = false;
    await setDoc(tableled, { encender: estadoLed });
    this.estadoActualizar(led, estadoLed);
  }
  
  async encender(led: string) {
    let estadoLed: boolean;
    let tableled: any;

    if (led === 'LED1') {
      tableled = this.chanled1;
      estadoLed = this.estadoLed1;
    } else if (led === 'LED2') {
      tableled = this.chanled2; 
      estadoLed = this.estadoLed2;
    } else if (led === 'LED3') {
      tableled = this.chanled3; 
      estadoLed = this.estadoLed3;
    }
    tableled = doc(this.db, 'controlLED/' + led);
    estadoLed = true;
    await setDoc(tableled, { encender: estadoLed });
    this.estadoActualizar(led, estadoLed);
  }

  async saveStateData() {
    const docref1 = doc(this.db, 'controlLED', 'LED1');
    const docref2 = doc(this.db, 'controlLED', 'LED2');
    const docref3 = doc(this.db, 'controlLED', 'LED3');

    const snap1 = await getDoc(docref1);
    const snap2 = await getDoc(docref2);
    const snap3 = await getDoc(docref3);

    if (snap1.exists()) {
      this.estadoLed1 = snap1.data()['encender'];
    }    if (snap2.exists()) {
      this.estadoLed2 = snap2.data()['encender'];
    }    if (snap3.exists()) {
      this.estadoLed3 = snap3.data()['encender'];
    }
  }

  estadoActualizar(led: string, estado: boolean) {
    switch (led) {
      case 'LED1':
        this.estadoLed1 = estado;
        break;
      case 'LED2':
        this.estadoLed2 = estado;
        break;
      case 'LED3':
        this.estadoLed3 = estado;
        break;
      default:
        break;
    }
  }
  //cambiar los colores de los botones
  getColor(estado: boolean): string {
    return estado ? 'success' : 'danger';
  }
}
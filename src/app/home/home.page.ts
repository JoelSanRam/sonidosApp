import { Component, ViewChild } from '@angular/core';
import { ANIMALES } from 'src/data/data.animales';
import { Animal } from '../interfaces/animal.interface';

import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  animales: Animal[] = [];
  audio = new Audio();
  audioTIempo: any;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.animales = ANIMALES.slice(0);
      event.target.complete();
    }, 2000);
  }

  reproducir(animal:Animal){
    this.pausarAudio(animal);
    if(animal.reproduciendo == true){
      animal.reproduciendo = false;
      return;
    }
    console.log(animal);
    this.audio = new Audio();
    this.audio.src = animal.audio;
    
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTIempo = setTimeout(() => {
      animal.reproduciendo = false
    }, animal.duracion * 1000);
  }

  private pausarAudio(animalSelect: Animal){
    clearTimeout(this.audioTIempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for(let animal of this.animales){
      if(animal.nombre != animalSelect.nombre){
        animal.reproduciendo = false
      }
    }
  }

  borrar(i:number){
    this.animales.splice(i, 1)
    console.log("Borrado");
  }

  reordenar(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

}

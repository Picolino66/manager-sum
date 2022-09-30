import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Parceria } from '../entities/parceria.model';

@Injectable({
  providedIn: 'root'
})
export class ParceriaService {

  private parceriaCollection: AngularFirestoreCollection<Parceria>;

  constructor(
    private firestore: AngularFirestore,
    ) {
      this.parceriaCollection = firestore.collection('parceria');
    }

    public setParceria(parceria: Parceria){
      const id = this.firestore.createId();
      this.parceriaCollection.doc(id).set(parceria);
    }

    public getAllParceria(){
      return this.parceriaCollection.get();
    }

    public updateParceria(parceria: Parceria){
      this.parceriaCollection.doc(parceria.id).set(parceria);
    }

    public deleteParceria(parceria: Parceria){
      this.parceriaCollection.doc(parceria.id).delete();
    }
}

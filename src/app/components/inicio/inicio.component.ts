import { Component, OnInit } from '@angular/core';
import { Parceria } from 'src/app/entities/parceria.model';
import { ParceriaService } from 'src/app/services/parceria.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  parceria = {} as Parceria;
  parceriasGet: Parceria[] = [];

  constructor(
    private _parceriaService: ParceriaService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.carregaParcerias();
  }

  private carregaParcerias() {
    this._parceriaService.getAllParceria()
    .subscribe(async parcerias => {
      for (let p of parcerias.docs){
        this.parceria = p.data();
        this.parceria.id = p.id;
        this.parceriasGet.push(this.parceria);
      }
    });
  }

  updateParceria(parceria: Parceria, tipo: number) {
    if (tipo === 1) {
      parceria.feed--;
    }
    if (tipo === 2) {
      parceria.story--;
    }
    parceria.data = this.dataHoraAtual();
    this._parceriaService.updateParceria(parceria);
  }

  deleteParceria(parceria: Parceria) {
    this._parceriaService.deleteParceria(parceria);
    const index = this.parceriasGet.findIndex(p => p.id === parceria.id);
    this.parceriasGet.splice(index,1);
  }

  editarParceria(parceria: Parceria) {
    parceria.editar = !parceria.editar;
  }

  salvarParceria(par: Parceria): void {
    try{
      par.editar = false;
      par.data = this.dataHoraAtual();
      this._parceriaService.updateParceria(par);
      this.alerta("Parceria editada com sucesso!");
    }catch(error){
      console.error(error);
    }
  }

  private alerta(texto: string) {
    this._snackBar.open(texto, 'Ok!', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000
    });
  }

  private dataHoraAtual() {
    let data = new Date();
    let dia     = data.getDate();
    let mes     = data.getMonth()+1;
    let ano    = data.getFullYear();
    let hora    = data.getHours();
    let min     = data.getMinutes();
    let seg     = data.getSeconds();
    return dia+"/"+mes+"/"+ano+" "+hora+":"+min+":"+seg;
  }

}

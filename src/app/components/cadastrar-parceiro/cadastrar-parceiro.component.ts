import { Component, OnInit } from '@angular/core';
import { Parceria } from 'src/app/entities/parceria.model';
import { ParceriaService } from 'src/app/services/parceria.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-parceiro',
  templateUrl: './cadastrar-parceiro.component.html',
  styleUrls: ['./cadastrar-parceiro.component.css']
})
export class CadastrarParceiroComponent implements OnInit {

  parceria = {} as Parceria;

  constructor(
    private _parceriaService: ParceriaService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  salvar(): void {
    try{
      this._parceriaService.setParceria(this.parceria);
      this.alerta("Parceria salva com sucesso!");
      this.parceria = {} as Parceria;
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

}

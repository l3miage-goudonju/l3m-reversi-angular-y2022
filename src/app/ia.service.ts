import { Injectable } from '@angular/core';
import { ReversiGameEngineService } from './reversi-game-engine.service';
import { delay, Observable } from 'rxjs';
import { TileCoords } from './ReversiDefinitions';

@Injectable({
  providedIn: 'root'
})
export class IaService {

  /*constructor(public RGS: ReversiGameEngineService) { CODE EXPERIMENTAL, ESSAYE DE JOUER LE "MEILLEUR" COUP A CHAQUE FOIS. NE FONCTIONNE PAS
    console.log("IA crée");
    RGS.gameStateObs.subscribe((game) => {
      RGS.résuméDebug();
      const jePeuxJouerLa = RGS.whereCanPlay();
      if (jePeuxJouerLa.length > 0) {
        let plusDeTilesPrise: number;
        let jeJoueIci: TileCoords = jePeuxJouerLa[0]; //  a voir, peut être à changer
        jePeuxJouerLa.forEach(x => {
          if (plusDeTilesPrise < RGS.PionsTakenIfPlayAt(x[0], x[1]).length) {
            plusDeTilesPrise = RGS.PionsTakenIfPlayAt(x[0], x[1]).length;
            jeJoueIci = x;
          }
        });
        RGS.play(jeJoueIci[0],jeJoueIci[1]);
      } else {
        console.log("Aucun coup possible pour l'ia");
      }
    });
  }*/
  constructor(public RGS: ReversiGameEngineService) {
    console.log("IA crée");
    RGS.gameStateObs.pipe(delay(5000)).subscribe((game) => {
      RGS.résuméDebug();
      //if(game.turn === 'Player2'){
        const jePeuxJouerLa = RGS.whereCanPlay();
        const nombreCoupsPossibles:number = jePeuxJouerLa.length;
        if(nombreCoupsPossibles>0){
          const jeJoueIci = Math.floor(Math.random() * nombreCoupsPossibles);
          RGS.play(jePeuxJouerLa[jeJoueIci][0],jePeuxJouerLa[jeJoueIci][0]);
        } else {
          console.log("Plus de coups possibles pour l'ia");
        }
     // }
    });
  }
}

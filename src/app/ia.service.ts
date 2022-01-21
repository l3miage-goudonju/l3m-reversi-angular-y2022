import { Injectable } from '@angular/core';
import { ReversiGameEngineService } from './reversi-game-engine.service';
import { delay, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TileCoords } from './ReversiDefinitions';

@Injectable({
  providedIn: 'root'
})
export class IaService {

  constructor(public RGS: ReversiGameEngineService) { /*CODE EXPERIMENTAL, ESSAYE DE JOUER LE "MEILLEUR" COUP A CHAQUE FOIS. 
  ON RECUPERE LE COUP QUI DONNE LE PLUS DE TUILES ET ON LE JOUE. FONCTIONNE PARTIELLEMENT*/
    console.log("IA crée");
    RGS.gameStateObs.pipe(filter(game => game.turn !== 'Player1'), // à voir pour le filter et l'égalité, pas trop compris comment ça marche 
    delay(2000)).subscribe(_ => {
      RGS.résuméDebug();
      const jePeuxJouerLa = RGS.whereCanPlay();
      const nbCoupsPossibles = jePeuxJouerLa.length;
      let plusDeTilesPrise: number = 0;
      let jeJoueIci:number = 0;
      if (nbCoupsPossibles > 0) {
        for(let i:number = 0; i< nbCoupsPossibles; i++){
          if (plusDeTilesPrise < RGS.PionsTakenIfPlayAt(jePeuxJouerLa[i][0], jePeuxJouerLa[i][1]).length) {
            plusDeTilesPrise = RGS.PionsTakenIfPlayAt(jePeuxJouerLa[i][0], jePeuxJouerLa[i][1]).length;
            jeJoueIci = i;
          }
        }
      } else {
        console.log("Aucun coup possible pour l'ia");
      }
      RGS.play(jePeuxJouerLa[jeJoueIci][0],jePeuxJouerLa[jeJoueIci][1]);
    });
  }
  /*constructor(public RGS: ReversiGameEngineService) {
    console.log("IA crée");
    RGS.gameStateObs.pipe(filter(game => game.turn === 'Player2'),
      delay(2000)).subscribe(_ => {
        RGS.résuméDebug();
        const jePeuxJouerLa = RGS.whereCanPlay();
        const nombreCoupsPossibles: number = jePeuxJouerLa.length;
        if (nombreCoupsPossibles > 0) {
          const jeJoueIci = Math.floor(Math.random() * nombreCoupsPossibles);
          RGS.play(jePeuxJouerLa[jeJoueIci][0], jePeuxJouerLa[jeJoueIci][1]);
        } else {
          console.log("Plus de coups possibles pour l'ia");
        }
      });
  }fonction justin, ne fonctionne pas */

  /*
  constructor(public RGS: ReversiGameEngineService) {
    const sub = RGS.gameStateObs
      .pipe(
        filter(game => game.turn!=="Player2"),
        delay(3000)
      )
      .subscribe( _ => {
        RGS.résuméDebug();
        const possiblePlays = RGS.whereCanPlay();
        if (possiblePlays.length > 0) {
          const play = Math.floor(Math.random() * possiblePlays.length);
          RGS.play(possiblePlays[play][0], possiblePlays[play][1]);
        } else {
          console.log("Aucun coup possible pour l'ia");
        }
      });

    console.log('IA instanciée');
  } fonction jérémie, ne fonctionne pas */
}

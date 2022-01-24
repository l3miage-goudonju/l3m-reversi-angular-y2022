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
    RGS.résuméDebug(); // === PLAYER 1 NOT WORKING, !== PLAYER 1 NOT WORKING, === PLAYER 2 NOT WORKING, !== PLAYER 2 NOT WORKING
    RGS.gameStateObs.pipe(filter(game => game.turn !== "Player2"), // à voir pour le filter et l'égalité, pas trop compris comment ça marche 
      delay(2000)).subscribe(_ => {
        console.log("IA va jouer");
        RGS.résuméDebug();
        let jePeuxJouerLa = RGS.whereCanPlay() as TileCoords[];
        let placeCoup = this.Place_MeilleurCoup(jePeuxJouerLa, RGS);
        if (placeCoup !== -1) {
          RGS.play(jePeuxJouerLa[placeCoup][0], jePeuxJouerLa[placeCoup][1]);
          console.log("IA à jouer");
          RGS.résuméDebug();
        } else {
          console.log("IA ne peut pas jouer");
        }
      });
  }

  Place_MeilleurCoup(L: TileCoords[], RGS: ReversiGameEngineService): number {
    const nbCoupsPossibles = L.length;
    let plusDeTilesPrise: number = 0;
    let jeJoueIci: number = 0;
    if (nbCoupsPossibles > 0) {
      for (let i: number = 0; i < nbCoupsPossibles; i++) {
        if (plusDeTilesPrise < RGS.PionsTakenIfPlayAt(L[i][0], L[i][1]).length) {
          plusDeTilesPrise = RGS.PionsTakenIfPlayAt(L[i][0], L[i][1]).length;
          jeJoueIci = i;
        }
      }
    } else {
      console.log("Aucun coup possible pour l'ia");
      return -1; // gérer les erreurs après
    }
    return jeJoueIci;
  }
  /* constructor(public RGS: ReversiGameEngineService) {
     console.log("IA crée");
     RGS.gameStateObs.pipe(filter(game => game.turn !== 'Player2'),
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
   }//constructeur justin, ne fonctionne pas */


  /*constructor(public RGS: ReversiGameEngineService) {
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
  } //constructeur jérémie, ne fonctionne pas */
}

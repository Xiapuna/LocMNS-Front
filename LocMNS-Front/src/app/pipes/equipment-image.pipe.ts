import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equipmentImage',
})
export class EquipmentImagePipe implements PipeTransform {
  private readonly typeImageMap: Record<number, string> = {
    1: 'assets/images/equipments/video_projecteur.png',
    2: 'assets/images/equipments/enceinte_bluetooth.png',
    3: 'assets/images/equipments/switch_reseau.png',
    4: 'assets/images/equipments/routeur_wifi.png',
    5: 'assets/images/equipments/trepied_photo.png',
    6: 'assets/images/equipments/clavier_mecanique.png',
    7: 'assets/images/equipments/souris_ergonomique.png',
    8: 'assets/images/equipments/batterie_externe.png',
    9: 'assets/images/equipments/casque_audio.png',
    10: 'assets/images/equipments/ecran_pc.png',
  };

  transform(typeId: number): string {
    return this.typeImageMap[typeId] ?? 'assets/icons/laptop.svg';
  }
}

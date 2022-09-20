const myStorage_key_prefix = '@Redcal:';

const mystorage: Storage = window.sessionStorage;

export class myStorage {
  static syncPromise = null;

  static setItem(key: string, value: string) {
    mystorage.setItem(myStorage_key_prefix + key, value);
  }

  static getItem(key: string): string {
    let response = null;
    for (let index = 0; index < mystorage.length; index++) {
      const name = mystorage.key(index);
      if (name?.indexOf(key) != -1) {
        response = mystorage.getItem(name || '');
      }
    }
    return response || '';
  }

  static clear():void{
    mystorage.clear();
  }
}

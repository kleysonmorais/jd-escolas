export class useGoogle {
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static run = async () => {
    const LIMIT = 10;
    let FLAG = 0;
    while (
      typeof window === 'undefined' ||
      typeof window.google === 'undefined'
    ) {
      if (FLAG === LIMIT) {
        console.error('Injeção do Google Falhou');
        break;
      }
      // eslint-disable-next-line no-await-in-loop
      await useGoogle.sleep(1500);
      FLAG += 1;
    }
    Promise.resolve();
  };

  static get = async () => {
    if (typeof window.google !== 'undefined') {
      return window.google;
    }
    await useGoogle.run();
    return window.google;
  };
}

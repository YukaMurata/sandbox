import $ from 'jquery';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();
let gain = context.createGain();
gain.connect(context.destination);


export default class Sound {
  constructor() {
    this.$sound = $('.sound');
    this.isMute = false;
    this.addEvent();

  }

  addEvent() {
    window.onload = () => {
      // サウンドを読み込む
      this.getAudioBuffer('./sound/sample.mp3', (buffer) => {
        // 読み込み完了後にボタンにクリックイベントを登録
        this.$button = $('.button');
        this.$button.on('click', ()=> {
          gain.gain.value = 0;
          this.playSound(buffer);
        });

      });
    }
    $('.sound').on('click', ()=> {
      if (!this.isMute) {
        console.log("222");
        gain.gain.value = 0;
        this.isMute = true;
        // gainNode.disconnect(context.destination);
      } else {
        gain.gain.value = 1;
        // gainNode.connect(context.destination);
      }
    });
  }

  /**
   * Audio用のbufferを読み込む
   * @param url
   * @param fn
   */
  getAudioBuffer(url, fn) {
    const req = new XMLHttpRequest();
    // array buffer を指定
    req.responseType = 'arraybuffer';
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          // array buffer を audio buffer に変換
          context.decodeAudioData(req.response, (buffer) => {
            // コールバックを実行
            fn(buffer);
          });
        }
      }
    };
    req.open('GET', url, true);
    req.send('');
  }

  /**
   *  サウンドを再生
   * @param buffer
   */
  playSound(buffer) {
    const source = context.createBufferSource();
    // buffer をセット
    source.buffer = buffer;
    source.connect(gain);
    // context に connect
    // source.connect(context.destination);
    // 再生
    gain.gain.value = .2;
    source.start(0);
  }


}
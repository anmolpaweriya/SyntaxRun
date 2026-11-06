// SyntaxRun Web Audio Engine - 100% self-contained synthesized SFX & Ambient Chiptune/Synth BGM

class SoundEngine {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private isMuted: boolean = false;
  private sfxVolume: number = 0.5;
  private bgmVolume: number = 0.3;
  private currentBgmOscillators: OscillatorNode[] = [];
  private bgmInterval: any = null;
  private currentWorld: string = 'forest';

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.sfxGain = this.ctx.createGain();
        this.bgmGain = this.ctx.createGain();

        this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
        this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);

        this.sfxGain.connect(this.ctx.destination);
        this.bgmGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
    }
  }

  public setBgmVolume(vol: number) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
  }

  // --- Sound Effects ---

  public playStep() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.sfxVolume <= 0) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  public playCoin() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.sfxVolume <= 0) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    osc2.frequency.setValueAtTime(1318.51, now);
    osc2.frequency.setValueAtTime(1760.00, now + 0.08); // A6

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  public playKey() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.sfxVolume <= 0) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.2, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.2);

      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.2);
    });
  }

  public playDoorOpen() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.sfxVolume <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(400, now + 0.3);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  public playSwitch() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.sfxVolume <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(880, now + 0.04);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playLaser() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.sfxVolume <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  public playAttack() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.sfxVolume <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playError() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.sfxVolume <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.setValueAtTime(120, now + 0.1);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  public playVictory() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.sfxVolume <= 0) return;

    const now = this.ctx.currentTime;
    // Chime fanfare: C4, G4, C5, E5, G5, C6
    const notes = [
      { f: 523.25, t: 0, d: 0.15 },
      { f: 659.25, t: 0.15, d: 0.15 },
      { f: 783.99, t: 0.3, d: 0.18 },
      { f: 1046.50, t: 0.48, d: 0.4 },
    ];

    notes.forEach((n) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);

      gain.gain.setValueAtTime(0.25, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  }

  // --- Ambient Background Music Sequencer ---

  public startBgm(worldId: string) {
    this.initCtx();
    if (!this.ctx || !this.bgmGain || this.bgmVolume <= 0) return;
    this.stopBgm();
    this.currentWorld = worldId;

    // Pentatonic scale arpeggio loops tailored to worlds
    let chords: number[][] = [];
    if (worldId.includes('forest')) {
      // Lush, magical forest: C maj7, Am7, F maj7, G
      chords = [
        [261.63, 329.63, 392.00, 493.88],
        [220.00, 261.63, 329.63, 392.00],
        [174.61, 220.00, 261.63, 329.63],
        [196.00, 246.94, 293.66, 392.00],
      ];
    } else if (worldId.includes('dungeon')) {
      // Tense, dark dungeon: Dm, Bb, Gm, A
      chords = [
        [146.83, 174.61, 220.00, 261.63],
        [116.54, 146.83, 174.61, 233.08],
        [98.00, 146.83, 174.61, 196.00],
        [110.00, 138.59, 164.81, 220.00],
      ];
    } else if (worldId.includes('cyber')) {
      // Synthwave Cyber: F#m, D, A, E
      chords = [
        [185.00, 220.00, 277.18, 369.99],
        [146.83, 185.00, 220.00, 293.66],
        [220.00, 277.18, 329.63, 440.00],
        [164.81, 207.65, 246.94, 329.63],
      ];
    } else {
      // Adventure mode default: G, Em, C, D
      chords = [
        [196.00, 246.94, 293.66, 392.00],
        [164.81, 196.00, 246.94, 329.63],
        [130.81, 164.81, 196.00, 261.63],
        [146.83, 185.00, 220.00, 293.66],
      ];
    }

    let chordIdx = 0;
    let step = 0;

    const playPulse = () => {
      if (!this.ctx || !this.bgmGain || this.bgmVolume <= 0) return;
      const now = this.ctx.currentTime;
      const currentChord = chords[chordIdx];
      const freq = currentChord[step % currentChord.length];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = worldId.includes('cyber') ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.bgmGain);

      osc.start(now);
      osc.stop(now + 0.45);

      step++;
      if (step >= 8) {
        step = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }
    };

    this.bgmInterval = setInterval(playPulse, 420);
  }

  public stopBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.currentBgmOscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {}
    });
    this.currentBgmOscillators = [];
  }
}

export const sound = typeof window !== 'undefined' ? new SoundEngine() : ({} as SoundEngine);


const worldManager: WorldManager = {
  config: { columns: 100, rows: 50, cellSize: 7 },
  experiments: [],
  currentExperiment: null,
  isPlaying: false,
  fps: 60,
  frames: 0,
  animationId: null,
  listeners: {},
  world: null,

  async init(config) {
    if (!config) {
      config = this.config;
    }
    config !== this.config && this.setConfig(config, true);
    const module = await this.currentExperiment.getModule();
    if (!module) {
      throw new Error("No current experiment selected");
    }
    const createWorld = module.default;
    this.world = createWorld(config);

    this.emit("init");
    this.update(); // first generation
  },

  update() {
    if (!this.world) return;
    if (this.world.options.maxGeneration > this.world.generation) {
      if (
        !this.isPlaying ||
        (this.isPlaying && this.fps !== 0 && this.frames >= 60 / this.fps)
      ) {
        this.emit("update", this.world.nextGeneration());
        this.frames = 0;
      }

      if (this.isPlaying) {
        this.animationId = requestAnimationFrame(this.update.bind(this));
        this.frames++;
      }
    }
  },

  async restart() {
    this.pause();
    await this.init();
    this.isPlaying && this.play();
  },

  play() {
    if (this.animationId) return true;
    this.animationId = requestAnimationFrame(this.update.bind(this));
    this.isPlaying = true;

    return true;
  },

  pause() {
    this.animationId && cancelAnimationFrame(this.animationId);
    this.animationId = null;
    this.isPlaying = false;

    return false;
  },

  setExperiments(experiments) {
    this.experiments = experiments;
    this.currentExperiment =
      this.experiments.find((e) => e.selected) || this.experiments[0];
  },

  setExperiment(experiment) {
    this.currentExperiment = experiment;
    this.restart();
  },

  setConfig(partialConfig, isInit) {
    this.config = { ...this.config, ...partialConfig };
    if (!isInit && (partialConfig.columns || partialConfig.rows))
      this.restart();
  },

  setFPS(fps) {
    this.fps = fps;

    return this.fps;
  },
  on(eventName, callback) {
    this.listeners[eventName] = [
      ...(this.listeners[eventName] || []),
      callback,
    ];
  },
  emit(eventName, ...args) {
    this.listeners[eventName] &&
      this.listeners[eventName].map((listener) => listener(...args));
  },
};

export default worldManager;

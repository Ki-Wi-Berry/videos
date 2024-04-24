class syncControl {
  constructor(max) {
    this.queue = [];
    this.count = 0;
  }
  async run(fn) {
    if(this.count >= 1) {
      await new Promise((resolve) => this.queue.push(resolve));
    }
    this.count++;
    let res = await fn();
    this.count--;
    this.queue.length && this.queue.shift()();
    return res;
  }
}

export default syncControl
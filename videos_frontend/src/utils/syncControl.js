
class syncControl {
  constructor(max) {
    this.queryArray = [];
    this.count = 0;
  }
  async run(callback) {
    if(this.count >= 1) {
      await new Promise((resolve) => this.queue.push(resolve));
    }
    this.count++;
    let result = await callback();
    this.count--;
    this.queryArray.length && this.queryArray.shift()();
    return result;
  }
}

export default syncControl
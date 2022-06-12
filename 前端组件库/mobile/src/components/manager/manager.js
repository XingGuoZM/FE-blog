class BehaviorManager {
  list = [];
  index = -1;
  current = null;

  add(instance) {
    this.list.push(instance);
    console.log(this.list);
  }
  remove(instance) {
    this.list = this.list.filter((item) => item !== instance);
    if (instance === this.current) {
      this.current = null;
      this.index = -1;
    }
    console.log(this.list);
  }
}
export default new BehaviorManager();

seajs.config({
  base: "./src",
});

seajs.use(['add'], function ({ add }) {
  add(1, 2)
})

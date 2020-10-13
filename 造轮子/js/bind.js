function a(){
  console.log(this)
}

a.bind(this,global)
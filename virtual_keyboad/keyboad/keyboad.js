const app=new Vue({
  el: '#app',
  data: {
    keyLayout:[
      [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "keyboard_backspace"],
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["keyboard_capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "keyboard_return"],
      ["check_circle", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?"],
      ["space_bar"]
    ],
    specKey:[
      {
        name:'keyboard_backspace',
        class:'keyboard__key--wide',
      },
      {
        name:'keyboard_capslock',
        class:'keyboard__key--wide keyboard__key--activatable',
      },
      {
        name:'keyboard_return',
        class:'keyboard__key--wide',
      },
      {
        name:'check_circle',
        class:'keyboard__key--wide keyboard__key--dark',
      },
      {
        name:'space_bar',
        class:'keyboard__key--extra-wide',
      }
    ],
    isCapsLock: false,
    isHidden:false,
    output:"",
  },
  methods: {
    spec:function(key){
      let r=this.specKey.filter(function(item){
        if (item.name == key) return true;
      });
      return r.length==0?"":r[0].class; 
    },
    trigger:function(key){
      if(key==="keyboard_capslock"){
        this.capsLock();
      }else if(key==="check_circle"){
        this.hidden();
      }else {
        this.oninput(key);
      }
    },
    oninput:function(key){
      if(key==="keyboard_backspace"){
        this.output = this.output.substring(0, this.output.length - 1);
      }else {
        let l="";
        if(key==="keyboard_return"){
          l='\n';
        }else if(key==="space_bar"){
          l=' ';
        }else {
          l=key;
        }
        this.output = this.output+l;
      }
    },
    capsLock:function(){
      console.log('capsLock')
      this.isCapsLock = !this.isCapsLock;
      let result=[];
      for (let layout of this.keyLayout) {
        let tmp=[];
        for (let key of layout) {
          if (this.spec(key)=='') {
            key=this.isCapsLock ? key.toUpperCase() : key.toLowerCase();
          }
          tmp.push(key);
        }
        result.push(tmp);
      }
      this.keyLayout = result;
    },
    hidden:function(){
      this.isHidden = !this.isHidden;
    },
  }
})
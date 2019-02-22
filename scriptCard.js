
  
        var card = new Vue({
            el: "#card",
            data: {
                title: "dinosaurs",
                input:"",
                buttonText:"Add dinosaurs",
                dinosUpdated:0,
                speciesUpdated:0,
                items: [
                    { text: "Velociraptor", quantity:5 },
                    { text: "Triceraptor", quantity:4 },
                    { text: "stegosaurus", quantity:6 },
                ],
            },
            watch:{
               input:_.debounce(function(){
                   this.buttonText = this.input !==""? "Add " +this.input : "Add dinosaurs";
               },250)
           },
            methods: {
                addItem: function () {
                    // var input = document.getElementById("itemForm");

                    if (this.input !== '') {
                        this.items.push({
                            text: this.input,
                            quantity:0
                        })
                        this.input = "";
                    }
                },
                deleteItem: function(index){
                    if(index >=0){
                       this.items.splice(index,1); 
                    }
                },
                incrementQuantity : function (index){
                    this.items[index].quantity++;
                },
                decrementQuantity: function(index){
                    this.items[index].quantity--;   
                },
                nullQuantity: function(index){
                    this.items[index].quantity=0;   
                }
            },
           
            filters:{
                setUppercase: function(valeur){
                    if(!valeur) return '';
                    valeur = valeur.toString();
                    return valeur.charAt(0).toUpperCase()+ valeur.slice(1);
                }
            },
            computed:{
                totalDinos: function(){
                    this.dinosUpdated +=1;
                    this.speciesUpdated +=1;
                    var sum =0;
                    var items = this.items;
                    for(var i in items){
                        sum += items[i].quantity;
                        
                    }
                    return sum;
                },
                totalSpecies: function(){
                    return this.items.length;
                },
                buttonDisabled: function(){
                    if(this.input == "") return true;
                    else return false;
                }
            },
            components:{
                'dino-counter':{
                    template:"#dino-counter",
                    props:["name","initialQuantity"],
                    data:function(){
                        return {
                            quantity: this.initialQuantity
                        }
                    }
                }
            }
        })
 

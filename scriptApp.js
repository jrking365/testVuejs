

    var app = new Vue({
        el: "#app1",
        data: {
            title: "mes dinosaures",
            input: "",
            buttonText: "add Dinosaur",
            items: [
                {
                    text: "Cachotopsor",
                    weight: "15 kg"
                },
                {
                    text: "animalozor",
                    weight: "10 kg"
                },
                {
                    text: "cherchozor",
                    weight: "15000 kg"
                }
            ]
        },
        watch:{
            input:_.debounce(function(){
                this.buttonText = this.input !=="" ? "Add" + this.input : "Add Dinosaur";
            },250)
        },
        methods: {
            addItem: function () {
                if (this.input !== '') {
                    this.items.push({
                        text: this.input,
                        weight: "300 kg"
                    });
                }
                this.input= "";
            },
          
        },
        computed:{
            buttonDisabled:function(){
                if(this.input == ''){
                    return true
                }else{
                    return false;
                }
            }
        },
        filters: {
            capitalize: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1);
            },
            undercase: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.toLowerCase();
            },
            url: function (value) {
                if (!value) return '';
                value = value.toString();
                return "https://en.wikipedia.org/wiki/" + value;
            }
        }
    })

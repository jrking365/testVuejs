Vue.component('product',{
    props :{
        premium :{
            type:Boolean,
            required:true
        }
    },
    template :`
    <div class="product">
    <div class="product-image">
        <img :src="image" />
    </div>
    <div class="product-info">
        <h1>{{title}}</h1>
        <p v-if="inStock">In stock</p>
        <p v-else>Out of stock</p>
        <p>Shipping :{{shipping}}</p>
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
        <div    v-for="(variant,index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{'background-color':variant.variantColor}"
                @mouseover="updateProduct(index)">
        </div>
        
        <button @click="addToCart"
                :disabled="!inStock"
                :class="{disabledButton : !inStock}">Add to cart
        </button>
        <button @click="removeFromCart"
                :style="{backgroundColor:'red'}">Remove from cart</button>

    </div>

</div>
    `,
    data(){
        return{
            brand:'JrKing Vue',
            product:'socks',
            selectedVariant:0,
            details:["80% coton", "20% polyester", "Gender-neutral"],
            variants:[
                {
                    variantId:2234,
                    variantColor:"green",
                    variantImage:'./assets/vmSocks-green-onWhite.jpg',
                    variantQuantity:10,
                },
                {
                    variantId:2235,
                    variantColor:"blue",
                    variantImage:'./assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity:0,
                }
            ],
          
        }
    },
    methods: {
        addToCart: function(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart: function(){
            this.$emit('remove-cart',this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index){
           this.selectedVariant = index;
          
        }
    },
    computed: {
        title: function(){
            return this.brand +' ' +this.product;
        },
        image: function(){
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock:function(){
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping:function(){
            if(this.premium){
                return "Free"
            }
            return 2.99
        }
    },
})

var app = new Vue({
    el:"#app",
    data :{
        premium : true,
        cart:[],
    },
    methods:{
        updateCart: function(id){
            this.cart.push(id);
        },
        removeCart: function(id){
            this.cart.splice(this.cart.indexOf(id),1);
        }
    }
    
})
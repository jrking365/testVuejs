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

    <div>
        <h2>Reviews</h2>
        <p v-show="!reviews.length">There are no reviews yet.</p>
        <ul>
            <li v-for="review in reviews">
            <p>{{review.name}}</p>
            <p>Rating: {{review.rating}}</p>
            <p>{{review.review}}</p>
            </li>
        </ul>
    </div>

    <product-review @review-submitted="addReview"></product-review>
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
          reviews: []
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
        },
        addReview(productReview){
            this.reviews.push(productReview);
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
});

Vue.component('product-review',{
    template:`
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-show="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
            </p>
            <p>
                <label  for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name">
            </p>

            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            
           
               
               
            

            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data(){
        return{
            name : null,
            review:null,
            rating:null,
            errors:[]
        }
    },
    methods:{
        onSubmit(){
            if(this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                };
                this.$emit('review-submitted',productReview);
                this.name =null;
                this.review=null;
                this.rating=null;
            }
           else{
               if(!this.name) this.errors.push("Name required.");
               if(!this.review) this.errors.push("Review required.");
               if(!this.rating) this.errors.push("Rating required.")
           }
        }
    }
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
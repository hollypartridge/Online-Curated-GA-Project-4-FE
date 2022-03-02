# Online Curated | GA Project 4

![Online Curated](/assets/home.png)

## Table of Contents
* [Overview](#overview "Goto overview")
* [Deployed Version](#play-deployed-version "Goto play-deployed-version")
* [Brief](#brief "Goto brief")
* [Technologies Used](#technologies-used "Goto technologies-used")
* [Installation](#Installation "Goto Installation")
* [Process](#process "Goto process")
* [Bugs](#bugs "Goto bugs")
* [Challenges](#challenges "Goto challenges")
* [Wins](#wins "Goto wins")
* [Future Improvements](#future-improvements "Goto future-improvements")
* [Key Learning](#key-learning "Goto key-learning")

## Overview
* Online Curated is a full-stack application built with Python, Django and React.
* It's a womenswear shop and its features include a shop, shopping bag, wishlist and a wardrobe. 
* The wardrobe feature allows users to create outfits from the products, using drag and drop functionality.
* Individual Project | Timeframe: 1 week.

## Deployed Version
The deployed version can be found [**here.**](https://online-curated.netlify.app/ "here.")

## Brief
* Build a full-stack application - by making your own backend and your own front-end.
* Use a Python Django API using Django REST Framework to serve your data from an SQL database.
* Consume your API with a separate front-end - built with React.
* Be a complete product - which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* Have a visually impressive design.
* Be deployed online so it's publicly accessible.

## Technologies used

* HTML
* SCSS
* React.js
* JavaScript (ES6)
* Python
* Django
* PostgreSQL
* Axios
* Insomnia
* React-Router-Dom
* React-dnd
* Email.js
* Git
* GitHub
* Heroku (deployment)
* Netlify (deployment)

## Installation
* Access the source code via the 'Clone or download' button.
* Run `npm i` or `npm install` to install dependencies.
* Run `npm run dev` to start the development server.

## Process

### Planning
I spent the first day brainstorming ideas for my project. I really wanted to challenge myself and explore what it would be like to create a e-commerce site. After deciding on an e-commerce site specialising in womenswear fashion, I began deciding what components I would need for an MVP and what components I would want if I had time. I decided I would need a home page, shop page, individual product pages, user functionality to login, logout and register and a shopping bag. Features I would want if I had time were a wishlist and a wardrobe feature where users could try their products using drag and drop functionality. Once I had decided this I created an ERD diagram to plan the back-end models and the relationships between them.  

![ERD](/assets/erd.png)

Day 1:
* Brainstorming ideas
* ERD relationships
* Planning front-end components
* Planning the week 

Day 2:
* Finish back-end
* All data added

Day 3:
* Front-end components: Home, Index, Show

Day 4:
* Login & Register
* Shopping Bag & Wishlist

Day 5:
* Wardrobe feature

Day 6:
* CSS

Day 7:
* Checking over application
* Troubleshooting & Debug

### The Build

### Back-end
I began working on the back-end by setting up Django. I created a new environment and installed Django into it, entered the virtual environment and started a new Django project. Next I hooked up Postgres as the database and created the database in Postgres. I ran the migrations, created an admin user and started up the server to check it was all running successfully.

#### Creating the Products Model
I created a new products app and hooked it up to the Django product by adding it to `INSTALLED_APPS` in the `project/settings.py` file. I then created my products model. For the category and type fields I used a multiple choice option to make it easier when adding data.

```py
class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Accessories', 'Accessories'),
        ('Clothing', 'Clothing'),
        ('Shoes', 'Shoes'),
        ('Beauty + Lifestyle', 'Beauty + Lifestyle'),
    ]
    name = models.CharField(max_length=100)
    designer = models.CharField(max_length=60)
    description = models.TextField()
    image = models.CharField(max_length=300)
    color = models.CharField(max_length=20, choices=COLOR_CHOICES)
    price = models.PositiveIntegerField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    featured_product = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name} - {self.designer}'
```

#### Django Rest Framework
I installed DRF into my project and registered it as an app. I created a product serializer to convert the model data to JSON and then updated the view to use the serializer rather than the `index.html`.

```py
class ProductSerializer(serializers.ModelSerializer):
    '''Serializer for outgoing product response'''
    wishlisted_by = NestedWishlistSerializer(many=True, read_only=True)
    in_wardrobe_of = NestedWardrobeSerializer(many=True, read_only=True)
    in_shopping_bag_of = NestedShoppingBagSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
```

I used DRF generics for the views as I only needed to get all the products, get a single product and update a single product. After this I hooked up the URLs in both `products/views.py` and `project/urls.py`.

```py
class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
```

#### Creating the User
To create the user I created a new app `jwt_auth`, and hooked it up to be used in `projects/settings.py`, before creating my user model.

```py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50)
```

To create secure routes that prevent not logged in requests from working I installed Python JSON Web Token Package and created an authentication file: `jwt_auth/authentication.py` and added this to my app's settings.

```py
from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

User = get_user_model()

class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        header = request.headers.get('Authorization')
        if not header:
            return None
        if not header.startswith('Bearer'):
            raise PermissionDenied({'detail':'Invalid Auth Header'})

        token = header.replace('Bearer ', '')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'detail':'Invalid Token Error'})
        except User.DoesNotExist:
            raise PermissionDenied({'detail':'User Not Found'})

        return (user, token)
```

To create the register and login API requests I:
* Created a user serializer
* Added Register and Login view controllers
* Hooked these up to project URLS
* Added permission classes to any views I wanted to be protected by authentication.

#### Creating the Wishlist, Shopping Bag & Wardrobe
To create the extra features in my project I created for each individually: 

* Models that accepted a foreign key as a value (for both the product and user key)
* Serializers & Nested Serializers
* Views - ListView(CreateAPIView) & DetailView(DestroyAPIView)

I then hooked the views up to project URLS.

An example of the models created:

```py
class Wishlist(models.Model):
    '''Wishlist Model'''
    created_at = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(
        Product,
        related_name='wishlisted_by',
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='wishlisted_products',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'Wishlisted {self.id} - Product {self.product}'
```

I also created a user profile to see what products they had in their wishlist, shopping bag and wardrobe. I did this by:

* Creating a user profile serializer
* Adding it to views (RetrieveAPIView)
* Hooking it up to URLS

```py
class UserProfileSerializer(serializers.ModelSerializer):
    wishlisted_products = NestedWishlistSerializer(many=True)
    products_in_wardrobe = NestedWardrobeSerializer(many=True)
    products_in_shopping_bag = NestedShoppingBagSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'wishlisted_products', 'products_in_wardrobe', 'products_in_shopping_bag')
```

#### Seeding Data
I pre-populated the back-end with data, using products I had curated. As the products were sourced from many different sites the product shots were not consistent. I resized these all in Adobe Photoshop so that all products had the same amount of white space when they were made the same size in development. When I had added all the data, I seeded it to create a `seeds.json` file, which could be loaded at any time.

An example of the data for a product:

```py
  {
    "model": "products.product",
    "pk": 140,
    "fields": {
      "name": "Queen Squish",
      "designer": "Good Squish",
      "description": "This is the largest squish we do. It is handmade using carefully sourced deadstock fabric and Broderie Anglaise Trim. It has 4 layers of lace that can be separated and ruffled for full effect.",
      "image": "https://i.imgur.com/4yx4fVV.png",
      "color": "White",
      "price": 45,
      "category": "Accessories",
      "type": "Hair"
    }
  },
```

### Front-end

#### Home Page
The home page features fashion editorial images of the brand we stock. I created an interactive hero where the user could click to see a different 'New In' brand. I did this using an `onClick` event listener, toggling a Boolean value and conditional rendering. The banners were created in SCSS using animations, which separated the page for a better user experience. The favourite products all had a Boolean key with the value true, which I created in the back-end. To display these I made an API request to get all the products and then filtered them based on whether their `featuredProduct` key had a truthy value. I also used the `onMouseEnter` and `onMouseLeave`, the event target and conditional rendering to display the product name when the user hovers over the product.

```js
const handleMouseEnter = (e) => {
    setIsHovering(true)
    setWhatProductHovering(e.target.id)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    {products && 
      featuredProducts.map(product => (
        <div key={product.id} 
          className='featured-products'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link key={product.id} to={`/shop/${product.id}`}>
            <img src={product.image} id={product.id}/>
            {isHovering && whatProductHovering === String(product.id) ? 
              <button className='product-name'>
                {product.name}
              </button> 
              : 
              <button className='hidden-product-name'>
                {product.name}
              </button>
            }
          </Link>
        </div>
    ))}
  )
```

![Featured Products](/assets/home2.png)

#### Shop Page
I created the shop page filter by using an `onClick` event listener and stored the `e.target.innerText`. I then filtered through the data that was stored in the `products` variable during my `getData` function to return products that `type` value matched the `e.target.innerText`. To display these I mapped through `filteredClothing` in the return.

```js
const filteredClothing = products.filter(product => {
    return product.type === selectedType || selectedType === 'All'
  })
```

![Shop](/assets/shop.png)

#### Individual Product Page
The product page handles many events and API requests, such as add to shopping bag, add to wishlist and add to wardrobe. In the `getData` function I check to see whether the product is in a user's shopping bag, wishlist or wardrobe and then conditionally render the buttons based on this data. 

```js
const userWhoHaveWishlisted = res.data.wishlistedBy.map(wishlist => String(wishlist.owner.id))
  if (userWhoHaveWishlisted.includes(String(getUserId()))) {
    setIsWishListed(true)
  } else {
    setIsWishListed(false)
}
```

To handle the API requests I created async functions for each event (add to bag, wishlist, wardrobe) and used the `productId` retrieved from `useParams()` and the `productInteractionInfo` object, which contained the `productId` and `getUserId()` (imported from `auth.js`). The `getUserId()` is a function that sets the user's id to local storage when they login. I used a condition to check when the user is logged in - if they are the API request is made and they are navigated to either the wishlist, bag or wardrobe (depending on which they have clicked). If they are not logged in they are taken to a login page that contains information that they must log in. This is a separate page to the login one, used in situations where the user needs to login to view a page. The `isAuth` variable is created using `isAuthenticated()`, a function that returns true if there is a valid token in local storage.

```js
const handleAddToWishList = async () => {
    try {
      if (isAuth) {
        const res = await addToWishlist(productId, productInteractionInfo)
        setProduct(res.data)
        navigate('/wishlist')
      } else {
        navigate('/useronly')
      }
    } catch (err) {
      setIsError(true)
    }
  }
```

![Product](/assets/product.png)

To add extra functionality to the page I created a section that displays more products from the designer of the product you are viewing. To do this I filtered through the products to return all the products by the same designer except the product whose page the user is viewing. After this I used array methods to produce 5 random products and stored these in the `featuredProducts` variable. I then mapped through the `featuredProducts` array to display 5 more products by the designer. 

```js
const featuredByDesigner = products.filter(product => {
    return product.designer === designer && String(product.id) !== productId
  })

const featuredProducts = featuredByDesigner.sort(() => 0.5 - Math.random()).slice(0, 5)
```

![Featured Designer](/assets/product2.png)

#### Search 
I really wanted to have my search bar in the nav, as throughout my research this seemed like common practice for e-commerce sites. As I spent ages trying to work out how to do this with the different React components, but as neither `Nav.js` or `ProductIndex.js` were children of one another I couldn't pass data as props. To work round this I created a separate component for the search functionality and used CSS to give the effect that the search bar was in the navbar. I used the `onChange` event listener and event target to filter through the products based on the search term and then mapped through these products to display them.

```js
const handleSearch = (e) => {
  setKeyword(e.target.value)
}

const filteredProducts = products.filter(product => {
  if (keyword === '') {
    return product
  } else if (product.name.toLowerCase().includes(keyword.toLowerCase())) {
    return product
  }
})
```

![Search](/assets/search.png)

#### Login, Register, Logout
For the login and register components I created forms where the user could enter their information. This information was stored as an object, using an `onChange` event listener, the event target and a spread operator. Once the form was submitted the information collected (stored as `formData`) was then used in the API request. When the user was logging in their token was saved in local storage. For error handling in the Login and Register components I used a variable set in the catch block and conditional rendering to display these errors to the user. When the user logs out they invoke `removeToken()`, which removes the token from local storage. The navbar is conditionally rendered depending on whether the user is logged in (or has a token in their local storage). There is also a `SecureRoute.js` component that stops users who are not logged in from accessing user only pages by typing in the URL.

```js
const [formData, setFormData] = React.useState(initialState)
const [formErrors, setFormErrors] = React.useState(initialState)
const navigate = useNavigate()

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    await registerUser(formData)
    navigate('/login')
  } catch (err) {
    setFormErrors(err.response.data)
  }
}
```

![Login](/assets/login.png)

#### Shopping Bag
The shopping bag component uses an API request to check what products the user has in their shopping bag and then maps through these to display them. If there are no products in the user's shopping bag, I used conditional rendering to display a message informing them and a continue shopping button. There is a remove button for each product, which triggers an `onClick` event and sends an API request to the server. To calculate the total price I used the reduce array method and set state within the function so that it would re-render. 

```js
const handleTotalPrice = (shoppingBag) => {
  const onlyPrices = shoppingBag.map(product => {
    return product.product.price
  })
  
  const currentTotalPrice = onlyPrices.reduce((sum, amount) => {
    return sum + amount
  }, 0)
  setTotalPrice(currentTotalPrice)
}
```

![Bag](/assets/bag.png)

#### Checkout
In the checkout I created a form where users can enter their information. The radio button changes the 'shipping total' and 'subtotal' automatically as it sets state to re-render the page. When the user clicks checkout, provided the user submits their working email address, they will be sent an email from me. I did this using the package 'Email.js' and followed their documentation. The submit also sends an API request to delete all the products from the shopping bag and navigates to an order confirmation page. If the catch block runs the form errors are displayed as a message to create a better user experience.

```js
const handleSubmit = (e) => {
  e.preventDefault()
  send('service_lluiacm', 'template_zi0rrdr', formData, 'user_1F216DBeTVyQ7ziuSn8T8')
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text)
      productsInShoppingBag.map(product => {
        return removeAllFromShoppingBag(product)
      })
      navigate('/order-confirmation')
    }, function(error) {
      setFormErrors(error)
    })
  }
```

![Checkout](/assets/checkout.png)

#### Wishlist
The wishlist component has similar (but less) functionality than the shopping bag. It contains:

* An API request to check what products the user has in their wishlist.
* A remove button that triggers a `DELETE` API request.
* Conditional rendering to either display products in wishlist or message if there are none.

```js
const handleRemoveFromWishlist = async (e) => {
  try {
    await removeFromWishlist(productId, e)
    const res = await getUserProfile()
    setWishlistedProducts(res.data.wishlistedProducts)
  } catch (err) {
    setIsError(true)
  }
}
```

![Wishlist](/assets/wishlist.png)

#### Wardrobe
The wardrobe is my favourite feature as it was really fun to make and experiment with. It was also the most challenging part of the project. I created an old school window style div to store the products in a user's wardrobe. I did this by sending an API request to check what products the user has in their wardrobe and then mapping through them. Each product can also be removed from the wardrobe by clicking the 'x', which sends a `DELETE` API request to the server. I created a pop up window to explain how the wardrobe feature works for a better user experience. 

For the wardrobe I really wanted to be able to drag and drop products from the finder into the try on area to create outfits. To do this I used React-dnd and started by making the elements in the finder draggable using React-dnd's syntax and documentation. 

```js
const [{ isDragging }, drag] = useDrag(() => ({
  type: 'product',
  item: { id: id },
  collect: (monitor) => ({
    isDragging: !!monitor.isDragging(),
  }),
```

![Wardrobe Popup](/assets/wardrobe.png)

Next I made the tried on area a 'dropzone' triggering a function `addImageToBoard` when a product was dropped there. The `addImageToBoard()` filters through the products in the finder and returns the one that matches the id of the product just dropped. I then set state using the variable `board` that spreads the original empty array to now include products in the dropzone. To display the first 4 products in the `board` array I mapped through it and used the slice method. There is also a 'start again' button, which sets `board` to an empty array, removing the displayed products. 

```js
const addImageToBoard = (id) => {
  const getData = async () => {
    try {
      const res = await getUserProfile()
      const wardrobeProducts = res.data.productsInWardrobe
      const wardrobeList = wardrobeProducts.filter((item) => id === item.id)
      setBoard((board) => [...board, wardrobeList[0]])
    } catch (err) {
      console.log(err)
    }
  }
  getData()
}
```

![Wardrobe Functionality](/assets/wardrobe2.png)

## Challenges

**Wardrobe Feature:** It was really challenging getting the wardrobe feature up and running, as it was my first time using React-dnd, and it wasn't playing nice with my async functions. I got there in the end and it's my favourite part of the app.

## Wins 

* Built my dream full-stack application! :) 
* Worked with packages to create cool features like the checkout email and drag and drop.
* Loved the overall design, especially the banners!
* Created a back-end using Python, Django and PostgreSQL.

## Future Improvements

In the wardrobe component:

* Create a larger finder containing all the products on the site in seperate files.
* Give the user the functionality to save the outfits they have made.

## Key Learning

**Python, Django & PostgreSQL back-end:** Creating our application helped me develop my skills on the back-end. It was the first time I had made a full-stack application and my first time using Python, Django and PostgreSQL.

**More React!:** Throughout this project I learned so much more about React and its capabilities, creating more events than I have before. I also loved exploring different npm packages.

**Confidence in working on my own:** This was my first full-stack application that I built on my own and it gave me a lot of confidence. I loved working on this project and was so happy with the outcome.

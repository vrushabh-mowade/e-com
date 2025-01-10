import { Hono } from 'hono';
import { userrouter } from './user';
import { productsrouter } from './Products';
import { categoryrouter } from './Category';
import { imagerouter } from './Images';
import { wishlistrouter } from './Wishlist';
import { customer_order_router  } from './Customer_order' ;
import { customer_orderproduct_router } from './Customer_orderproduct';
import { slugrouter } from './slug';
import { searchrouter } from './Search';
import { allcartoptionrouter } from './AllCartOption';


export const Mainrouter = new Hono();

Mainrouter.onError((err, c) => {
    console.error(`${err}`)
    return c.text('the mainrouter route error', 500)
})


Mainrouter.route('/user' ,userrouter);
Mainrouter.route('/products',productsrouter);
Mainrouter.route('/category',categoryrouter);
Mainrouter.route('/images',imagerouter);
Mainrouter.route('/slug',slugrouter);
Mainrouter.route('/wishlist',wishlistrouter);
Mainrouter.route('/search',searchrouter);
Mainrouter.route('/customerorder',customer_order_router);
Mainrouter.route('/customerorderproduct',customer_orderproduct_router);
Mainrouter.route('/allcartoption',allcartoptionrouter);

import { Hono } from 'hono';
import { userrouter } from './user';
import { productsrouter } from './Products';
import { categoryrouter } from './Category';
import { imagerouter } from './Images';
import { wishlistrouter } from './Wishlist';
import { customer_order_router  } from './Customer_order' ;
import { customer_orderproduct_router } from './Customer_orderproduct';


export const Mainrouter = new Hono();


Mainrouter.route('/user' ,userrouter);
Mainrouter.route('/products',productsrouter);
Mainrouter.route('/category',categoryrouter);
Mainrouter.route('/images',imagerouter);
Mainrouter.route('/wishlist',wishlistrouter);
Mainrouter.route('/customerorder',customer_order_router);
Mainrouter.route('/customerorderproduct',customer_orderproduct_router);

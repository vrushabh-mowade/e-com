import { Hono } from 'hono';
import { Mainrouter } from './Routes/Mainrouter';
import { cors } from 'hono/cors';

const app = new Hono();


app.use(cors());

app.route('api/v1/',Mainrouter);
app.get('/',(c)=>{
  return c.text("hiii");
});


export default app

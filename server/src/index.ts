import { Hono } from 'hono';
import { Mainrouter } from './Routes/Mainrouter';


const app = new Hono();

app.route('api/v1/',Mainrouter);
app.get('/',(c)=>{
  return c.text("hiii");
});


export default app

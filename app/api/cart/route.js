import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export const POST = async (req) => {
    const { ids} = await req.json();
    try {
        await mongooseConnect();
        
      const productDocs = await Product.find({_id:ids});
      return new Response(JSON.stringify(productDocs), { status: 200 });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
  };
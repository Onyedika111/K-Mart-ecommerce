import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export const GET = async (req, {params}) => {
    try {
      await mongooseConnect();
        const productDoc = await Product.findById(params.id);
        if (!productDoc) return new Response("Product Not Found", { status: 404 });
      return new Response(JSON.stringify(productDoc), { status: 200 });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
};
  
export const DELETE = async (request, { params }) => {
    try {
        await mongooseConnect();
  
        // Find the prompt by ID and remove it
        await Product.findByIdAndRemove(params.id);
  
        return new Response("Product deleted successfully", { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
  };

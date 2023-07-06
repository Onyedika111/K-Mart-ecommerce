import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/product";
import { NextResponse, NextRequest } from "next/server";
// const stripe = require("stripe")(process.env.STRIPE_SK);
import Stripe from "stripe";

export const POST = async (req) => {
  const { name, email, city, postalCode, streetAddress, country, cartProducts } =
    await req.json();
  const stripe = new Stripe(process.env.STRIPE_SK);
  try {
    // if (req.method !== "POST") {
    //   return new Response("Should be a POST request", { status: 405 });
    // }
    await mongooseConnect();

    const productIds = cartProducts;
    const uniqueIds = [...new Set(productIds)];
    const productInfos = await Product.find({ _id: uniqueIds });

    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productInfos?.find(
        (p) => p._id.toString() === productId
      );
      const quantity =
        productIds?.filter((id) => id === productId)?.length || 0;
      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: "USD",
            product_data: { name: productInfo.title },
            unit_amount: productInfo.price * 100,
          },
        });
      }
    }

    const orderDoc = new Order({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
    });
    await orderDoc.save();

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: process.env.PUBLIC_URL + "/cart?success=1",
      cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
      metadata: { orderId: orderDoc._id.toString(), test:'ok' },
    });

    return NextResponse.json({url:session.url});
    //     return new Response(session.url, { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

// import { mongooseConnect } from "@/lib/mongoose";
// import { Order } from "@/models/Order";
// import { Product } from "@/models/product";
// const stripe = require("stripe")(process.env.STRIPE_SK);

// export const POST = async (req) => {
//   try {
//     if (req.method !== "POST") {
//       return new Response("Should be a POST request", { status: 405 });
//     }
//     await mongooseConnect();
//     const { name, email, city, postalCode, streetAddress, country, products } = await req.json();
//     const productIds = products.split(",");
//     const uniqueIds = [...new Set(productIds)];
//       const productInfos = await Product.find({ _id: uniqueIds });

//       const productRes = {name, email, city, postalCode, streetAddress, country, productInfos}

//       return new Response(JSON.stringify(productRes), { status: 200 });

// //     let line_items = [];
// //     for (const productId of uniqueIds) {
// //       const productInfo = productInfos?.find(
// //         (p) => p._id.toString() === productId
// //       );
// //       const quantity =  productIds?.filter((id) => id === productId)?.length || 0;
// //       if (quantity > 0 && productInfo) {
// //         line_items.push({
// //           quantity,
// //           price_data: {
// //             currency: "USD",
// //             product_data: { name: productInfo.title },
// //             unit_amount: quantity * productInfo.price * 100,
// //           },
// //         });
// //       }
// //       }

// //     const orderDoc = new Order({
// //       line_items,
// //       name,
// //       email,
// //       city,
// //       postalCode,
// //       streetAddress,
// //       country,
// //       paid: true,
// //     });
// //       await orderDoc.save();

// //    const session = await   stripe.checkout.sessions.create({
// //           line_items,
// //           mode: 'payment',
// //           customer_email: email,
// //           success_url:process.env.PUBLIC_URL + '/cart?success=1',
// //           cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
// //           metadata: {orderId:orderDoc._id.toString()}
// //       })

// //     return new Response(session.url, { status: 200 });
//   } catch (error) {
//     return new Response(error.message, { status: 500 });
//   }
// };

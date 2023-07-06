import { mongooseConnect } from "@/lib/mongoose";
import { headers } from "next/headers"
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { buffer } from "micro";
import { Order } from "@/models/Order";

const endpointSecret =
"whsec_cb49c620133bb00e2823bc68f097f2e0ac3746ab09015c42871aafae9697f632";

export const POST = async (request) => {
  const stripe = new Stripe(process.env.STRIPE_SK);
  try {
    await mongooseConnect();
    const body = await request.text()
    const signature = headers().get("Stripe-Signature")

    let event;

    try {
      event = stripe.webhooks.constructEvent(
       body,
       signature,
        endpointSecret
      );
    } catch (err) {
      return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const data = event.data.object;
        const orderId = data.metadata.orderId;
        const paid = data.payment_status === "paid";
        if (orderId && paid) {
          await Order.findByIdAndUpdate(orderId, {
            paid: true,
          });
        }
        console.log(orderId, paid)

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    //   // Return a 200 response to acknowledge receipt of the event
    //   response.send();
    return new Response("Ok", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

// export const config = {
//   api: { bodyParser: false },
// };

// secure-aver-super-evenly
// whsec_cb49c620133bb00e2823bc68f097f2e0ac3746ab09015c42871aafae9697f632

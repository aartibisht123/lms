// import { Webhook } from "svix";
// import User from "../models/User.js";
 

// //API Controller Function to manage Clerk User with database
// export const clerkwebhooks = async (req, res)=>{
// console.log("📩 Clerk webhook triggered");
// console.log("Headers:", req.headers);
// console.log("Raw body:", req.body);

// try {
//     console.log("📩 Clerk Webhook Received:", req.body);
// const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET);

// await whook.verify(JSON.stringify(req.body), {
    
//   "svix-id": req.headers["svix-id"],
//   "svix-timestamp": req.headers["svix-timestamp"],
//   "svix-signature": req.headers["svix-signature"],
// });

// const {data, type} = req.body;

// switch (type) {
// case 'user.created': {
// const userData = {
// _id: data.id,
// email: data.email_addresses[0].email_address,
// name: data.first_name + " " + data.last_name,
// imageUrl: data.image_url,
// }
// await User.create(userData)
// res.json({})
// break;
// }
// case 'user.updated': {
// const userData = {
// email: data.email_addresses[0].email_address,
// name: data.first_name + " " + data.last_name,
// imageUrl: data.image_url,
// }
// await User.findByIdAndUpdate(data.id, userData)
// res.json({})
// break;
// }
// case 'user.deleted': {
//     await User.findByIdAndDelete(data.id)
//     res.json({})
//     break;
// }
// default:
// break;
// }

// } catch (error) {
// res.json({success: false, message: error.message})
// }
// }


import User from "../models/User.js";

export const clerkwebhooks = async (req, res) => {
  console.log("📩 Clerk Webhook Triggered");
  console.log("📩 Clerk Webhook Received:", req.body);

  try {
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.create(userData);
        console.log("✅ User created:", userData.email);
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData, { new: true });
        console.log("🔁 User updated:", userData.email);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted:", data.id);
        break;
      }

      default:
        console.log("⚠️ Unknown event type:", type);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


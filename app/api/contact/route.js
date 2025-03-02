import dbConnect from "../../lib/mongoDB";
import ContactModel from "../../models/contactModel";

export const POST = async (req) => {
  await dbConnect();

  const { firstname,
    lastname,
    email,
    message } = await req.json();

  try {
    const newContact = new ContactModel({
        firstname,
        lastname,
        email,
        message,
      });
  
      await newContact.save();
      return new Response(JSON.stringify({ message: "Contact submited successfully" }), {
        status: 200,
      });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};
// //google-gemini-clone/src/app/api/chat/route.ts

// import { NextResponse } from "next/server";
// import { chattogemini } from "@/utils/geminiHelpers";
// import { ChatHistory, ChatSettings } from "@/types";

// export async function POST(request: Request) {
//   // Function logic will go here
//   try {
//     const { userMessage, history, settings } = (await request.json()) as {
//       userMessage: string;
//       history: ChatHistory;
//       settings: ChatSettings;
//     };
//     const aiResponse = await chattogemini(userMessage, history, settings);
//     return NextResponse.json({ response: aiResponse });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: "Error obtaining the AI model's response." },
//       { status: 500 }
//     );
//   }
// }
// src/app/api/chat/route.ts
// import { NextResponse } from "next/server";
// import { chattogemini } from "@/utils/geminiHelpers";
// import { ChatHistory, ChatSettings } from "@/types";
// import fs from "fs";
// import path from "path";
// import pdf from "pdf-parse";

// // Helper: Load PDF and extract text
// async function loadPdfText() {
//   try {
//     const pdfPath = path.join(process.cwd(), "public", "data", "sample.pdf");
//     console.log("🚀 API route is loading wala.pdf from:", pdfPath);

//     const dataBuffer = fs.readFileSync(pdfPath);
//     const pdfData = await pdf(dataBuffer);

//     // 🔹 Show preview of extracted text
//     console.log("📄 Extracted PDF text preview:\n", pdfData.text.slice(0, 500));

//     return pdfData.text;
//   } catch (error) {
//     console.error("❌ Error reading PDF:", error);
//     return "";
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { userMessage, history, settings } = (await request.json()) as {
//       userMessage: string;
//       history: ChatHistory;
//       settings: ChatSettings;
//     };

//     // 🔹 Load PDF text
//     const pdfText = await loadPdfText();

//     if (!pdfText.trim()) {
//       console.warn("⚠️ No text extracted from wala.pdf!");
//     }

//     // 🔹 Combine the PDF text into the prompt so Gemini always has it as context
//     const combinedMessage = `
// You are a helpful assistant. Use the PDF context below if it is relevant.

// User question: ${userMessage}

// --- PDF Context Start ---
// ${pdfText}
// --- PDF Context End ---
// `;

//     const aiResponse = await chattogemini(combinedMessage, history, settings);

//     return NextResponse.json({ response: aiResponse });
//   } catch (error) {
//     console.error("❌ API Error:", error);
//     return NextResponse.json(
//       { error: "Error obtaining the AI model's response." },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import { chattogemini } from "@/utils/geminiHelpers";
// import { ChatHistory, ChatSettings } from "@/types";
// import fs from "fs";
// import path from "path";
// import pdf from "pdf-parse";

// // Helper: Load PDF and extract text
// async function loadPdfText() {
//   try {
//     const pdfPath = path.join(process.cwd(), "public", "data", "sample.pdf");
//     console.log("🚀 API route is loading wala.pdf from:", pdfPath);

//     const dataBuffer = fs.readFileSync(pdfPath);
//     const pdfData = await pdf(dataBuffer);

//     if (!pdfData.text.trim()) {
//       console.warn("⚠️ No text found inside wala.pdf");
//     }

//     return pdfData.text;
//   } catch (error) {
//     console.error("Error reading PDF:", error);
//     return "";
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { userMessage, history, settings } = (await request.json()) as {
//       userMessage: string;
//       history: ChatHistory;
//       settings: ChatSettings;
//     };

//     // Load PDF text
//     const pdfText = await loadPdfText();

//     // Make the prompt conversational (not technical)
//     const combinedMessage = `
// The following document may contain information you need:

// ${pdfText}

// Now, answer the user’s question clearly and naturally.

// User: ${userMessage}
// Assistant:
// `;

//     const aiResponse = await chattogemini(combinedMessage, history, settings);

//     return NextResponse.json({ response: aiResponse });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: "Error obtaining the AI model's response." },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import { chattogemini } from "@/utils/geminiHelpers";
// import { ChatHistory, ChatSettings } from "@/types";
// import fs from "fs";
// import path from "path";
// import pdf from "pdf-parse";

// // Helper: Load PDF and extract text
// async function loadPdfText() {
//   try {
//     const pdfPath = path.join(process.cwd(), "public", "data", "sample.pdf");
//     console.log("🚀 API route is loading wala.pdf from:", pdfPath);

//     const dataBuffer = fs.readFileSync(pdfPath);
//     const pdfData = await pdf(dataBuffer);

//     if (!pdfData.text.trim()) {
//       console.warn("⚠️ No text found inside wala.pdf");
//     }

//     return pdfData.text;
//   } catch (error) {
//     console.error("Error reading PDF:", error);
//     return "";
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { userMessage, history, settings } = (await request.json()) as {
//       userMessage?: string;
//       history: ChatHistory;
//       settings: ChatSettings;
//     };

//     // If no user message yet → return greeting
//     if (!userMessage || userMessage.trim() === "") {
//       return NextResponse.json({
//         response: "Good day! What question did you need to answer about Smartarksys?",
//       });
//     }

//     // Load PDF text
//     const pdfText = await loadPdfText();

//     // Conversational context with PDF
// //     const combinedMessage = `
// // The following document may contain information you need:

// // ${pdfText}

// // Now, answer the user’s question clearly and naturally.

// // User: ${userMessage}
// // Assistant:
// // `;
// // Conversational context with PDF
// // const combinedMessage = `
// // The following document may contain information you need:

// // ${pdfText}

// // Now, answer the user’s question clearly and naturally.

// // Rules:
// // - If the answer exists in the document, answer the user’s question clearly and naturally.
// // - If the answer cannot be found in the document, do not guess or explain.
// // - Just respond briefly: "Sorry, I can’t answer that. I can only answer questions about the SMARTARKSYS  ."

// // User: ${userMessage}
// // Assistant:
// // `;
// // const combinedMessage = `
// // The following document may contain information you need:

// // ${pdfText}

// // Instructions for the assistant:
// // - If the user’s question can be answered using the document, provide a clear and natural response.
// // - If the answer cannot be found in the document, respond only with: "Sorry, I can’t answer that."
// // - Do not guess, do not apologize in long sentences, and do not explain why.
 
// // User: ${userMessage}
// // Assistant:
// // `;
// // const combinedMessage = `
// // The following document may contain information you need:

// // ${pdfText}

// // Instructions for the assistant:
// // - If the user’s question can be answered using the document, respond clearly and naturally.
// // - If the answer is NOT found in the document, reply concisely in this style:
// //   "There’s no [thing user asked about] in Smartarksys. Do you have any other questions?"

// // User: ${userMessage}
// // Assistant:
// // `;

// const combinedMessage = `
// The following document may contain information you need:

// ${pdfText}

// Instructions for the assistant:
// - If the user’s question can be answered using the smartarksys, respond clearly and naturally.
// - If the answer is NOT found in the smartarksys, do NOT say "in this smartarksys" or "listed in the smartarksys".
// - Instead, respond like this example:
//    "There is no step 5 in Smartarksys. The process ends with Step 4: If approved, the transaction is finished."

// User: ${userMessage}
// Assistant:
// `;




//     const aiResponse = await chattogemini(combinedMessage, history, settings);

//     return NextResponse.json({ response: aiResponse });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: "Error obtaining the AI model's response." },
//       { status: 500 }
//     );
//   }
// }
// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { chattogemini } from "@/utils/geminiHelpers";
import { ChatHistory, ChatSettings } from "@/types";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse";
let questionCount = 0;
let lastResetDate = new Date().toDateString();
const DAILY_LIMIT = 50;

// Reset counter each new day
function resetIfNewDay() {
  const today = new Date().toDateString();
  if (today !== lastResetDate) {
    questionCount = 0;
    lastResetDate = today;
  }
}
// 🔹 Helper: Load PDF and extract text
async function loadPdfText() {
  try {
    const pdfPath = path.join(process.cwd(), "public", "data", "sample.pdf");
    console.log("🚀 API route is loading wala.pdf from:", pdfPath);

    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdf(dataBuffer);

    return pdfData.text || "";
  } catch (error) {
    console.error("Error reading PDF:", error);
    return "";
  }
}

export async function POST(request: Request) {
  try {
     resetIfNewDay();

    // 🚫 Check quota
    if (questionCount >= DAILY_LIMIT) {
      return NextResponse.json({
        response: "Sorry, please come back tomorrow. You already reached 50 questions!",
      });
    }


    const { userMessage, history, settings } = (await request.json()) as {
      userMessage: string;
      history: ChatHistory;
      settings: ChatSettings;
    };

    // Load PDF text
    const pdfText = await loadPdfText();

    // 📝 Build combined message with clear instructions
//     const combinedMessage = `
// The following document may contain information you need:

// ${pdfText}

// Instructions for the assistant:
// - If the user’s question CAN be answered using the document, respond clearly and naturally.
// - If the answer is NOT found in the document, do NOT say "in this document" or "based on the document".
// - Instead, respond naturally, e.g.:
//    User: "What is step 5?"
//    Assistant: "Sorry, there is no step 5. The process ends with Step 4: If approved, the transaction is finished."
// - Instead, respond naturally, e.g.:
//    User: "who created smartarksys?"
//    Assistant: "Created by alcon and IT smart company lead by James Chang,"

// Now answer the user as a helpful assistant.

// User: ${userMessage}
// Assistant:
// `;
//  const combinedMessage = `
// The following document may contain information you need:

// ${pdfText}

// Special knowledge (always true):
// - Smartarksys was made by Alcon and IT Smart companies, led by James Chang and the IT Smart team.

// Instructions for the assistant:
// 1. If the user’s question CAN be answered using the document, answer naturally using that information.
// 2. If the answer is NOT in the document, respond naturally and clearly without mentioning the document.
//    Example:
//    User: "What is step 5?"
//    Assistant: "Sorry, there is no step 5. The process ends with Step 4: If approved, the transaction is finished."
// 3. If the user asks about who made Smartarksys or its origin, always answer:
//    "Smartarksys was made by Alcon and IT Smart companies, led by James Chang and the IT Smart team."

// Now answer the user as a helpful assistant.

// User: ${userMessage}
// Assistant:
// `;
//  const combinedMessage = `
// The following document may contain information you need:

// ${pdfText}

// Special knowledge (always true):
// - Smartarksys was made by Alcon and IT Smart companies, led by James Chang and the IT Smart team.

// Instructions for the assistant:
// 1. If the user’s question CAN be answered using the document, answer naturally using that information.
// 2. If the answer is NOT in the document, respond naturally and clearly without mentioning the document.
//    Example:
//    User: "What is step 5?"
//    Assistant: "Sorry, there is no step 5. The process ends with Step 4: If approved, the transaction is finished."
// 3. If the user asks about who made Smartarksys or its origin, always answer:
//    "Smartarksys was made by Alcon and IT Smart companies, led by James Chang and the IT Smart team."
// 4. If the user’s question is completely unrelated to Smartarksys, always answer:
//    "Sorry, please ask about Smartarksys."

// Now answer the user as a helpful assistant.

// User: ${userMessage}
// Assistant:
// `;
const lowerMsg = userMessage.trim().toLowerCase();
    if (["hi", "hello", "hey", "good morning", "good afternoon"].includes(lowerMsg)) {
      return NextResponse.json({
        response: "Hi! Feel free to ask me any questions about Smartarksys — I’m excited to discuss it with you!",
      });
    }
//  const combinedMessage = `
// The following document may contain information you need:

// ${pdfText}

// Special knowledge (always true):
// - Smartarksys was made by Alcon and IT Smart companies, led by James Chang and the IT Smart team.

// Instructions for the assistant:
// 1. If the user’s question CAN be answered using the document, answer naturally using that information.
// 2. If the answer is NOT in the document, respond naturally and clearly without mentioning the document.
//    Example:
//    User: "What is step 5?"
//    Assistant: "Sorry, there is no step 5. The process ends with Step 4: If approved, the transaction is finished."
// 3. If the user asks about who made Smartarksys or its origin, always answer:
//    "Smartarksys was made by Alcon Philippines and IT Smart, led by James Chang and the IT Smart."
// 4. If the question is unrelated to Smartarksys, simply answer correctly as a normal assistant (do NOT refuse).
// 5. If the user greets (hi, hello, hey, etc.), respond warmly:
//    "Hi! Feel free to ask me any questions about Smartarksys — I’m excited to discuss it with you!"
// 6. If the daily quota of 50 questions is reached, always say:
//    "Sorry, please come back tomorrow. You already reached 50 questions!"
// 7. If the answer is NOT in the document, respond naturally and clearly without mentioning the document.
//    Example:
//    User: "What is payment?"
//    Assistant: "Paymaya/Maya."
// 8. If the question is about how to contact Alcon or IT Smart, respond with the following contact information:
//    - For Alcon and IT Smart: You can reach them at **sales@alconph.com** or call **123-456-7890**. You can also visit their website at [Alcon Philippines](http://www.alconphils.com).
//    - For IT Smart: You can reach them at **itsmart@example.com** or call **098-765-4321**. You can also visit their website at [IT Smart](http://www.itsmart.com).

// 9. If the question is about who are the developers, respond with:
//    "The developers of Smartarksys include:
//    - James Chang
//    - [Developer Name 2]
//    - [Developer Name 3]
//    - [Developer Name 4]
//    (Add more names as necessary.)"
// Now answer the user as a helpful assistant.

// User: ${userMessage}
// Assistant:
// `;
// const combinedMessage = `
// The following document may contain information you need:

// ${pdfText}

// Special knowledge (always true):
// - Smartarksys was made by Alcon and IT Smart companies, led by James Chang and the IT Smart team.

// Instructions for the assistant:
// 1. If the user’s question CAN be answered using the document, answer naturally using that information.
// 2. If the answer is NOT in the document, respond naturally and clearly without mentioning the document.
//    Example:
//    User: "What is step 5?"
//    Assistant: "Sorry, there is no step 5. The process ends with Step 4: If approved, the transaction is finished."
// 3. If the user asks about who made Smartarksys or its origin, always answer:
//    "Smartarksys was made by Alcon Philippines and IT Smart, led by James Chang and the IT Smart."
// 4. If the question is unrelated to Smartarksys, simply answer correctly as a normal assistant (do NOT refuse).
// 5. If the user asks about how to contact Alcon or IT Smart, respond with the following contact information:
//    - For Alcon: You can reach them at **email@example.com** or call **123-456-7890**. You can also visit their website at [Alcon](http://www.alcon.com).
//    - For IT Smart: You can reach them at **itsmart@example.com** or call **098-765-4321**. You can also visit their website at [IT Smart](http://www.itsmart.com).
// 6. If the question is about who are the developers, respond with:
//    "The developers of Smartarksys include:
//    - James Chang
//    - [Developer Name 2]
//    - [Developer Name 3]
//    - [Developer Name 4]
//    (Add more names as necessary.)"
// 7. If the daily quota of 50 questions is reached, always say:
//    "Sorry, please come back tomorrow. You already reached 50 questions!"

// Now answer the user as a helpful assistant.

// User: ${userMessage}
// Assistant:
// `;
// const combinedMessage = `
//  The following document may contain information you need:

// ${pdfText}

// Key Information:
// - Smartarksys was created by Alcon and IT Smart, led by James Chang and the IT Smart team.

// Assistant Instructions:
// 1. If the document contains an answer, respond using that information.
// 2. If the answer is not in the document, reply clearly and naturally without mentioning the document.
//    Example:
//    User: "What is step 5?"
//    Assistant: "There is no step 5. The process concludes at Step 4: If approved, the transaction is complete."
// 3. For questions about Smartarksys’ origin, always say:
//    "Smartarksys was made by Alcon Philippines and IT Smart, led by James Chang and the IT Smart team."
// 4. For unrelated questions, respond as you would in any normal assistant scenario (no need to refuse).
// 5. For contact information:
//    - **Alcon**: Email: **email@example.com**, Phone: **123-456-7890**, Website: [Alcon](http://www.alcon.com)
//    - **IT Smart**: Email: **itsmart@example.com**, Phone: **098-765-4321**, Website: [IT Smart](http://www.itsmart.com)
// 6. For questions about the developers, respond with:
//    "The developers of Smartarksys include:
//    - James Chang
//    - [Developer Name 2]
//    - [Developer Name 3]
//    - [Developer Name 4]
//    (Additional names as needed.)"
// 7. If the user reaches the daily question limit (50), reply with:
//    "Sorry, you've reached the 50-question limit for today. Please come back tomorrow!"

// Now, assist the user in a helpful and friendly way.

// User: ${userMessage}
// Assistant:
// `;
const combinedMessage = `
${pdfText}

Key Information:
- Smartarksys was created by Alcon and IT Smart, led by James Chang and the IT Smart team.

Assistant Instructions:
1. Use the text above only as a source of knowledge. Answer questions naturally, as if you already know the information.
2. Do NOT mention or reference any "document," "manual," or "text." Just explain the answer clearly.
   Example:
   User: "What is step 5?"
   Assistant: "There is no step 5. The process concludes at Step 4: If approved, the transaction is complete."
3. For questions about Smartarksys’ origin, always say:
   "Smartarksys was made by Alcon Philippines and IT Smart, led by James Chang and the IT Smart team."
4. For unrelated questions, respond normally like a helpful assistant (no refusals needed).
5. For contact information:
   - **Alcon**: Email: **email@example.com**, Phone: **123-456-7890**, Website: [Alcon](http://www.alcon.com)
   - **IT Smart**: Email: **itsmart@example.com**, Phone: **098-765-4321**, Website: [IT Smart](http://www.itsmart.com)
6. For questions about the developers, respond with:
   "The developers of Smartarksys include:
   - James Chang
   - [Developer Name 2]
   - [Developer Name 3]
   - [Developer Name 4]
   (Additional names as needed.)"
7. If the user reaches the daily question limit (50), reply with:
   "Sorry, you've reached the 50-question limit for today. Please come back tomorrow!"

Now, assist the user in a helpful and friendly way.

User: ${userMessage}
Assistant:
`;



    const aiResponse = await chattogemini(combinedMessage, history, settings);

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Error obtaining the AI model's response." },
      { status: 500 }
    );
  }
}


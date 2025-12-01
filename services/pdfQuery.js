const dotenv = require( "dotenv" );
dotenv.config( { path: "../.env" } );

const OpenAI = require( "openai" );
const { OpenAIEmbeddings } = require( "@langchain/openai" );
const { QdrantVectorStore } = require( "@langchain/qdrant" );

const client = new OpenAI();

async function queryPDF( userId, fileName, question ) {
    const collectionName = `user_${userId}`;
    const fileNameNormalized = fileName.toLowerCase();
    const userIdStr = String( userId );

    console.log( "\n--- Querying PDF ---" );
    console.log( "User ID:", userIdStr );
    console.log( "File Name:", fileNameNormalized );
    console.log( "Question:", question );

    const embeddings = new OpenAIEmbeddings( {
        model: "text-embedding-3-large",
    } );

    const vectorStore = await QdrantVectorStore.fromExistingCollection( embeddings, {
        url: "http://localhost:6333",
        collectionName,
    } );

    // Search — retrieve top 5 pages
    const retriever = vectorStore.asRetriever( {
        filter: {
            must: [
                {
                    key: "metadata.userId",
                    match: { value: userIdStr }
                },
                {
                    key: "metadata.fileName",
                    match: { value: fileNameNormalized }
                }
            ]
        },

        k: 5,
    } );

    const relevantChunks = await retriever.invoke( question );

    if ( !relevantChunks.length ) {
        console.log( "⚠ No relevant content found. Check if userId/fileName matches stored metadata." );
        return "⚠ No relevant content found in the selected file.";
    }

    const context = relevantChunks.map( ( chunk ) => chunk.pageContent ).join( "\n\n---\n\n" );

    const SYSTEM_PROMPT = `
        You are an AI assistant that answers user questions **only using the context** provided below.
        If the answer is not present in context, reply: "Sorry, I couldn't find details about that in the selected file."

        📌 Selected File: ${fileName}

        Context: ${context}
    `;

    const response = await client.chat.completions.create( {
        model: "gpt-4.1",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: question },
        ],
    } );

    return response.choices[0].message.content;
}

module.exports = queryPDF;

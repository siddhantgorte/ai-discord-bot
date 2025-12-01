const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf")
const { OpenAIEmbeddings } = require("@langchain/openai");
const { QdrantVectorStore } = require("@langchain/qdrant");
const path = require('path');

async function indexPDF(filePath, userId, collectionName) {
    const loader = new PDFLoader(filePath)
    const docs = await loader.load()
    const fileName = path.basename(filePath).toLowerCase();
    const userIdStr = String(userId);

     // Check if PDF actually has pages
    // if (!docs.length) {
    //     console.log(`⚠ No pages found in PDF: ${filePath}`);
    //     return;
    // }

    // Log first 100 chars for each page
    docs.forEach((doc, i) => {
        console.log(`Page ${i+1}:`, doc.pageContent.slice(0, 100));
        doc.metadata = { ...doc.metadata, userId, fileName };
    });

    // Store metadata for filtering later
    docs.forEach((doc) => {
        doc.metadata = {
            ...doc.metadata,
            userId: userIdStr,
            fileName,
        };
    });

    const embeddings = new OpenAIEmbeddings({
        model: 'text-embedding-3-large',
    })

    const vectorStore =  await QdrantVectorStore.fromDocuments(docs, embeddings, {
        url: 'http://localhost:6333',
        collectionName,
        metadataKeys: ["userId", "fileName"]
    })

    console.log(`Indexed ${filePath} into Qdrant Collection ${collectionName}`);
    return vectorStore
}

module.exports = indexPDF
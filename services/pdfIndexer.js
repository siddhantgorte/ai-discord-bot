const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { QdrantVectorStore } = require("@langchain/qdrant");
const path = require("path");

async function indexPDF(filePath, userId, collectionName) {

    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    if (!docs.length) {
        console.log(`⚠ No pages found in PDF: ${filePath}`);
        return;
    }

    const fileName = path.basename(filePath).toLowerCase();
    const userIdStr = String(userId);

    docs.forEach((doc, i) => {
        doc.metadata = {
            ...doc.metadata,
            userId: userIdStr,
            fileName,
        };
    });

    // console.log("📝 First extracted page text preview:");
    // console.log(docs[0].pageContent.slice(0, 200));

    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-large",
    });

    await QdrantVectorStore.fromDocuments(docs, embeddings, {
        url: "http://localhost:6333",
        collectionName,
    });

    console.log(`✅ Successfully indexed ${docs.length} pages into ${collectionName}`);
}

module.exports = indexPDF;

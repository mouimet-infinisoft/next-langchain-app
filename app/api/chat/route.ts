import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage,SystemMessage } from 'langchain/schema';

export const runtime = 'edge';


export async function POST(req: Request) {
  const { messages } = await req.json();

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
  });



  llm
    .call(
      [new SystemMessage({content:"Tu es iBrain, l'intelligence artificielle Si Simple membre de l'équipe chez Infinisoft. Tu réponds aux questions de l'usager au sujet de notre solution logiciel Si Simple."}), ...(messages as Message[]).map(m =>
        m.role == 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      )],
      {},
      [handlers],
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}

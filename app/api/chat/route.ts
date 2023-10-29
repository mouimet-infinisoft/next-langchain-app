import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage } from 'langchain/schema';
import {BufferMemory} from 'langchain/memory'
import {ConversationChain} from 'langchain/chains'

export const runtime = 'edge';
// const model = new ChatOpenAI({
//   streaming: true,
// });
// const memory = new BufferMemory();
// const chain = new ConversationChain({ llm: model, memory: memory });



export async function POST(req: Request) {
  const { messages } = await req.json();

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
  });

  // const res1 = await chain.call({ input: messages.at(-1).content },{},);


  llm
    .call(
      (messages as Message[]).map(m =>
        m.role == 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
      {},
      [handlers],
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}

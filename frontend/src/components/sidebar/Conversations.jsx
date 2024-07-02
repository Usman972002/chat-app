import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = () => {
  const { loading, conversation } = useGetConversations();
  console.log(conversation);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversation.map((conv, index) => (
        <Conversation
          key={conv._id}
          conversation={conv}
          lastIndex={index === conversation.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;

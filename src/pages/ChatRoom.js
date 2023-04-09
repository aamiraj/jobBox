import React, { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetMessegesQuery, useSendMessegeMutation } from "../apis/jobApi";
import Loading from "../components/reusable/Loading";

const ChatRoom = () => {
  const { id: toId } = useParams();
  const fromId = useSelector((state) => state.auth.user._id);
  const [chatText, setChatText] = useState({});
  const [sendMessege] = useSendMessegeMutation();
  const { data, isLoading } = useGetMessegesQuery(
    { fromId, toId },
    { pollingInterval: 3000 }
  );
  const messeges = data?.data || [];

  if (isLoading) {
    return <Loading />;
  }

  const handleBlur = (e) => {
    e.preventDefault();
    setChatText({ [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (chatText.chatMessege) {
      const newDate = new Date();
      const messegeDate = newDate.toISOString();
      const data = { ...chatText, messegeDate, fromId, toId };
      setChatText({});
      sendMessege(data);
    }
  };
  //console.log(data);
  return (
    <div className="m-12 border-2 rounded-2xl h-[90vh] bg-gray-100 overflow-y-visible overflow-x-hidden">
      <div>
        <div showOption={false}>
          {messeges?.map((messege, i) => (
            <div key={i}>
              <p
                className={`${
                  messege.fromId === fromId
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                } inline-block p-4 m-2 text-clip max-w-[50%] rounded-md`}
              >
                {messege.chatMessege}
              </p>
              {messege.fromId === fromId ? (
                <span className="text-sm"> - You</span>
              ) : (
                <span className="text-sm"> - Him</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <form className="sticky bottom-0 bg-gray-100">
        <div className="flex">
          <input
            className="w-[90%] mx-2 my-8"
            type="text"
            placeholder="Write Something..."
            name="chatMessege"
            onBlur={handleBlur}
            required
          />
          <button
            className="shrink-0 h-14 w-14 mx-2 my-8 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
            type="reset"
            onClick={handleSend}
          >
            <BsArrowRightShort size={30} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;

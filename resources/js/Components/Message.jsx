import { usePage } from "@inertiajs/react";
import { useState } from "react";

const Message = () => {
  const { flash } = usePage().props;
  const [flashMsg, setFlashMsg] = useState(flash.message);

  setTimeout(() => {
    setFlashMsg(null);
  }, 5000);
  return (
    <div className="relative">
      {flashMsg && (
        <div className={`m-4 mt-0 max-w-[28rem] absolute w-fit top-0 right-0`}>
          <p className="w-fit relative mx-4 p-4 bg-orange-300 rounded-2xl">
            {flashMsg}
          </p>
        </div>
      )}
    </div>
  );
};

export default Message;

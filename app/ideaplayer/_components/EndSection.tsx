import React from "react";
import SharePoster from "./SharePoster";
import PayModal from "./PayModal";
import SendEmail from "./SendEmail";

const EndSection = () => {
  return (
    <section id="EndSection" className="mb-32">
      <SharePoster />
      <PayModal />
      <SendEmail />
    </section>
  );
};

export default EndSection;

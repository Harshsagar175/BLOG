import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h1>Who we are</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.</p>
        <p>Lorem Ipsum is simply dummy text</p>
        <p>Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text</p>
        <p>Lorem Ipsum is simply dummy textLorem Ipsum is simply dummy textLorem Ipsum is simply dummy text</p>
      </div>
    </div>
  );
};

export default Biography;

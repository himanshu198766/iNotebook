import React, { useContext, useEffect } from "react";
import noteContext from "../Context/Notes/NoteContext";

const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container mt-3">
        <h1>
          This is about {a.state.name} and class {a.state.class}
        </h1>
      </div>
    </>
  );
};

export default About;
